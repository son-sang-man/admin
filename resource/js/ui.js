/*
* Creat : Madive 손상만
* Creat Date : 2017-07-10
* Last Update :2017-07-19
* Ver : 1.01
*/

// UI Module
var ui = {
	selectBox : {
		selectOpen : false,
		creat : function(target){
			var _this = target;
			var disabled = _this.find("select").is(":disabled");
			if(_this.find(".designSelect").length == 0){
				_this.find("select").hide();
				var listW = _this.find("select").width();
				var options = _this.find("select option");
				_this.prepend("<div class='designSelect'></div>");
				var $wrap = _this.find(".designSelect");
				$wrap.wrapInner("<ul></ul>");
				var $list = $wrap.find("ul");
				$wrap.prepend("<button title='열림'>선택하세요</button>");
				var wrapW = _this.find("button").width();
				if(wrapW < listW){
					$wrap.css("width",listW + 100);
				} else {
					$wrap.css("width","150px");
				}
			} else {
				$wrap = _this.find(".designSelect li").remove();
			}
			if(disabled){
				_this.find("button").attr({
					"disabled" : "disabled",
					"title" : "비활성화"
				})
			} else {
				_this.find("button").removeAttr("disabled");
			}
			_this.find("select option").each(function(){
				var value = $(this).val();
				var text = $(this).text();
				var itemW = $(this).width();
				_this.find("ul").append("<li><a href='#" + value + "'>" +  text + "</a></li>");
			});
		},
		setting : function(){
			var $obj = $("[data-form='selectBox']");
			// 로드 시 디자인 셀렉트 생성
			$obj.each(function(i){
				$(this).addClass("aaa" + i)
				ui.selectBox.creat($(this));
			})
		},
		update : function(target){
			var $obj = $(target).parent(".selectBox");
			ui.selectBox.creat($obj);
		},
		event : function(){
			// 리스트 열림
			$(document).on({
				click: function(){
					if($(this).next("ul").css("display") == "none"){
						$("[data-form='selectBox']").find("ul").hide();
						var idx = $(this).closest(".designSelect").next("select").find("option:selected").index();
						$(this).closest(".designSelect").find("ul").slideDown();
						$(this).attr("title","닫힘");
						$(this).closest(".designSelect").find("ul li").eq(idx).find("a").focus();
						ui.selectBox.selectOpen = true;
					} else {
						$(this).closest(".designSelect").find("ul").slideUp();
						$(this).closest(".designSelect").find("button").attr("title","열림");
						ui.selectBox.selectOpen = false;
					}

				},
			}, "[data-form='selectBox'] button");
			// 셀렉트 박스 선택
			$(document).on({
				click: function(e){
					e.preventDefault();
					var idx = $(this).parent().index();
					var text = $(this).text();
					$(this).closest(".designSelect").find("> button").attr("title","열림").text(text);
					$(this).attr("title","선택됨").parent().siblings().find("> a").removeAttr("title");
					$(this).closest(".designSelect").next("select").find("option").eq(idx).attr("selected","selected").siblings().removeAttr("selected")
					$(this).closest(".designSelect").next("select").trigger("change");
					$(this).closest("ul").slideUp();
					ui.selectBox.selectOpen = false;
				}
			}, "[data-form='selectBox'] ul a");
			// 바닥 클릭 닫기
			$(document).on({
				mouseup: function(e){
					var $obj =  $("[data-form='selectBox']");
					if (!$obj.is(e.target) && $obj.has(e.target).length === 0){
						$obj.find(".designSelect ul").slideUp();
						$obj.find(".designSelect button").attr("title","열림");
						ui.selectBox.selectOpen = false;
					}
				}
			});
		},
		init : function(){
			ui.selectBox.setting();
			ui.selectBox.event();
		}
		// 디자인 셀렉트 리셋
	},
	datePicker : {
		event : function(){
			$( ".datePicker" ).datepicker({
				closeText: '닫기 x',
				prevText: '이전달',
				nextText: '다음달',
				currentText: 'TODAY',
				showOn: "both",
				showButtonPanel: true,
				// buttonImage: "/resource/img/ico_datapicker.png",
				buttonImageOnly: false,
				buttonText: "<span>날짜 선택</span>",
				// buttonImageOnly: true,
				// buttonText: "날짜 선택",
				changeMonth: true,
				changeYear: true,
				monthNamesShort: ['1월','2월','3월','4월','5월','6월', '7월','8월','9월','10월','11월','12월'],
				dayNamesShort: ['일','월','화','수','목','금','토'],
				dayNamesMin: ['일','월','화','수','목','금','토'],
				dateFormat : "yy-mm-dd"
			});
		}
	},
	init : function(){
		ui.selectBox.init();
		ui.datePicker.event();
	}
}

// Jquery function
$.fn.update = function(){
	ui.selectBox.update(this);
}

winPopup = function(url){
	var winW = $(window).width();
	var winH = $(window).height();
	var	popW = 200;
	var	popH = 200;
	var	top = Math.round((winH / 2) - (popH / 2));
	var	left = Math.round((winW / 2) - (popW / 2));
	var toolbar  = "no"
	var status = "'toolbar=" + toolbar + ", width=" + popW + ", height=" + popH + ", top=" + top + ", left=" + left + "'";

	window.open(url,"",status)

	// window.open
}
