const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;
const mongoosePaginate = require("mongoose-paginate-v2");

const roleSchema = new Schema(
  {
    role: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
    permission: [
      {
        module_name: String,
        view: Boolean,
        add: Boolean,
        edit: Boolean,
        delete: Boolean,
      },
    ],

  },
  { timestamps: true }
);
roleSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("roles", roleSchema);

