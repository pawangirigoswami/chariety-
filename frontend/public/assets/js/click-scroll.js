// //jquery-click-scroll
// //by syamsul'isul' Arifin

// var sectionArray = [1, 2, 3, 4, 5, 6];

// $.each(sectionArray, function(index, value){
          
//      $(document).scroll(function(){
//          var offsetSection = $('#' + 'section_' + value).offset().top - 90;
//          var docScroll = $(document).scrollTop();
//          var docScroll1 = docScroll + 1;
         
        
//          if ( docScroll1 >= offsetSection ){
//              $('.navbar-nav .nav-item .nav-link').removeClass('active');
//              $('.navbar-nav .nav-item .nav-link:link').addClass('inactive');  
//              $('.navbar-nav .nav-item .nav-link').eq(index).addClass('active');
//              $('.navbar-nav .nav-item .nav-link').eq(index).removeClass('inactive');
//          }
         
//      });
    
//     $('.click-scroll').eq(index).click(function(e){
//         var offsetClick = $('#' + 'section_' + value).offset().top - 90;
//         e.preventDefault();
//         $('html, body').animate({
//             'scrollTop':offsetClick
//         }, 300)
//     });
    
// });

// $(document).ready(function(){
//     $('.navbar-nav .nav-item .nav-link:link').addClass('inactive');    
//     $('.navbar-nav .nav-item .nav-link').eq(0).addClass('active');
//     $('.navbar-nav .nav-item .nav-link:link').eq(0).removeClass('inactive');
// });

var sectionArray = [1, 2, 3, 4, 5, 6];

$.each(sectionArray, function(index, value){
    var $section = $('#section_' + value);

    // Skip iteration if section doesn't exist
    if ($section.length === 0) return;

    $(document).scroll(function(){
        var offsetSection = $section.offset().top - 90;
        var docScroll = $(document).scrollTop();
        var docScroll1 = docScroll + 1;

        if (docScroll1 >= offsetSection){
            $('.navbar-nav .nav-item .nav-link').removeClass('active');
            $('.navbar-nav .nav-item .nav-link:link').addClass('inactive');
            $('.navbar-nav .nav-item .nav-link').eq(index).addClass('active');
            $('.navbar-nav .nav-item .nav-link').eq(index).removeClass('inactive');
        }
    });

    $('.click-scroll').eq(index).click(function(e){
        var href = $(this).attr('href');
        var $target = $(href);

        if ($target.length) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: $target.offset().top - 90
            }, 500);
        }
    });
});

$(document).ready(function(){
    $('.navbar-nav .nav-item .nav-link:link').addClass('inactive');
    $('.navbar-nav .nav-item .nav-link').eq(0).addClass('active');
    $('.navbar-nav .nav-item .nav-link:link').eq(0).removeClass('inactive');
});
