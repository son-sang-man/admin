///ver.1.01111

$(document).ready(function(){
	// 클릭 이벤트

/*	
	$(document).on("click mouseover", "#gnb > li > a", function(e){
		e.preventDefault();
		$(this).attr("title", "현재메뉴").parent().addClass("on").children("ul").show().parent().siblings().removeClass("on").children("ul").hide().prev().removeAttr("title");
	});
*/

	$(document).on({
		click : function(e){
			//$(this).attr("title", "현재메뉴").parent().addClass("on").children("ul").show().parent().siblings().removeClass("on").children("ul").hide().prev().removeAttr("title");
			$(this).children("ul").stop().slideDown();
		}, 
		mouseleave: function(){
			$(this).children("ul").slideUp();
		}
	}, "#gnb > li");


/*
	$("#gnb > li > a").click(function(e){
		e.preventDefault();
		// 컬러체인지, 타이틀 추가, 하위메뉴 레이어
		$(this).attr("title", "현재메뉴").parent().addClass("on").children("ul").show().parent().siblings().removeClass("on").children("ul").hide().prev().removeAttr("title");
	})
*/
	//2depth 클릭 시 컬러체인지, 타이틀 추가, 하위메뉴 레이어
	$("#gnb > li > ul > li > a").click(function(e){
		e.preventDefault();
		$(this).parent().addClass("on").children("ul").show();
		$(this).attr("title", "현재메뉴");

		// 한개만 보이게 하기
		$(this).parent().siblings().removeClass("on").children("ul").hide();
		$(this).parent().siblings().find(" > a").removeAttr("title");
	});



	//location 
	$(document).on({
		click : function(){
			//$(this).attr("title", "현재위치").next("ul").slideDown().parent().siblings().children("ul").slideUp().removeAttr("title");
			$(this).next("ul").slideDown().parent().siblings().children("ul").slideUp();

			//하위메뉴 클릭 시 닫히기
		//	$(this).next("ul").children(" > li > a").click(alert("1"));
			

		}
	}, ".location > ul > li > a");



	//location 
	$(document).on({
		click : function(){
			//하위메뉴 클릭 시 닫히기
			$(this).parent().parent("ul").slideUp();
			
		}
	}, ".location > ul > li > ul > li > a");





	
});

 $(document).ready(function(){
//   var fileTarget = $('.filebox .fileHidden');

//     fileTarget.on('change', function(){
//         if(window.FileReader){
//             var filename = $(this)[0].files[0].name;
//         } else {
//             var filename = $(this).val().split('/').pop().split('\\').pop();
//         }
//         $(this).siblings('.txt').val(filename);
//     });


	$(".ccc").change(function(){
		var idx = $(this).find("> option:selected").index();
		console.log(idx);
	});
		$(".fileHidden").change(function(){
			var aa = $(this).val();
			$(".filebox input[type='text']").val(aa);
		});

}); 