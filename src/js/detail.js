require(["config"],() => {
    require(["url","template","zoom","header","footer"],(url,template) => {
        //console.log(url);
        //console.log(template);
        class Detail {
            constructor () {
                this.init();
                //this.zoom();
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