// Break point before the site switches from "desktop" mode to "mobile" mode.
widthBreak = 1025;

function headerHeight() {
    // Header container size + back overlay size.
    // Size is set to window minus equal top and side margins.
    var head = $('header');
    var con = $('.site-container');
    var win = $(window);
    var mTop = parseInt(con.css('margin-top'), 10); 

    if ($(window).width() > widthBreak) {
        head.css('height', win.height() - (mTop * 2));
    } else {
        head.css('height', (win.height() * 0.75));
    }
    
    // Black overlay that dims the image. 
    $('.header-screen').css('height', head.height());
}

function headerWidth() {
    // Header container, and header-screen, width.
    var head = $('header');
    var scr = $('.header-screen');
    var con = $('.content-container');

    head.css('width', con.width());
    scr.css('wdith', head.width());
}

function headerTitlePosition() {
    // Header title positon.
    // The title should be absolutely centered on on the header at all times.
    var title = $('.title');
    var blurb = $('.blurb');
    var social = $('.social');
    var head = $('header'); 

    title.css('padding-top',
        (head.height() * 0.5) - (title.height() + blurb.height() + social.height()) * 0.5
    );
}

function navigationPosition() {
    // The navigation div lies iin an off-centered (.content-0) container.
    // It therefore has to be offset to the right by a specific amount in order 
    //to be centered on screen.
    var nav = $('.site-nav');
    var con = $('.content-container');

    if ($(window).width() > widthBreak) {
        nav.css('margin-left', ($(window).width() * 0.5) 
        - con.offset().left - (nav.width() * 0.5) + 5);
    } else {
        nav.css('margin-left', 'auto');
    }
}

function socialWidgetHeight() {
    // Widget width is dynamic and proportional to the div container size. 
    // Height = width.
    var soc = $('.social a');
    soc.css('height', soc.width() + 'px'); 
}

$(document).ready(
    function() {
        headerWidth();
        headerHeight();
        navigationPosition();
        headerTitlePosition();
        socialWidgetHeight();
    }
);

$(window).on('resize',
    function() {
        headerWidth();
        headerHeight();
        navigationPosition();
        headerTitlePosition();
        socialWidgetHeight();
    }
);    