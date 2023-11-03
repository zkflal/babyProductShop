const productModel = require("../productModel");

const findAllProduct = async (req, res, next) => {
  try {
    const product = await productModel.find({});
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};

const findProductById = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const product = await productModel.findOne({
      ProductId: productId,
    });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};

const adminCreateProduct = async (req, res, next) => {
  const { Price, ProductName, ProductImg, Detail, Condition, Amount } =
    req.body;
  try {
    await productModel.create({
      ProductId: (await productModel.countDocuments()) + 1,
      Price,
      ProductName,
      ProductImg,
      Detail,
      Condition,
      Amount,
    });
    console.log("등록 완료");
    res.send("등록이 완료되었습니다.");
  } catch (err) {
    res.status(500).json(err);
  }
};

// 관리자 상품 수정
const adminUpdateProduct = async (req, res) => {
  const {
    ProductId,
    Price,
    PorductName,
    ProductImg,
    Detail,
    Condition,
    Amount,
  } = req.body;
  try {
    await productModel.updateOne(
      {
        ProductId,
      },
      {
        Price,
        PorductName,
        ProductImg,
        Detail,
        Condition,
        Amount,
      }
    );
    res.status(201).send("상품이 수정되었습니다.");
  } catch (err) {
    res.status(400).end();
  }
};

// 관리자 상품 삭제
const adminDeleteProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    await productModel.deleteOne({
      ProductId: productId,
    });
    res.status(200).send("상품이 수정되었습니다.");
  } catch (err) {
    res.status(400).end();
  }
};

module.exports = {
  findAllProduct,
  findProductById,
  adminCreateProduct,
  adminUpdateProduct,
  adminDeleteProduct,
};
