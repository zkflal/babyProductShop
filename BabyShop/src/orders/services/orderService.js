const orderModel = require("../../orders/models/orderModel");

// 특정 유저의 모든 주문을 불러오기
const findAllOrder = async (req, res, next)=>{
    // 토큰에서 유저 정보 가져오기 (토큰 만들기 전 임시)
    const {UserId} = req.query;
    try{
        const orderDatas = await orderModel.find({
            UserId
        })
        res.status(200).json(orderDatas);
    }catch(err){
        next(err);
    }
}

// 주문 정보 불러오기
const findOneOrder = async (req, res, next)=>{
    const {id} = req.params;
    try{
        const orderData = await orderModel.findOne({
            shortId : id
        });
        if(!orderData){
            const err = new Error("아이디에 맞는 주문을 찾을 수 없습니다.");
            err.status = 400;
            throw err;
        }
        res.status(200).json(orderData);
    }catch(err){
        next(err);
    }
}

// 주문 추가
const createOrder = async (req, res, next)=>{
    const {Name, Address, Phone, Email, ProductInfos} = req.body;
    // 주문 품목 정보에서 가격들을 받아와 합한다.
    let TotalPrice = 0;
    for(let product of ProductInfos){
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
        res.status(201).send("성공적으로 주문이 완료되었습니다.")
    }catch(err){
        err.status = 400;
        next(err);
    }
    
}

// 주문 정보 수정
const updateOrder = async (req, res, next)=>{
    let {orderId, Name, Address, Phone} = req.body;
    try{
        const isOrder = await orderModel.findOne({
            shortId: orderId
        });
        if(!isOrder){
            const err = new Error("아이디에 맞는 주문을 찾을 수 없습니다.");
            err.status = 400;
            throw err;
        }

        await orderModel.updateOne({
            shortId: orderId
        },{
            Name,
            Address,
            Phone
        })
        res.status(200).send("성공적으로 정보를 수정했습니다.");
    }catch(err){
        next(err);
    }
}

// 주문 취소
const cancelOrder = async (req, res, next)=>{
    const {id} = req.params;
    try{
        const isOrder = await orderModel.findOne({
            shortId: id
        });
        if(!isOrder){
            const err = new Error("아이디에 맞는 주문을 찾을 수 없습니다.");
            err.status = 400;
            throw err;
        }

        await orderModel.updateOne({
            shortId: id
        },{
            Cancel: true
        });
        res.status(200).end();
    }catch(err){
        next(err);
    }
}

// 관리자 주문 상태 수정
const adminUpdateOrder = async (req, res, next)=>{
    const {orderId, Status} = req.body;
    try{
        const isOrder = await orderModel.findOne({
            shortId: orderId
        });
        if(!isOrder){
            const err = new Error("아이디에 맞는 주문을 찾을 수 없습니다.");
            err.status = 400;
            throw err;
        }

        await orderModel.updateOne({
            shortId: orderId
        },{
            Status
        })
        res.status(200).send("성공적으로 정보를 수정했습니다.");
    }catch(err){
        next(err);
    }
}

// 관리자 주문 삭제
const adminDeleteOrder = async (req, res, next)=>{
    const {id} = req.params;
    try{
        const isOrder = await orderModel.findOne({
            shortId: orderId
        });
        if(!isOrder){
            const err = new Error("아이디에 맞는 주문을 찾을 수 없습니다.");
            err.status = 400;
            throw err;
        }

        await orderModel.deleteOne({
            shortId: id
        });
        res.status(200).send("성공적으로 삭제했습니다.");
    }catch(err){
        next(err);
    }
}

module.exports = {findAllOrder, findOneOrder, createOrder, updateOrder, cancelOrder, adminUpdateOrder, adminDeleteOrder};