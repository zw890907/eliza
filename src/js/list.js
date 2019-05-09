require(["config"],() => {
    require(["url","template","header","footer"],(url,template) => {
        console.log(url);
        console.dir(template);
        class List {
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
                $.get( url.rapBaseUrl + 'list/type',data =>{
                    //console.log(template);
                    //console.log(data.res_code);
                    if(data.res_code === 1){
                        console.log(data.res_body.list);
                        //this.renderType(data.res_body.list);
                        let list = data.res_body.list;
                        //console.log(data.res_code);
                        let html = template("list-monopoly",{list});
                        //console.log(html);
                        $("#shopList").html(html);
                    }
                    //console.log(data.res_body.list);
                })
            }
            // renderType (list) {
            //     console.log(template);
            //     console.log(list);
            //     let html = template("list-monopoly",{list});
            //     //console.log(html)
            //     $("#shopList").html(html);
            // }
        }
        new List();
    })
})