/**
 * Created by 战-不败的象征 on 2017/4/7.
 */

function loadBGM() {
    if(navigator.userAgent.indexOf('Android') < 0){
        var audio = document.createElement('audio'),
            now = sessionStorage.getItem('currAudioProgress');
        audio.src = 'video/myFoxPerfectWife.mp3';
        audio.loop = true;
        audio.autoplay = true;
        audio.volume = 0.4;
        if(now){
            audio.currentTime = parseFloat(now);
        }
        document.body.appendChild(audio);
    }
    console.info(sessionStorage.getItem('currAudioProgress'));
    document.onclick = function (e) {
        var E = e || event;
        var t = E.srcElement || E.target;
        if(t.dataset.skip){
            // alert(1);
            sessionStorage.setItem('currAudioProgress', audio.currentTime);
        }
    };
    //  页面跳转音乐不间断
}
//  加载背景音乐
