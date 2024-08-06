import mongoose from 'mongoose'
const addressSchema= new mongoose.Schema({
    locality:{
        type:String,
        requierd:true
    },
    district:{
        type:String,
        required:true
    },
    pin:{
        type:Number,
        required:true
    },
    state:{
        type:String,
        required:true
    }
    
});
const userSchema = new mongoose.Schema(
    {
        // userName:{
        //     type: String,
        //     required: true,
        //     unique: true,
        //     lowercase:true
        // },
        email:{
            type:String,
            required:true,
            // unique: true,
            lowercase:true
        },
        password:{
            type:String,
            required:true
        },
        // address:{
        //     // type:mongoose.Schema.Type.ObjectId,
        //     ref:"addressSchema",
        //     required:true
        // }

        
    }
)

export default  mongoose.model('user',userSchema);
