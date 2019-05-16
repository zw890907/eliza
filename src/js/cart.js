require(["config"],() => {
    require(["template","header","footer","url"],(template) => {
        //console.log(header)
        class Cart{
            constructor(){
                this.aCheck = document.querySelector("#allCheck");
                //console.log(this.check);
                this.n = 0;
                this.init();
                //this.bindEvents();
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
                this.check = Array.from(document.querySelectorAll("#check"));
                this.bindEvents();
                this.totalPrices();
            }
            render(cart){
                let html = template("detail-template",{data: cart});
                $("#shop-list").html(html);
                let subtotal = Array.from(document.querySelectorAll("#subtotal"));
                //console.log(subtotal);
                subtotal.forEach( shop => {
                    shop.innerHTML = Number(shop.innerHTML).toFixed(2);
                })
            }
            bindEvents(){
                //给增加和减少按钮绑事件
                $("#left").on('click','#reduceNum',(e)=>{
                    let target = e.target;
                    let num = $(target).next().val();
                    if(--num < 1){
                        num = 1;
                    }
                    $(target).next().val(num);
                    let price = $(target).parent().prev().children("#price").html();
                    let subtotalPrice = Number(num) * Number(price);
                    let subtotal = $(target).parent().next().children("#subtotal");
                    subtotal.html(subtotalPrice.toFixed(2));
                    //找到localStorage对应的数据进行修改
                    let cart = localStorage.getItem('cart');
                    cart = JSON.parse(cart);
                    let id = Number($(target).parent().parent().attr("data-id"));
                    let index = -1;
                    if(cart.some((item,i) => {
                        //console.log(item.id);
                        index = i;
                        return item.id === id;
                    })){
                        cart[index].num--;
                        localStorage.setItem('cart',JSON.stringify(cart));
                    }
                    this.totalPrices();
                })
                $("#left").on('click','#addNum',(e)=>{
                    let target = e.target;
                    let num = $(target).prev().val();
                    num++;
                    $(target).prev().val(num);
                    let price = $(target).parent().prev().children("#price").html();
                    let subtotalPrice = Number(num * price);
                    let subtotal = $(target).parent().next().children("#subtotal");
                    subtotal.html(subtotalPrice.toFixed(2));
                    let cart = localStorage.getItem('cart');
                    cart = JSON.parse(cart);
                    let id = Number($(target).parent().parent().attr("data-id"));
                    let index = -1;
                    if(cart.some((item,i) => {
                        //console.log(item.id);
                        index = i;
                        return item.id === id;
                    })){
                        cart[index].num++;
                        localStorage.setItem('cart',JSON.stringify(cart));
                    }
                    this.totalPrices();
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
                            //const newCart = [];
                            // cart.map((shop,a) =>{
                            //     if(index === a){
                                    
                            //     }else{
                            //         newCart.push(shop);
                            //     }
                            // })
                            cart = cart.filter((shop,a)=>{
                                return index !== a;
                            })
                            localStorage.setItem('cart',JSON.stringify(cart));
                            
                        }
                        
                    }
                    this.totalPrices();
                    let num = Number($("#cartNumber").html());
                    let cart = localStorage.getItem('cart');
                    console.log(cart);
                    if(num === 0){
                        localStorage.removeItem('cart');
                        this.init();
                    }
                })
                //清空购物车事件
                $("#left").on('click','#cleanCart',()=>{
                    //let target = e.target;
                    if(confirm("警告！！！确定要清空购物车吗？")){
                        localStorage.removeItem('cart');
                    }
                    this.totalPrices();
                    this.init();
                })
                //全选按钮事件
                //console.log(this.check);
	            $("#left").on('click','#allCheck',()=>{
                    this.check.forEach((item) => {
                        //console.log(item,'item');
                        item.checked = this.aCheck.checked;
                    })
                    // 修改n的值
                    this.n = this.aCheck.checked ? this.check.length : 0;
                    //计算总价
                    this.totalPrices();
                })
                //单选按钮事件
                this.check.forEach( (check) => {
                    check.onchange = () => {
                        this.checkChange(check);
                    } 
                })
            }

            //单选按钮方法
            checkChange(check){
                //console.log(check);
                this.n += check.checked ? 1 : -1;
                //console.log(this.aCheck);
                this.aCheck.checked = this.n === this.check.length;
                //console.log(this.check.length);
                this.totalPrices();
            }
            //计算总数量和总价
            totalPrices(){
                let allNum = 0;
                let allSubtotal = 0;
                let checks = Array.from(document.querySelectorAll(".check"));
                // let cart = localStorage.getItem('cart');
                // cart = JSON.parse(cart);
                // console.log(cart);
                // cart.forEach( (item,i) => {
                //     allNum += item.num;
                //     allSubtotal += item.price * item.num;
                // })
                // $("#cartNumber").html(allNum);
                // $("#numCount").html(allNum);
                // $("#shopMoney").html(allSubtotal.toFixed(2));
                checks.forEach(check => {
                    let num = check.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.firstChild.nextSibling.nextSibling.nextSibling;
                    //console.log(num);
                    let price = check.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.firstChild.nextSibling;
                    //console.log(price);
                    if(check.checked){
                        allNum += Number(num.value);
                        allSubtotal += Number(price.innerHTML);
                    }
                })
                $("#cartNumber").html(allNum);
                $("#numCount").html(allNum);
                $("#shopMoney").html(allSubtotal.toFixed(2));
                this.satisfy();
            }
            //满足包邮条件方法
            satisfy(){
                let aMoney = Number($("#shopMoney").html());
                //console.log(aMoney);
                if(aMoney >= 699){
                    $(".yesSatisfy").show();
                    $(".noSatisfy").hide();
                    $(".dis-span").show();
                    $(".first-span").hide();
                }else{
                    $(".yesSatisfy").hide();
                    $(".noSatisfy").show();
                    $(".dis-span").hide();
                    $(".first-span").show(); 
                }
            }
        }
        new Cart();
    })
})