<?php
class JSSDK {
  private $appId;
  private $appSecret;

  public function __construct($appId, $appSecret) {
    $this->appId = $appId;
    $this->appSecret = $appSecret;
  }

//  ===================== 3
  //  验证过程  config 权限验证
  public function getSignPackage() {
    $jsapiTicket = $this->getJsApiTicket();

    // 注意 URL 一定要动态获取，不能 hardcode.
    $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
    $url = "$protocol$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

    $timestamp = time();
    $nonceStr = $this->createNonceStr();

    // 这里参数的顺序要按照 key 值 ASCII 码升序排序
    $string = "jsapi_ticket=$jsapiTicket&noncestr=$nonceStr&timestamp=$timestamp&url=$url";

    $signature = sha1($string);

    $signPackage = array(
      "appId"     => $this->appId,
      "nonceStr"  => $nonceStr,
      "timestamp" => $timestamp,
      "url"       => $url,
      "signature" => $signature,
      "rawString" => $string
    );
    return $signPackage;
  }

// 公用 ================= 0
  //  产生随机字符串
  private function createNonceStr($length = 16) {
    $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    $str = "";
    for ($i = 0; $i < $length; $i++) {
      $str .= substr($chars, mt_rand(0, strlen($chars) - 1), 1);
    }
    return $str;
  }

// ======================= 2
//  获取票据(签名) ticket
  private function getJsApiTicket() {
    // jsapi_ticket 应该全局存储与更新，以下代码以写入到文件中做示例
    //========================
    //TODO
    $accessToken = $this->getAccessToken();
    $url="https://api.weixin.qq.com/cgi-bin/ticket/getticket?type=jsapi&access_token=$accessToken";
    //查询数据库 是否存在token
$db=mysql_connect(SAE_MYSQL_HOST_M.':'.SAE_MYSQL_PORT,SAE_MYSQL_USER,SAE_MYSQL_PASS);
    mysql_select_db(SAE_MYSQL_DB);
    mysql_query("SET NAMES UTF8");
    mysql_query("SET NAMES UTF8");
    $sql="select ticket from ticket ";
    $res=mysql_query($sql);
    //不存在
    //直接获取，并存入数据库，token timestamp
        if(mysql_num_rows($res)<=0){
        $ticket=json_decode($this->httpGet($url))->ticket;
        $times=time();
        $sql="insert into ticket(ticket,times) values ('$ticket','$times')";
        mysql_query($sql);
        $ticket = $ticket;
    }else {
        //存在
        $sql="select times from ticket";
        $res=mysql_query($sql);
        $times=mysql_fetch_object($res)->times;
        $nowtime=time();
            //  echo $nowtime;
        if($nowtime-$times>7000){
            //过期的话，重新获取token,更新数据库token timestamp
            $ticket=json_decode($this->httpGet($url))->ticket;
            $times=time();
            $sql="update ticket set ticket='$ticket',time='$nowtime'";
            mysql_query($sql);
            $ticket = $ticket;
        }else {
            //没有过期 直接返回
            $sql="select ticket from ticket";
            $res=mysql_query($sql);
            $ticket=mysql_fetch_object($res)->ticket;
            $ticket = $ticket;
        }
    }
    // echo $ticket;
    return $ticket;
  }

// ==================== 1
  //  获取 accessToken
  private function getAccessToken() {
      // access_token 应该全局存储与更新，以下代码以写入到文件中做示例
   //=============================
   //TODO
       $url="https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=$this->appId&secret=$this->appSecret";
       //查询数据库 是否存在token
  $db=mysql_connect(SAE_MYSQL_HOST_M.':'.SAE_MYSQL_PORT,SAE_MYSQL_USER,SAE_MYSQL_PASS);
    mysql_select_db(SAE_MYSQL_DB);
    mysql_query("SET NAMES UTF8");
       mysql_query("SET NAMES UTF8");
       $sql="select token from users ";
       $res=mysql_query($sql);
       //不存在
       //直接获取，并存入数据库，token timestamp
       if(mysql_num_rows($res)<=0){
           $token=json_decode($this->httpGet($url))->access_token;
           $times=time();
           $sql="insert into users(token,`timestamp`) values ('$token','$times')";
           mysql_query($sql);
           $access_token = $token;
       }else {
           //存在
           $sql="select `timestamp` from users";
           $res=mysql_query($sql);
           $times=mysql_fetch_object($res)->timestamp;
           $nowtime=time();
           if($nowtime-$times>10){
               //过期的话，重新获取token,更新数据库token timestamp
               $token=json_decode($this->httpGet($url))->access_token;
               $times=time();
               $sql="update users set token='$token',`timestamp`='$nowtime'";
               mysql_query($sql);
               $access_token = $token;
           }else {
               //没有过期 直接返回
               $sql="select token from users";
               $res=mysql_query($sql);
               $token=mysql_fetch_object($res)->token;
               $access_token = $token;
           }
       }
   return $access_token;
  }

// 公用 ======================  0
//  替换 file_get_contents() 方法
  private function httpGet($url) {
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_TIMEOUT, 500);
    // 为保证第三方服务器与微信服务器之间数据传输的安全性，所有微信接口采用https方式调用，必须使用下面2行代码打开ssl安全校验。
    // 如果在部署过程中代码在此处验证失败，请到 http://curl.haxx.se/ca/cacert.pem 下载新的证书判别文件。
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, true);
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, true);
    curl_setopt($curl, CURLOPT_URL, $url);
    $res = curl_exec($curl);
    curl_close($curl);

    return $res;
  }

//  对文件的存  取    (示例代码中更改的就是这块)
  private function get_php_file($filename) {
    return trim(substr(file_get_contents($filename), 15));
  }
  private function set_php_file($filename, $content) {
    $fp = fopen($filename, "w");
    fwrite($fp, "<?php exit();?>" . $content);
    fclose($fp);
  }

}
