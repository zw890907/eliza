define(['jquery','cookie'], $ => {
    function Header () {
      this.container = $("#header");
      this.load().then(() => {
        this.search();
        this.isLogin();
        this.calcCartNum();
      });
    }
    // 对象合并
    $.extend(Header.prototype, {
        // ES6对象增强写法
        load () {
            // 将header.html加载到container里
            // this.container.load('/html/module/header.html #header-bottom'); 
            // 选择加载文件中的某一部分
            //承诺将异步转为同步
            return new Promise(resolve => {
                this.container.load('/html/module/header.html', () => {
                    // load异步执行结束
                    resolve();
                });
            })
        },
        search () {
            // 搜索框功能
            // container内部所有的.search-form
            // let form = this.container.find(".search-form");
            // this.searchul = $("#searchUl");
            // console.log(this.searchul);
            $("#search").on('keyup', function () {
                //this.searchul.style.display = block;
                //let _this = this;
                let keyWords = $(this).val();
                // 带上关键字请求jsonp接口
                $.getJSON('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?cb=?&wd='+keyWords, data => {
                    //console.log(data);    
                    let value = data.s;
                    //console.log(value);
                    var html = "";
                    value.forEach(item => {
                        // let li = document.createElement("li");
                        // li.innerHTML = item;
                        // console.log(li);
                        // $("#searchUl").append(li);
                        html += `<li>${item}</li>`;
                        //console.log(li);
                    });
                    $("#searchUl").html(html);
                    //console.log($("#searchUl"));
                    //console.log(html);
                })
                $("#searchUl").on('click', e =>{
                    e = e || event;
                    let target = e.target || e.srcElement;
                    // console.log(target)
                    $("#search").val(target.innerHTML);
                    $("#searchUl").html("");
                })
                $(window).on('click',()=>{
                    $("#searchUl").html("");
                })
                if (event.keyCode == 13){
                    event.returnValue=false;
                    event.cancel = true;
                    location.href = "/html/list.html";
                }
            })
        },
        isLogin () {
            this.loginBtn = $("#loginBtn");
            this.loginOut = $("#loginOut");
            this.nameSpan = $("#name");
            this.exit = $("#exit");
            //console.log(this.exit);
            let username = $.cookie("username");
            if(username){
                this.loginBtn.hide();
                this.loginOut.show();
                this.nameSpan.html(username);
            }
            this.exit.on("click",() => {
                if(confirm("确定要退出吗？")){
                    $.removeCookie("username",{path : "/"});
                    this.loginBtn.show();
                    this.loginOut.hide();
                }
            })
        },
        calcCartNum(){
            //console.log($("#cartNum"));
            //取到存储的数据
            let cart = localStorage.getItem('cart');
            let count = 0;//没有商品数据时默认为0
            if(cart){
                //表示有数据,就算总数量（或者总类）
                cart = JSON.parse(cart);
                //以总数量为例
                count = cart.reduce((n, shop) =>{
                    n += shop.num;
                    return n;
                },0);
            }
            //有没有数据都要渲染
            $("#cartNumber").html(count);
        }
    })
    return new Header();
});

//定义header模块的时候需要用到tools模块，可以直接传进来
// define(["tools"],(tools) => {
//     class Header {
//         constructor(){
//             //规定头部容器都是<header></header>标签
//             this.container = document.querySelector("header");
//             this.load();
//         }
//         //加载header.html
//         load () {
//             //暂时写成决对路径
//             tools.ajaxGetPromise("html/module/header.html",null,false).then(html => {
//                 this.container.innerHTML = html;
//             })
//         }
//     }
//     return new Header();
// });