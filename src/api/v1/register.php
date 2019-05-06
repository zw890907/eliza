<?php
    include("./config.php");
    $name = $_POST['username'];
    $pwd = $_POST['password'];
    $sql = "insert into user (name,password) values ('$name','$pwd')";
    $res = mysql_query($sql);
    if($res){
        echo json_encode(array(
            "res_code" => 1,
            "res_message" => "注册成功，即将跳转至登录页" 
        ));
    }else{
        echo json_encode(array(
            "res_code" => 0,
            "res_message" => "网络错误，注册失败，请重试" 
        ));
    }
?>