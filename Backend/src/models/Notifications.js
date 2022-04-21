const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema = new Schema(
  {
    fromUserId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    toUserId:{
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    content:{
      type: String,
    },
    postId:{
      type: Schema.Types.ObjectId,
      ref: "post",
      required: true
    },
    isRead:{
      type: Boolean,
      default: false
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("notification", NotificationSchema);
