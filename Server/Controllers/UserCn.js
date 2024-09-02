import catchAsync from '../Utils/catchAsync.js'
import handleError from '../Utils/handleError.js'
import jwt from 'jsonwebtoken'
import ApiFeatures from '../Utils/apiFeatures.js'
import User from '../Models/UserMd.js'

export const getAllUsers = catchAsync(async (req, res, next) => {
    const features = new ApiFeatures(User, req?.query).filters().sort().limitFields().paginate().populate()
    const users = await features.model
    const count = await User.countDocuments(req?.query?.filters)
    return res.status(200).json({
        success: true,
        data: users,
        count
    })
})

export const getOneUser = catchAsync(async (req, res, next) => {
    const { role = '', id: userId } = jwt.verify(req?.headers?.authorization.split(' ')[1], process.env.JWT_SECRET)
    const { id } = req?.params
    if (id !== userId || role !== 'admin' || role !== 'superAdmin') {
        return next(new handleError('You dont have permission', 401))
    }
    const user = await User.findById(id)
    return res.status(200).json({
        success: true,
        data: user
    })
})

export const getAllAdmins = catchAsync(async (req, res, next) => {
    const queryString = { ...req?.query, filters: { ...req?.query?.filters, role: 'admin' } }
    const features = new ApiFeatures(User, queryString).filters().sort().limitFields().paginate().populate()
    const admins = await features.model
    const count = await User.countDocuments(queryString?.filters)
    return res.status(200).json({
        success: true,
        data: admins,
        count
    })
})
export const updateUser = catchAsync(async (req, res, next) => {
    const { role, id: userId } = jwt.verify(req?.headers?.authorization.split(' ')[1], process.env.JWT_SECRET)
    const { id } = req?.params
    if (id !== userId || role !== 'admin' || role !== 'superAdmin') {
        return next(new handleError('You dont have permission', 401))
    }
    const {role:userRole='',password='',...others}=req?.body
    const user=await User.findByIdAndUpdate(id,others,{new:true,runValidators:true})
    return res.status(200).json({
        success: true,
        data: user,
        count
    })
})

export const changeRole = catchAsync(async (req, res, next) => {
    const {id}=req?.params
    const {role:newRole}=req?.body
    const user=await User.findByIdAndUpdate(id,{role:newRole},{new:true,runValidators:true})
    return res.status(201).json({
        success:true,
        data:user
    })
})