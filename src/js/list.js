require(["config"],() => {
    require(["url","template","header","footer"],(url,template,header) => {
        //console.log(url);
        //console.dir(template);
        class List {
            constructor () {
                // //默认当前页码为1
                // this.pageIndex = 1;
                // //count指一页的数量（value=4），并且不能被修改
                // Object.defineProperty(this,"count",{
                //     writable : false,
                //     value : 9
                // });
                // //默认总页码也为1（临时赋值）
                // this.allPage = 1;
                this.getType();
            }
            bindEvents () {
                //console.log($(".select-nav"));
                // $("#wrap").on('click','#select-nav',()=>{
                //     //console.log(123);
                //     this.getType();
                // })
                // console.log($("#addShop-cart"));
                $("#wrap").on('click','#addShop-cart',(e)=>{
                    let target = e.target;
                    let id = Number($(target).parent().parent().parent().parent().attr("data-id"));
                    console.log(id);
                    //console.log(this.data);
                    let data = this.data.filter( (list,a) => {
                        //console.log(list.id);
                        return list.id === id;
                    })
                    
                    data = data[0];
                    console.log(data);
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
            //获取分类数据
            getType () {
                //将需要传递的参数进行结构赋值
                // let {pageIndex,count} = this;
                //ajax请求数据
                $.get( url.rapBaseUrl + 'list/type',res => {
                    if(res.res_code === 1){
                        let data = res.res_body.list;
                        //将data存为全局的变量
                        this.data = data;
                        console.log(this.data);
                        //console.log(res.res_body.list);
                        this.renderType(res.res_body.list);
                    }
                    this.bindEvents();
                    this.sceneChange();
                    this.collect();
                })
            }
            renderType (list) {
                let html = template("list-monopoly",{list});
                $("#shopList").html(html);
            }
            sceneChange(){
                // console.log($("#shopList"));
                // console.log($("#section"));
                $("#section").on('click','#line',()=>{
                    $("#shopList").hide();
                    $(".dis-box").show();
                    $("#line").addClass('ac');
                    $("#field").removeClass('ac');
                })
                $("#section").on('click','#field',()=>{
                    $(".dis-box").hide();
                    $("#shopList").show();
                    $("#line").removeClass('ac');
                    $("#field").addClass('ac');
                })
            }
            collect(){
                //console.log($("#addShop-xin"));
                $("#shopList").on('click','#addShop-xin',(e)=>{
                    let target = e.target;
                    let favorite = $(target).parent().parent().parent().next();
                    console.log(favorite);
                    favorite.show();
                    setInterval(() => {
                        favorite.hide();
                    }, 3000);
                })
            }
        }
        new List();
    })
})