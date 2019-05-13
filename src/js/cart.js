require(["config"],() => {
    require(["url","template","header","footer"],(url,template) => {
        //console.log(header);
        //console.log(footer);
        class Cart{
            constructor(){
                // this.shopList = $(".shop-list");
                // this.delete = $(".delete");
                // this.aCheck = $(".allCheck");
                // this.check = $(".check");
                // this.rNum = $(".reduceNum");
                // this.aNum = $(".addNum");
                // this.inputNum = $(".inputNum");
                // this.subtotal = $(".subtotal");
                // this.cleanCart = $(".cleanCart");
                // this.count = $(".count");
                // this.money = $(".money");
                // this.settlement = $(".settlement");
                //console.log(this.shopList);
                //this.getType();
                this.init();
                this.bindEvents();
            }
            //获取分类数据
            // getType () {
            //     //ajax请求数据
            //     $.get( url.rapBaseUrl + 'cart/get',data =>{
            //         if(data.res_code === 1){
            //             //console.log(data.res_body.data);
            //             this.renderType(data.res_body.data);
            //             // let list = data.res_body.list;
            //             // let html = template("list-monopoly",{list});
            //             // $("#shopList").html(html);
            //         }
            //     })
            // }
            // renderType (data) {
            //     let html = template("detail-template",{data});
            //     $("#shop-list").html(html);
            // }
            init(){
                let cart = localStorage.getItem('cart');
                //console.log(cart);
                if(cart){
                    //购物车有商品，对其进行渲染
                    cart = JSON.parse(cart);
                    this.render(cart);
                }else{
                    //购物车为空
                    console.log($("#no-shop"));
                    $("#no-shop").show();
                    $("#left").hide();
                }
            }
            render(cart){
                let html = template("detail-template",{data: cart});
                $("#shop-list").html(html);
            }
            bindEvents(){
                //给删除按钮绑事件
                // this.delete.onclick = () =>{
                //     let li = this.delete.parentNode.parentNode;
                //     console.log(li);
                // }
            }
        }
        new Cart();
    })
})