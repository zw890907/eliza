require.config({
    baseUrl : "/",
    paths : {
        "jquery" : "libs/jquery/jquery-3.2.1",
        "header" : "js/module/header",
        "footer" : "js/module/footer",
        "tools" : "libs/tools",
        "url" : "js/module/url",
        "template" : "libs/art-template/template-web",
        "cookie" : "libs/jquery-plugins/jquery.cookie"
    },
    //写垫片，为了给不满足AMD规范的插件又要依赖别的模块
    shim : {
        "cookie" : {
            deps: ['jquery']
        }
    }
})