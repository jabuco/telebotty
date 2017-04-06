/*!
    
 =========================================================
 * Material Kit - v1.1.1.0
 =========================================================
 
 * Product Page: http://www.creative-tim.com/product/material-kit
 * Copyright 2017 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/timcreative/material-kit/blob/master/LICENSE.md)
 
 =========================================================
 
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 
 */

var transparent = true;

var transparentDemo = true;
var fixedTop = false;

var navbar_initialized = false;

$(document).ready(function() {

    // Init Material scripts for buttons ripples, inputs animations etc, more info on the next link https://github.com/FezVrasta/bootstrap-material-design#materialjs
    $.material.init();

    //  Activate the Tooltips
    $('[data-toggle="tooltip"], [rel="tooltip"]').tooltip();

    // Activate Datepicker
    if ($('.datepicker').length != 0) {
        $('.datepicker').datepicker({
            weekStart: 1
        });
    }

    // Check if we have the class "navbar-color-on-scroll" then add the function to remove the class "navbar-transparent" so it will transform to a plain color.
    if ($('.navbar-color-on-scroll').length != 0) {
        $(window).on('scroll', materialKit.checkScrollForTransparentNavbar)
    }

    // Activate Popovers
    $('[data-toggle="popover"]').popover();

    // Active Carousel
    $('.carousel').carousel({
        interval: 400000
    });

});

materialKit = {
    misc: {
        navbar_menu_visible: 0
    },

    checkScrollForTransparentNavbar: debounce(function() {
        if ($(document).scrollTop() > 260) {
            if (transparent) {
                transparent = false;
                $('.navbar-color-on-scroll').removeClass('navbar-transparent');
            }
        } else {
            if (!transparent) {
                transparent = true;
                $('.navbar-color-on-scroll').addClass('navbar-transparent');
            }
        }
    }, 17),

    initSliders: function() {
        // Sliders for demo purpose
        $('#sliderRegular').noUiSlider({
            start: 40,
            connect: "lower",
            range: {
                min: 0,
                max: 100
            }
        });

        $('#sliderDouble').noUiSlider({
            start: [20, 60],
            connect: true,
            range: {
                min: 0,
                max: 100
            }
        });
    }
}


var big_image;

materialKitDemo = {
        checkScrollForParallax: debounce(function() {
            var current_scroll = $(this).scrollTop();

            oVal = ($(window).scrollTop() / 3);
            big_image.css({
                'transform': 'translate3d(0,' + oVal + 'px,0)',
                '-webkit-transform': 'translate3d(0,' + oVal + 'px,0)',
                '-ms-transform': 'translate3d(0,' + oVal + 'px,0)',
                '-o-transform': 'translate3d(0,' + oVal + 'px,0)'
            });

        }, 6)

    }
    // Returns a function, that, as long as it continues to be invoked, will not
    // be triggered. The function will be called after it stops being called for
    // N milliseconds. If `immediate` is passed, trigger the function on the
    // leading edge, instead of the trailing.

function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        }, wait);
        if (immediate && !timeout) func.apply(context, args);
    };
};
$(document).ready(function() {
    var socket = io.connect("cfd.bricksoft.de:9600");
    var username;
    var loggedin = false;

    function showAlert(name) {
        $('#' + name).show();
        setTimeout(function() {
            $('#' + name).fadeTo(300, 0.3).slideUp(500, function() {
                $('#' + name).fadeTo(0, 1);
                $('#' + name).hide();
            });
        }, 5000);
    }

    function help() {
        receive({
            text: "You can use the following commands:\r\n" +
                "      /help /nick /clear\r\n" +
                ((typeof username === 'undefined') ? "Before you can send a message you need to register with /nick USERNAME" : ""),
            name: "Chat"
        });
    }

    function nick(str) {
        if (!username && !str.startsWith("/nick ")) {
            if (str.startsWith("/help")) {
                help();
                return false;
            }
            receive({ text: "Error: You don't have a username!" });
            showAlert("warning");
        } else {
            if (str.startsWith("/nick")) {
                if (str.length >= 9) {
                    username = str.substring(6, str.lenght);
                    loggedin = true;
                    receive({ text: "You are now known as '" + username + "'" });
                } else {
                    receive({ text: "Error: Your Username is too short!" });
                    showAlert("warning");
                }
            } else return true;
        }
        return false;
    }

    function clear() {
        $('#chat').text("");
        receive({ text: "Chat was cleared.", name: "Chat" });
    }

    function command(text) {
        switch (text) {
            case '/clear':
                clear();
                break;
            case '/help':
                help();
                break;
            default:
                if (!text.startsWith("/nick")) receive({ text: "Error: command not found." });
        }
    }

    function send() {
        var text = $('#sendtext').val();
        if (nick(text)) {
            if (text.startsWith("/")) {
                command(text);
            } else socket.emit('chat', { name: username, text: text });
        }

        $('#sendtext').val('');
    }

    function receive(data) {
        var time = data.time ? new Date(data.time) : new Date();
        data.name = data.name ? data.name : "Server";
        if (data.text.replace(/\s/g, "") === "") { return; }
        $("#chat").append($('<li></li>').append(
            $('<span>').text('[' +
                (time.getHours() < 10 ? '0' + time.getHours() : time.getHours()) +
                ':' +
                (time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()) +
                '] '
            ),
            $('<b>').text(typeof(data.name) != 'undefined' ? data.name + ': ' : ''),
            $('<span>').text(data.text))).scrollTop($('#chat')[0].scrollHeight);
        // hotword warning / password warning
        var p = ["password", "passwort", "pass", "pw"];
        console.log(data.text);
        for (var v of p) {
            if (!loggedin) { break; }
            if (data.text.indexOf(v) >= 0) {
                showAlert("passwordnotice");
                break;
            }
        }
    }
    showAlert("passwordnotice");
    socket.on('chat', function(data) { receive(data); });
    $('#send').click(send);
    $('#sendtext').keypress(function(e) { if (e.which == 13) { send(); } });
});