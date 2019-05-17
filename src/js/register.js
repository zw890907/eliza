require(["config"],() => {
    require(["url","header"],(url) => {
        class Register {
            constructor () {
                this.usernameInput = $("#inputUsername");
                this.passwordInput = $("#inputPassword");
                this.passwordAgain = $("#passwordAgain");
                this.check = $("#check");
                //console.log(this.passwordAgain);
                this.btn = $("#btn");
                //console.log(this.btn);
                this.bindEvents();
            }
            bindEvents(){
                this.btn.on("click",() => {
                    let username = this.usernameInput.val(),
                        password = this.passwordInput.val(),
                        passwordAgain = this.passwordAgain.val();
                    //判断用户名和密码
                    //console.log(password,passwordAgain);
                    let pattern =/^[a-zA-Z\u4e00-\u9fa5]{1,19}$/g,
                        pwdPattern =/^[a-zA-Z]\w{6,15}$/g;
                        // else if(!pattern.test(username)){
                        //     alert("用户名不能以数字开头，且长度不小于1位！！！");
                        // }else if(!pwdPattern.test(password)){
                        //     alert("密码不能以数字开头，且长度不小于6位！！！");
                        // }
                    if(username === "" || password === ""){
                        confirm("用户名或密码不能为空！！！");
                    }else if(password !== passwordAgain){
                        confirm("两次输入的密码不一致，请重新输入！");
                    }else if(!this.check.prop('checked')){
                        confirm("请阅读相关条款！");
                    }else{
                        //console.log(1234);
                        //请求数据
                        $.ajax({
                            url: url.phpBaseUrl + "user/register.php",
                            type: "post",
                            data: {username,password},
                            success: data => {
                                //console.log(data);
                                if(data.res_code === 1){
                                    alert(data.res_message + ",跳转至登录页");
                                    $.cookie('name',username,{path:"/"});
                                    $.cookie('pwd', password,{path:"/"});
                                    location.href = 'login.html';
                                }
                            },
                            dataType: 'json'
                        })
                    }
                })
            }
        }
        new Register();
    })
})