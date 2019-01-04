var express = require('express');
var router = express.Router();
const title = "网易云音乐";
var svgCaptcha = require('svg-captcha');

//导入加密模块
const crypto = require("crypto");

// 导入redis模块
// const redis = require('redis');
// const redisConfig = {
//     host: 'localhost',
//     port: 6379,
//     database: 0,
//     timeout: 5000,
// };
// const client = redis.createClient(redisConfig);

var userService = require("../service/db/userService");
var user = require("../domain/user");
var codeService = require("../service/db/codeService");

// 发送邮件
var emailService = require("../service/emailService");

// 邮件验证码db service
var emailCodeService = require("../service/db/emailCodeService");



/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('home', {title: title});
});

router.get('/my', function (req, res, next) {
    res.render('home', {title: title});
});

/**
 * 提交登录
 */
router.post("/login", (req, res) => {
    let eAccount = req.body.eAccount;
    let ePassword = req.body.ePassword;

    let md5 = crypto.createHash("md5");
    let newPas = md5.update(ePassword).digest("hex");

    let success = false;
    let message = "登录错误";
    userService.findByEmailAndPassword(eAccount, newPas, function (data) {
        console.log("data: ", data);
        if (data === null || data.length < 1) {
            success = false;
            message = "用户名或密码错误";
        } else {
            success = true;
            message = "登录成功";
        }

        res.send({
            success: success,
            message: message
        });
    });
});

/**
 * 注册用户
 */
router.post("/regest", (req, res) => {
    console.log(req.body);
    let email = req.body.email;
    let name = email.toString().split("@")[0];
    let password = req.body.password;
    let emailCode = req.body.emailCode;
    let success = true;
    let message = "";
    let md5 = crypto.createHash("md5");
    let newPas = md5.update(password).digest("hex");

    emailCodeService.find(email, emailCode, function (data) {
        if (data === null || data.length < 1) {
            success = false;
            message = "邮箱验证码错误或已过期";
        } else {
            user.userName = name;
            user.userEmail = email;
            user.userPassword = newPas;
            userService.insert(user);
        }
        res.send({
            success: success,
            message: message
        });
    });
});

/**
 * 生成图片验证码
 */
router.get('/vcode', function (req, res) {
    console.log("/home/vcode: ");
    // console.log(req.query);
    var option = req.query;
    // 验证码，有两个属性，text是字符，data是svg代码
    var code = svgCaptcha.create(option);
    // 保存到redis,忽略大小写
    // client.set("VCODE_" + code.text.toLowerCase(), code.text.toLowerCase());
    // client.expire("VCODE_" + code.text.toLowerCase(), 120);  // 设置redis缓存过期时间（单位为秒）
    // 保存到db,忽略大小写
    var count = codeService.insert(code.text.toLowerCase());
    // 返回数据直接放入页面元素展示即可
    res.send({
        img: code.data
    });
});

/**
 * 发送邮件到指定邮箱
 */
router.post('/api/sendEmail', function (req, res) {
    console.log("/api/sendEmail");
    console.log(req.body);
    var email = req.body.email;
    var vcode = req.body.vcode;
    vcode = vcode.toLowerCase();
    var success = true;
    var message = "";

    try {
        codeService.find(vcode, function (data) {
            console.log("data: ", data);
            if (data === null || data.length < 1) {
                success = false;
                message = "验证码错误或已过期";
            } else {
                console.log("data[0]============", data[0]);
                console.log("data[0]['v_code']============", data[0]['v_code']);
                console.log("data[0].v_code============", data[0].v_code);

                var mailCode = Math.random().toString().slice(-6);
                emailService.sendEmail(email, mailCode);
                emailCodeService.insert(email, mailCode);
            }
            res.send({
                success: success,
                message: message
            });
        });
    } catch (e) {
        console.log("exception: ", e);
    }

    // client.get("VCODE_" + vcode.toLowerCase(), function(err, value) {
    //     console.log(value);
    //     console.error(err);
    //     if (value != vcode.toLowerCase()) {
    //         success = false;
    //         message = "验证码错误或已过期";
    //     }
    // });
});


module.exports = router;