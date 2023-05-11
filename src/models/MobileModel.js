import mongoose from "mongoose";

// product schema

const mobileSchema = new mongoose.Schema({
  mobileImg:{type:String, required:true},
  mobileName: { type: String, required: true },
  price: { type: Number, required: true },
  star:{ type:Number},
  description: { type: String, required: true },
  highlights:{type: String, required:true},

  ratingId:[ {
    type: mongoose.Schema.Types.ObjectId,
    ref:"rating"
  }]
  
});

export const MobileModel = new mongoose.model("mobile", mobileSchema);


// user schema

const adminSchema = new mongoose.Schema({
  fname: { type: String, required: true },
  lname: {type:String, required:true},
  email: { type: String, required: true, unique:true },
  phone: { type: Number, required: true },
  password: { type: String, required: true },

  
  
});

export const AdminModel = new mongoose.model("admin", adminSchema);



// rating schema

const rateSchema = new mongoose.Schema({
    comments:{type:String, required:true},
    rating:{
      type:Number,
      required:true, 
      min:1,
      max:5
    },

    adminId: {
      type:mongoose.Schema.Types.ObjectId,
      ref:"admin"
    },
    mobileId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"mobile"
    }
})

export const RateModel = new mongoose.model('rating',rateSchema)