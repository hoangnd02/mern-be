const { identity } = require("lodash");
const Page = require("../models/page");

exports.createPage = (req, res) => {
  const { products, banners } = req.files;

  if (banners && banners.length > 0) {
    req.body.banners = banners.map((banner) => ({
      img: `${process.env.APP_API}public/${banner.filename}`,
      navigator: `/bannerClicked?categoryId=${req.body.category}&type=${req.body.type}`,
    }));
  }
  if (products && products.length > 0) {
    req.body.products = products.map((product) => ({
      img: `${process.env.APP_API}public/${product.filename}`,
      navigator: `/productClicked?categoryId=${req.body.category}&type=${req.body.type}`,
    }));
  }
  req.body.createdBy = req.user._id;

  Page.findOne({ category: req.body.category }).exec((error, page) => {
    if (error) return res.status(400).json({ error });
    if (page) {
      Page.findOneAndUpdate({ category: req.body.category }, req.body, {
        new: true,
      }).exec((error, updatedPage) => {
        if (error) return res.status(400).json({ error });
        if (updatedPage) {
          return res.status(201).json({ page: updatedPage });
        }
      });
    } else {
      const page = new Page(req.body);

      page.save((error, page) => {
        if (error) return res.status(400).json({ error });
        if (page) {
          return res.status(201).json({ page });
        }
      });
    }
  });
};

exports.getPage = (req, res) => {
  const { category, type } = req.params;
  if (type === "page") {
    Page.findOne({ category: category }).exec((error, page) => {
      if (error) return res.status(400).json({ error });
      if (page) return res.status(200).json({ page });
    });
  }
};
