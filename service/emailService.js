var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'qq',
    auth: {
        user: '1544943710@qq.com',
        pass: 'vaueiowugfmlfeej'
    }
});

var sendEmail = function (recipientMail, code) {
    var mailArr = recipientMail.toString().split("@");
    var mailOptions = {
        from: '1544943710@qq.com', // 发送者
        to: recipientMail, // 接受者,可以同时发送多个,以逗号隔开
        subject: mailArr[0] + '，请确认你的邮件地址以便使用 Music 的所有功能', // 标题
        //text: 'Hello world', // 文本
        html: `<h2>确认你的电子邮件地址</h2>
               <h3>让我们确保这是你的正确电子邮件地址。请输入这个验证码以继续使用Music</h3>
               <h1>${code}</h1>
               <h4>验证码两小时后过期。</h4>
               <h4>谢谢</h4>`,
        // 添加附件
        // attachments:[
        //     {
        //         filename : 'package.json',
        //         path: './package.json'
        //     },
        //     {
        //         filename : 'content',
        //         content : '发送内容'
        //     }
        // ]
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log("err: ", err);
            return;
        }

        console.log('发送成功');
    });
};

module.exports = {
    sendEmail
};