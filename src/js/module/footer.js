define(['jquery'], $ => {
    function Footer () {
      this.container = $("#footer");
      
      this.load().then(() => {
        //this.search();
        //this.isLogin();
      });
    }
    // 对象合并
    $.extend(Footer.prototype, {
        // ES6对象增强写法
        load () {
            // 将header.html加载到container里
            // this.container.load('/html/module/header.html #header-bottom'); 
            // 选择加载文件中的某一部分
            //承诺将异步转为同步
            return new Promise(resolve => {
                this.container.load('/html/module/footer.html', () => {
                    // load异步执行结束
                    resolve();
                });
            })
        }
    })
    return new Footer();
});
