/**
 * Created by 战-不败的象征 on 2017/3/31.
 */
$(document).ready(function () {
    $('#thank-btn').click(function () {
        $('#thank').collapse();
    });

    var anchors = $('.life-table').find('a');
    $(anchors).click(function () {
        sessionStorage.setItem('riQi', this.dataset.riqi);
    });
    //   由于我的文章需要弹出来，所以我这里得存点数据，毕竟要触发嘛

    try{
        $('#carousel').bind({
            'touchstart': function (e) {
                $(this).data('first', e.touches[0].clientX);
            },
            'touchend': function (e) {
                if($(this).data('first') > e.changedTouches[0].clientX){
                    $(this).carousel('next');
                }
//                        else if($(this).data('first') < e.changedTouches[0].clientX){
//                            $(this).carousel('prev');
//                        }               //  这里本来是为了调试在驰为hi8上的浏览器的，但是发现不支持，好歹也添加一个，用户能控制下
                else{
                    $(this).carousel('prev');
                }
            }
        });
    } catch(e){
        alert('出错！'+ e.message);
    }
    //  移动端滑动功能
    if(navigator.userAgent.indexOf('Android') > -1){
        $('#prev, #next').remove();
    }

});
