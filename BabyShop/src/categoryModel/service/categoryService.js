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
    res.status(200).send("카테고리가 생성되었습니다.");
  } catch (err) {
    res.status(500).send(err);
  }
};

// 관리자 카테고리 수정
const adminUpdateCategory = async (req, res) => {
  const { Category, ProductList, ChildCategory } = req.body;
  try {
    await categoryModel.updateOne(
      {
        Category,
      },
      {
        ProductList,
        ChildCategory,
      }
    );
    res.status(200).send("카테고리가 수정되었습니다.");
  } catch (err) {
    res.status(400).end();
  }
};

// 관리자 카테고리 삭제
const adminDeleteCategory = async (req, res) => {
  const { category } = req.body;
  try {
    await categoryModel.deleteOne({
      Category: category,
    });

    res.status(200).send("카테고리가 삭제되었습니다.");
  } catch (err) {
    res.status(400).end();
  }
};

module.exports = {
  findProductByCategory,
  adminCreateCategory,
  adminUpdateCategory,
  adminDeleteCategory,
};
