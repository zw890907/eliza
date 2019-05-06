<?php
    include("./config.php");
    $name = $_POST['username'];
    $pwd = $_POST['password'];
    $sql = "select * from user where name='$name' and password='$pwd'";
    $res = mysql_query($sql);//结果是资源类型
    //得到查询的行数，用来判断有没有账号
    $row = mysql_num_rows($res);
    if($row > 0){
        echo json_encode(array(
            "res_code" => 1,
            "res_message" => "登录成功" 
        ));
    }else{
        echo json_encode(array(
            "res_code" => 0,
            "res_message" => "用户名或密码错误" 
        ));
    }
?>