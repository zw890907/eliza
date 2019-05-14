require(["config"],() => {
    require(["url","template","header","footer"],(url,template) => {
        //console.log(header);
        //console.log(footer);
        class Cart{
            constructor(){
                this.init();
                this.bindEvents();
                this.totalPrices();
            }
            init(){
                let cart = localStorage.getItem('cart');
                //console.log(cart);
                if(cart){
                    //购物车有商品，对其进行渲染
                    cart = JSON.parse(cart);
                    this.render(cart);
                }else{
                    //购物车为空
                    //console.log($("#no-shop"));
                    $("#no-shop").show();
                    $("#left").hide();
                }
            }
            render(cart){
                let html = template("detail-template",{data: cart});
                $("#shop-list").html(html);
            }
            bindEvents(){
                let num = $(".inputNum").val();
                //console.log(subtotal);
                //console.log(num);
                //给增加和减少按钮绑事件
                $("#left").on('click','#reduceNum',(e)=>{
                    let target = e.target;
                    num--;
                    if(num < 1){
                        num = 1;
                    }
                    $(target).next().val(num);
                    let price = $(target).parent().prev().children("#price").html();
                    let subtotalPrice = Number(num) * Number(price);
                    let subtotal = $(target).parent().next().children("#subtotal");
                    subtotal.html(subtotalPrice.toFixed(2));
                })
                $("#left").on('click','#addNum',(e)=>{
                    let target = e.target;
                    num++;
                    $(target).prev().val(num);
                    let price = $(target).parent().prev().children("#price").html();
                    let subtotalPrice = Number(num) * Number(price);
                    let subtotal = $(target).parent().next().children("#subtotal");
                    subtotal.html(subtotalPrice.toFixed(2));
                })
                //删除按钮事件
                $("#left").on('click','#delete',(e)=>{
                    let target = e.target;
                    let li = $(target).parent().parent();
                    if(confirm("确定不要了吗？")){
                        let id = Number($(li).attr("data-id"));
                        //li.remove();
                        let cart = localStorage.getItem('cart');
                        
                        cart = JSON.parse(cart);
                        //console.log(cart);
                        let index = -1;
                        if(cart.some((item,i) => {
                            //console.log(item.id);
                            index = i;
                            return item.id === id;
                        })){
                            $(li).remove();
                            const newCart = [];
                            cart.map((shop,a) =>{
                                if(index === a){
                                    
                                }else{
                                    cart.push(shop);
                                }
                            })
                            localStorage.setItem('cart',JSON.stringify(cart));
                        }
                    }
                    //this.init();
                })
                //清空购物车事件
                $("#left").on('click','#cleanCart',()=>{
                    //let target = e.target;
                    if(confirm("警告！！！确定要清空购物车吗？")){
                        localStorage.removeItem('cart');
                    }
                    this.init();
                })
                this.totalPrices();
            }
            //计算总数量和总价
            totalPrices(){
                let subtotal = document.querySelectorAll("#subtotal");
                let inputNum = Array.from(document.querySelectorAll(".inputNum"));
                let allNum = 0;
                let allSubtotal = 0;
                inputNum.forEach(input =>{
                    allNum += Number(input.value);
                })
                subtotal.forEach(price =>{
                    allSubtotal += Number(price.innerHTML);
                })
                //console.log(allNum);
                $("#numCount").html(allNum);
                $("#shopMoney").html(allSubtotal);
                //console.log(inputNum);

            }
        }
        new Cart();
    })
})