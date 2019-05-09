require(["config"],() => {
    require(["url","header"],(url) => {
        class Register {
            constructor () {
                this.usernameInput = $("#inputUsername");
                this.passwordInput = $("#inputPassword");
                this.btn = $("#btn");
                //console.log(this.btn);
                this.bindEvents();
            }
            bindEvents(){
                this.btn.on("click",() => {
                    let username = this.usernameInput.val(),
                        password = this.passwordInput.val();
                    $.ajax({
                        url: url.phpBaseUrl + "user/register.php",
                        type: "post",
                        data: {username,password},
                        success: data => {
                            console.log(data);
                            if(data.res_code === 1){
                                alert(data.res_message + ",跳转至登录页");
                                location.href = 'login.html';
                            }
                        },
                        dataType: 'json'
                    })
                })
            }
        }
        new Register();
    })
})