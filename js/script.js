$(document).ready(function () {




    $.ajax({
        type:"GET",
        dataType:"json",
        url:'content.json',


        success:function (data) {


            buildDorf(data);

            showFirstArticles();
            showSecondArticles();
            showZitat1();
            buildCircles(data)
            showZitat2();
            showZitat4();
            showImages();
            showCircles();

        },
        error:function () {
            alert('failure');
        }
    });

    if ($(window).scroll) {

        $('.footer').hide();
    }

    // Cache the Window object
    $window = $(window);


    $('section[data-type="background"]').each(function () {
        var $bgobj = $(this); // assigning the object

        $(window).scroll(function () {
            var check = 1;
            if (check === 1) {

                $('.footer').hide();

            }


            // Scroll the background at var speed
            // the yPos is a negative value because we're scrolling it UP!
            var yPos = -($window.scrollTop() / $bgobj.data('speed'));

            // Put together our final background position
            var coords = '50% ' + yPos + 'px';

            // Move the background
            $bgobj.css({ backgroundPosition:coords });

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

            scrollTop:$(ziel).offset().top
            // Dauer der Animation und Callbackfunktion die nach der Animation aufgerufen wird, sie stellt das Standardverhalten wieder her und ergänzt die URL
        }, 1000, function () {
            location.hash = ziel;
        });
        return false;
    });


});


// Diese Funktion liest die verschiedenen Artikel aus der "Dorf" Rubrik des content.json Files ein und erzeugt entsprechendes HTML

function buildDorf(data) {

    var header = "";
    var text = "";
    var counter = 0;

    _.each(data["Dorf"], function (key, value) {


        _.each(data["Dorf"][value], function (value, key) {


            if (key === "header" && value !== "") {


                if (key && key === "header") {

                    header = '<h3 class="header">' + value + '</h3>'

                }
            } else if (key && key === "text") {

                text = value;
                counter++;
            }


        });

        var elem = '<div class="artikel artikel' + counter + '">' + header + '<p>' + text + '</p></div>';
        $('#DasDorf').append(elem);


    })


}
function buildCircles(data) {

    var header = "";
    var text = "";
    var counter = 0;

    _.each(data["Circle"], function (key, value) {


            _.each(data["Circle"][value], function (value, key) {


                if (key === "header" && value !== "") {


                    if (key && key === "header") {

                        header = '<h3 class="header">' + value + '</h3>'

                    }
                } else if (key && key === "text") {

                    text = value;
                    counter++;
                }


            });



        var elem = '<div class="circleBase circleType1" id="circle' + counter + '"><div class="wrapper"> '+ header + '<p>' + text + '</p></div></div>';
        $('#DasDorf').append(elem);
        header= ""

    })


}


function showFirstArticles() {

    $(document).scroll(function () {
        var y = $(this).scrollTop();
        console.log(y)
        if (y > 1100) {

            $('.artikel1, .artikel2, .artikel3, .img1, .img2, .img3').fadeIn(800);

        }
        else {
            $('.artikel1, .artikel2, .artikel3, .img1, .img2, .img3').fadeOut();
        }
    });

}
function showSecondArticles() {

    $(document).scroll(function () {
        var y = $(this).scrollTop();
        console.log(y)
        if (y > 1300) {

            $('.artikel4, .artikel5, .artikel6,.artikel7,.img4 ').fadeIn(800);

        }
        else {
            $('.artikel4, .artikel5, .artikel6,.artikel7, .img4').fadeOut();
        }
    });
}

function showZitat1() {

    $(document).scroll(function () {
        var y = $(this).scrollTop();
        console.log(y)
        if (y > 2200) {

//            $('.zitat1').fadeIn(800);
            $('.zitat1').show('slide', {direction: 'right'}, 1000);
        }
        else {
            $('.zitat1').fadeOut();
        }
    });
}
function showZitat2() {

    $(document).scroll(function () {
        var y = $(this).scrollTop();
        console.log(y)
        if (y > 3900) {

//            $('.zitat1').fadeIn(800);
            $('.zitat2').show('slide', {direction: 'left'}, 1000);
            $('.zitat3').show('slide', {direction: 'right'}, 1000);
        }
        else {
            $('.zitat2').hide('slide', {direction: 'left'}, 1000);;
            $('.zitat3').hide('slide', {direction: 'right'}, 1000);;
        }
    });
}

function showImages() {

    $(document).scroll(function () {
        var y = $(this).scrollTop();
        console.log(y)
        if (y > 4200) {

//            $('.zitat1').fadeIn(800);
            $('.img5').fadeIn(1000);
            $('.img6').fadeIn(2300);
            $('.img7').fadeIn(3500);
            $('.img8').fadeIn(4700);
        }
        else {
            $('.img5, .img6, .img7, .img8').fadeOut(1000);
        }
    });
}
function showCircles() {

    $(document).scroll(function () {
        var y = $(this).scrollTop();
        console.log(y)
        if (y > 4500) {

//            $('.zitat1').fadeIn(800);
            $('#circle5').show('slide', {direction: 'up'}, 1000);
            $('#circle6').show('slide', {direction: 'left'}, 1000);
            $('#circle7').show('slide', {direction: 'right'}, 1000);
            $('#circle8').show('slide', {direction: 'down'}, 1000);
        }
        else {

            $('#circle5').hide('slide', {direction: 'up'}, 1000);
            $('#circle6').hide('slide', {direction: 'left'}, 1000);
            $('#circle7').hide('slide', {direction: 'right'}, 1000);
            $('#circle8').hide('slide', {direction: 'down'}, 1000);
        }

        
    });
}



function showZitat4() {

    $(document).scroll(function () {
        var y = $(this).scrollTop();
        console.log(y)
        if (y > 3500) {

//            $('.zitat1').fadeIn(800);
            $('.zitat4').show('slide', {direction: 'left'}, 1000);

            $('#circle1').show('slide', {direction: 'up'}, 1000);
            $('#circle2').show('slide', {direction: 'left'}, 1000);
            $('#circle3').show('slide', {direction: 'right'}, 1000);
            $('#circle4').show('slide', {direction: 'down'}, 1000);
        }
        else {
            $('.zitat4').hide('slide', {direction: 'left'}, 1000);

            $('#circle1').hide('slide', {direction: 'up'}, 1000);
            $('#circle2').hide('slide', {direction: 'left'}, 1000);
            $('#circle3').hide('slide', {direction: 'right'}, 1000);
            $('#circle4').hide('slide', {direction: 'down'}, 1000);
        }
    });
}