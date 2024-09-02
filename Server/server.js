import app from './app.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config({path:'./config.env'})
const PORT=process.env.PORT || 5001

mongoose.connect(process.env.DATA_BASE_URL).then(()=>{
        console.log('db is connected');
}
).catch(()=>{
    console.log('db is not connected');
}
)

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})