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
        }, 1000, function () {
            location.hash = ziel;
        });
        return false;
    });

    //
    // Galerie Albumvorschau
    //

    var ie = false;
    // if ($.browser.msie) {
    //     ie = true;
    // }
    //current album/image displayed
    var enableshow = true;
    var current = -1;
    var album = -1;
    //windows width
    var w_width = $(window).width();
    //caching
    var $albums = $('#pp_thumbContainer div.album');
    var $loader = $('#pp_loading');
    var $next = $('#pp_next');
    var $prev = $('#pp_prev');
    var $images = $('#pp_thumbContainer div.content img');
    var $back = $('#pp_back');

    //we wnat to spread the albums through the page equally
    //number of spaces to divide with:number of albums plus 1
    var nmb_albums = $albums.length;
    var spaces = w_width / (nmb_albums + 1);
    var cnt = 0;
    //preload all the images (thumbs)
    var nmb_images = $images.length;
    var loaded = 0;
    $images.each(function (i) {
        var $image = $(this);
        $('<img />').load(function () {
            ++loaded;
            if (loaded == nmb_images) {
                //let's spread the albums equally on the bottom of the page
                $albums.each(function () {
                    var $this = $(this);
                    ++cnt;
                    var left = spaces * cnt - $this.width() / 2;
                    $this.css('left', left + 'px');
                    $this.stop().animate({'bottom': '0px'}, 500);
                }).unbind('click').bind('click', spreadPictures);
                //also rotate each picture of an album with a random number of degrees
                $images.each(function () {
                    var $this = $(this);
                    var r = Math.floor(Math.random() * 41) - 20;
                    $this.css({ transform: 'rotate(' + r + 'deg)'});
                    console.log($this);
                });
            }
        }).attr('src', $image.attr('src'));
    });

    function spreadPictures() {
        var $album = $(this);
        //track which album is opened
        album = $album.index();
        //hide all the other albums
        $albums.not($album).stop().animate({'bottom': '-90px'}, 300);
        $album.unbind('click');
        //now move the current album to the left
        //and at the same time spread its images through
        //the window, rotating them randomly. Also hide the description of the album

        //store the current left for the reverse operation
        $album.data('left', $album.css('left'))
            .stop()
            .animate({'left': '0px'}, 500).find('.descr').stop().animate({'bottom': '-30px'}, 200);
        var total_pic = $album.find('.content').length;
        var cnt = 0;
        //each picture
        $album.find('.content')
            .each(function () {
                var $content = $(this);
                ++cnt;
                //window width
                var w_width = $(window).width();
                var spaces = w_width / (total_pic + 1);
                var left = (spaces * cnt) - (140 / 2);
                var r = Math.floor(Math.random() * 41) - 20;
                //var r = Math.floor(Math.random()*81)-40;
                $content.stop().animate({'left': left + 'px'}, 500,function () {
                    $(this).unbind('click')
                        .bind('click', showImage)
                        .unbind('mouseenter')
                        .bind('mouseenter', upImage)
                        .unbind('mouseleave')
                        .bind('mouseleave', downImage);
                }).find('img')
                    .stop()
                    .animate({'rotate': r + 'deg'}, 300);
                $back.stop().animate({'left': '0px'}, 300);
            });
    }

    //back to albums
    //the current album gets its innitial left position
    //all the other albums slide up
    //the current image slides out
    $back.bind('click', function () {
        $back.stop().animate({'left': '-100px'}, 300);
        hideNavigation();
        //there's a picture being displayed
        //lets slide the current one up
        if (current != -1) {
            hideCurrentPicture();
        }

        var $current_album = $('#pp_thumbContainer div.album:nth-child(' + parseInt(album + 1) + ')');
        $current_album.stop()
            .animate({'left': $current_album.data('left')}, 500)
            .find('.descr')
            .stop()
            .animate({'bottom': '0px'}, 500);

        $current_album.unbind('click')
            .bind('click', spreadPictures);

        $current_album.find('.content')
            .each(function () {
                var $content = $(this);
                $content.unbind('mouseenter mouseleave click');
                $content.stop().animate({'left': '0px'}, 500);
            });

        $albums.not($current_album).stop().animate({'bottom': '0px'}, 500);
    });

    //displays an image (clicked thumb) in the center of the page
    //if nav is passed, then displays the next / previous one of the
    //current album
    function showImage(nav) {
        if (!enableshow) return;
        enableshow = false;
        if (nav == 1) {
            //reached the first one
            if (current == 0) {
                enableshow = true;
                return;
            }
            var $content = $('#pp_thumbContainer div.album:nth-child(' + parseInt(album + 1) + ')')
                .find('.content:nth-child(' + parseInt(current) + ')');
            //reached the last one
            if ($content.length == 0) {
                enableshow = true;
                current -= 2;
                return;
            }
        }
        else
            var $content = $(this);

        //show ajax loading image
        $loader.show();

        //there's a picture being displayed
        //lets slide the current one up
        if (current != -1) {
            hideCurrentPicture();
        }

        current = $content.index();
        var $thumb = $content.find('img');
        var imgL_source = $thumb.attr('alt');
        var imgL_description = $thumb.next().html();
        //preload the large image to show
        $('<img style=""/>').load(function () {
            var $imgL = $(this);
            //resize the image based on the windows size
            resize($imgL);
            //create an element to include the large image
            //and its description
            var $preview = $('<div />', {
                'id': 'pp_preview',
                'className': 'pp_preview',
                'html': '<div class="pp_descr"><span>' + imgL_description + '</span></div>',
                'style': 'visibility:hidden;'
            });
            $preview.prepend($imgL);
            $('#pp_gallery').prepend($preview);

            var largeW = $imgL.width() + 20;
            var largeH = $imgL.height() + 10 + 45;
            //change the properties of the wrapping div
            //to fit the large image sizes
            $preview.css({
                'width': largeW + 'px',
                'height': largeH + 'px',
                'marginTop': -largeH / 2 - 20 + 'px',
                'marginLeft': -largeW / 2 + 'px',
                'visibility': 'visible'
            });
            Cufon.replace('.pp_descr');
            //show navigation
            showNavigation();

            //hide the ajax image loading
            $loader.hide();

            //slide up (also rotating) the large image
            var r = Math.floor(Math.random() * 41) - 20;
            if (ie)
                var param = {
                    'top': '50%'
                };
            else
                var param = {
                    'top': '50%',
                    'rotate': r + 'deg'
                };
            $preview.stop().animate(param, 500, function () {
                enableshow = true;
            });
        }).error(function () {
                //error loading image. Maybe show a message : 'no preview available'?
            }).attr('src', imgL_source);
    }

    //click next image
    $next.bind('click', function () {
        current += 2;
        showImage(1);
    });

    //click previous image
    $prev.bind('click', function () {
        showImage(1);
    });

    //slides up the current picture
    function hideCurrentPicture() {
        current = -1;
        var r = Math.floor(Math.random() * 41) - 20;
        if (ie)
            var param = {
                'top': '-150%'
            };
        else
            var param = {
                'top': '-150%',
                'rotate': r + 'deg'
            };
        $('#pp_preview').stop()
            .animate(param, 500, function () {
                $(this).remove();
            });
    }

    //shows the navigation buttons
    function showNavigation() {
        $next.stop().animate({'right': '0px'}, 100);
        $prev.stop().animate({'left': '0px'}, 100);
    }

    //hides the navigation buttons
    function hideNavigation() {
        $next.stop().animate({'right': '-40px'}, 300);
        $prev.stop().animate({'left': '-40px'}, 300);
    }

    //mouseenter event on each thumb
    function upImage() {
        var $content = $(this);
        $content.stop().animate({
            'marginTop': '-70px'
        }, 400).find('img')
            .stop()
            .animate({'rotate': '0deg'}, 400);
    }

    //mouseleave event on each thumb
    function downImage() {
        var $content = $(this);
        var r = Math.floor(Math.random() * 41) - 20;
        $content.stop().animate({
            'marginTop': '0px'
        }, 400).find('img').stop().animate({'rotate': r + 'deg'}, 400);
    }

    //resize function based on windows size
    function resize($image) {
        var widthMargin = 50
        var heightMargin = 200;

        var windowH = $(window).height() - heightMargin;
        var windowW = $(window).width() - widthMargin;
        var theImage = new Image();
        theImage.src = $image.attr("src");
        var imgwidth = theImage.width;
        var imgheight = theImage.height;

        if ((imgwidth > windowW) || (imgheight > windowH)) {
            if (imgwidth > imgheight) {
                var newwidth = windowW;
                var ratio = imgwidth / windowW;
                var newheight = imgheight / ratio;
                theImage.height = newheight;
                theImage.width = newwidth;
                if (newheight > windowH) {
                    var newnewheight = windowH;
                    var newratio = newheight / windowH;
                    var newnewwidth = newwidth / newratio;
                    theImage.width = newnewwidth;
                    theImage.height = newnewheight;
                }
            }
            else {
                var newheight = windowH;
                var ratio = imgheight / windowH;
                var newwidth = imgwidth / ratio;
                theImage.height = newheight;
                theImage.width = newwidth;
                if (newwidth > windowW) {
                    var newnewwidth = windowW;
                    var newratio = newwidth / windowW;
                    var newnewheight = newheight / newratio;
                    theImage.height = newnewheight;
                    theImage.width = newnewwidth;
                }
            }
        }
        $image.css({'width': theImage.width + 'px', 'height': theImage.height + 'px'});
    }

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


