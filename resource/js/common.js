$(document).ready(function(){
	commonTab();
	datepicker();

	ui.selectBox.init();
});

function commonTab(){
	$(".tab > ul > li > a").click(function(event){
		event.preventDefault();
		var idx = $(this).parent().index();
		$(this).parent().addClass("on").siblings().removeClass("on");
		$(this).attr("title","활성화").parent().siblings().children("a").removeAttr("title");
		$(".tabContent").find("> div").eq(idx).show().siblings().hide();
	});
};

function datepicker(){
	$( "#dateStar, #dateClose" ).datepicker({
		closeText: '닫기 x',
		prevText: '이전달',
		nextText: '다음달',
		currentText: 'TODAY',
		showOn: "both",
		showButtonPanel: true,
		buttonImage: "/../images/ico_datapicker.png",
		buttonImageOnly: true,
		buttonText: "날짜 선택",
		changeMonth: true,
		changeYear: true,
		monthNamesShort: ['1월','2월','3월','4월','5월','6월', '7월','8월','9월','10월','11월','12월'],
		dayNamesShort: ['일','월','화','수','목','금','토'],
		dayNamesMin: ['일','월','화','수','목','금','토'],
		dateFomat : "YYYY-MM-DD"
    });
};
