# 伟强店铺管理系统

### 系统功能

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

### 接口文档

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

* query : {name,price,num}

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































































































