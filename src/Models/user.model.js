const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
  full_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String,  required: true },
  user_type: { type: String, enum: [ "Admin","Team_Member"],default: "Team_Member" },
  is_verified : { type : Boolean,default:false},
  role: { type: mongoose.Schema.Types.ObjectId, ref: "roles" },
  department: { type: mongoose.Schema.Types.ObjectId, ref: "categories" },
  phone :{ type:String},
  assigned_companies: [
    {
      type: Schema.Types.ObjectId,
      ref: "companies",
    },
  ],
  // Add these fields to your User schema
microsoft_id: {
  type: String,
  unique: true,
  sparse: true, // Allows null values but unique when present
},
auth_provider: {
  type: String,
  enum: ["local", "microsoft"],
  default: "local",
},
  is_active: {
    type: Boolean,
    default:true
  },
  is_delete: {
    type: Boolean,
    default:false
  }
},
{timestamps:true});

module.exports = mongoose.model("users", userSchema);
