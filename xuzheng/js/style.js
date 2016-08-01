$(function() {
    //设置第一个图片宽度
    //初始获取
    $(".page1 img").width($(".page1 img").height());
    $(".page2 .textword p").height($(".page2").height()*0.04);
    //手机碎片的高度
    $(".phones").height($(".phones").width()*2);
    var heightbody = $("body").height();
    var widthbody = $("body").width();
    if (widthbody/heightbody>=0.71) {
        $("#all").width(heightbody*0.71)
    }

    //设置rem

    // 图片预加载
    function loadds() {
        var imgarr=["1-1.png","game_info_bt.png","star11.png","1-2.png","hm.gif","star2.png","1-3.png","index.gif","star3.png","1-4.png","kuang_bg.png","star4.png","1-5.png","loading_bg.png","star5.png","1-6.png","loading_txt.png","star6.png","1-7.png","loading_xuzheng.png",	"star7.png","1-8.png","music_off.png","star8.png","CSSatyr.png","music_on.png","star9.png","baobei.png","one_guan_pic.png",	"startdown.png","bg.jpg","one_pic1.png","super_body1.png","bg1.png","one_pic2.png","super_body2.png","chip1.png","one_pic3.png","super_body3.png","chip2.png","person_kuang.png",	"super_glasses.png","chip3.png","phone.png","super_head.png","chip4.png","ribbon1.png","tietou.png","chip5.png","ribbon2.png","up.png","chip6.png","ribbon3.png","vivo_mobile.png","chip7.png","ribbon4.png","word_bg.jpg","chip8.png","ribbon5.png","xuzheng.png","color_yan.png","star.png","xuzheng_kuang.png","error.png","star1.png","xuzheng_succ_kuang.png","game_info_bg.png",	"star10.png"]
        var imgloadedimg=0;

        for (var i = 0; i < imgarr.length; i++) {
            var imglength = imgarr.length;
            var imgs = new Image();
            imgs.src="imgs/"+imgarr[i];
            imgs.onload = function() {
                imgloadedimg++;
                if (imgloadedimg==imglength) {
                    $(".page1").fadeOut('slow');
                    $(".page2").fadeIn('slow');
                    page2word();
                }
            }
        }
    };
    loadds();

    //文字加载
    var h=0;

    function page2word() {
        setTimeout(function () {
            if (h==0) {
                $("#tabmusic").attr({'src':"music/背景文字页-打字音效.mp3"});
            }
            h++;
            $(".page2 .textword p").eq(h).show();
            if (h<=12) {
                page2word();
                if (h==5) {
                    //星星开始上下动   h>5
                    $("#page2img1").css("-webkit-animation", "img1move2 5s linear infinite");
                    $("#page2img2").css("-webkit-animation", "img2move 5s linear infinite");
                    $("#page2img3").css("-webkit-animation", "img3move 5s linear infinite");
                }
            }else {
                // 第1,4星球  动  超人出现
                $("#page2img1").css({
                    "-webkit-animation": "img1move 3s linear",
                    "-webkit-animation-fill-mode": "forwards",
                });
                $("#page2img4").css({
                    "-webkit-animation": "img4move 3s linear",
                    "-webkit-animation-fill-mode": "forwards",
                })
                setTimeout(function() {
                        $(".vivomove").css({
                            "-webkit-animation":"vivomoves 2s linear",
                            "-webkit-animation-fill-mode": "forwards",
                        })
                        vivoshowbg();
                        $(".page2 .textword").fadeOut("slow");
                },1000)
                $("#tabmusic").attr('src',"");
            }
        }, 630);
    }

    //徐峥出现
    var  b = 0;
    // 以b为基准
    function vivoshowbg() {
        setTimeout(function() {
            b++;
            //超人换衣服
            if (b%3==0) {
                $("#yifu").attr({src:"imgs/super_body1.png"});
            }else if (b%3==1) {
                $("#yifu").attr({src:"imgs/super_body2.png"});
            }else if (b%3==2) {
                $("#yifu").attr({src:"imgs/super_body3.png"});
            };


            if (b==21) {
                $(".phones>img").attr({'src':"imgs/bgphone.png"})
                    phones();
            } else if (b==20) {
                $(".btns").fadeIn("slow");
                $(".btns").css({
                    "-webkit-animation": "opationwhite 5s linear infinite",
                })

            }else if (b==18) {
                // 旋转的手机隐藏   手机碎片出现
                $(".phone").hide();
                $(".movestart").fadeOut("slow");
                $(".phones").fadeIn("slow");
            }else if (b==14) {
                // 超人隐藏 旋转的手机出现
                $(".vivomove").fadeOut();
                vivophoneshow();
            }else if (b==8) {
                // $(".vivomove").fadeOut("slow");
                vivophoneshow();
                //超人停留10个b的时间后左上角消失
                $(".vivomove").css({
                    "-webkit-animation": "vivomoves2 2s linear",
                })
            }
            if (b<=21) {
                vivoshowbg();
            }
        },500)
    }
    // 旋转的手机
    function vivophoneshow() {
        $(".phone").fadeIn("slow");

    }
    //八个星星
    function phones() {
        //开始的四颗星隐藏
        $(".starts").fadeIn("slow");
        $(".phones>img").hide() ;
        for (var i = 0; i < 8; i++) {
            var num = parseInt(Math.random()*5+5);
            $(".starts>img").eq(i).css({
                "-webkit-animation": "startsmoves "+num+"s linear infinite",
                "-webkit-animation-fill-mode": "forwards",
            })
        }
        //碎片坐标
        $(".phones").css({
            'background':"none",
        })
        for (var i = 0; i < 8; i++) {
            $(".phones div").eq(i).css({
                "-webkit-animation": "phone"+(i+1)+"move"+" 3s linear",
                "-webkit-animation-fill-mode": "forwards",
            })
        }
        setTimeout(function functionName() {
            $(".phones div img:nth-child(2)").show();
            $('.page2').on("click",function() {
                $("#all>div").hide();
                $(".page3").show()
                daojishi();
            })
        },1000)
    }
//音乐
    var flog = true;
    $("#mus")[0].addEventListener("touchstart",function() {
        if (flog) {
            $("#mus img").attr({src:"imgs/music_off.png"})
            flog = false;
            $("audio")[0].pause();
        }else {
            $("#mus img").attr({src:"imgs/music_on.png"})
            flog=true;
            $("audio")[0].play();
        }
    })
//游戏  及以后的
    //封装的函数
        function random(max,min, not) {
            var res = parseInt(Math.random() * (max - min + 1) + min);
            if (not != undefined) {
                if (not == res) {

                    return random(max,min, not);
                }
            }
            return res;
        }

        var a = 30;
        var time;

        function daojishi() {
            game();
            if (time) {
                clearInterval(time)
                // time=null;
            }
            var aa = a.toString();
            time = setInterval(function() {
                a-=0.01;
                aa=a.toFixed(2);
                var atime = aa+"";
                atime=atime.replace(".",":");

                $(".wrap>p").html(atime);
                if (aa<=10) {
                    $("#tabmusic").attr({'src':"music/倒计时音效 （节）.mp3","loop":"loop"});
                }
                if (aa<=0) {
                    clearInterval(time);
                    // time=null;
                    $("#tabmusic").attr({'src':""})
                    err();
                }
            },16)
        }

        var gameloop = 0
        function game() {
            gameloop++;
            var num = $(".headimg").length;
            var xu = random((num-1),0);
            var itnum = Math.sqrt(num);
            $(".headimg img").eq(xu).attr({src:"imgs/xuzheng.png","background":"red"});
            if (gameloop==5||gameloop==7) {
                var num1 = random(num-1,0,xu);
                var num2 = random(num-1,0,xu);
                var num3 = random(num-1,0,xu);
                $(".headimg img").eq(num1).attr({src:"imgs/tietou.png"});
                $(".headimg img").eq(num2).attr({src:"imgs/tietou.png"});
                $(".headimg img").eq(num3).attr({src:"imgs/tietou.png"});
            }
            // console.log($(".headimg")[xu]);
            $(".headimg")[xu].addEventListener("touchstart",function () {
                    //游戏处理
                    // console.log(gameloop);
                    if (gameloop==1) {
                        $(".page3>p").html("第二关&nbsp;&nbsp;&nbsp;金星");
                    }else if(gameloop==2){
                        $(".page3>p").html("第三关&nbsp;&nbsp;&nbsp;地球");
                    }else if(gameloop==3){
                        $(".page3>p").html("第四关&nbsp;&nbsp;&nbsp;火星");
                    }else if(gameloop==4){
                        $(".page3>p").html("第五关&nbsp;&nbsp;&nbsp;木星");
                        itnum=4;
                    }else if(gameloop==5){
                        $(".page3>p").html("第六关&nbsp;&nbsp;&nbsp;土星");
                        itnum=5;
                    }else if(gameloop==6){
                        $(".page3>p").html("第七关&nbsp;&nbsp;&nbsp;天王星");
                        itnum=5;
                    }else if(gameloop==7){
                        $(".page3>p").html("第八关&nbsp;&nbsp;&nbsp;海王星");
                        itnum=6;
                    }else if(gameloop>=8){
                        clearInterval(time);
                        // time=null;
                        addbody();
                        return;
                    }
                    $(".page4 #pass").html("<img src='imgs/1-"+(gameloop)+".png'/>")
                    $(".page4").show();
                    //前几成功后 弹窗 暂停定时器1s  后恢复
                    clearInterval(time);
                    // time=null;
                    function guoqu() {
                        clearTimeout(time);
                        time = setInterval(function() {
                            a-=0.01;
                            a=a.toFixed(2);
                            var atime = a+"";
                            atime=atime.replace(".",":");
                            $(".wrap>p").html(atime)
                            if (a<=0) {
                                console.log("小于零");
                                clearInterval(time);
                                // time=null;
                                err();
                            }
                            console.log(a);
                        },16)
                        $(".page4").hide();
                        $(".items").empty();
                        for (var i = 0; i < (itnum+1)*(itnum+1); i++) {
                            var div = $("<div class='headimg'><img src='imgs/baobei.png'/></div>");
                            $(".items").append(div);
                        }
                        $(".items div").css({
                            'width':100/(itnum+1) + '%',
                            // 'height':100/(itnum+1) + '%',
                            'float':'left',
                        });
                        game();
                    }

                        var settime=setTimeout(function() {
                            clearTimeout(time);
                            guoqu();
                        },1000)
                        // $(".page4 #pass").on("touchstart",function() {
                        //     clearTimeout(settime);
                        //     guoqu();
                        // })
            })
        }

    // 点击成功处理弹窗

        function addbody() {
            $(".page3").hide();
            $(".page5").show();
            $(".page8").hide();
            var i = 0;
            $(".page5 .page5text").fadeIn();
            var ad=setInterval(function() {
                i++
                if (i<7) {
                    $(".page5text p").eq(i).show()
                }else if (i==7) {
                    flyin();
                }
                else if(i==18){
                    $(".heti div p").show()
                    $(".page5>img").fadeIn("slow");
                }else if (i==21) {
                    $(".heti").fadeOut("slow");
                    $(".page5>img").fadeOut("slow");
                    $(".page5 .page5text").fadeOut("slow");
                    $(".page5>img").fadeIn("slow");
                    $(".page5 .heti").hide();
                    $(".page5 .hetisucc").show();
                    $(".mas").on("click",function() {
                            $(".page6").fadeIn("slow");
                            gamemas();
                            var isres=false;
                            $(".page6 .page6all .text h2 img").on("click",function(isres) {
                                $(".page6").fadeOut("slow");
                                $(".page8").hide();
                            })

                    })
                    $(".check").on("click",function() {
                        $(".page8").hide();
                        resdraw();
                    })
                    clearInterval(ad)
                }
            },300)

            function flyin() {
                $(".page5 .heti").show();
                for (var i = 1; i < 9; i++) {
                    if (i==5) {
                        $(".heti .heti"+i+"").css({
                            '-webkit-animation':'heti'+i+'move 3s linear',
                            '-webkit-animation-fill-mode': 'forwards',
                            '-webkit-transform': 'rotate(-180deg)',
                        })
                    }else {
                        $(".heti .heti"+i+"").css({
                            '-webkit-animation':'heti'+i+'move 3s linear',
                            '-webkit-animation-fill-mode': 'forwards',
                        })
                    }

                }
            }
        }
        function gamemas() {
            var con = $("#content").get(0);
             var myscroll=new IScroll(con,{
                 resizeScrollbars:true,
                disableMouse: true,
                disablePointer: true,
                scrollbars: 'custom',
                resizeScrollbars: false,
             });
        }
        //闯关失败
        function err() {
            $(".page8").show();
            $("#tabmusic").attr({'src':"music/闯关失败页-out音效(节).wav",'loop':"false"});
            $("#tabmusic").get(0).loop=false;

            $(".page8 div .try").on("click",function() {
                $(".page8").hide();
                $(".page3").show();
                a=30;
                gameloop=0;
                $(".items").html('<div class="headimg"><img src="imgs/baobei.png" alt="" /></div><div class="headimg"><img src="imgs/baobei.png" alt="" /></div><div class="headimg"><img src="imgs/baobei.png" alt="" /></div><div class="headimg"><img src="imgs/baobei.png" alt="" /></div>')
                daojishi();



                // --------------------
            })
            $(".mas").on("click",function() {
                   $(".page8").hide();
                    $(".page6").fadeIn();
                    gamemas();
                    var isres=true;;
                    $(".page6 .page6all .text h2 img").on("click",function(isres) {
                        $(".page6").fadeOut();
                        if (isres) {
                            $(".page8").show();
                        }

                    })
            })
        }
        //抽奖
        function resdraw() {
            $(".page9").show();
            var res = Math.random();
            console.log(res);
            if (res>=0.5) {
                $("#tabmusic").attr({'src':"music/中奖弹窗页-游戏通关音效（节）.mp3",loop:"false"});
                $("#tabmusic").get(0).loop=false;
            }
            if (res>=0.0009) {
                $(".draw").html("<h2>恭喜你获得</h2><p>vivo X5pro一台</p><span class='nameinput'>姓名<input type='text'></span><span class='phoninput'>手机号码<input type='text'></span><strong class='tijiao'>提交信息</strong>");
            }else if (res>=0.008) {
                $(".draw").html("<h2>恭喜你获得</h2><p>港囧电影票一套</p><span class='nameinput'>姓名<input type='text'></span><span class='phoninput'>手机号码<input type='text'></span><strong class='tijiao'>提交信息</strong>");
            }else if (res>=0.07) {
                $(".draw").html("<h2>恭喜你获得</h2><p>VIVO充电宝一个</p><span class='nameinput'>姓名<input type='text'></span><span class='phoninput'>手机号码<input type='text'></span><strong class='tijiao'>提交信息</strong>");
            }else if (res>=0.06) {
                $(".draw").html("<h2>恭喜你获得</h2><p>vivo 耳机一个</p><span class='nameinput'>姓名<input type='text'></span><span class='phoninput'>手机号码<input type='text'></span><strong class='tijiao'>提交信息</strong>");
            }else if (res>=0.5) {
                $(".draw").html("<h2>恭喜你获得</h2><p>签名剧照一张</p><span class='nameinput'>姓名<input type='text'></span><span class='phoninput'>手机号码<input type='text'></span><strong class='tijiao'>提交信息</strong>");
            }else {
                $("#tabmusic").attr({'src':"music/未中奖弹窗-节奏大师结束音效 (节).mp3"});
                $("#tabmusic").get(0).loop=false;
                $(".draw").css("background","imgs/xuzheng_kuang.png");
                $(".draw h2").html("很遗憾");
                $(".draw p").html("你没有抽中奖品,再来一次吧!");
                $(".draw strong").html("返回游戏");
                $(".draw strong").on("click",function() {
                    clearInterval(time);
                    // time=null;
                    $(".page8").hide();
                    $(".page9").hide();
                    $(".page5").hide();
                    $(".page3").show();
                    a=30;
                    gameloop=0;
                    $(".items").html('<div class="headimg"><img src="imgs/baobei.png" alt="" /></div><div class="headimg"><img src="imgs/baobei.png" alt="" /></div><div class="headimg"><img src="imgs/baobei.png" alt="" /></div><div class="headimg"><img src="imgs/baobei.png" alt="" /></div>')
                    daojishi();

                });
            }
            $(".tijiao").on("click",function() {
                $(".page8").hide();
                $(".page9").hide();
                $(".page5").hide();
                $(".page3").show();
                a=30;
                gameloop=0;
                $(".items").html('<div class="headimg"><img src="imgs/baobei.png" alt="" /></div><div class="headimg"><img src="imgs/baobei.png" alt="" /></div><div class="headimg"><img src="imgs/baobei.png" alt="" /></div><div class="headimg"><img src="imgs/baobei.png" alt="" /></div>')
                    daojishi();
            })
        }

})
