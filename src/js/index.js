require(["config"],() => {
    require(["url","template","header","footer"],(url,template) => {
        // console.log(header);
        // console.log(footer);
        class Index {
            constructor () {
                this.bindEvents();
                this.getType();
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
                console.log(template);
                console.log(list);
                let html = template("list-shop",{list});
                //console.log(html)
                $("#list-contain").html(html);
            }
        }
        new Index();
    })
})
