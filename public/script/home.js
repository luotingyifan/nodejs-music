$(function () {

    // 登录窗体关闭事件
    $("span#login_closed").click(function () {
        $("#e").val("");
        $("#epw").val("");
        $("div#auto").css("display", "none");
        $("div#auto-1545637497443").css("display", "none");
    });

    $("li.fst span a").click(function () {
        // $("li.fst span a").removeClass("z-slt");
        $(this).addClass("z-slt");
    });

    // 注册窗体关闭事件
    $("span#signup_closed").click(function () {
        $("div#signup_auto").css("display", "none");
        $("div#signup_mask").css("display", "none");
        $('#email').val("");
        $('#password').val("");
        $('#confirmPW').val("");
        $('#vcode').val("");
        $('#emailCode').val("");
    });

    // 点击图片验证码刷新验证码
    $("div#vcode_svg").click(function () {
        getvcode();
    });

    // 立即注册按钮
    $("a#mainRegA").click(function () {
        var email = $('#email').val();  //获取输入框的邮箱
        var password = $('#password').val();  //获取输入框的密码
        var confirmPW = $('#confirmPW').val();  //获取输入框的确认密码
        var vcode = $("#vcode").val();  // 获取验证码
        var emailCode = $('#emailCode').val();  //获取输入框的邮箱验证码
        var isChecked = $('#checkB').is(":checked");    //获取是否选中

        // 邮箱正则表达式
        var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
        if (email === null || email === '') {
            alert("请填写邮箱地址");
            return false;
        } else if (!reg.test(email)) {
            alert("请填写有效的邮箱地址");
            return false;
        }

        if (password === null || password === '') {
            alert("请填写密码");
            return false;
        }

        if (confirmPW === null || confirmPW === '') {
            alert("请再次填写密码");
            return false;
        } else {
            if (password != confirmPW) {
                alert("两次密码不一致");
                return false;
            }
        }

        if (vcode === null || vcode === '') {
            alert("请填写验证码");
            return false;
        }

        if (emailCode === null || emailCode === '') {
            alert("请填写邮箱验证码");
            return false;
        }

        if (!isChecked) {
            alert("请阅读并勾选相关条款");
            return false;
        }

        $.ajax({
            url: '/home/regest',
            type: 'post',
            dataType: 'json',
            data: {
                email: email,
                password: password,
                emailCode: emailCode
            },
            success: function (data) {
                console.log("data: ", data);
                if (data.success) {
                    alert("注册成功");
                    $("div#signup_auto").css("display", "none");
                    $("div#signup_mask").css("display", "none");
                    $('#email').val("");
                    $('#password').val("");
                    $('#confirmPW').val("");
                    $('#vcode').val("");
                    $('#emailCode').val("");
                } else {
                    alert(data.message);
                }
            },
            error: function (err) {
                console.log("err: ", err);
            }
        });
    });

    // 登录按钮
    $("a#login").click(function () {
        var email = $("#e").val();
        var password = $("#epw").val();

        if (email === null || email === '') {
            alert("请输入账号");
            return false;
        }

        if (password === null || password === '') {
            alert("请输入密码");
            return false;
        }

        $.ajax({
            url: '/home/login',
            type: 'post',
            dataType: 'json',
            data: {
                eAccount: email,
                ePassword: password
            },
            success: function (data) {
                console.log(data);
                alert(data.message);
                if (data.success) {
                    $("#e").val("");
                    $("#epw").val("");
                    $("div#auto").css("display", "none");
                    $("div#auto-1545637497443").css("display", "none");

                    // 显示登录成功的头像
                    $(".no_login").css("display", "none");
                    $(".icon_span").css("display", "block");
                    $(".login").css("display", "block");
                }
            },
            error: function (err) {
                console.error("err: ", err);
            }
        });
    });
});

function login_btn() {
    $("div#auto").css("display", "block");
    $("div#auto-1545637497443").css("display", "block");
}

function signup_btn() {
    $("div#signup_auto").css("display", "block");
    $("div#signup_mask").css("display", "block");
    getvcode();
}

/*
 * 获取图片验证码
 */
function getvcode() {
    $.ajax({
        type: "get",
        url: "/home/vcode",
        data: {
            size: 4,  //验证码长度
            width: 128,
            height: 80,
            background: "#f4f3f2",  //图片背景颜色
            noise: 4,   //干扰线条数
            fontSize: 32,
            ignoreChars: '0o1i',   //验证码字符中排除'0o1i'
            color: true // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
        },
        dataType: 'json'
    }).done(function (data) {
        $("div#vcode_svg").html(data.img);
    });
}

/**
 * 发送验证码到邮件
 */
function sendEmail() {
    var time = 60;  //定义60秒的倒计时
    var email = $('#email').val();  //获取输入框的邮箱
    var vcode = $("#vcode").val();  // 获取验证码

    // 邮箱正则表达式
    var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
    if (email === null || email === '') {
        alert("请填写邮箱地址");
        return false;
    } else if (!reg.test(email)) {
        alert("请填写有效的邮箱地址");
        return false;
    }

    if (vcode === null || vcode === '') {
        alert("请填写验证码");
        return false;
    }

    //这里我用的是ajax将用户名和邮箱发到后台
    $.post('/home/api/sendEmail',
        {
            email: email,
            vcode: vcode
        },
        function (data) {
            console.log(data);
            if (!data.success) {
                alert(data.message);
                getvcode();
            } else {
                alert("发送成功");
            }
        }
    );
}
