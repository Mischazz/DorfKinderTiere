$(document).ready(function () {


    $.getJSON( "content.json", function( data ) {

        console.log(data["Andere über Uns"]);

    });

    if ($(window).scroll) {

        $('.footer').hide();
    }

    // Cache the Window object
    $window = $(window);


    $('section[data-type="background"]').each(function () {
        var $bgobj = $(this); // assigning the object

        $(window).scroll(function () {
            var check = 1
            if (check === 1) {

                $('.footer').hide();

            }


            // Scroll the background at var speed
            // the yPos is a negative value because we're scrolling it UP!
            var yPos = -($window.scrollTop() / $bgobj.data('speed'));

            // Put together our final background position
            var coords = '50% ' + yPos + 'px';

            // Move the background
            $bgobj.css({ backgroundPosition: coords });

        }); // window scroll Ends

    });


    // Automatisches scrollen zur nächsten Section
    //

    // $(window).scroll(function() {
    //     var lastScrollTop = 0;
    //     var st = $(this).scrollTop();

    //     $('section').each(function() {
    //         var docViewTop = $(window).scrollTop();
    //         var docViewBottom = docViewTop + $(window).height();
    //         var elemViewTop = $(this).offset().top;

    //         console.log("docViewBottom" + docViewBottom);
    //         console.log("elemViewTop " + elemViewTop + " " + $('section').attr('name'));
    //         console.log("docViewTop" + docViewTop);
    //         if (docViewTop > elemViewTop > docViewBottom) {

    //             console.log("blja" + $this.attr('name'));
    //         }

    //     });

    //         if (st > lastScrollTop){

    //         } else {
    //           // upscroll code
    //         }
    //     lastScrollTop = st;
    // });


    //
    // Scrollen zu dem Ankerpunkt
    //

    $('a[href*=#]').bind("click", function (event) {
        // Standard Verhalten unterdrücken
        event.preventDefault();
        var ziel = $(this).attr("href");

        $('html,body').animate({

            scrollTop: $(ziel).offset().top
            // Dauer der Animation und Callbackfunktion die nach der Animation aufgerufen wird, sie stellt das Standardverhalten wieder her und ergänzt die URL
        }, 1000, function () {
            location.hash = ziel;
        });
        return false;
    });


});