const mainCategoryModel = require("../models/mainCategoryModel");
const subCategoryModel = require("../models/subCategoryModel");
const productModel = require("../../products/models/productModel");
const paging = require("../../../utils/paging");

//카테고리별 상품 찾기
const findProductByCategory = async (req, res, next) =>{ 
  const {en_name, page} = req.query;
  try {
    const sub = await subCategoryModel.findOne({ en_name });


    // main category
    if (!sub) {
      const main = await mainCategoryModel.findOne({ en_name });
      const totalProducts = await productModel.find({
        main_category: main,
      });
      const {
        startPage,
        endPage,
        hideProducts, 
        maxProducts, 
        totalPage, 
        currentPage
      } = paging(page, totalProducts.length);
      const products = await productModel.find({
        main_category: main,
      })
      .sort({createAt:-1})
      .skip(hideProducts)
      .limit(maxProducts);
      res.status(200).json({
        products,
        currentPage,
        startPage,
        endPage,
        maxProducts,
        totalPage,
      });


    // sub category
    } else {
      const totalProducts = await productModel.find({
        sub_category: sub,
      });
      const {
        startPage,
        endPage,
        hideProducts, 
        maxProducts, 
        totalPage, 
        currentPage
      } = paging(page, totalProducts.length);
      const products = await productModel.find({
        sub_category: sub,
      })
      .sort({createAt:-1})
      .skip(hideProducts)
      .limit(maxProducts);
      res.status(200).json({
        products,
        currentPage,
        startPage,
        endPage,
        maxProducts,
        totalPage,
      });
    }    
  } catch (err) {
    next(err);
  }
};

//메인 전체 카테고리 불러오기
const findMainCategory = async (req, res, next) => {
  try {
    const category = await mainCategoryModel.find({});

    res.json(category);
  } catch (err) {
    next(err);
  }
};

//서브 전체 카테고리 불러오기
const findSubCategory = async (req, res, next) => {
  try {
    const category = await subCategoryModel.find({});
    res.json(category);
  } catch (err) {
    next(err);
  }
};

//메인 카테고리 생성
const adminCreateMainCategory = async (req, res, next) => {
  const { name, en_name } = req.body;
  try {
    await mainCategoryModel.create({
      name,
      en_name,
    });
    res.status(200).send("카테고리가 생성되었습니다.");
  } catch (err) {
    err.status = 400;
    next(err);
  }
};

//서브 카테고리 생성
const adminCreateSubCategory = async (req, res, next) => {
  const { name, en_name, main } = req.body;
  try {
    const mainCategory = await mainCategoryModel.findOne({ en_name: main });
    await subCategoryModel.create({ name, en_name, parent: mainCategory });
    const sub = await subCategoryModel.findOne({ name });
    await mainCategoryModel.updateOne(
      //서브카테고리 만든 후 메인카테고리 child에 sub추가
      { en_name: main },
      {
        $push: { child: sub },
      }
    );
    res.status(200).send("카테고리가 생성되었습니다.");
  } catch (err) {
    err.status = 400;
    next(err);
  }
};

// 관리자 메인카테고리 수정
const adminUpdateMainCategory = async (req, res, next) => {
  const { en_name, changed_name, changed_en_name } = req.body;

  try {
    await mainCategoryModel.updateOne(
      {
        en_name,
      },
      {
        name: changed_name,
        en_name: changed_en_name,
      }
    );

    res.status(200).send("카테고리가 수정되었습니다.");
  } catch (err) {
    err.status = 400;
    next(err);
  }
};

//관리자 서브카테고리 수정
const adminUpdateSubCategory = async (req, res, next) => {
  const { en_name, changed_name, changed_en_name, parent } = req.body;
  try {
    const subCategory = await subCategoryModel.findOne({ en_name });
    const mainCategory = await mainCategoryModel.findOne({ en_name: parent });
    await mainCategoryModel.updateOne(
      { _id: subCategory.parent },
      {
        $pull: { child: subCategory._id },
      }
    );
    await mainCategoryModel.updateOne(
      { en_name: parent },
      {
        $push: { child: subCategory._id },
      }
    );
    await subCategoryModel.updateOne(
      { en_name },
      {
        name: changed_name,
        en_name: changed_en_name,
        parent: mainCategory._id,
      }
    );
    res.status(200).send("업데이트되었습니다.");
  } catch (err) {
    next(err);
  }
};

// 관리자 카테고리 삭제
const adminDeleteCategory = async (req, res, next) => {
  const { en_name } = req.params;
  try {
    const sub = await subCategoryModel.findOne({ en_name });
    if (!sub) {
      const main = await mainCategoryModel.findOne({ en_name });
      await subCategoryModel.deleteMany({
        parent: main,
      });
      await mainCategoryModel.deleteOne({ en_name });
    } else {
      await mainCategoryModel.updateOne(
        { child: sub._id },
        {
          $pull: { child: sub._id },
        }
      );
      await subCategoryModel.deleteOne({ en_name });
    }
    res.status(200).send("카테고리가 삭제되었습니다.");
  } catch (err) {
    err.status = 400;
    next(err);
  }
};

module.exports = {
  findProductByCategory,
  adminCreateMainCategory,
  adminCreateSubCategory,
  adminDeleteCategory,
  adminUpdateMainCategory,
  adminUpdateSubCategory,
  findMainCategory,
  findSubCategory,
};
