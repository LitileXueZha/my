/**
 * Created by 战-不败的象征 on 2017/4/6.
 */
$(document).ready(function () {

    loadBGM();
    $('#thank-btn').click(function () {
        $('#thank').collapse();
    });

    var isZIndex = false;
    $('#demo').click(function () {
        if(isZIndex){
            $('#demo-add').html('}');
            $('.demo-title').css('z-index', 0);
        } else{
            $('#demo-add').html('<b>    z-index: 1;</b>     /*  这里  */<br/>    }');
            $('.demo-title').css('z-index', 1);
        }
        isZIndex = !(isZIndex);
    });
    $('[data-toggle="popover"]').popover();
    var pc = $('.progress-container'),
        pb = $('.progress-bar'),
        isTop = false,  //  进度条是否置顶
        x = 71,  //  进度条于页面高度，这个得先设置好，不然下面容易出问题
        x1 = window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight,  //  浏览器窗口高度
        x2 = parseInt($('body').height()),  //  文档总高度
        y1 = $('#article-1').offset().top,
        y2 = $('#article-2').offset().top,
        y3 = $('#article-3').offset().top,
        y4 = $('#article-4').offset().top,
        is1 = is2 = is3 = is4 = false,            //  关于以下用到的is是为了只改变一次data-original-title和data-content
        wy = window.scrollY,
        percentage = 1;
    if(wy < y2){
        is1 = true;
    } else if(wy >= y2 && wy < y3){
        is2 = true;
    } else if(wy >= y3 && wy < y4){
        is3 = true;
    } else{
        is4 = true;
    }
    percentage = parseInt((wy/(x2-x1)).toFixed(2)*100);
    if(percentage < 1){
        percentage = 1;
    } else if(percentage >= 100){
        percentage = 100;
    }
    $(pb).css('width', percentage +'%');
    //  确保进度条实时显示
    $(pc).width($('.navbar').width());
    window.onorientationchange = function () {
        setTimeout(function () {
            $(pc).width($('.navbar').width());
            y1 = $('#article-1').offset().top;
            y2 = $('#article-2').offset().top;
            y3 = $('#article-3').offset().top;
            y4 = $('#article-4').offset().top;
        }, 500);  //  异步代码，用定时器解决
    };
    //  确保导航条宽度与导航一样
    if(window.scrollY > x){
        $(pc).css({
            'top': 0,
            'padding-top': 0
        });
    }
    //  刷新调整进度条位置
    $(window).scroll(function () {
        var y = this.scrollY - x;         //  页面滚动与导航条距离
        if(y > 0){
            if(isTop){} else{
                isTop = true;
                $(pc).css({
                    'top': 0,
                    'padding-top': 0
                });
            }
        } else{
            $(pc).css({
                'top': (-y) +'px',
                'padding-top': 16*(-y)/x +'px'
            });
            isTop = false;
        }
        percentage = parseInt((this.scrollY/(x2-x1)).toFixed(2)*100);
        //  导航条置顶
        if(percentage < 1){
            percentage = 1;
        } else if(percentage >= 100){
            percentage = 100;
        }
        $(pb).css('width', percentage +'%');  //  进度条控制
        var ty = this.scrollY;
        if(ty < y2){
            if(is1){}else{
                pb[0].dataset.originalTitle = '闭包';
                pb[0].dataset.content = '简单来说，就是在函数里创建另一个函数';
                is1 = true;
                is2 = is3 = is4 = false;
            }
        } else if(ty > y2 && ty < y3){
            if(is2){}else{
                pb[0].dataset.originalTitle = 'z-index';
                pb[0].dataset.content = '"上位的标志"，请记住，需position。z-index属性设置元素的堆叠顺序';
                is2 = true;
                is1 = is3 = is4 = false;
            }
        } else if(ty > y3 && ty < y4){
            if(is3){}else{
                pb[0].dataset.originalTitle = '炫丽动画';
                pb[0].dataset.content = '好像有个animate.css挺厉害的，反正我知道动画不可能实现非数字效果滴';
                is3 = true;
                is1 = is2 = is4 = false;
            }
        } else{
            if(is4){}else{
                pb[0].dataset.originalTitle = '文本复制';
                pb[0].dataset.content = '总有些时候，我们不希望自己的文章被拷贝，css就是这么贴心';
                is4 = true;
                is1 = is2 = is3 = false;
            }
        }
    });
});
