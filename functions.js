// Break point before the site switches from "desktop" mode to "mobile" mode.
bp = 1025;

function headerHeight() {
    // Header container size + back overlay size.
    var a = $('header');
    var b = $('#site-container');

    // Height is window height - (margin-top * 2)
    var c = parseInt(b.css('margin-top'), 10); 

    if ($(window).width() > bp) {
        a.css(
            'height', 
            $(window).height() - (c * 2)
        );
    } else {
        a.css('height', ($(window).height() * 0.75));
    }
    
    // Black overlay that darkens the image. 
    $('#header-screen').css('height', a.height());
}

function conWidth() {
    // Header container width.
    var a = $('header');
    var b = $('#header-screen');
    var c = $('#content-container');
    a.css('width', c.width());
    b.css('wdith', a.width());
}

function sidebarHeight() {
    // Sets the height of the sidebar to that of the content column.
    var a = $('#content-col-0').height();
    var b = $('#content-1');

    if ($(window).width() > bp) {
        $(b).css('height', a + 'px');
    } else {
        $(b).css('height', 'auto');
    } 
} 

function navPos() {
    // The navigation div lies iin an off-centered (#content-0) container.
    // It therefore has to be offset to the right by a specific amount in order to be
    // centered on screen.
    var a = $('#site-nav');
    var b = 'margin-left';
    var c = $('#content-container');

    if ($(window).width() > bp) {
        // (window.width / 2 ) - (content-container left offsent) - (site-nav width / 2) +5
        a.css(b, ($(window).width() * 0.5) - c.offset().left - (a.width() * 0.5) + 5);
    } else {
        a.css(b, 'auto');
    }
}

function siteTitlePos() {
    // Header title positon.
    // The title should be absolutely centered on on the header at all times.
    var a = $('#site-title');
    var b = $('#site-blurb');
    var c = a.height();
    var d = b.height();
    var f = $('#social').height();

    // 50% header height - half of 50% the h1 height, to center vertically. 
    a.css('padding-top', ($('header').height() * 0.5) - (c + d + f) * 0.5);
}

function clearSearch(obj) {
    // Clears and restores the default value from the search input.
    var str = 'Search Funcan...';

    if (obj.value == str) {
        obj.value = '';
    } else if (obj.value == '') {
        obj.value = str;
    }
}
function socialHeight() {// Social link height, to keep them perfectly circular.
    $('#social a').css('height', $('#social a').width() + 'px'); 
}

$(document).ready(
    function() {
        conWidth();
        headerHeight();
        navPos();
        siteTitlePos();
        socialHeight();
    }
);

$(window).on('resize',
    function() {
        conWidth();
        headerHeight();
        navPos();
        siteTitlePos();
        socialHeight();
    }
);    