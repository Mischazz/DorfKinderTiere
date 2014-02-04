$(document).ready(function () {


    $(".previewButton").hide();


    $(".album").click(function () {
        $('.album').removeClass('active');
        $(this).addClass('active');
        if ($(".preview").height() == 0) {

            $(".preview").animate({height:"330px"}, 2000, function () {

                $(".previewButton").fadeIn(1000);

            });


        }
        ;


        if ($(".preview").height() != 0) {

            showLoader();

        }
        ;

        setTimeout(function () {
            $(".preview").css("overflow-x", "scroll");
        }, 2500);


        //Check if there are some images already and remove them
        removeImg();


        var elId = $(this).attr('id');

        // Album1
        if (elId == 'album1') {

            $.ajax({
                dataType:"json",
                url:'image.json',
                type:'GET',
                success:function (data) {


                }
            })
                .done(function (data) {

                    _.each(data, function (val, key) {

                        if (key === 'album1') {

                            _.each(data["album1"], function (value, key) {

                                $("#imgBox").append('<img class="previewImg" src="../images/album1/"' + value + '>');

                            })

                        }


                    });

                    console.log("success");
                })
                .fail(function () {
                    console.log("error");
                })
                .always(function () {
                    console.log("complete");
                });

        }

        // Album2
        if (elId == 'album2') {
            $.ajax({
                url:'image.json',
                dataType:"json",
                type:'GET',
                success:function (data) {


                }
            })
                .done(function (data) {

                    _.each(data, function (val, key) {

                        if (key === 'album2') {

                            _.each(data["album2"], function (value, key) {

                                $("#imgBox").append('<img class="previewImg" src="http://s418944844.online.de/DKT/images/album2/"' + value + '>');

                            })

                        }


                    });

                })
                .fail(function () {
                    console.log("error");
                })
                .always(function () {
                    console.log("complete");
                });

        }

        // Album3
        if (elId == 'album3') {
            $.ajax({
                url:'image.json',
                dataType:"json",

                type:'GET',
                success:function (data) {


                }
            })
                .done(function (data) {

                    _.each(data, function (val, key) {

                        if (key === 'album3') {

                            _.each(data["album3"], function (value, key) {

                                $("#imgBox").append('<img class="previewImg" src="http://s418944844.online.de/DKT/images/album3/"' + value + '>');

                            })

                        }


                    });

                    console.log("success");
                })
                .fail(function () {
                    console.log("error");
                })
                .always(function () {
                    console.log("complete");
                });
        }
        // Album4
        if (elId == 'album4') {
            $.ajax({
                url:'image.json',
                dataType:'json',
                type:'GET',
                success:function (data) {


                }
            })
                .done(function (data) {
                    _.each(data, function (val, key) {

                        if (key === 'album4') {

                            _.each(data["album4"], function (value, key) {

                                $("#imgBox").append('<img class="previewImg" src="http://s418944844.online.de/DKT/imagesalbum4/"' + value + '>');

                            })

                        }


                    });


                    console.log("success");
                })
                .fail(function () {
                    console.log("error");
                })
                .always(function () {
                    console.log("complete");
                });
        }


    });

    $("#closeP").click(function (event) {
        $(".previewButton").fadeOut(100);
        $(".preview").animate({height:"0px"}, 2000);
        $(".previewImg").fadeOut(1900);
        $(".album.active").removeClass('active');
        setTimeout(function () {
            removeImg();
            $(".preview").css("overflow-x", "hidden");


        }, 2000);
    });


});

//Clear Preview
function removeImg() {
    if ($(".previewImg").length = !0) {
        $(".previewImg").remove();
    }
    ;
};
//Show a loader image
function showLoader() {
    $(".preview").append('<img id="loader" src="http://s418944844.online.de/DKT/icons/loader.gif">');
    $("#right").after('<div id="loaderBack"></div>')
    $("#loader").css({
        position:'absolute',
        left:'50%',
        bottom:'445px'
    });
    $("#loaderBack").css({
        position:'absolute',
        'background-color':'black',
        opacity:'0.5',
        height:'315px',
        width:'inherit'
    });
    setTimeout(function () {
        $("#loaderBack").remove();
        $("#loader").remove();
        $(".previewImg").show();
    }, 500);
};
