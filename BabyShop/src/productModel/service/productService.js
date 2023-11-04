const productModel = require("../productModel");

const findAllProduct = async (req, res, next) => {
  try {
    const product = await productModel.find({});
    res.status(200).json(product);
  } catch (err) {
    res.status(500).send(err);
  }
};

const findProductById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await productModel.findOne({
      id
    });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).send(err);
  }
};

const adminCreateProduct = async (req, res, next) => {
  const { price, product_name, product_img, detail, condition, amount } =
    req.body;
  try {
    await productModel.create({
      id: await productModel.countDocuments(),
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
    res.status(500).send(err);
  }
};

// 관리자 상품 수정
const adminUpdateProduct = async (req, res) => {
  const {
    id,
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
        id,
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
    res.status(400).send(err);
  }
};

// 관리자 상품 삭제
const adminDeleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await productModel.deleteOne({
      id
    });
    res.status(200).send("상품이 삭제되었습니다.");
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = {
  findAllProduct,
  findProductById,
  adminCreateProduct,
  adminUpdateProduct,
  adminDeleteProduct,
};
