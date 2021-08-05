const Category = require("../models/category");
const Product = require("../models/product");

exports.initialData = async (req, res) => {
  const createCategories = (categories, parentId = null) => {
    const categoryList = [];
    let category;

    if (parentId == null) {
      category = categories.filter((cat) => cat.parentId == undefined);
    } else {
      category = categories.filter((cat) => cat.parentId == parentId);
    }
    for (let cate of category) {
      categoryList.push({
        _id: cate._id,
        name: cate.name,
        slug: cate.slug,
        parentId: cate.parentId,
        type: cate.type,
        children: createCategories(categories, cate._id),
      });
    }
    return categoryList;
  };
  const categories = await Category.find({}).exec();
  const products = await Product.find({})
    .select("_id name slug quantity description price productPictures")
    .populate({ path: "category", select: "_id name" })
    .exec();
  res.json({ categories: createCategories(categories), products });
};
