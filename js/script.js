$(document).ready(function(){

    // Cache the Window object
    $window = $(window);


            // Alle internen Links auswählen
        $('a[href*=#]').bind("click", function(event) {
            // Standard Verhalten unterdrücken
            event.preventDefault();
            // Linkziel in Variable schreiben
            var ziel = $(this).attr("href");
            //Scrollen der Seite animieren, body benötigt für Safari
            $('html,body').animate({
                //Zum Ziel scrollen (Variable)
                scrollTop: $(ziel).offset().top
            // Dauer der Animation und Callbackfunktion die nach der Animation aufgerufen wird, sie stellt das Standardverhalten wieder her und ergänzt die URL
            }, 1000 , function (){location.hash = ziel;});
            return false;
        });


    $('section[data-type="background"]').each(function(){
        var $bgobj = $(this); // assigning the object

        $(window).scroll(function() {

            // Scroll the background at var speed
            // the yPos is a negative value because we're scrolling it UP!
            var yPos = -($window.scrollTop() / $bgobj.data('speed'));

            // Put together our final background position
            var coords = '50% '+ yPos + 'px';

            // Move the background
            $bgobj.css({ backgroundPosition: coords });

        }); // window scroll Ends

    });



});