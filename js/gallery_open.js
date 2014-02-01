$(document).ready(function () {


    $("#closeP").hide();


    $(".album").click(function () {

        if ($(".preview").height() == 0) {
            $(".preview").animate({height: "350px"}, 2000);
            
            	$("#closeP").fadeIn(2000);
        	
        };

        //Check if there are some images already and remove them
        removeImg();

        $("#closeP").show();
        var elId = $(this).attr('id');

        // Album1
        if (elId == 'album1') {

            $.ajax({
                dataType: "json",
                url: 'image.json',
                type: 'GET',
                success: function (data) {


                }
            })
                .done(function (data) {

                    _.each(data, function (val, key) {

                        if (key === 'album1') {

                            _.each(data["album1"], function (value, key) {

                                $("#imgBox").append('<img class="previewImg" src=/DorfKinderTiere/images/album1/' + value + '>');

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
                url: 'image.json',
                dataType: "json",
                type: 'GET',
                success: function (data) {


                }
            })
                .done(function (data) {

                    _.each(data, function (val, key) {

                        if (key === 'album2') {

                            _.each(data["album2"], function (value, key) {

                                $("#imgBox").append('<img class="previewImg" src=/DorfKinderTiere/images/album2/' + value + '>');

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
                url: 'image.json',
                dataType: "json",

                type: 'GET',
                success: function (data) {


                }
            })
                .done(function (data) {

                    _.each(data, function (val, key) {

                        if (key === 'album3') {

                            _.each(data["album3"], function (value, key) {

                                $("#imgBox").append('<img class="previewImg" src=/DorfKinderTiere/images/album3/' + value + '>');

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
                url: 'image.json',
                dataType:'json',
                type: 'GET',
                success: function (data) {


                }
            })
                .done(function (data) {
                    _.each(data, function (val, key) {

                        if (key === 'album4') {

                            _.each(data["album4"], function (value, key) {

                                $("#imgBox").append('<img class="previewImg" src=/DorfKinderTiere/images/album4/' + value + '>');

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
    	$("#closeP").fadeOut(100);
        $(".preview").animate({height: "0px"}, 2000);
        $(".previewImg").fadeOut(1000);
        setTimeout(function () {
            removeImg();
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
