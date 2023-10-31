const orderModel = require("../models/orderModel");

// 특정 유저의 모든 주문을 불러오기
const findAllOrder = async (req, res)=>{
    // 유저이름 받아오기
    const {userName} = req.params;

    try{
        const allOrder = await orderModel.find({
            UserName: userName,
        })
        res.status(200).json(allOrder);
    }catch(err){
        res.status(500).json(err);
    }
}

// 주문 추가
const createOrder = async (req, res)=>{
    // 유저 주문 정보 받아오기
    const {userName, address, phone, email, products} = req.body;

    try{
        // 상품 모델에서 products에 맞는 상품의 가격을 찾아와 입력
        let totalPrice = 0;
        for(let productId in products){
            const product = await orderModel.find({productId});
            totalPrice += product.Price;
        }

        await orderModel.create({
            // req로 받아오는 부분
            UserName: userName,
            Address: address,
            Phone: phone,
            Email: email,
            Products: products,
            // 생성하는 부분
            TotalPrice: totalPrice,
            OrderStatus: 0,
            // OrderId 자동생성 아마도...
        })
    }catch(err){
        res.status(500).json(err);
    }
    
}

// 주문 정보 수정
const updateOrderInfo = async (req, res)=>{
    // 주문 아이디 받아오기
    const {orderId} = req.params;
    // 수정할 정보 받아오기 (변경 없는 값도 그냥 그대로 받아오기)
    const {userName, address, phone, email} = req.body;

    try{
        await orderModel.updateOne({
            shortId: orderId
        },{
            UserName: userName,
            Address: address,
            Phone: phone,
            Email: email,
        })
        res.status(200).send();
    }catch(err){
        res.status(500).json(err);
    }
}

// 주문 상태 수정
const updateOrderStatus = async (req, res)=>{
    // 주문 아이디 받아오기
    const {orderId} = req.params;
    // 수정할 정보 받아오기
    const {status} = req.query;

    try{
        await orderModel.updateOne({
            shortId: orderId
        },{
            OrderStatus: status
        })
        res.status(200).send();
    }catch(err){
        res.status(500).json(err);
    }
}


module.exports = {findAllOrder, createOrder, updateOrderInfo, updateOrderStatus};