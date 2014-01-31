$(document).ready(function () {

	

	$(".previewButton").hide();

	//Album preview

	$(".album").click(function(){

		if($(".preview").height() == 0){
			$(".preview").animate({height: "350px"}, 2000);
			// $("#imgBox").animate({height: "300px"}, 2000);
		};

			//Check if there are some images already and remove them
			removeImg();

			$(".previewButton").show();
			var elId = $(this).attr('id');

			// Album1
			if(elId == 'album1'){

				$.ajax({
					url: '/DorfKinderTiere/images/album1',
					type: 'GET',
					success: function(data){
						
						
					}
				})
				.done(function(data) {

					// var count = 0;
					// $(data).find('ul li a').each(function(){
					// 	count++;
					// })
					// console.log("count "+count);

					// var count = $(this).size();
					// console.log("count ="+count);

                      
					var $previewWidth = 0;
					var count = 0
                        $(data).find('a').each(function(){
                            count++;
                            var name = $(this).attr('href');
                            
                            $("#imgBox").append('<img class="previewImg" src=/DorfKinderTiere/images/album1/'+name+'>');
                        })
                        console.log(count);
                        console.log(data);


					$(".previewImg").first().hide();

					console.log("success");
				})
				.fail(function() {
					console.log("error");
				})
				.always(function() {
					console.log("complete");
				});

				
			}

			// Album2
			if(elId == 'album2'){
				$.ajax({
					url: '/DorfKinderTiere/images/album2',
					type: 'GET',
					success: function(data){

						
					}
				})
				.done(function(data) {
					
					var count = $("ul li a").length;
					console.log("count ="+count);
					for (var i = 1; i < count; i++) {
						$(".preview").append('<img class="previewImg" src=/DorfKinderTiere/images/album2/'+i+'.jpg>')
					};
					
					$(".previewImg").each(function() {
						$previewWidth += $(this).width();	
					});

					$(".preview").css({
						width: $previewWidth+'px'
					});
					console.log(data);
					console.log("success");
				})
				.fail(function() {
					console.log("error");
				})
				.always(function() {
					console.log("complete");
				});

			}

			// Album3
			if(elId == 'album3'){
				$.ajax({
					url: '/DorfKinderTiere/images/album3',
					type: 'GET',
					success: function(data){

						
					}
				})
				.done(function(data) {
					var count = $("ul li a").length;
					for (var i = 1; i < count; i++) {
						$(".preview").append('<img class="previewImg" src=/DorfKinderTiere/images/album3/'+i+'.jpg>')
					};
					$("a").attr('href');
					
					console.log("success");
				})
				.fail(function() {
					console.log("error");
				})
				.always(function() {
					console.log("complete");
				});
			}
			// Album4
			if(elId == 'album4'){
				$.ajax({
					url: '/DorfKinderTiere/images/album4',
					type: 'GET',
					success: function(data){

						
					}
				})
				.done(function(data) {
					var count = $("ul li a").length;
					for (var i = 1; i < count; i++) {
						$(".preview").append('<img class="previewImg" src=/DorfKinderTiere/images/album4/'+i+'.jpg>')
					};
					$("a").attr('href');
					
					console.log("success");
				})
				.fail(function() {
					console.log("error");
				})
				.always(function() {
					console.log("complete");
				});
			}

	});

	$("#closeP").click(function(event) {
		$(".preview").animate({height: "0px"}, 2000);
		$(".previewImg").fadeOut(1000);
		$(".previewButton").fadeOut(1000);
		setTimeout(function() {
			removeImg();
		}, 2000);
			
	});


});

	//Clear Preview
	function removeImg(){
		if ($(".previewImg").length =! 0) {
			$(".previewImg").remove();
		};

	};