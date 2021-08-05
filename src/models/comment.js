const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    star: {
      type: Number,
      required: true,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      // required: trues,
    },
    cmtImg: [{ img: { type: String } }],
    updatedAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
