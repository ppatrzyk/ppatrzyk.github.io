// ---------
// https://stackoverflow.com/questions/14573223/set-cookie-and-get-cookie-with-javascript
function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {
    document.cookie = name+'=; Max-Age=-99999999;';
}
// ---------

function setLight() {
    $('body').removeClass().addClass('light-theme');
    $('#mode-circle').removeClass().addClass('dark-theme');
    $('#mode-desc').text('dark');
}

function setDark() {
    $('body').removeClass().addClass('dark-theme');
    $('#mode-circle').removeClass().addClass('light-theme');
    $('#mode-desc').text('light');
}

function mode() {
    var mode = getCookie('mode');
    if (typeof mode == 'undefined' || mode == 'dark') {
        setLight();
        setCookie("mode", 'light', 999);
    } else {
        setDark();
        setCookie("mode", 'dark', 999);
    }
}

function checkMode() {
    var mode = getCookie('mode');
    if (mode == 'light') {
        setLight();
    }
}