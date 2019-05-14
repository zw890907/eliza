require(["config"],() => {
    require(["url","template","header","footer","fly","zoom"],(url,template,header) => {
        //console.log(url);
        //console.log(template);
        class Detail {
            constructor () {
                this.init();
                this.addCart();
            }
            init(){
                //从url中取到id,然后携带ID找到数据对页面进行渲染
                //console.log(location);
                let id = Number(location.search.slice(4));
                //console.log(id);
                $.get(url.rapBaseUrl + "detail/get",{id},result => {
                    if(result.res_code === 1){
                        let {data} = result.res_body;
                        //扩展运算添加属性（key:value)，并且id为解构赋值
                        //当为真是接口时，不需要下面这句代码
                        data = {...data,id};
                        //data.id = id;
                        //将data存为全局的变量
                        this.data = data;
                        this.render(data);
                    }
                })
            }
            render(data){
                //console.log(data);
                let html = template('shop-detail',{data});
                $("#shopDetail").html(html);
                this.zoom();
            }

            addCart(){
                //商品数量点击增加事件(按钮可能是以后数据渲染的，所以将事件绑给父级)
                let number = 1;
                $("#shopDetail").on('click','#next',() => {
                    number++;
                    $("#shopNumber").html(number);
                    return number;
                })
                $("#shopDetail").on('click','#prev',() => {
                    if(--number < 1){
                        number = 1;
                    }
                    $("#shopNumber").html(number);
                    return number;
                })
                
                //增加商品按钮可能是以后数据渲染的，所以将事件绑给父级
                $("#shopDetail").on('click','#btn',(e) => {
                    //抛物线动画效果
                    $(`<img src='${this.data.images[0]}' style='width:30px;height:30px;border-radius:50%;'/>`).fly({
                        //console.log($("#cartNumber")),
                        start:{
                            left: e.clientX,
                            top: e.clientY
                        },
                        end:{
                            left: $("#cartNumber").offset().left,
                            top: $("#cartNumber").position().top
                        },
                        onEnd : function(){
                            this.destroy();//销毁抛物体
                            header.calcCartNum();//调用一次计算购物车总数量的方法
                        }
                    });
                    //列表页用自定义属性，详情页不用
                    //let id = $(this).attr(data.id);
                    //取到这条id对应的数据
                    //把this.data存到localstorage里
                    //先将localstorage中的cart取出来
                    let cart = localStorage.getItem("cart");
                    console.log(cart);
                    //判断localstorage中是否有数据
                    
                    this.number = number;
                    //console.log(this.number);
                    if(cart){
                        //已经存过购物车了。先将cart转为字符串
                        //再判断是否有存过当前商品
                        cart = JSON.parse(cart);
                        let index = -1;
                        //some方法只要找到满足条件的就停止了
                        if(cart.some((item,i) => {
                            //这里index的值就是满足条件的这条商品
                            index = i;
                            return item.id === this.data.id;
                        })){
                            //代表有这条商品
                            cart[index].num += this.number;
                        }else{
                            //代表没有这条商品
                            //console.log(this.number);
                            cart.push({...this.data,num:this.number});
                        }
                        console.log(cart);
                    }else{
                        //代表购物车为空,且默认第一次只买一个
                        //console.log(this.number);
                        cart = [{...this.data,num : this.number}];
                    }
                    localStorage.setItem('cart',JSON.stringify(cart));
                })
            }
            
            zoom () {
                // 放大镜插件
                $(".big-img").elevateZoom({
                  gallery:'minPicture',
                  cursor: 'pointer',
                  galleryActiveClass: 'active',
                  borderSize:'1',    
                  borderColor:'#888'
                });
            }
        }
        new Detail();
    })
})