//定义header模块的时候需要用到tools模块，可以直接传进来
define(["tools"],(tools) => {
    class Header {
        constructor(){
            //规定头部容器都是<header></header>标签
            this.container = document.querySelector("header");
            this.load();
        }
        //加载header.html
        load () {
            //暂时写成决对路径
            tools.ajaxGetPromise("html/module/header.html",null,false).then(html => {
                this.container.innerHTML = html;
            })
        }
    }
    return new Header();
});