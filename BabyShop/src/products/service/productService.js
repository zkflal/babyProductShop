const productModel = require("../models/productModel");
const categoryModel = require("../../categories/models/mainCategoryModel");

const findAllProduct = async (req, res, next) => {
  try {
    const product = await productModel.find({});
    res.status(200).json(product);
  } catch (err) {
    err.status = 500;
    next(err);
  }
};

const findProductById = async (req, res, next) => {
  const { seq } = req.params;
  try {
    const product = await productModel.findOne({
      seq,
    });
    if (!product) {
      throw new Error("sequence 값이 일치하지 않습니다.");
    }
    res.status(200).json(product);
  } catch (err) {
    err.status = 500; //예외처리 해야함 seq에 맞는 상품이 없을 경우
    next(err);
  }
};

const adminCreateProduct = async (req, res, next) => {
  const { price, name, img, detail, condition, amount, categoryName } =
    req.body;
  const category = await categoryModel.findOne({ name: categoryName });
  try {
    await productModel.create({
      seq: await productModel.countDocuments(),
      price,
      name,
      img,
      detail,
      condition,
      amount,
      category: category._id,
    });
    console.log("등록 완료");
    res.send("등록이 완료되었습니다.");
  } catch (err) {
    err.status = 500;
    next(err);
  }
};

// 관리자 상품 수정
const adminUpdateProduct = async (req, res) => {
  const { seq, price, name, img, detail, condition, amount, categoryName } =
    req.body;
  const category = await categoryModel.findOne({ name: categoryName });
  try {
    await productModel.updateOne(
      {
        seq,
      },
      {
        price,
        name,
        img,
        detail,
        condition,
        amount,
        category: category._id,
      }
    );
    res.status(201).send("상품이 수정되었습니다.");
  } catch (err) {
    err.status = 500;
    next(err);
  }
};

// 관리자 상품 삭제
const adminDeleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await productModel.deleteOne({
      seq: id,
    });
    res.status(200).send("상품이 삭제되었습니다.");
  } catch (err) {
    err.status = 500;
    next(err);
  }
};

module.exports = {
  findAllProduct,
  findProductById,
  adminCreateProduct,
  adminUpdateProduct,
  adminDeleteProduct,
};
