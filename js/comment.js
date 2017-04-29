/**
 * Created by 战-不败的象征 on 2017/4/11.
 */
$(document).ready(function () {
    $('#thank-btn').click(function () {
        $('#thank').collapse();
    });
    $('[data-toggle="tooltip"]').tooltip();
    //  bootstrap组件触发

    var replay1 = '<div class="well well-sm"><p><i class="fa fa-user-md"></i><span>&nbsp;',
        replay2 = '</span><span style="float: right"><i class="fa fa-',
        replay3 = '"></i><sub>',
        replay4 = '</sub></span></p><p style="text-indent: 2em">',
        replay5 = '</p></div>';
    $.ajax({
        url: 'load.php',
        type: 'get',
        async: false,
        success: function (data) {
            var info = eval(data);
            var len = info.length - 1;
            for(var i=0;i<len;i++){
                var a = $('.comment-container').eq(1).hide().clone();
                $(a).show();
                $(a).find('img').attr('src', 'upload/'+ info[i]['img']);  //  头像
                $(a).find('h5').children('span').eq(0).text(info[i]['title']);  //  标题
                $(a).find('h5').children('span').eq(1).text(info[i]['progressNum'] +'%');  //  个性值
                $(a).find('.comment-info').children('span').eq(0).text(info[i]['name']);  //  名字
                $(a).find('.comment-info').children('span').eq(1).text(info[i]['qq']);  //  QQ
                $(a).find('.comment-info').children('span').eq(2).text(info[i]['date']);  //  时间
                $(a).find('.comment-info').children('span').eq(3).text(info[i]['address']);  //  地点
                $(a).find('p').eq(1).text(info[i]['content']);  //  内容
                $(a).find('.border').css('border-color', info[i]['color']);  //  颜色
                $(a).find('#comments-0').attr('id','comments-'+ info[i]['id']);  //  第几个
                $(a).find('.comment-action').children('button').eq(1)[0].dataset.target = '#comments-'+ info[i]['id'];//  第几个
                $(a).find('.praise').text(info[i]['praise'])
                    .parent().next('button').children('span').eq(1).text(info[i]['replay'].length-1);
                for(var j=0;j<(info[i]['replay'].length-1);j++){
                    $(a).find('.replay').append(
                        replay1 + info[i]['replay'][j]['name'] +
                        replay2 + info[i]['replay'][j]['type'] +
                        replay3 + info[i]['replay'][j]['date'] +
                        replay4 + info[i]['replay'][j]['text'] +
                        replay5
                    );
                }
                //  加载回复
                $('.container').append(a);
            }
        }
    });
    //   加载大家的评论


    var step1 = $('#step1'),
        step2 = $('#step2'),
        step3 = $('#step3'),
        step4 = $('#step4'),
        preview = $('.comment.preview');
    $(step1).find('input').keyup(function () {
        $(preview).find('h5').children('span').eq(0).text($(this).val());
    });  //  标题
    $(step1).find('textarea').keyup(function () {
        $(preview).find('p').eq(1).text($(this).val());
    });  //  内容
    $(step2).find('input').eq(0).keyup(function () {
        $(preview).find('.comment-info').find('span').eq(0).text($(this).val());
    });  //  姓名
    $(step2).find('input').eq(1).keyup(function () {
        $(preview).find('.comment-info').find('span').eq(1).text($(this).val());
    });  //  QQ
    $(step3).find('input').eq(0).keyup(function () {
        $(preview).find('.comment-info').find('span').eq(2).text($(this).val());
    });  //  时间
    $(step3).find('input').eq(1).keyup(function () {
        $(preview).find('.comment-info').find('span').eq(3).text($(this).val());
    });  //  地点
    $('.color-list').children('tbody').click(function (e) {
        var c = e.target.bgColor;
        $(this).next().find('th').eq(1)[0].bgColor = c;
        $(this).parent().next('input').val(c);
        $(preview).find('.border').css('border-color', c);
    });
    //  选择颜色
    document.querySelector('input[type="file"]').onchange = function (e) {
        preivewImg(e || event);
    };
    //  这里需要用原生方法监听，不然有些浏览器有问题
    var imgSuccess = document.createElement('img');
    imgSuccess.src = 'pic/imgSuccess.jpg';
    imgSuccess.className = 'img-responsive';
    imgSuccess.style.marginBottom = '20px';
    document.getElementById('carousel-form').onsubmit = function (e) {
        e.preventDefault();
        var s1 = $.trim($(step1).find('input').val()),
            s2 = $.trim($(step1).find('textarea').val()),
            s3 = $.trim($(step2).find('input').eq(0).val()),
            s4 = $.trim($(step2).find('input').eq(1).val()),
            s5 = $.trim($(step3).find('input').eq(0).val()),
            s6 = $.trim($(step3).find('input').eq(1).val()),
            s7 = $(step4).find('input').val(),
            s8 = $(step4).find('th').eq(1)[0].bgColor,
            progressNum = 0,
            isSubmit = false;
        if(s1 != "" && s1 != '愿这青春如烈火般奔放跳跃'){
            console.log(1);
            progressNum += 12.5;
        }
        if(s2 != '' && s2 != '星空在闪烁，是你的眼泪悄悄滑过'){
            console.log(2);
            progressNum += 12.5;
        }
        if(s3 != '' && s3 != '佚名'){
            console.log(3);
            progressNum += 12.5;
        }
        if(s4 != '' && s4 != '88888888'){
            console.log(4);
            progressNum += 12.5;
        }
        if(s5 != '' && s5 != '2017-4-10'){
            console.log(5);
            progressNum += 12.5;
        }
        if(s6 != '' && s6 != '宇宙火星'){
            console.log(6);
            progressNum += 12.5;
        }
        if(s7 != ''){
            console.log(7);
            progressNum += 12.5;
        }
        if(s8 != '#4b0082'){
            console.log(8);
            progressNum += 12.5;
        }
        document.querySelector('input[name="progressNum"]').value = progressNum;
        this.querySelector('input[name="id"]').value = document.querySelectorAll('.comment-container').length-1;
        // alert(document.querySelectorAll('.comment-container').length-1);
        if(progressNum < 100){
            if(confirm('当前个性度为：'+ progressNum +'%\n(个性度高优先展示)\n确定不去提高自己的个性度而提交吗？')){
//                        console.log(this.parentNode, this, imgSuccess);
                this.submit();
                isSubmit = true;
            }
        } else{
            this.submit();
            isSubmit = true;
        }
        if(isSubmit){
            $('.loading').show();
            var f = this;
            setTimeout(function () {
                f.parentNode.replaceChild(imgSuccess, f);
                $('.loading').hide();
            }, 5000);
        }
    };
    //  预览、添加评论

    $('.praise').parent().click(function () {
        var tt = parseInt($(this).children('.praise').text()),
            num = $(this).parent().next('div').attr('id');
        num = num.substr(9);
        $(this).children('.praise').text(tt+1);
        $(this).attr('disabled', 'disabled');
        $.ajax({
            url: 'countPraise.php',
            type: 'post',
            data: { id: num, praise: tt+1 }
        });
    });
    //  点赞

    $('.btn-success').click(function (e) {
        e.preventDefault();
        var num = $(this).parent().parent().attr('id'),
            d = new Date(),
            s = navigator.userAgent.indexOf('Android') > -1 ? 'mobile-phone':'desktop',
            inputt = $.trim($(this).parent().find('input').val()),
            textareaa = $.trim($(this).parent().find('textarea').val());
        var now = d.getFullYear() +'-'+ (d.getMonth()+1) +'-'+ d.getDate();
        num = parseInt(num.substr(9));
        $(this).prev().val(now)
            .prev().val(s)
            .prev().val(num);
        if(inputt != '' && textareaa != ''){
            this.parentNode.submit();
            var suc = $(this).parent().parent().prev().children('button').eq(1).children('span').eq(1);
            $(suc).text(parseInt($(suc).text())+1);
            $(this).parent().parent().append(replay1+inputt+replay2+s+replay3+now+replay4+textareaa+replay5);
        }
    });
    //  回复,设置时间、设备、id、


    function preivewImg(event) {
        var files = event.target.files || event.srcElement.files,
            reader = new FileReader();
        var isImg = /png || jpeg/.test(files[0].type) || /image/.test(files[0].name);
        if(isImg){
            reader.readAsDataURL(files[0]);
            reader.onload = function () {
                $('.img-container.preview').children('img').attr('src', reader.result);
            }
        }
        else{
            alert('只支持jpg,png!');
        }
    }
    //  使用FileReader API预览图片
});
