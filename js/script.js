$(document).ready(function () {


    
    $.ajax({
        type: "GET",
        dataType: "json",
        url: 'content.json',


        success: function (data) {
            $.fn.fullpage();


            buildDorf(data);

            showFirstArticles();
            showSecondArticles();
            showZitat1();
            showZitat2();
            showZitat4();
            showImages();
            showCircles();
            verticalScroll();


        },
        error: function () {
            alert('failure');
        }
    });


    if ($(window).scroll) {

        $('.footer').hide();
    }

    // 
    // Paralax scheiss ;)))
    // 

    // Cache the Window object
    $window = $(window);


//    $('section[data-type="background"]').each(function () {
//        var $bgobj = $(this); // assigning the object
//
//        $(window).scroll(function () {
//            var check = 1;
//            if (check === 1) {
//
//                $('.footer').hide();
//
//            }
//
//
//            // Scroll the background at var speed
//            // the yPos is a negative value because we're scrolling it UP!
//            var yPos = -($window.scrollTop() / $bgobj.data('speed'));
//
//            // Put together our final background position
//            var coords = '50% ' + yPos + 'px';
//
//            // Move the background
//            $bgobj.css({ backgroundPosition:coords });
//
//        }); // window scroll Ends
//
//    });


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
        }, 100, function () {
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
    var type = "";
    var globalVal = ""
    var elementType = ""
    var slideCount = 0;
    _.each(data["Dorf"], function (key, value) {
        type = value;
        globalVal = value;

        _.each(data["Dorf"][value], function (value, key) {

            _.each(data["Dorf"][globalVal][key], function (value, key) {

                if (key === "type" && value === "article") {
                    ;
                    elementType = value;

                } else if (key === "type" && value === "circle") {
                    elementType = value;
                } else if (key === "type" && value === "circleSlide") {
                    elementType = value;
                    slideCount++;
                }

                if (key === "header" && value !== "") {


                    if (key && key === "header") {

                        header = '<h3 class="header">' + value + '</h3>'

                    }
                } else if (key && key === "text") {

                    text = value;
                    counter++;
                }

            })

            if (elementType === "article") {
                var elem = '<div class="artikel artikel' + counter + '">' + header + '<p>' + text + '</p></div>';

                $('#' + type).append(elem);
                header = "";
            } else if (elementType === "circle") {
                var elem = '<div class="circleBase circleType1" id="circle' + counter + '"><div class="wrapper"> ' + header + '<p>' + text + '</p></div></div>';
                $('#' + type).append(elem);
                header = "";
            } else if (elementType === "circleSlide") {
                var elem = '<div class="circleBase circleType1" id="circle' + counter + '"><div class="wrapper"> ' + header + '<p>' + text + '</p></div></div>';

                $('.slide' + slideCount).append(elem);
                header = "";
            }


        });


    })


}
$('.imageWrap').on('click', function () {
    $('.imageWrap img').removeClass('active');
    $(this).find(':first-child').addClass('active');
    $('.detailsWrapper').hide();


    if ($(this).hasClass('person1')) {
        $('.leftSide .img').attr('src', 'assets/ReinerEberlein.jpg')

        $('.details').html('Heilerziehungspfleger, Erlebnispädagoge, Familientherapie i. A., Heilpraktiker i.A. und Teamtraining/ Supervision')
        $('.zitat').html('"Es macht mir Spaß, begeisterte Kinderaugen zu sehen. Für mich ist wichtig, dass Kinder das "Leben" lernen und sich mit den Basics wie den Lebens-Mitteln vertraut machen. Es ist spannend, wie Kinder mit ihrer emotionalen Intelligenz umgehen und wie es ihnen gelingt, diese im Rahmen unserer Woche zu erhöhen."');
        $('.detailsWrapper').show('slide', {direction: 'left'}, 1000)
    } else if ($(this).hasClass('person2')) {

        $('.leftSide img').attr('src', 'assets/Angela_Florian.jpg');
        $('.details').html('Sozialpädagogin, Reittherapeutin');
        $('.zitat').html('"Ich möchte gerne Kinder dabei unterstützen, sich selbst zu organisieren und ihnen dadurch die Möglichkeit geben, neue Erfahrungen in der Gemeinschaft zu sammeln – sei es beim Käsen, Marmelade kochen, Spielen oder im Dorfrat."');
        $('.detailsWrapper').show('slide', {direction: 'left'}, 1000)

    } else if ($(this).hasClass('person3')) {

        $('.leftSide img').attr('src', 'assets/KathieMück.jpg');
        $('.details').html('Pensionierte Bäuerin, Hauswirtschaftlerin');
        $('.zitat').html('"Für die Kinder bin ich wie eine Oma und ich liebe es, mit ihnen zu kochen und sie dabei näher kennen zu lernen."');
        $('.detailsWrapper').show('slide', {direction: 'left'}, 1000)


    }
    else if ($(this).hasClass('person4')) {

        $('.leftSide img').attr('src', 'assets/HildegardEmmerig.jpg');
        $('.details').html('Erzieherin, Hauswirtschaftlerin, Köchin für Schulmittagessen an der Grundschule Moosach, 3 Kinder');
        $('.zitat').html('"Mein Herzensanliegen ist es, Kindern eine Umgebung anzubieten, in der sie "selbsttätig" lebenspraktische Erfahrungen machen können. Beobachtungen, die ich bei der Entwicklung unserer drei eigenen Kinder machen durfte, bestärken mich in meinem Ziel." ');
        $('.detailsWrapper').show('slide', {direction: 'left'}, 1000)


    } else if ($(this).hasClass('person5')) {

        $('.leftSide img').attr('src', 'assets/SeppWörndl.jpg');
        $('.details').html('Pensionierter Volksschullehrer, 5 Enkelkinder');
        $('.zitat').html('"Im Dorf für Kinder und Tiere kann ich meine Liebe im Umgang mit den Kindern mit dem Gärtnerischen verbinden." ');
        $('.detailsWrapper').show('slide', {direction: 'left'}, 1000)


    }
    else if ($(this).hasClass('person6')) {

        $('.leftSide img').attr('src', 'assets/FranziskaW.jpg');
        $('.details').html('Lehrerin, Älplerin, landwirtschaftliche Mitarbeiterin in der Symbiotischen Landwirtschaft, alleinerziehend, eine Tochte');
        $('.zitat').html('"Es war mir immer schon ein Anliegen, Pädagogik mit Landwirtschaft zu verbinden. Hier können die Kinder mit mir in der Symbiotischen Landwirtschaft arbeiten und einen respektvollen Umgang mit den Tieren, den Pflanzen und der Erde kennenlernen. Die Freude und das Selber Tun stehen dabei im Mittelpunkt." ');
        $('.detailsWrapper').show('slide', {direction: 'left'}, 1000)


    } else if ($(this).hasClass('person7')) {

        $('.leftSide img').attr('src', 'assets/IngaBöger.jpg');
        $('.details').html('Grundschullehrerin an der Freien Kinderschule Bremen');
        $('.zitat').html('"Im Dorf für Kinder und Tiere genieße ich es, den ganzen Tag draußen in der Natur zu sein und die Kinder unterstützen zu können, in kurzer Zeit das Zusammenspiel zwischen ökologischer Landwirtschaft und der Natur zu erfahren. In nur einer Woche wird spürbar, dass alle Kinder ihren Teil zur Gemeinschaft beitragen. In kurzer Zeit wird hier in einer natürlichen - und nicht konstruierten – Umgebung ein kleiner Grundstein zum Demokratischen Handeln gelegt." ');
        $('.detailsWrapper').show('slide', {direction: 'left'}, 1000)


    } else if ($(this).hasClass('person8')) {

        $('.leftSide img').attr('src', 'assets/AlexSchuhbauer.jpg');
        $('.details').html('Metzgermeister in Herrmannsdorf, Vater von 2 Kindern');
        $('.zitat').html('"Ich bin mit Leib und Seele Metzgermeister. Im Dorf für Kinder und Tiere kann ich die Qualität dieses Handwerksberuf den Kindern nahebringen: Sie erleben, wie die Tiere hier gelebt haben, sie erfahren, wie man mit Fleisch umgeht und sie lernen, mit den eigenen Händen das Fleisch zu bearbeiten und daraus Würstl zu drehen, die sie am Abend zusammen grillen und essen. Ein paar Kinder machen die Würstl für die ganze Klasse! Für viele ein großes Erfolgserlebnis." ');
        $('.detailsWrapper').show('slide', {direction: 'left'}, 1000)


    }else if ($(this).hasClass('chef1')) {

        $('.leftSide img').attr('src', 'assets/AnneSchweisfurth.jpg');
        $('.details').html('Erster Vorstand und Pädagogische Leitung Sennerin, Bäckerin und Pädagogin, Leitungsteam Hafenmuseum Bremen');
        $('.zitat').html(' "Ich bin ein Fan von entdeckendem und selbstorganisiertem Lernen, bei dem die Kinder all ihre Sinne einsetzen und entwickeln können."');
        $('.detailsWrapper').show('slide', {direction: 'left'}, 1000)


    }else if ($(this).hasClass('chef2')) {

        $('.leftSide img').attr('src', 'assets/Claudia_Weisser.jpg');
        $('.details').html('Geschäftsführerin Pädagogin, Journalistin für Umwelt und Ökologie, Körpertherapeutin');
        $('.zitat').html(' "Ich freue mich auf das neue Dorf nach der großen Renovierung und auf fröhliche Kinder."');
        $('.detailsWrapper').show('slide', {direction: 'left'}, 1000)


    }


})

function showFirstArticles() {

    $(document).scroll(function () {
        var y = $(this).scrollTop();

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

        if (y > 3900) {

//            $('.zitat1').fadeIn(800);
            $('.zitat2').show('slide', {direction: 'left'}, 1000);
            $('.zitat3').show('slide', {direction: 'right'}, 1000);
        }
        else {
            $('.zitat2').hide('slide', {direction: 'left'}, 1000);
            ;
            $('.zitat3').hide('slide', {direction: 'right'}, 1000);
            ;
        }
    });
}

function showImages() {

    $(document).scroll(function () {
        var y = $(this).scrollTop();

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
function verticalScroll() {

    $(".verticalTest").mousewheel(function (event, delta) {

        this.scrollLeft -= (delta * 100);

        event.preventDefault();

    });
}



