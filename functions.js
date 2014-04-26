// Break point before the site switches from "desktop" mode to "mobile" mode.
widthBreak = 1025;

function headerHeight() {
    // Header container size + back overlay size.
    // Size is set to window minus equal top and side margins.
    var topMargin = parseInt($('.site-container').css('margin-top'), 10); 

    if ($(window).width() > widthBreak) {
        $('header').css('height', $(window).height() - (topMargin * 2));
    } else {
        $('header').css('height', ($(window).height() * 0.75));
    }
    
    // Black overlay that dims the image. 
    $('.header-screen').css('height', $('header').height());
}

function headerWidth() {
    // Header container, and header-screen, width.
    $('header').css('width', $('.content-container').width());
    $('.header-screen').css('wdith', $('header').width());
}

function headerTitlePosition() {
    // Header title positon.
    // The title should be absolutely centered on on the header at all times.
    $('.title').css('padding-top',
        ($('header').height() * 0.5) - 
        ($('.title').height() + $('.blurb').height() + $('.social').height()) * 0.5
    );
}

function navigationPosition() {
    // The navigation div lies iin an off-centered (.content-0) container.
    // It therefore has to be offset to the right by a specific amount in order 
    //to be centered on screen.

    if ($(window).width() > widthBreak) {
        $('.site-nav').css('margin-left', ($(window).width() * 0.5) 
        - $('.content-container').offset().left - ($('.site-nav').width() * 0.5) + 5);
    } else {
        $('.site-nav').css('margin-left', 'auto');
    }
}

function socialWidgetHeight() {
    // Widget width is dynamic and proportional to the div container size. 
    // Height = width.
    $('.social a').css('height', $('.social a').width() + 'px'); 
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