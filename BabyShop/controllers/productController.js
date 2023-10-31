const Product = require("../models/product");

const findAllProduct = async (req, res, next) => {
  try {
    const product = await Product.find({});
    res.json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};

const findProductByCategory = async (req, res, next) => {
  const { category } = req.params;
  try {
    const product = await Product.find({
      Category: category,
    });
    res.json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};

const findProductById = async (req, res, next) => {
  const { id } = req.query;
  try {
    const product = await Product.findOne({
      ProductId: id,
    });
    res.json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};
