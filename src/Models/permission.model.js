

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const permissionSchema = new Schema(
  {
    module_name: {
      type: String,
      trim: true,
      unique:true
    },
   
    view: {
      type: Boolean,
      default: false,
    },
    add: {
      type: Boolean,
      default: false,
    },
    edit: {
      type: Boolean,
      default: false,
    },
    delete: {
      type: Boolean,
      default: false,
    }
  
  },
  { timestamps: true }
);


module.exports = mongoose.model("permission", permissionSchema);
