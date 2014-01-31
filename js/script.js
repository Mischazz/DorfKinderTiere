$(document).ready(function () {


    $.ajax({
        type:"GET",
        dataType:"json",
        url:'content.json',


        success:function (data) {
//            $.fn.fullpage();


            buildDorf(data);

            showFirstArticles();
            showSecondArticles();
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
    var globalVal = ""
    var elementType = ""
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
function showfirstImg(){

    $('.imageWrap.person1 img').addClass('active');
    $('#section9 .leftSide .img').attr('src', 'assets/ReinerEberlein.jpg')

    $('#section9 .details').html('Heilerziehungspfleger, Erlebnispädagoge, Familientherapie i. A., Heilpraktiker i.A. und Teamtraining/ Supervision')
    $('#section9 .zitat').html('"Es macht mir Spaß, begeisterte Kinderaugen zu sehen. Für mich ist wichtig, dass Kinder das "Leben" lernen und sich mit den Basics wie den Lebens-Mitteln vertraut machen. Es ist spannend, wie Kinder mit ihrer emotionalen Intelligenz umgehen und wie es ihnen gelingt, diese im Rahmen unserer Woche zu erhöhen."');
    $('#section9 .detailsWrapper').show('slide', {direction:'left'}, 1000)
}

var check1 =0;
var check2 =0;
$('.kontaktIcon').on('click',function(){


    if(check1 === 0){
    $('.kontakt').fadeIn(800)
        check1 = 1;
    }   else if(check1 !== 0){
        $('.kontakt').fadeOut(800)
    check1 = 0
    }
});
$('.impressumIcon').on('click',function(){


    if(check2 === 0){
    $('.impressum').fadeIn(800)
        check2 = 1;
    }   else if(check2 !== 0){
        $('.impressum').fadeOut(800)
    check2 = 0
    }
});


$('#btn1').on('click', function () {
    $('#btn2,#btn3').removeClass('active');
    $('#btn1').addClass('active');
    $('.bottom #textBox1').hide('slide', {direction:'right'});
    setTimeout(function () {
        $('.bottom #textBox1').html(' <div class="Supporter"><p> Unsere Förderer Starthilfe haben uns gegeben: Schreinerei Gröbmayr, Glonn</br> Bulthaup, Bodenkirchen</br> Manufactum, Waltrop</br> Wir danken herzlich allen Spenderinnen und Spendern anlässlich des 80. Geburtstagsfestes von Karl Ludwig Schweisfurth und anlässlich des 80. Geburtstagsfestes von Dorothee Schweisfurth</p><p>Karl Ludwig Schweisfurth, München Dr. Christoph von Schwingenstein, München - jährliche Spenden Dr. Hans-J. Hüchting, Weinheim Herrn und Frau Drs. Zeiner, Taufkirchen Alexander Brachmann, München Anne Schweisfurth, Bremen Rolf-Christof Dienst, Icking Naturkost Südbayern e.V., Freising Prof. Dr. Karl Ganser, Breitenthal  Thomas Modsching, Pullenhofen Hilke Packmohr, Bremen Wilhelm von Herder-Hebenbrock, Starnberg Karl Schweisfurth, Glonn und viele Kleinspenderinnen und -spender.</p></div>')
    }, 1000);
    $('.bottom #textBox1').show('slide', {direction:'left'}, 1000);


});
$('#btn2').on('click', function () {
    $('#btn1,#btn3').removeClass('active');
    $('#btn2').addClass('active');

    $('.bottom #textBox1').hide('slide', {direction:'right'});
    setTimeout(function () {
        $('.bottom #textBox1').html('<div class="certificate"><p>Dafür kann aber dieser einwöchige Aufenthalt für die Kinder zu einem Schlüsselerlebnis werden. Sie leben "eigenverantwortlich" in unserem Dorf und haben dort Erlebnisse und Erfahrungen, die ihnen wichtige Impulse mit auf ihren Lebensweg geben.</p><p>Unser umfangreiches Programm, geprägt durch Eigeninitiative, z.B. bei der Ernte oder Herstellung von Lebensmitteln aus Garten und Landwirtschaft, haben sich zu einem sehr erfolgreichen und richtungsweisenden Konzept zur Umkehr ungesunder Trends in der Welt unserer Kinder entwickelt.</p><p>Inzwischen sind etwa 20 % der Kinder in der Bundesrepublik übergewichtig. Die Tendenz ist steigend - Fachleute sprechen bereits von einer Epidemie.Ungesunde Ernährung und Mangel an Bewegung gelten als die Hauptursachen für diese Entwicklung.</p></div>', 1000)

    }, 1000);
    $('.bottom #textBox1').show('slide', {direction:'left'}, 1000);


});
$('#btn3').on('click', function () {
    $('#btn1,#btn2').removeClass('active');
    $('#btn3').addClass('active');
    $('.bottom #textBox1').hide('slide', {direction:'right'}, 1000);


    setTimeout(function () {
        $('.bottom #textBox1').html('<div class="certificate"><p>Das Dorf für Kinder und Tiere ist 2011 startsocial-Stipendiat Bundeskanzler Gerhard Schröder hat im Jahr 2000 mit Vertretern großer und kleiner Unternehmen diskutiert: Wie kann man dem sozialen Engagement im Jahr 2001, dem Internationalen Jahr der Freiwilligen, neue Impulse geben? Als Antwort darauf wurde in Zusammenarbeit mit großen und kleiner Unternehmen der Verein start social e.V. ins Leben gerufen, der seitdem jedes Jahr einen Wettbewerb anbietet unter der Schirmherrschaft des Bundeskanzlers, in diesem Jahr der Bundeskanzlerin Angela Merkel, bei dem sich gemeinnützige Organisationen bewerben können. Wir haben uns mit unserem Dorf für Kinder und Tiere beworben.</p></div>')

    }, 1000);
    $('.bottom #textBox1').show('slide', {direction:'left'}, 1000);


});
$('#btn4').on('click', function () {
    $('#btn5,#btn6').removeClass('active');
    $('#btn4').addClass('active');
    $('.bottom #textBox2').hide('slide', {direction:'right'}, 1000);
    setTimeout(function () {
        $('.bottom #textBox2').html('<p> Grundschule Südliche Auffahrtsallee München </p><p>Anfangs wussten die Schüler nicht so recht, was sie mit ihrer Freizeit streckenweise anfangen sollten, da kein Gameboy etc. zur Hand war, aber das legte sich schnell und sie begannen sich mit sich und anderen zu beschäftigen und auseinander zu setzen. Sie beteiligten sich meist gerne an der Arbeit, denn die verschaffte ihnen gewissermaßen echte Erfolge und das Gefühl etwas Sinnvolles vollbracht zu haben. (…) Schüler, die Zuhause eher kompliziert waren, entwickelten sich zu aufgeweckten, kontaktfreudigen und verantwortungsbewussten Menschen. (...).</p><p>Im abschließenden Dorfrat sagten einige Kinder, dass sie gelernt hätten, dass man zusammen mehr erreiche und dass wir zusammenhalten müssen. Es war großartig zu beobachten, wie selbständig und resolut meine Schüler (im Dorfrat) arbeiteten. Die Kinder lernten hier, sich aufeinander einzustellen, aufeinander zu hören und sich selbst auch mal zurück zu stellen. Hier wurde mit Sicherheit einer der Grundsteine für demokratisches Denken und Handeln gelegt. (…) </p>')
    }, 1000);

    $('.bottom #textBox2').show('slide', {direction:'left'}, 1000);


});
$('#btn5').on('click', function () {
    $('#btn4,#btn6').removeClass('active');
    $('#btn5').addClass('active');

    $('.bottom #textBox2').hide('slide', {direction:'right'}, 1000);
    setTimeout(function () {
        $('.bottom #textBox2').html('<p>Franziska-Lechner-Volksschule Edling (bei Wasserburg)</p><p>Schon zum zweiten Mal war ich nun mit einer Klasse im "Dorf für Kinder und Tiere" und wir durften dort eine Woche der ganz besonderen Art erleben. Eine wesentliche Komponente ist die bewusste Reduktion in vielen Dingen auf das Elementare. Dies muss kein wirklicher "Verlust" sein, vielmehr konnten es die meisten Kinder als Bereicherung erleben, auch wenn ihnen das natürlich häufig nicht selbst so bewusst war. Da gab es zum Beispiel den sonst oft recht unruhigen Jungen, der zu Hause viel Zeit vor dem Bildschirm verbringt und hier nach zwei Tagen sich meist ruhig am Programm beteiligte oder dasaß und Karten spielte.</p><p>Andere Kinder, die häufig äußerst impulsiv und störend sind, tobten sich so aus, dass sie deutlich leichter führbar waren als sonst. Mancher "Querulant" mit recht bedenklichem Sozialverhalten streichelte sehr behutsam die Schweine und wäre nie im Leben auf die Idee gekommen, ein Tier zu treten oder zu schlagen. Unerwartet zarte Seiten traten zu Tage. Ebensolche schwierige Schüler arbeiteten bei manchen "Berufen" im Dorf für Kinder und Tiere engagiert mit, ließen sich von der Köchin willig beim Zubereiten des Mittagessens anspornen und aßen hinterher natürlich mit Appetit die selbst gekochte Gemüsesuppe - ob sie das bei Muttern auch täten?</p><p>Und was ist mit den ganz "normalen, pflegeleichten" Kindern? Die meisten von ihnen fühlten sich schnell richtig zu Hause, vergaßen ihr Heimweh, blühten teilweise richtig auf und einige wären sogar gerne noch länger geblieben. Eine Freude ihnen zuzusehen, wie selbständig und verantwortlich sie ihren Abwaschdienst übernahmen oder sich in der Leitung des Dorfrates versuchten. Viele Effekte sind zugegebener Maßen vielleicht eher kurzfristiger Natur.</p><p>Dennoch bin ich überzeugt, dass über das reine "Freizeiterlebnis" hinaus doch wenigstens zwei Dinge hängen bleiben: Zum Einen, die wirkliche Erkenntnis, dass unser tägliches Essen nicht fertig "vom Himmel fällt" und zum Anderen, dass für unsere Nahrungsmittel lebende Tiere benötigt werden, die ein Recht auf ein würdevolles Dasein haben - nicht nur der Schoßhund oder das Meerschwein, sondern auch Nutztiere wollen nicht leiden! Sollte dies dazu beitragen, dass sich bei diesen künftigen Erwachsenen etwas in ihrer Lebensführung bzw. in ihrem (Kauf-)Verhalten ändert,so wäre das eine gelungene Investition in die Zukunft. Ich komme jedenfalls mit meiner nächsten Klasse gerne wieder...</p>')
    }, 1000);

    $('.bottom #textBox2').show('slide', {direction:'left'}, 1000);


});
$('#btn6').on('click', function () {
    $('#btn4,#btn5').removeClass('active');
    $('#btn6').addClass('active');

    $('.bottom #textBox2').hide('slide', {direction:'right'}, 1000);
    setTimeout(function () {
        $('.bottom #textBox2').html('<div class="certificate"><p> Kinderschule Bremen </p><p>Besonders spürbar für mich als Erwachsener war die Qualität, dass immer alle für alle etwas machen. (…) Die Gruppe hat sich immer insgesamt versorgt, ein nicht zu unterschätzender Bestandteil für das Gruppengefühl. (...)</p><p>Der Schwerpunkt lag bei der Wahrnehmung von Handlunge und Handlungsabläufen durch eigenes Tätigsein. Die handwerkliche Produktion von Nahrungsmitteln erfordert eine sinnvolle Reihenfolge. Mir hat gefallen, dass die Sensibilisierung der Kinder in der Woche zu sehen war: "Hmm, das ist das Sauerteigbrot!" "Wo ist der Gelee, den die anderen Kinder gemacht haben?" "Der Ketschup ist selbst gemacht!?" Die Nahrungsmittel wurden in ihre Inhaltsstoffe zerlegt und geschmacklich zugeordnet: "Möhren sind da drin?"</p><p>Es war ein Prozess wahrnehmbar, der bei einigen Kindern sicher nachgewirkt hat: Sie sehen hin, was es zu essen gibt oder beteiligen sich beim Kochen oder Backen. Eine Nachhaltigkeit ist wohl nicht allgemein zu belegen, aber wie bei vielen Lernprozessen werden hier Keime für Entwicklungen und Haltungen gelegt, die ich für sehr wertvoll halte.</p></p>');
    }, 1000);
    $('.bottom #textBox2').show('slide', {direction:'left'}, 1000);


});
$('#section5 .imageWrap').on('click', function () {
    $('#section5 .imageWrap img').removeClass('active');
    $(this).find(':first-child').addClass('active');
    $('#section5 .detailsWrapper').hide();


     if ($(this).hasClass('job1')) {

        $('#section5 .leftSide img').attr('src', 'assets/Claudia_Weisser.jpg');
        $('#section5 .details').html('Geschäftsführerin Pädagogin, Journalistin für Umwelt und Ökologie, Körpertherapeutin');
        $('#section5 .zitat').html(' "Ich freue mich auf das neue Dorf nach der großen Renovierung und auf fröhliche Kinder."');
        $('#section5 .detailsWrapper').show('slide', {direction:'left'}, 1000)

    } else if ($(this).hasClass('job2')) {

        $('#section5 .leftSide img').attr('src', 'assets/Claudia_Weisser.jpg');
        $('#section5 .details').html('Geschäftsführerin Pädagogin, Journalistin für Umwelt und Ökologie, Körpertherapeutin');
        $('#section5 .zitat').html(' "Ich freue mich auf das neue Dorf nach der großen Renovierung und auf fröhliche Kinder."');
        $('#section5 .detailsWrapper').show('slide', {direction:'left'}, 1000)

    } else if ($(this).hasClass('job3')) {

        $('#section5 .leftSide img').attr('src', 'assets/Claudia_Weisser.jpg');
        $('#section5 .details').html('Geschäftsführerin Pädagogin, Journalistin für Umwelt und Ökologie, Körpertherapeutin');
        $('#section5 .zitat').html(' "Ich freue mich auf das neue Dorf nach der großen Renovierung und auf fröhliche Kinder."');
        $('#section5 .detailsWrapper').show('slide', {direction:'left'}, 1000)

    } else if ($(this).hasClass('job4')) {

        $('#section5 .leftSide img').attr('src', 'assets/Claudia_Weisser.jpg');
        $('#section5 .details').html('Geschäftsführerin Pädagogin, Journalistin für Umwelt und Ökologie, Körpertherapeutin');
        $('#section5 .zitat').html(' "Ich freue mich auf das neue Dorf nach der großen Renovierung und auf fröhliche Kinder."');
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



