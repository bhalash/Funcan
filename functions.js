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

function containerWidths() {
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

function siteTitlePos() {
    // Header title positon.
    var a = $('#site-title');
    var b = $('#site-blurb');
    var c = a.height();
    var d = b.height();
    var f = $('#social').height();

    // 50% header height - half of 50% the h1 height, to center vertically. 
    a.css('padding-top', ($('header').height() * 0.5) - (c + d + f) * 0.5);
}

function clearSearch(obj) {
    // Clears the default value from inputs.
    var str = 'Search Funcan...';

    if (obj.value == str) {
        obj.value = '';
    } else if (obj.value == '') {
        obj.value = str;
    }
}

function searchButtonPos() {
    // Anchors the search button to the right side of the search bar.
    var a = $('#sidebar-search input[name=search-submit]');
    var b = $('#content-col-1');
    a.css('margin-left', b.width() - a.width() - 30);
}

function socialWidgetHeight() {
    // Social link height, to keep them perfectly circular.
    $('#social a').css('height', $('#social a').width() + 'px'); 
}

$(document).ready(
    function() {
        containerWidths();
        headerHeight();
        searchButtonPos();
        siteTitlePos();
        socialWidgetHeight();
    }
);

$(window).on('resize',
    function() {
        containerWidths();
        headerHeight();
        searchButtonPos();
        siteTitlePos();
        socialWidgetHeight();
    }
);    