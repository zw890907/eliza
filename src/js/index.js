require(["config"],() => {
    require(["url","template","swiper","header","footer"],(url,template,Swiper) => {
        // console.log(header);
        console.log(Swiper);
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
                $("#header").on('click',"#login",() => {
                    console.log(123);
                })
            }
            //获取分类数据
            getType () {
                //ajax请求数据
                $.get( url.rapBaseUrl + 'index/list',data =>{
                    //console.log(data);
                    if(data.res_code === 1){
                        this.renderType(data.res_body.list);
                    }
                })
            }
            renderType (list) {
                //console.log(template);
                //console.log(list);
                let html = template("list-shop",{list});
                //console.log(html);
                $("#list-contain").html(html);
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
        }
        new Index();
    })
}) 
