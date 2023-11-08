const nodemailer = require('nodemailer');
const senderInfo = require('../senderInfo.json');

const mailSender ={
    sendEmail : function(params){
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            prot:587,
            host:'smtp.gmail.com',
            secure:false,
            requireTLS:true,
            auth:{
                user:senderInfo.user,
                pass:senderInfo.pass
            }
        });
        const mailOption = {
            from: senderInfo.user,
            to:params.toEmail,
            subject:params.subject,
            text:params.text
        };
        transporter.sendMail(mailOption, function (err,info){
            if(err){
                console.log(err);
            }else{
                console.log("이메일이 보내졌습니다."+info.response);
            }
        });


    }
}

module.exports = mailSender;