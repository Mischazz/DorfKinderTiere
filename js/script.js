$(document).ready(function () {


    $.ajax({
        type:"GET",
        dataType:"json",
        url:'content.json',


        success:function (data) {
//            $.fn.fullpage();


            buildDorf(data);

//            showFirstArticles();
//            showSecondArticles();
            showZitat1();
            showZitat2();
            showZitat4();
            showImages();
            showCircles();
            showfirstImg();


        },
        error:function () {
            alert('failure');
        }
    });


    $(window).on('scroll', function () {

        var scrolltop = $(this).scrollTop();

        if (scrolltop >= 215) {
            $('.NavigationBar').show('slide', {direction:'left'});
        }

        else if (scrolltop <= 210) {
            $('.NavigationBar').fadeOut(250);
        }
    });


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
    var type = "";
    var globalVal = "";
    var elementType = "";
    var slideCount = 0;
    var position = "";
    var layout = "";

    _.each(data["Dorf"], function (key, value) {
        type = value;
        globalVal = value;

        _.each(data["Dorf"][value], function (value, key) {

            _.each(data["Dorf"][globalVal][key], function (value, key) {

                if (key === "type" && value === "article") {

                    elementType = value;

                } else if (key === "type" && value === "circle") {
                    elementType = value;
                } else if (key === "type" && value === "circleSlide") {
                    elementType = value;
                    slideCount++;
                } else if (key === "type" && value === "zitat") {
                    elementType = value;
                }

                if (key === "header" && value !== "") {


                    if (key && key === "header") {

                        header = '<h3 class="header">' + value + '</h3>'

                    }
                } else if (key && key === "text") {

                    text = value;
                    counter++;
                } else if (key && key === "position") {
                    position = value;
                } else if (key && key === "layout") {
                    layout = value
                }

            })

            if (elementType === "article") {
                var elem = '<div class="artikel artikel' + counter + '">' + header + '<p>' + text + '</p></div>';

                $('#' + type + ' ' + '.' + position + ' ' + '.' + layout).append(elem);
                header = "";
            } else if (elementType === "circle") {
                var elem = '<div class="circleBase circleType1" id="circle' + counter + '"><div class="wrapper"> ' + header + '<p>' + text + '</p></div></div>';
                $('#' + type + ' ' + '.' + position + ' ' + '.' + layout).append(elem);

                header = "";
            } else if (elementType === "circleSlide") {
                var elem = '<div class="circleBase circleType1" id="circle' + counter + '"><div class="wrapper"> ' + header + '<p>' + text + '</p></div></div>';

                $('.slide' + slideCount).append(elem);
                header = "";
            } else if (elementType === "zitat") {
                var elem = '<div class="zitat zitat' + counter + '">' + header + '<p>' + text + '</p></div>';
                $('#' + type + ' ' + '.' + position + ' ' + '.' + layout).append(elem);

                header = "";

            }


        });


    })


}


function showfirstImg() {

    $('.imageWrap.person1 img,.imageWrap.job1').addClass('active');
    buildJob1();
    $('#section9 .leftSide .img').attr('src', 'assets/ReinerEberlein.jpg')
    $('#section9 .details').html('Heilerziehungspfleger, Erlebnispädagoge, Familientherapie i. A., Heilpraktiker i.A. und Teamtraining/ Supervision')
    $('#section9 .zitat').html('"Es macht mir Spaß, begeisterte Kinderaugen zu sehen. Für mich ist wichtig, dass Kinder das "Leben" lernen und sich mit den Basics wie den Lebens-Mitteln vertraut machen. Es ist spannend, wie Kinder mit ihrer emotionalen Intelligenz umgehen und wie es ihnen gelingt, diese im Rahmen unserer Woche zu erhöhen."');
    $('.detailsWrapper').show('slide', {direction:'left'}, 1000)
}

var check1 = 0;
var check2 = 0;
$('.kontaktIcon').on('click', function () {


    if (check1 === 0) {
        $('.kontakt').fadeIn(800)
        check1 = 1;
    } else if (check1 !== 0) {
        $('.kontakt').fadeOut(800)
        check1 = 0
    }
});
$('.impressumIcon').on('click', function () {


    if (check2 === 0) {
        $('.impressum').fadeIn(800)
        check2 = 1;
    } else if (check2 !== 0) {
        $('.impressum').fadeOut(800)
        check2 = 0
    }
});


$('#btn1').on('click', function () {
    $('#btn2,#btn3').removeClass('active');
    $('#btn1').addClass('active');

    $('#section10 .second').fadeOut(600);
    $('#section10 .third').fadeOut(600);

    setTimeout(function () {
        $('#section10 .first').fadeIn(600);

    }, 1000);


});
$('#btn2').on('click', function () {
    $('#btn1,#btn3').removeClass('active');
    $('#btn2').addClass('active');
    $('#section10 .first').fadeOut(600)
    $('#section10 .third').fadeOut(600);

    setTimeout(function () {
        $('#section10 .second').fadeIn(600);

    }, 1000);


});
$('#btn3').on('click', function () {
    $('#btn1,#btn2').removeClass('active');
    $('#btn3').addClass('active');

    $('#section10 .first').fadeOut(600)
    $('#section10 .second').fadeOut(600);
    setTimeout(function () {
        $('#section10 .third').fadeIn(600);

    }, 1000);


});
$('#btn4').on('click', function () {
    $('#btn5,#btn6').removeClass('active');
    $('#btn4').addClass('active');

    $('#section11 .second').fadeOut(600);
    $('#section11 .third').fadeOut(600);

    setTimeout(function () {
        $('#section11 .first').fadeIn(600);

    }, 1000);


});
$('#btn5').on('click', function () {
    $('#btn4,#btn6').removeClass('active');
    $('#btn5').addClass('active');

    $('#section11 .first').fadeOut(600);
    $('#section11 .third').fadeOut(600)

    setTimeout(function () {
        $('#section11 .second').fadeIn(600);

    }, 1000);


});
$('#btn6').on('click', function () {
    $('#btn4,#btn5').removeClass('active');
    $('#btn6').addClass('active');

    $('#section11 .first').fadeOut(600);
    $('#section11 .second').fadeOut(600)

    setTimeout(function () {
        $('#section11 .third').fadeIn(600);


    }, 1000);


});


$('#btn7').on('click', function () {
    $('#btn8,#btn9,#btn10,#btn11').removeClass('active');
    $('#btn7').addClass('active');

    $('#section2 .second').fadeOut(600);
    $('#section2 .third').fadeOut(600)
    $('#section2 .fourth').fadeOut(600)
    $('#section2 .fifth').fadeOut(600)

    setTimeout(function () {

        $('#section2 .first').fadeIn(600)

    }, 1000)


})
$('#btn8').on('click', function () {
    $('#btn7,#btn9,#btn10,#btn11').removeClass('active');
    $('#btn8').addClass('active');

    $('#section2 .first').fadeOut(600)
    $('#section2 .third').fadeOut(600)
    $('#section2 .fourth').fadeOut(600)
    $('#section2 .fifth').fadeOut(600)
    setTimeout(function () {

        $('#section2 .second').fadeIn(600)

    }, 1000)


})
$('#btn9').on('click', function () {
    $('#btn7,#btn8,#btn10,#btn11').removeClass('active');
    $('#btn9').addClass('active');

    $('#section2 .first').fadeOut(600);
    $('#section2 .second').fadeOut(600);
    $('#section2 .fourth').fadeOut(600)
    $('#section2 .fifth').fadeOut(600)

    setTimeout(function () {

        $('#section2 .third').fadeIn(600)

    }, 1000)


})
$('#btn10').on('click', function () {
    $('#btn7,#btn8,#btn9,#btn11').removeClass('active');
    $('#btn10').addClass('active');

    $('#section2 .first').fadeOut(600);
    $('#section2 .second').fadeOut(600);
    $('#section2 .third').fadeOut(600)
    $('#section2 .fifth').fadeOut(600)

    setTimeout(function () {

        $('#section2 .fourth').fadeIn(600)

    }, 1000)


})
$('#btn11').on('click', function () {
    $('#btn7,#btn8,#btn9,#btn10').removeClass('active');
    $('#btn11').addClass('active');

    $('#section2 .first').fadeOut(600);
    $('#section2 .second').fadeOut(600);
    $('#section2 .third').fadeOut(600)
    $('#section2 .fourth').fadeOut(600)

    setTimeout(function () {

        $('#section2 .fifth').fadeIn(600)

    }, 1000)


})
$('#btn12').on('click', function () {
    $('#btn13,#btn14').removeClass('active');
    $('#btn12').addClass('active');

    $('#section4 .second').fadeOut(600);
    $('#section4 .third').fadeOut(600)

    setTimeout(function () {

        $('#section4 .first').fadeIn(600)

    }, 1000)


})
$('#btn13').on('click', function () {
    $('#btn12,#btn14').removeClass('active');
    $('#btn13').addClass('active');

    $('#section4 .first').fadeOut(600);
    $('#section4 .third').fadeOut(600)

    setTimeout(function () {

        $('#section4 .second').fadeIn(600)

    }, 1000)


})
$('#btn14').on('click', function () {
    $('#btn12,#btn13').removeClass('active');
    $('#btn14').addClass('active');

    $('#section4 .first').fadeOut(600);
    $('#section4 .second').fadeOut(600)

    setTimeout(function () {

        $('#section4 .third').fadeIn(600)

    }, 1000)


})


function buildJob1() {
    $('#section5 .leftSide ').html('<div class="person job1"><div class="imageWrap job1 active"></div><h3>Der Gärtner</h3></div>');
    $('#section5 .details').html('Als Gärtner kümmerst du dich um Gemüse und Kräuter. Es liegt in deinem Aufgabenbereich Pflanzen wachsen und gedeihen zu lassen und die Dorfmitglieder mit Nahrungsmitteln zu versorgen ');
    $('#section5 .zitat').html(' "Eins von den Hühnern versteckt sich immer in den Hügelbeeten und pickt den frischen Salat, ich habe es zu uns zum Mittagessen eingeladen!"');

}

$('#section5 .imageWrap').on('click', function () {
    $('#section5 .imageWrap').removeClass('active')
    $('#section5 .imageWrap img').removeClass('active');
    $(this).addClass('active');
    $('#section5 .detailsWrapper').hide();


    if ($(this).hasClass('job1')) {

        $('#section5 .leftSide ').html('<div class="person job1"><div class="imageWrap job1"></div><h3>Der Gärtner</h3></div>');
        $('#section5 .details').html('Als Gärtner kümmerst du dich um Gemüse und Kräuter. Es liegt in deinem Aufgabenbereich Pflanzen wachsen und gedeihen zu lassen und die Dorfmitglieder mit Nahrungsmitteln zu versorgen ');
        $('#section5 .zitat').html(' "Eins von den Hühnern versteckt sich immer in den Hügelbeeten und pickt den frischen Salat, ich habe es zu uns zum Mittagessen eingeladen!"');
        $('#section5 .detailsWrapper').show('slide', {direction:'left'}, 1000)

    } else if ($(this).hasClass('job2')) {

        $('#section5 .leftSide ').html('<div class="person job2"><div class="imageWrap job2 active"></div><h3>Die Bäuerin</h3></div>');
        $('#section5 .details').html('Die Bäuerin kümmert sich um alle Arbeiten die auf dem Hof anfallen. Sie füttert die Tiere, arbeitet im Garten und Haushalt und kocht leckeres Essen ');
        $('#section5 .zitat').html(' "Wir haben die Tiere ganz allein gefüttert! Und ich habe sogar ein Schwein gestreichelt!"');
        $('#section5 .detailsWrapper').show('slide', {direction:'left'}, 1000)

    } else if ($(this).hasClass('job3')) {

        $('#section5 .leftSide ').html('<div class="person job3"><div class="imageWrap job3 active"></div><h3>Der Metzger</h3></div>');
        $('#section5 .details').html('Mit dem Metzger machst du leckere eigene Wurst, die danach gemeinsam im Dorf gegessen wird! Von ihm lernst du viel über Tiere und Wurst und Fleischherstellung!');
        $('#section5 .zitat').html(' "Wir haben heute unsere eigene Wurst gemacht. Das war wirklich toll!"');
        $('#section5 .detailsWrapper').show('slide', {direction:'left'}, 1000)

    } else if ($(this).hasClass('job4')) {

        $('#section5 .leftSide ').html('<div class="person job4"><div class="imageWrap job4 active"></div><h3>Der Metzger</h3></div>');
        $('#section5 .details').html('Von der Köchin lernst du wie die Nahrungsmittel, die du zuvor im Garten und auf dem Feld angebaut hast, in leckere Speisen verwandelst!');
        $('#section5 .zitat').html(' "Das Brot das Wir heute gebacken haben ist wirklich gut und sogar Butter haben Wir selber gemacht!"');
        $('#section5 .detailsWrapper').show('slide', {direction:'left'}, 1000)

    }


})

$('#section9 .imageWrap').on('click', function () {
    $('#section9 .imageWrap img').removeClass('active');
    $(this).find(':first-child').addClass('active');
    $('#section9 .detailsWrapper').hide();


    if ($(this).hasClass('person1')) {
        $('#section9 .leftSide .img').attr('src', 'assets/ReinerEberlein.jpg')

        $('#section9 .details').html('Heilerziehungspfleger, Erlebnispädagoge, Familientherapie i. A., Heilpraktiker i.A. und Teamtraining/ Supervision')
        $('#section9 .zitat').html('"Es macht mir Spaß, begeisterte Kinderaugen zu sehen. Für mich ist wichtig, dass Kinder das "Leben" lernen und sich mit den Basics wie den Lebens-Mitteln vertraut machen. Es ist spannend, wie Kinder mit ihrer emotionalen Intelligenz umgehen und wie es ihnen gelingt, diese im Rahmen unserer Woche zu erhöhen."');
        $('#section9 .detailsWrapper').show('slide', {direction:'left'}, 1000)
    } else if ($(this).hasClass('person2')) {

        $('#section9 .leftSide img').attr('src', 'assets/Angela_Florian.jpg');
        $('#section9 .details').html('Sozialpädagogin, Reittherapeutin');
        $('#section9 .zitat').html('"Ich möchte gerne Kinder dabei unterstützen, sich selbst zu organisieren und ihnen dadurch die Möglichkeit geben, neue Erfahrungen in der Gemeinschaft zu sammeln – sei es beim Käsen, Marmelade kochen, Spielen oder im Dorfrat."');
        $('#section9 .detailsWrapper').show('slide', {direction:'left'}, 1000)

    } else if ($(this).hasClass('person3')) {

        $('#section9 .leftSide img').attr('src', 'assets/KathieMück.jpg');
        $('#section9 .details').html('Pensionierte Bäuerin, Hauswirtschaftlerin');
        $('#section9 .zitat').html('"Für die Kinder bin ich wie eine Oma und ich liebe es, mit ihnen zu kochen und sie dabei näher kennen zu lernen."');
        $('#section9 .detailsWrapper').show('slide', {direction:'left'}, 1000)


    }
    else if ($(this).hasClass('person4')) {

        $('#section9 .leftSide img').attr('src', 'assets/HildegardEmmerig.jpg');
        $('#section9 .details').html('Erzieherin, Hauswirtschaftlerin, Köchin für Schulmittagessen an der Grundschule Moosach, 3 Kinder');
        $('#section9 .zitat').html('"Mein Herzensanliegen ist es, Kindern eine Umgebung anzubieten, in der sie "selbsttätig" lebenspraktische Erfahrungen machen können. Beobachtungen, die ich bei der Entwicklung unserer drei eigenen Kinder machen durfte, bestärken mich in meinem Ziel." ');
        $('#section9 .detailsWrapper').show('slide', {direction:'left'}, 1000)


    } else if ($(this).hasClass('person5')) {

        $('#section9 .leftSide img').attr('src', 'assets/SeppWörndl.jpg');
        $('#section9 .details').html('Pensionierter Volksschullehrer, 5 Enkelkinder');
        $('#section9 .zitat').html('"Im Dorf für Kinder und Tiere kann ich meine Liebe im Umgang mit den Kindern mit dem Gärtnerischen verbinden." ');
        $('#section9 .detailsWrapper').show('slide', {direction:'left'}, 1000)


    }
    else if ($(this).hasClass('person6')) {

        $('#section9 .leftSide img').attr('src', 'assets/FranziskaW.jpg');
        $('#section9 .details').html('Lehrerin, Älplerin, landwirtschaftliche Mitarbeiterin in der Symbiotischen Landwirtschaft, alleinerziehend, eine Tochte');
        $('#section9 .zitat').html('"Es war mir immer schon ein Anliegen, Pädagogik mit Landwirtschaft zu verbinden. Hier können die Kinder mit mir in der Symbiotischen Landwirtschaft arbeiten und einen respektvollen Umgang mit den Tieren, den Pflanzen und der Erde kennenlernen. Die Freude und das Selber Tun stehen dabei im Mittelpunkt." ');
        $('#section9 .detailsWrapper').show('slide', {direction:'left'}, 1000)


    } else if ($(this).hasClass('person7')) {

        $('#section9 .leftSide img').attr('src', 'assets/IngaBöger.jpg');
        $('#section9 .details').html('Grundschullehrerin an der Freien Kinderschule Bremen');
        $('#section9 .zitat').html('"Im Dorf für Kinder und Tiere genieße ich es, den ganzen Tag draußen in der Natur zu sein und die Kinder unterstützen zu können, in kurzer Zeit das Zusammenspiel zwischen ökologischer Landwirtschaft und der Natur zu erfahren. In nur einer Woche wird spürbar, dass alle Kinder ihren Teil zur Gemeinschaft beitragen. In kurzer Zeit wird hier in einer natürlichen - und nicht konstruierten – Umgebung ein kleiner Grundstein zum Demokratischen Handeln gelegt." ');
        $('#section9 .detailsWrapper').show('slide', {direction:'left'}, 1000)


    } else if ($(this).hasClass('person8')) {

        $('#section9 .leftSide img').attr('src', 'assets/AlexSchuhbauer.jpg');
        $('#section9 .details').html('Metzgermeister in Herrmannsdorf, Vater von 2 Kindern');
        $('#section9 .zitat').html('"Ich bin mit Leib und Seele Metzgermeister. Im Dorf für Kinder und Tiere kann ich die Qualität dieses Handwerksberuf den Kindern nahebringen: Sie erleben, wie die Tiere hier gelebt haben, sie erfahren, wie man mit Fleisch umgeht und sie lernen, mit den eigenen Händen das Fleisch zu bearbeiten und daraus Würstl zu drehen, die sie am Abend zusammen grillen und essen. Ein paar Kinder machen die Würstl für die ganze Klasse! Für viele ein großes Erfolgserlebnis." ');
        $('#section9 .detailsWrapper').show('slide', {direction:'left'}, 1000)


    } else if ($(this).hasClass('chef1')) {

        $('#section9 .leftSide img').attr('src', 'assets/AnneSchweisfurth.jpg');
        $('#section9 .details').html('Erster Vorstand und Pädagogische Leitung Sennerin, Bäckerin und Pädagogin, Leitungsteam Hafenmuseum Bremen');
        $('#section9 .zitat').html(' "Ich bin ein Fan von entdeckendem und selbstorganisiertem Lernen, bei dem die Kinder all ihre Sinne einsetzen und entwickeln können."');
        $('#section9 .detailsWrapper').show('slide', {direction:'left'}, 1000)


    } else if ($(this).hasClass('chef2')) {

        $('#section9 .leftSide img').attr('src', 'assets/Claudia_Weisser.jpg');
        $('#section9 .details').html('Geschäftsführerin Pädagogin, Journalistin für Umwelt und Ökologie, Körpertherapeutin');
        $('#section9 .zitat').html(' "Ich freue mich auf das neue Dorf nach der großen Renovierung und auf fröhliche Kinder."');
        $('#section9 .detailsWrapper').show('slide', {direction:'left'}, 1000)


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
            $('.zitat1').show('slide', {direction:'right'}, 1000);
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
            $('.zitat2').show('slide', {direction:'left'}, 1000);
            $('.zitat3').show('slide', {direction:'right'}, 1000);
        }
        else {
            $('.zitat2').hide('slide', {direction:'left'}, 1000);
            ;
            $('.zitat3').hide('slide', {direction:'right'}, 1000);
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
            $('#circle5').show('slide', {direction:'up'}, 1000);
            $('#circle6').show('slide', {direction:'left'}, 1000);
            $('#circle7').show('slide', {direction:'right'}, 1000);
            $('#circle8').show('slide', {direction:'down'}, 1000);
        }
        else {

            $('#circle5').hide('slide', {direction:'up'}, 1000);
            $('#circle6').hide('slide', {direction:'left'}, 1000);
            $('#circle7').hide('slide', {direction:'right'}, 1000);
            $('#circle8').hide('slide', {direction:'down'}, 1000);
        }


    });
}


function showZitat4() {

    $(document).scroll(function () {
        var y = $(this).scrollTop();

        if (y > 3500) {

//            $('.zitat1').fadeIn(800);
            $('.zitat4').show('slide', {direction:'left'}, 1000);

            $('#circle1').show('slide', {direction:'up'}, 1000);
            $('#circle2').show('slide', {direction:'left'}, 1000);
            $('#circle3').show('slide', {direction:'right'}, 1000);
            $('#circle4').show('slide', {direction:'down'}, 1000);
        }
        else {
            $('.zitat4').hide('slide', {direction:'left'}, 1000);

            $('#circle1').hide('slide', {direction:'up'}, 1000);
            $('#circle2').hide('slide', {direction:'left'}, 1000);
            $('#circle3').hide('slide', {direction:'right'}, 1000);
            $('#circle4').hide('slide', {direction:'down'}, 1000);
        }
    });


}



