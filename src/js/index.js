require(["config"],() => {
    require(["url","template","swiper","header","footer"],(url,template,Swiper,header) => {
        // console.log(header);
        //console.log(Swiper);
        class Index {
            constructor () {
                this.bindEvents();
                this.getType();
                this.banner();
                this.toggleButton();
                
            }
            //轮播图方法
            banner(){
                var mySwiper = new Swiper ('.swiper-container', {
                    autoplay: {
                        delay: 3000,
                        //disableOnInteraction: true
                        },//自动切换
                    direction: 'horizontal', // 水平切换选项
                    loop: true, // 循环模式选项
                    //speed: 2000,
                    // 如果需要分页器
                    pagination: {
                      el: '.swiper-pagination',
                      dynamicBullets: true,//分页器部分隐藏
                      //hideOnClick :true,//点击分页器隐藏/显示
                      clickable :true,//点击分页器的指示点分页器会控制Swiper切换
                    },
                    
                    // 如果需要前进后退按钮
                    navigation: {
                      nextEl: '.swiper-button-next',
                      prevEl: '.swiper-button-prev',
                    //   hideOnClick: true,
                    }
                })
                // mySwiper.el.onmouseover = function(){s
                //     mySwiper.autoplay.stop();
                // }
            }
            bindEvents () {
                if ($('#back-top').length) {
                    var scrollTrigger = 300;  //预设高度 
        
                    // $(window).scrollTop()与 $(document).scrollTop()产生结果一样
                    // 一般使用document注册事件，window使用情况如 scroll, scrollTop, resize
                    // 根据预设高度，显示 "回到顶部"
                    $(window).on('scroll', function () {
                        if ($(document).scrollTop() > scrollTrigger) {
                            $('#back-top').addClass('show');
                        } else {
                            $('#back-top').removeClass('show');
                        }
                    });
                }
                $('#back-top').on('click', function (e) {
                    // html,body 都写是为了兼容浏览器
                    $('html,body').animate({
                        scrollTop: 0
                    }, 700);
    
                    return false;
                });
            }
            //获取分类数据
            getType () {
                //ajax请求数据
                $.get( url.rapBaseUrl + 'index/list',res =>{
                    //console.log(data);
                    if(res.res_code === 1){
                        this.renderType(res.res_body.list);
                        let data = res.res_body.list;
                        //将data存为全局的变量
                        this.data = data;
                        //console.log(this.data);
                    }
                    this.addCart();
                    this.collect();
                })
            }
            renderType (list) {
                //console.log(template);
                //console.log(list);
                let html = template("list-shop",{list});
                //console.log(html);
                $("#list-contain").html(html);
            }
            addCart(){
                //console.log($("#addShop-cart"));
                $("#list-contain").on('click','#addShop-cart',(e)=>{
                    let target = e.target;
                    let id = Number($(target).parent().parent().parent().parent().attr("data-id"));
                    // console.log(id);
                    // console.log(this.data);
                    let data = this.data.filter( (list,a) => {
                        //console.log(list.id);
                        return list.id === id;
                    })
                    
                    data = data[0];
                    //console.log(data);
                    let cart = localStorage.getItem("cart");
                    //console.log(cart);
                    //判断localstorage中是否有数据
                    if(cart){
                        //已经存过购物车了。先将cart转为字符串
                        //再判断是否有存过当前商品
                        cart = JSON.parse(cart);
                        let index = -1;
                        //some方法只要找到满足条件的就停止了
                        if(cart.some((item,i) => {
                            //这里index的值就是满足条件的这条商品
                            index = i;
                            return item.id === id;
                        })){
                            //代表有这条商品
                            cart[index].num++;
                        }else{
                            //代表没有这条商品
                            //console.log(this.number);
                            cart.push({...data,num:1});
                        }
                        console.log(cart); 
                    }else{
                        //代表购物车为空,且默认第一次只买一个
                        //console.log(this.number);
                        cart = [{...data,num : 1}];
                    }
                    localStorage.setItem('cart',JSON.stringify(cart));
                    header.calcCartNum();
                })
            }

            //商品列表切换事件
            toggleButton(){
                //let tButton = $("#switch");
                let tbtns = document.querySelector("#switch").children;
                let lastIndex = 1,
                    index = 0;
                //console.log(tButton);
                //console.log(this.tbtns);
                Array.from(tbtns).forEach((btn,i) => {
                    btn.onclick = () => {
                        index = i;
                        tbtns[lastIndex].classList.remove("contain-allShop-ac");
                        tbtns[index].classList.add("contain-allShop-ac");
                        lastIndex = index;
                        this.getType();
                    }
                })
            }

            //收藏点击事件
            collect(){
                //console.log($("#addShop-xin"));
                $("#list-contain").on('click','#addShop-xin',(e)=>{
                    let target = e.target;
                    let favorite = $(target).parent().parent().parent().next();
                    console.log(favorite);
                    favorite.show();
                    setInterval(() => {
                        favorite.hide();
                    }, 3000);
                })
            }
            //轮播图切换事件
            // banner(){
            //     this.contain = document.querySelector(".slideshow"),
            //     this.ul = this.contain.querySelector("ul"),
            //     this.imgs = this.ul.children,
            //     this.btns = Array.from(this.contain.querySelector("ol").children),
            //     this.prev = this.contain.querySelector(".goPrev"),
            //     this.next = this.contain.querySelector(".goNext"),
            //     this.index = 0,
            //     this.lastIndex = 0,
            //     this.timer = null;
            //     this.autoPlay();
            //     //console.log(this.next);
            //     //给点击按钮绑事件
            //     this.btns.forEach((btn,i) => {
            //         btn.onclick = () => {
            //             this.index = i;
            //             this.changeImg();
            //         }
            //     })
            //     //前后按钮切换事件
            //     this.prev.onclick = () => {
            //         this.index--;
            //         if(this.index < 0){
            //             this.index = this.btns.length - 1;
            //         }
            //         this.changeImg();
            //     }
            //     this.next.onclick = () => {
            //         this.index++;
            //         if(this.index === this.btns.length){
            //             this.index = 0;
            //         }
            //         this.changeImg();
            //     }
                
            //     //鼠标移入和移出事件
            //     this.contain.onmouseenter = () => {
            //         clearInterval(this.timer);
            //     }
            //     this.contain.onmouseleave = this.autoPlay.bind(this);
            // }
            // //自动切换方法
            // autoPlay(){
            //     this.timer = setInterval(() => {
            //         this.next.onclick();
            //     },2000)
            // }
            // changeImg(){
            //     this.btns[this.lastIndex].classList.remove("ac");
            //     this.imgs[this.lastIndex].classList.remove("ac");
            //     this.btns[this.index].classList.add("ac");
            //     this.imgs[this.index].classList.add("ac");
            //     this.lastIndex = this.index;
            // }
            
        }
        new Index();
    })
}) 
