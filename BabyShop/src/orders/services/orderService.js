const orderModel = require("../../orders/models/orderModel");

// 특정 유저의 모든 주문을 불러오기
const findAllByUserId = async (req, res, next)=>{
    // 토큰에서 유저 정보 가져오기 (토큰 만들기 전 임시)
    const {UserId} = req.decoded;
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
const findOneByOrderId = async (req, res, next)=>{
    const {id} = req.params;
    try{
        const orderData = await orderModel.findOne({
            shortId : id
        });
        if(!orderData){
            throw {status:404, message:"아이디에 맞는 주문을 찾을 수 없습니다."};
        }
        res.status(200).json(orderData);
    }catch(err){
        next(err);
    }
}

// 주문 추가
const create = async (req, res, next)=>{
    const {Name, Address, Phone, Email, ProductInfos} = req.body;
    let {UserId} = req.decoded;
    if(!UserId){
        UserId = null;
    }
    // 주문 품목 정보에서 가격들을 받아와 합한다.
    let TotalPrice = 0;
    for(let {Price, Amount} of ProductInfos){
        TotalPrice += (Price * Amount);
    }
    const Status = "주문완료";
    const Cancel = false;

    try{
        await orderModel.create({
            UserId,
            // req로 받아오는 부분
            Name,
            Address,
            Phone,
            Email,      // 고정값(비회원)
            ProductInfos,
            // 생성하는 부분
            TotalPrice,
            Status,
            Cancel
        });
        res.status(200).send("성공적으로 주문이 완료되었습니다.")
    }catch(err){
        err.status = 400;
        next(err);
    }
    
}

// 주문 정보 수정
const update = async (req, res, next)=>{
    let {orderId, Name, Address, Phone} = req.body;
    try{
        const isOrder = await orderModel.findOne({
            shortId: orderId
        });
        if(!isOrder){
            throw {status:404, message:"아이디에 맞는 주문을 찾을 수 없습니다."};
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
const cancel = async (req, res, next)=>{
    const {id} = req.params;
    try{
        const isOrder = await orderModel.findOne({
            shortId: id
        });
        if(!isOrder){
            throw {status:404, message:"아이디에 맞는 주문을 찾을 수 없습니다."};
        }

        await orderModel.updateOne({
            shortId: id
        },{
            Cancel: true
        });
        res.status(200).send("성공적으로 주문을 취소했습니다.");
    }catch(err){
        next(err);
    }
}

// 관리자 주문 상태 수정
const adminUpdate = async (req, res, next)=>{
    const {orderId, Status} = req.body;
    try{
        const isOrder = await orderModel.findOne({
            shortId: orderId
        });
        if(!isOrder){
            throw {status:404, message:"아이디에 맞는 주문을 찾을 수 없습니다."};
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
const adminDelete = async (req, res, next)=>{
    const {id} = req.params;
    try{
        const isOrder = await orderModel.findOne({
            shortId: id
        });
        if(!isOrder){
            throw {status:404, message:"아이디에 맞는 주문을 찾을 수 없습니다."};
        }

        await orderModel.deleteOne({
            shortId: id
        });
        res.status(200).send("성공적으로 삭제했습니다.");
    }catch(err){
        next(err);
    }
}

module.exports = {
    findAllByUserId, 
    findOneByOrderId, 
    create, 
    update, 
    cancel, 
    adminUpdate, 
    adminDelete
};