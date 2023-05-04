import mongoose from "mongoose";

const mobileSchema = new mongoose.Schema({
  mobileImg:{type:String, required:true},
  mobileName: { type: String, required: true },
  price: { type: Number, required: true },
  color:{type:String, required:true},
  description: { type: String, required: true },
  highlights:{type: String, required:true},
  rating: { type: Number, required: true }
  
});

export const MobileModel = new mongoose.model("mobile", mobileSchema);

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  password: { type: String, required: true },
  cpassword: { type: String, required: true },
});

export const AdminModel = new mongoose.model("admin", adminSchema);


const rateSchema = new mongoose.Schema({
    comments:{type:String, required:true},
    rateing:{type:Number,required:true}
})

export const RateModel = new mongoose.model('rateing',rateSchema)