const productModel = require("../productModel");

const findAllProduct = async (req, res, next) => {
  try {
    const product = await productModel.find({});
    res.status(200).json(product);
  } catch (err) {
    err.status = 500;
    next(err)
  }
};

const findProductById = async (req, res, next) => {
  const { seq } = req.params;
  try {
    const product = await productModel.findOne({
      seq
    });
    res.status(200).json(product);
  } catch (err) {
    err.status = 500;
    next(err)
  }
};

const adminCreateProduct = async (req, res, next) => {
  const { price, product_name, product_img, detail, condition, amount } =
    req.body;
  try {
    await productModel.create({
      seq: await productModel.countDocuments(),
      price,
      product_name,
      product_img,
      detail,
      condition,
      amount,
    });
    console.log("등록 완료");
    res.send("등록이 완료되었습니다.");
  } catch (err) {
    err.status = 500;
    next(err)
  }
};

// 관리자 상품 수정
const adminUpdateProduct = async (req, res) => {
  const {
    seq,
    price,
    product_name,
    product_img,
    detail,
    condition,
    amount,
  } = req.body;
  try {
    await productModel.updateOne(
      {
        seq,
      },
      {
        price,
        product_name,
        product_img,
        detail,
        condition,
        amount,
      }
    );
    res.status(201).send("상품이 수정되었습니다.");
  } catch (err) {
    err.status = 500;
    next(err)
  }
};

// 관리자 상품 삭제
const adminDeleteProduct = async (req, res) => {
  const { seq } = req.params;
  try {
    await productModel.deleteOne({
      seq
    });
    res.status(200).send("상품이 삭제되었습니다.");
  } catch (err) {
    err.status = 500;
    next(err)
  }
};

module.exports = {
  findAllProduct,
  findProductById,
  adminCreateProduct,
  adminUpdateProduct,
  adminDeleteProduct,
};
