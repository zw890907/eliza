require(["config"],() => {
    require(["url","cookie","header"],(url) => {
        class Login {
            constructor () {
                this.usernameInput = $("#inputUsername");
                this.passwordInput = $("#inputPassword");
                this.check = $("#check");
                this.btn = $("#btn");
                this.init();
                this.bindEvents();
            }
            init(){
                $("#inputUsername").val("");
                $("#inputPassword").val("");
                //取出cookie中的数据,转为json格式，用一个变量接收
                //console.log(123);
                let userInfo = $.cookie('name');
                let pwdInfo = $.cookie('pwd');
                //console.log(userInfo);
                $("#inputUsername").val(userInfo);
                $("#inputPassword").val(pwdInfo);
                $.removeCookie('name',{ path: '/'});
                $.removeCookie('pwd',{ path: '/'});
            }
            bindEvents(){
                this.btn.on("click",() => {
                    let username = this.usernameInput.val(),
                        password = this.passwordInput.val();
                    $.ajax({
                        url: url.phpBaseUrl + "user/login.php",
                        type: "post",
                        data: {username,password},
                        success: data => {
                            if(data.res_code === 1){
                                this.loginSucc(username);
                            }else{
                                alert(data.res_message);
                            }
                        },
                        dataType: 'json'
                    })
                })
            }
            loginSucc(name) {
                //存进cookie
                let expires = this.check.prop('checked') ? {expires:7} : {};
                expires = Object.assign({path:"/"}, expires);
                $.cookie('username', name, expires);
                alert("登录成功，跳转至首页");
                location.href = "/";
            }
        }
        new Login();
    })
})
