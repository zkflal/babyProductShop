const categoryModel = require("../categoryModel");
const productModel = require("../../productModel/productModel");

const findProductByCategory = async (req, res) => {
  const { category } = req.params;
  const findCategory = await categoryModel.findOne({
    Category: category,
  });
  const productList = findCategory.ProductList;
  const product = await productModel.find({
    ProductId: productList,
  });
  console.log(product);
  res.json(product);
};
const adminCreateCategory = async (req, res) => {
  const { Category, ProductList, ChildCategory } = req.body;
  try {
    await categoryModel.create({
      Category,
      ProductList,
      ChildCategory,
    });
    console.log("성공");
    res.status(200).end();
  } catch (err) {
    res.status(500).send(err);
  }
};

// 관리자 카테고리 수정
const adminUpdateCategory = async (req, res) => {
  const { CategoryId, ProductIdList, ParentCategory, ChildCategory } = req.body;
  try {
    await categoryModel.updateOne(
      {
        CategoryId,
      },
      {
        ProductIdList,
        ParentCategory,
        ChildCategory,
      }
    );
    res.status(200).end();
  } catch (err) {
    res.status(400).end();
  }
};

// 관리자 카테고리 삭제
const adminDeleteCategory = async (req, res) => {
  const { categoryId } = req.body;
  try {
    await categoryModel.updateOne(
      {
        CategoryId: categoryId,
      },
      {
        ProductIdList,
        ParentCategory,
        ChildCategory,
      }
    );

    res.status(200).end();
  } catch (err) {
    res.status(400).end();

    err.status = 400;
    next(err);
  }
};

module.exports = {
  findProductByCategory,
  adminCreateCategory,
  adminUpdateCategory,
  adminDeleteCategory,
};
