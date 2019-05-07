define(["tools"],(tools) => {
    class Footer {
        constructor(){
            //规定头部容器都是<header></header>标签
            this.container = document.querySelector("footer");
            this.load();
        }
        //加载footer.html
        load () {
            //暂时写成决对路径
            tools.ajaxGetPromise("html/module/footer.html",null,false).then(html => {
                this.container.innerHTML = html;
            })
        }
    }
    return new Footer();
});