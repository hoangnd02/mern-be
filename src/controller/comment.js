const Comment = require("../models/comment");

exports.addComment = async (req, res) => {
  try {
    const comment = await Comment.findOne({
      userId: req.user._id,
      productId: req.params.idProduct,
    });
    if (comment) {
      const condition = {
        userId: req.user._id,
        productId: req.params.idProduct,
      };
      let cmtImg = [];
      console.log(req, "1");
      if (req.files.length > 0) {
        cmtImg = req.files.map((file) => {
          return { img: file.filename };
        });
      }
      const updatedComment = await Comment.findOneAndUpdate(
        condition,
        {
          $set: {
            content: req.body.content,
            star: req.body.star,
            cmtImg: cmtImg,
          },
        },
        { new: true }
      );
      if (!updatedComment) {
        res.status(400).json({ err });
      }
      return res.status(200).json({ updatedComment });
    } else {
      const productId = req.params.idProduct;
      const { star, content, updatedAt } = req.body;
      let cmtImg = [];
      console.log(req.files, "2");
      if (req.files.length > 0) {
        cmtImg = req.files.map((file) => {
          return { img: file.filename };
        });
      }
      const newComment = new Comment({
        userId: req.user._id,
        content,
        star,
        cmtImg,
        productId,
        updatedAt,
      });

      await newComment.save((error, comment) => {
        if (error) return res.status(400).json({ message: error });
        if (comment) {
          return res.status(200).json({ comment });
        }
      });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
};

// exports.updateComment = async (req, res) => {
//   try {
//     const comment = await Comment.findOne({
//       userId: req.user._id,
//       productId: req.body.productId,
//     });
//     console.log(comment);
//     if (comment) {
//       const condition = { userId: req.user._id, productId: req.body.productId };
//       if (req.files.length > 0) {
//         cmtImg = req.file.map((fileName) => {
//           return {
//             img: fileName,
//           };
//         });
//       }
//       const updatedComment = await Comment.findOneAndUpdate(
//         condition,
//         {
//           $set: {
//             content: req.body.content,
//             star: req.body.star,
//             cmtImg: cmtImg,
//           },
//         },
//         { new: true }
//       );
//       if (!updatedComment) {
//         res.status(400).json({ err });
//       }
//       return res.status(200).json({ updatedComment });
//     }
//   } catch (error) {
//     return res.status(400).json({ error });
//   }
// };

exports.getAllComments = async (req, res) => {
  try {
    await Comment.find({
      productId: req.params.idProduct,
    }).exec((error, comment) => {
      if (error) {
        return res.status(400).json({ error });
      }
      if (comment) {
        return res.status(200).json({ comment });
      }
    });
  } catch (error) {
    return res.status(400).json({ error });
  }
};
