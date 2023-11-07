const categoryModel = require("../models/mainCategoryModel");
const productModel = require("../../products/models/productModel");

const findProductByCategory = async (req, res, next) => {
  try {
    const categoryName = req.params.id;

    const category = await categoryModel.findOne({ name: categoryName });

    if (!category) {
      throw new Error("카테고리를 찾을 수 없습니다.");
    }

    // 카테고리에 속한 상품을 조회
    const products = await productModel.find({ category: category._id });

    return res.json({ products });
  } catch (err) {
    err.status = 400;
    next(err);
  }
};

const findParentCategory = async (req, res, next) => {
  try {
    const parents = await categoryModel.find({
      parent: null,
    });
    res.status(200).json(parents);
  } catch (err) {
    err.status = 400;
    next(err);
  }
};
// const findChildCategory = async (req,res,next)=>{
//   try{
//     const categories = await categoryModel.find({})
//     const parent= []
//     categories.forEach(e=>{
//       if(e.child===null)
//     })
//   }catch(err){
//     err.status = 400
//     next(err)
//   }

// }

const adminCreateCategory = async (req, res, next) => {
  const { name, parent, child } = req.body;
  try {
    await categoryModel.create({
      name,
      parent,
      child,
    });
    console.log("성공");
    res.status(200).send("카테고리가 생성되었습니다.");
  } catch (err) {
    err.status = 400;
    next(err);
  }
};

// 관리자 카테고리 수정
const adminUpdateCategory = async (req, res, next) => {
  const { name, parent, child } = req.body;
  try {
    await categoryModel.updateOne(
      {
        name,
      },
      {
        parent,
        child,
      }
    );
    res.status(200).send("카테고리가 수정되었습니다.");
  } catch (err) {
    err.status = 400;
    next(err);
  }
};

// 관리자 카테고리 삭제
const adminDeleteCategory = async (req, res, next) => {
  const { name } = req.params;
  try {
    await categoryModel.deleteOne({
      name,
    });

    res.status(200).send("카테고리가 삭제되었습니다.");
  } catch (err) {
    err.status = 400;
    next(err);
  }
};

module.exports = {
  findProductByCategory,
  adminCreateCategory,
  adminUpdateCategory,
  adminDeleteCategory,
  findParentCategory,
};
