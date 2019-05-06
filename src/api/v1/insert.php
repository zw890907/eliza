<?php
    include("./config.php");
    $name = $_GET['name'];
    $price = $_GET['price'];
    $num = $_GET['num'];
    $sql = "insert into shop (name,price,num) values ('$name',$price,$num)";
    $res = mysql_query($sql);
    //上面结果为布尔值，判断是否添加成功
    if($res){
        //结果为真时
        echo json_encode(array(
            "res_code" => 1,
            "res_message" => "添加成功"
        ));
    }else{
        //结果为假时
        echo json_encode(array(
            "res_code" => 0,
            "res_message" => "网络错误，添加失败，请重试"
        ));
    };
?>