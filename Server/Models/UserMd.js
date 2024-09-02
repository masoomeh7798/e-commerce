import mongoose, { mongo } from "mongoose"
const cartSchema=new mongoose.Schema({
    totalPrice:{
        type:Number,
        default:0
    },
    items:{
        type:[
            {
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product"
            },
            categoryId:{
                type: mongoose.Schema.Types.ObjectId,
                ref:"Category"
            },
            productVariantId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"ProductVariant"
            }
        }
    ],
        default:[]
    }
})


const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
    },
    idCard:{
        type:String,
        unique:[true,'idCard is already taken'],
        match:[/^([0-9]){10}$/g,'phone is already taken']
    },
    phone:{
        type:String,
        match:[/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g,'format isnt matched'],
        required:[true,'phone number is required'],
        unique:[true,'phone is already taken'],

    },
    email:{
        type:String,
        unique:[true,'email is already taken'],
        match:[/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm,'format isnt matched'],
        required:[true,'phone number is required'],
    },
    favoriteProductIds:{
        type:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'Product'
            }
        ],
        deafult:[]
    },
    useDiscountCode:{
        type:Array,
        default:[]
    },
    role:{
        type:String,
        enum:['admin','user','superAdmin'],
        default:'user'
    },
    cart:{
        type:cartSchema,
        default:{
            totalPrice:0,
            deafult:[]
        }
    },
    recentlyProductIds:{
        type:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product"
        }],
        default:[] 
    },
    isActive:{
        type:Boolean,
        deafult:false
    },
    isComplete:{
        type:Boolean,
        default:false
    }

},{timestamps:true})

const User=mongoose.model('User',userSchema)
export default User