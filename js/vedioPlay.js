/**
 * Created by 战-不败的象征 on 2017/4/5.
 */
$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
    var v = $('#video'),                          //  video对象
        playbackRateShow = $('.playbackRate'),    //  播放速度那个标签
        vc = $('.video-container'),                //  视频区
        vrc = $('.video-range-container'),         //  进度条
        indicator = $('.video-range-indicator'),  //  指示器-电脑
        progress = $('.video-range-progress'),   //  当前进度条
        vrpc = $('.video-range-phone-container'),  //  移动进度条
        inp = $('.video-range-phone-indicator'),   //  移动指示器
        prp = $('.video-range-phone-progress'),    //  移动当前进度条
        percentage = 0,                            //  当前播放进度百分比
        totalTime = 0,                       //   总时间
        isSetVulome = false,                     //  正在设置音量？
        isNoSound = true,                       //  静音？
        isFullScreen = false,                            //  全屏？
        isAndroid = navigator.userAgent.indexOf('Android') > 0;                    //  手机？
    v[0].volume = 0.5;                   //  设置初始音量为0.5
    var vrcw = 0,                         //  进度条长度
        distance = 0,                       //  点击距离
        currPlaybackRate = v[0].defaultPlaybackRate,     //  当前播放速度
        playTimer = null,                         //  进度定时器
        playPhoneTimer = null;                    //  移动进度定时器

    $(v).bind({
        'contextmenu': function (e) {
            e.preventDefault();
        }
    });  //  阻止默认右键菜单
    $('[data-action="pause"]').click(function () {
        clearInterval(playTimer);
        v[0].pause();
    });  //  暂停
    $('[data-action="play"]').click(function () {
        clearInterval(playTimer);
        v[0].play();
        totalTime = parseInt(v[0].duration);  //  无法在播放前取得时间
//                console.info(totalTime);
        currPlaybackRate = 1;
        v[0].playbackRate = 1;
        playbackRateShow[0].innerHTML = currPlaybackRate.toFixed(1);
        //  重置播放速度
        playTimer = setInterval(function () {
            playVideo(parseInt(v[0].currentTime), currPlaybackRate);
        }, 1000);
    });  //  播放
    $('[data-action="backward"]').click(function () {
        clearInterval(playTimer);  //  清除定时器
        currPlaybackRate -= 0.5;
        if(currPlaybackRate <= 0.5){
            currPlaybackRate = 0.5;
        }  //   设置最低播放速度为0.5
        v[0].playbackRate = currPlaybackRate;
        playbackRateShow[0].innerHTML = currPlaybackRate.toFixed(1);
        playTimer = setInterval(function () {
            playVideo(parseInt(v[0].currentTime), currPlaybackRate);
        }, 1000);
    });  //  慢进
    $('[data-action="forward"]').click(function () {
        clearInterval(playTimer);
        currPlaybackRate += 0.5;
        if(currPlaybackRate >= 3){
            currPlaybackRate = 3;
        }  //  设置最高播放速度为3
        v[0].playbackRate = currPlaybackRate;
        playbackRateShow[0].innerHTML = currPlaybackRate.toFixed(1);
        playTimer = setInterval(function () {
            playVideo(parseInt(v[0].currentTime), currPlaybackRate);
        }, 1000);
    });  //  快进
    $(vrc).click(function (e) {
        vrcw = parseInt($(this).width());
//                console.log(a);
//                showClientLeft(this);
        clearInterval(playTimer);
        distance = e.pageX - parseInt($(this).offset().left);
        if(distance > vrcw){
            distance = vrcw;
        }
        percentage = parseInt(distance*100/vrcw);
        indicator[0].style.left = (distance - 2) +'px';
        indicator[0].style.transition = '1s ease-in';
        progress[0].style.width = percentage +'%';
        progress[0].style.transition = '1s ease-in 1s';
        indicator[0].dataset.originalTitle = stm(percentage/100*totalTime);
        v[0].currentTime = percentage/100 * totalTime;
        playTimer = setInterval(function () {
            playVideo(parseInt(v[0].currentTime), currPlaybackRate);
        }, 1000);
//                console.log(e.pageX, $(this).offset().left, percentage +'%');
    });  //  设置播放进度
    $('[data-action="volume"]').click(function () {
        var vol1 = $('.volume-range'),
            vol2 = $('.volume-range-container'),
            vol3 = $('.volume-range-progress');
        if(isSetVulome){
            vol1[0].style.opacity = 0;
            vol1[0].style.transition = '0s';
            vol2[0].style.top = '200px';
            vol2[0].style.transition = '0s';
            vol3[0].style.height = '184px';
            vol3[0].style.transition = '0s';
            isSetVulome = false;
        } else{
            vol1[0].style.opacity = 1;
            vol1[0].style.transition = '1s';
            vol2[0].style.top = '8px';
            vol2[0].style.transition = '1s ease-in';
            vol3[0].style.height = '92px';
            vol3[0].style.transition = '1s ease-out 1s';
            isSetVulome = true;
        }
    }).dblclick(function () {
        v[0].muted = isNoSound;
        isNoSound = !(isNoSound);
        $(this).children('i').toggleClass('fa-volume-off fa-volume-up');
    });  //  切换音量控制
    $('.volume-range-container').click(function (e) {
        var a = 184 - (e.pageY - parseInt($(this).offset().top)),   //  取得音量高度
            vol = $('.volume-range-progress');
        v[0].volume = parseInt(a/18)/10;
        vol[0].style.height = (184-a) +'px';
        vol[0].style.transition = '1s';
    });  //  音量调整

    //   以上是一系列在电脑端的效果

    $('[data-action="play-phone"]').click(function () {
        totalTime = v[0].duration;
        if(v[0].paused){
            v[0].play();
            $(this).children('i').addClass('fa-pause').removeClass('fa-play');
            playPhoneTimer = setInterval(function () {
                playVideoPhone(v[0].currentTime);
            });
        } else{
            v[0].pause();
            $(this).children('i').addClass('fa-play').removeClass('fa-pause');
        }
    });  //  手机播放
    $('.video-range-phone').bind({
        'touchstart': function () {
            clearInterval(playPhoneTimer);
            console.log('开始');
        },
        'touchmove': function (e) {
            e.preventDefault();    //  手机触屏移动默认是滚动，取消之！
            var a = e.touches[0].pageX - parseInt($(vrpc).offset().left),  //  移动距离
                b = parseInt($(vrpc).width());                                       //  总长度
            if(a > b){
                a = b;
            } else if(a < 0){
                a = 0;
            }  //  设置初始进度    0 ~ b
            $(inp).css('left', (a-24) +'px');
            percentage = a / b;
        },
        'touchend': function () {
            v[0].currentTime = totalTime * percentage;
            prp[0].style.width = (parseInt($(inp).css('left')) + 24) +'px';
            prp[0].style.transition = '1s ease-in';
            inp[0].dataset.originalTitle = stm(totalTime*percentage);
            playPhoneTimer = setInterval(function () {
                playVideoPhone(v[0].currentTime);
            }, 1000);
        }
    });  //  滑动进度

    $('[data-action="fullScreen"]').click(function () {
        if(isAndroid){
            if(window.orientation == 0 || window.orientation == 180){
                alert('手机全屏请到设置里调整横屏！');
            } else{
                alert('旋转屏幕取消全屏');
            }
        }   //  手机,fullscreen API问题大，这里我通过orientation来确定
        else{
            if(isFullScreen){
                isFullScreen = false;
                exitFullScreen(document);
            } else{
                isFullScreen = true;
                lanuchFullScreen(vc[0]);
            }
            setTimeout(function () {
                vrcw = $(vrc).width();
                indicator[0].style.left = (vrcw*percentage/100 - 2) +'px';
                indicator[0].style.transition = '0s';
                console.log(vrcw);
            }, 1000);
        }  //  电脑
    });  //  全屏模式
    window.onorientationchange = function () {
        if(window.orientation == 90 || window.orientation == -90){
            $(vc).bind({
                'touchmove': function (e) {
                    e.preventDefault();
                }
            });
            window.scrollTo(0, $(v).offset().top + 40);
        } else{
            $(vc).unbind('touchmove');
        }
    };  //  手机横屏模式

    function stm(sec) {
        var h = parseInt(sec/3600),
            m = parseInt(sec/60 - h*60),
            s = parseInt(sec%60);
        return h +':'+ m +':'+ s;
    }  //  秒数转成h-m-s格式
    function playVideo(index, sudu) {
        var y1 = parseInt(totalTime/vrcw);
        var y2 = totalTime % vrcw;    //  以一个像素为单位调整时间，计算一个像素移动所需最低时间
        if(index >= totalTime){
            clearInterval(playTimer);
        }
        var k = parseInt(index - y2);
        if( k%y1 == 0 ){
            indicator[0].style.left = (k/y1 - 2) +'px';
            progress[0].style.width = k*100/y1/vrcw +'%';
            indicator[0].dataset.originalTitle = stm(k);
        }
//                console.log(index);
        index  = index + sudu;
    }  //  时间定时器，控制播放条进度
    function playVideoPhone(index) {
        var y1 = parseInt(totalTime/parseInt($(vrpc).width()));
        var y2 = totalTime % y1;
        if(index >= totalTime){
            clearInterval(playPhoneTimer);
        }
        var k = parseInt(index - y2);
        if(k%y1 == 0){
            inp[0].style.left = (k/y1 -24) +'px';
            inp[0].dataset.originalTitle = stm(k);
            prp[0].style.width = k/y1 +'px';
        }
        index ++;
    }  //  移动端定时器，控制播放进度
    function showClientLeft(elem) {
        var p = elem.parentNode,
            x = elem.offsetLeft,
            e = 0;
        console.log(e, elem, x);
        while(p){
            e ++;
            console.log(e, p, p.offsetLeft);
            x += p.offsetLeft;
            if(p.tagName == 'BODY'){
                break;
            }
            p = p.parentNode;
        }
    }  //  打印每个元素的offsetLeft,,,,,额，我其实推荐jquery的offset().left很不错的方法，直接返回了
    function lanuchFullScreen(elem) {
        if(elem.requestFullscreen){
            elem.requestFullscreen();
        } else if(elem.mozRequestFullScreen){
            elem.mozRequestFullScreen();
        } else if(elem.webkitRequestFullscreen){
            elem.webkitRequestFullscreen();
        } else if(elem.msRequestFullscreen){
            elem.msRequestFullscreen();
        }
    }  //  启动全屏
    function exitFullScreen(elem) {
        if(elem.exitFullscreen){
            elem.exitFullscreen();
        } else if(elem.mozCancelFullScreen){
            elem.mozCancelFullScreen();
        } else if(elem.webkitExitFullscreen){
            elem.webkitExitFullscreen();
        }
        //   ie不支持js退出，只能按esc按钮
        //   退出元素只能是document
    }  //  退出全屏
});