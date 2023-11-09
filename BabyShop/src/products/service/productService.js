const productModel = require("../models/productModel");
const mainCategoryModel = require("../../categories/models/mainCategoryModel");
const subCategoryModel = require("../../categories/models/subCategoryModel");
const sequenceModel = require("../models/sequenceModel");
// 전체 상품 불러오기
const findAllProduct = async (req, res, next) => {
  try {
    const product = await productModel.find({});
    res.status(200).json(product);
  } catch (err) {
    err.status = 500;
    next(err);
  }
};

// 아이디로 상품 불러오기
const findProductById = async (req, res, next) => {
  const { seq } = req.params;
  try {
    const product = await productModel.findOne({
      seq,
    });
    if (!product) {
      throw new Error("찾는 sequence와 같은 값의 상품이 없습니다.");
    }
    res.status(200).json(product);
  } catch (err) {
    err.status = 500; //예외처리 해야함 seq에 맞는 상품이 없을 경우
    next(err);
  }
};

// 상품 검색하기
const searchProducts = async (req, res, next) => {
  const { search } = req.params;
  try {
    const result = await productModel.find({
      name: { $regex: search },
    });
    if (result.length <= 0) {
      throw { status: 404, message: "검색 결과가 없습니다." };
    }
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

// 관리자 상품 추가
const adminCreateProduct = async (req, res, next) => {
  const {
    price,
    name,
    img,
    detail,
    condition,
    amount,
    seller,
    main_category,
    sub_category,
  } = req.body;
  const mainCategory = await mainCategoryModel.findOne({
    en_name: main_category,
  });
  const subCategory = await subCategoryModel.findOne({ en_name: sub_category });
  const sequence = await sequenceModel.findOne({
    _id: "654c7ee524c678e0bd7d7e05",
  });
  const seq = sequence.seq;
  try {
    await productModel.create({
      seq,
      price,
      name,
      img,
      detail,
      condition,
      amount,
      seller,
      main_category: mainCategory,
      sub_category: subCategory,
    });
    await sequenceModel.updateOne(
      { _id: "654c7ee524c678e0bd7d7e05" },
      {
        $inc: { seq: 1 },
      }
    );
    console.log("등록 완료");
    res.send("등록이 완료되었습니다.");
  } catch (err) {
    err.status = 500;
    next(err);
  }
};

// 관리자 상품 수정
const adminUpdateProduct = async (req, res) => {
  const {
    seq,
    price,
    name,
    img,
    detail,
    condition,
    amount,
    seller,
    main_category,
    sub_category,
  } = req.body;

  const mainCategory = await mainCategoryModel.findOne({
    en_name: main_category,
  });
  console.log(mainCategory);
  const subCategory = await subCategoryModel.findOne({
    en_name: sub_category,
  });
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
        seller,
        main_category: mainCategory,
        sub_category: subCategory,
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
  searchProducts,
  adminCreateProduct,
  adminUpdateProduct,
  adminDeleteProduct,
};
