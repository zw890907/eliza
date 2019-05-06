<?php
    include("./config.php");
    $pageIndex = $_GET['pageIndex'];
    $count = $_GET['count'];
    //计算总页数
    $allSql = "select * from shop";
    $allRes = mysql_query($allSql);
    //先计算出总条数
    $allCount = mysql_num_rows($allRes);
    $allPage = ceil($allCount / $count);
    //查询的时候根据pageIndex和count进行判断limit跳过的数据量
    /*pageIndex=1 limit(0,5)
    pageIndex=2 limit(5,5)
    pageIndex=3 limit(10,5)
    推出公式：limit ($pageIndex-1)*$count,$count*/
    //查询数据中所有数据,字符串中不能解析数学运算，所以先用一个变量存储
    $start = ($pageIndex-1)*$count;
    $sql = "select * from shop limit $start, $count";
    //执行$sql语句,得到一个资源类型
    $res = mysql_query($sql);
    //用shop来装查询到的数据
    $shop = array();
    while($row = mysql_fetch_assoc($res)){
        array_push($shop, $row);
    };
    //判断$shop长度为0的话，返回失败
    $json = array (
        "res_code" => 1,
        "res_message" => "查询成功",
        "res_body" => array(
            "data" => $shop,
            "allPage" => $allPage
        )
    );
    echo json_encode($json);
    //关闭连接
    mysql_close();
?>