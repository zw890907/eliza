# eliza

### 系统功能

* 首页
* 列表页
* 详情页
* 购物车页面

* 登录
* 注册
* 商品展示
* 商品修改
* 商品删除
* 商品录入

### 使用的技术	

* HTML5
* CSS3
* javascrript
* ajax
* bootstrap
* php
* mysql
* jquery

### 接口文档

##### 首页类型请求

url : (后台) http://www.porn.com/api/v1/index/type

​	(假数据)http://rap2api.taobao.org/app/mock/166498/index/type

总结：将http://rap2api.taobao.org/app/mock/166498用一个url变量接收，以后只需改变url就可以

##### 注册接口

url : (后台) http://www.porn.com/api/v1/user/register.php

method : post

query : {username,password}

data ： {

​	res_code : 1, // 1代表成功，0代表失败,

​	res_message : "添加成功" || "网络错误，添加失败，请重试",

​	res_body : {

​		date : [

​			{id,name,price,num},

​			{id,name,price,num}

​		]

​	}

}

##### 列表页接口

url : (后台) http://www.porn.com/api/v1/list/type

method : get

data ： {

​	res_code : 1, // 1代表成功，0代表失败,

​	res_message : "添加成功" || "网络错误，添加失败，请重试",

​	res_body : {

​		list : [

​			{id,name,price,num},

​			{id,name,price,num}

​		]

​	}

}

##### 详情页接口

url : (后台) http://www.porn.com/api/v1/detail/type

method : get

data ： {

​	res_code : 1, // 1代表成功，0代表失败,

​	res_message : "添加成功" || "网络错误，添加失败，请重试",

​	res_body : {

​		data : [

​			{id},

​			{id,name,price,num}

​		]

​	}

}

##### 查询所有数据

* url : api/v1/select.php

* method : get

* query : null

* data ： {

  ​	res_code : 1, // 1代表成功，0代表失败,

  ​	res_message : "添加成功" || "网络错误，添加失败，请重试",

  ​	res_body : {

  ​		date : [

  ​			{id,name,price,num},

  ​			{id,name,price,num}

  ​		]

  ​	}

  }

##### 添加商品接口

* url ： api/V1/insert.php

* method : get

* query : {id}

* data : {

  ​	res_code : 1, // 1代表成功，0代表失败,

  ​	res_message : "添加成功" || "网络错误，添加失败，请重试",

  ​	res_body : {

  ​		date : [

  ​			{id,name,price,num},

  ​		]

  ​	}

  }

##### 删除商品接口

* url : api/v1/delete.php

* method : get

* query : {id}

* data : {

  ​	res_code : 1, // 1代表成功，0代表失败,

  ​	res_message : "删除成功" || "网络错误，删除失败，请重试"

  }

##### 编辑商品确定接口

* url : api/V1/update.php

* method : get

* query : {id,price,num}

* data : {

  ​	res_code : 1, // 1代表成功，0代表失败,

  ​	res_message : "更新成功" || "网络错误，更新失败，请重试"

  }

##### 注册接口

* url : api/V1/register.php

* method : post

* query : {username,password}

* data : {

  ​	res_code : 1, // 1代表成功，0代表失败,

  ​	res_message : "注册成功" || "网络错误，注册失败，请重试"

  }

##### 登录接口

- url : api/V1/login.php

- method : post

- query : {username,password}

- data : {

  ​	res_code : 1, // 1代表成功，0代表失败,

  ​	res_message : "登录成功" || "用户名或密码错误"

  }































































































