const Category = require("../models/category");
const slugify = require("slugify");
const shortid = require("shortid");

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

exports.addCategory = (req, res) => {
  const CategoryObj = {
    name: req.body.name,
    slug: `${slugify(req.body.name)}-${shortid.generate()}`,
  };
  if (req.file) {
    CategoryObj.categoryImage =
      process.env.APP_API + "public/" + req.file.filename;
  }

  if (req.body.parentId) {
    CategoryObj.parentId = req.body.parentId;
  }

  const cat = new Category(CategoryObj);
  cat.save((error, category) => {
    if (error) return res.status(400).json({ error });
    if (category) {
      return res.status(201).json({ category });
    }
  });
};

exports.getCategories = (req, res) => {
  Category.find({}).exec((error, categories) => {
    if (error) return res.status(400).json({ error });
    if (categories) {
      const categoryList = createCategories(categories);
      return res.json({
        categoryList,
      });
    }
  });
};

exports.updateCategories = async (req, res) => {
  const { _id, name, parentId, type } = req.body;
  const updatedCategories = [];
  if (name instanceof Array) {
    for (i = 0; i < name.length; i++) {
      const category = {
        name: name[i],
        type: type[i],
      };
      if (parentId[i] !== "") {
        category.parentId = parentId[i];
      }
      const updateCategory = await Category.findByIdAndUpdate(
        { _id: _id[i] },
        category,
        { new: true }
      );
      updatedCategories.push(updateCategory);
    }
    res.status(201).json({ updatedCategories });
  } else {
    const category = {
      name: name,
      type: type,
    };
    if (parentId !== "") {
      category.parentId = parentId;
    }
    const updateCategory = await Category.findByIdAndUpdate({ _id }, category, {
      new: true,
    });
    updatedCategories.push(updateCategory);
    res.status(201).json({ updatedCategories });
  }
};

exports.deleteCategories = async (req, res) => {
  const { ids } = req.body.payload;
  const categories = [];
  for (let i = 0; i < ids.length; i++) {
    const category = await Category.findByIdAndDelete({ _id: ids[i]._id });
    categories.push(category);
  }
  if (categories.length == ids.length) {
    res.status(201).json({ message: "Categories removed" });
  } else {
    res.status(400).json({ message: "Something went wrong" });
  }
};
