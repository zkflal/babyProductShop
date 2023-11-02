const orderModel = require("../models/orderModel");

// 특정 유저의 모든 주문을 불러오기
const findAllOrder = async (req, res)=>{
    // 유저이름 받아오기
    const {email} = req.params;
    console.log(UserName);
    try{
        const orderDatas = await orderModel.find({
            Email: email
        })
        console.log(orderDatas);
        res.status(200).json(orderDatas);
    }catch(err){
        res.status(500).json(err);
    }
}

// 주문 정보 불러오기
const findOneOrder = async (req, res)=>{
    const {orderId} = req.params;
    try{
        const orderData = await orderModel.findOne({
            shortId : orderId
        })
        res.status(200).json(orderData);
    }catch(err){
        res.status(500).json(err);
    }
}

// 주문 추가
const createOrder = async (req, res)=>{
    // 유저 주문 정보 받아오기
    const {Name, Address, Phone, Email, ProductInfos} = req.body;

    let TotalPrice = 0;
    for(let product of ProductInfos.list){
        TotalPrice += product.Price;
    }
    const Status = "주문완료";
    const Cancel = false;

    try{
        await orderModel.create({
            // req로 받아오는 부분
            Name,
            Address,
            Phone,
            Email,
            ProductInfos,
            // 생성하는 부분
            TotalPrice,
            Status,
            Cancel
        });
        res.status(201).end();
    }catch(err){
        res.status(500).json(err);
    }
    
}

// 주문 정보 수정
const updateOrder = async (req, res)=>{
    const {orderId, Name, Address, Phone} = req.body;
    try{
        await orderModel.updateOne({
            shortId: orderId
        },{
            Name,
            Address,
            Phone
        })
        res.status(200).end();
    }catch(err){
        res.status(400).json(err);
    }
}

// 주문 취소
const cancelOrder = async (req, res)=>{
    const {orderId} = req.params;
    try{
        await orderModel.updateOne({
            shortId: orderId
        },{
            Cancel: true
        });
        res.status(200).end();
    }catch(err){
        res.status(400).json(err);
    }
}

// 관리자 주문 상태 수정
const adminUpdateOrder = async (req, res)=>{
    const {orderId, Status} = req.body;
    try{
        await orderModel.updateOne({
            shortId: orderId
        },{
            Status: Status
        })
        res.status(200).send();
    }catch(err){
        res.status(400).json(err);
    }
}

// 관리자 주문 삭제
const adminDeleteOrder = async (req, res)=>{
    const {orderId} = req.params;
    try{
        await orderModel.deleteOne({
            shortId: orderId
        });
        res.status(200).send();
    }catch(err){
        res.status(400).json(err);
    }
}

module.exports = {findAllOrder, findOneOrder, createOrder, updateOrder, cancelOrder, adminUpdateOrder, adminDeleteOrder};