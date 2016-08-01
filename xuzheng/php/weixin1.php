<?php


$appid = "wx743540570fe83a69";
$appaecret = "d23fa1d3e81aeaa0a9b80e1829fd9642";
$url="https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=".$appid."&secret=".$appaecret;
//查询数据库是否有token
$db=mysql_connect(SAE_MYSQL_HOST_M.':'.SAE_MYSQL_PORT,SAE_MYSQL_USER,SAE_MYSQL_PASS);
 mysql_select_db(SAE_MYSQL_DB);
$sql="SELECT token from users";
$res = mysql_query($sql);
if (mysql_num_rows($res)<=0) {
    //不存在  获取
    //---不存在,
    //直接获取  并且存入数据库   1  token   2  时间戳
    $token = json_decode(file_get_contents($url))->access_token;
    $time=time();
    $sql = "insert into users (token,`timestamp`)values ('$token','$time')";
    mysql_query($sql);
}else {
    // ---存在
    // 是否过期   如果过期重新获取   ,更新数据库  token   时间戳
    // 没有过期直接返回
    $sql = "select `timestamp` from users";
    $res = mysql_query($sql);
    $timestamp = mysql_fetch_object($res)->timestamp;
    // echo "$timestamp";
    $nowtime = time();
    if ($nowtime - $timestamp>7000) {
        $token = json_decode(file_get_contents($url))->access_token;
        $time=time();
        $sql = "update users set token='{$token}',`timestamp`='{$nowtime}'";
        mysql_query($sql);



    }else {
        $sql = "select `token` from users";
        $res = mysql_query($sql);
        $token = mysql_fetch_assoc($res)->token;
        echo $token;
    }



}
 ?>
