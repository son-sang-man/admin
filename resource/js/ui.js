/*
* Creat : Madive 손상만
* Creat Date : 2017-07-10
* Last Update :2017-07-21
* Ver : 1.00
*/

// UI Module
var ui = {
	gnb : {
		event : function(){
			// 1 Depth Mouse Event
			$(document).on({
				mouseenter : function(){
					if($(this).find("ul").is(":animated")) return;
					$(this).addClass("on").attr("title","선택됨").siblings().removeClass("on").removeAttr("title");
					$(this).find("> ul").slideDown().parent().siblings().find("> ul").slideUp();
				},
				mouseleave : function(){
					if($(this).find("ul").is(":animated")) return;
					$(this).removeClass("on").removeAttr("title").find("> ul").slideUp();
				}
			}, "#gnb > ul > li");
			// 1 Depth KeyBord Event
			$(document).on({
				focusin : function(){
					if($(this).next("ul").is(":animated")) return;
					$(this).parent().addClass("on").attr("title","선택됨").siblings().removeClass("on").removeAttr("title");
					$(this).next("ul").slideDown().parent().siblings().find("> ul").slideUp();
				}
			}, "#gnb > ul > li > a");
			// 2 Depth
			$(document).on({
				mouseenter : function(){
					$(this).attr("title","선택됨").siblings().removeAttr("title");
					$(this).find("> ul").show().parent().siblings().find("> ul").hide();
				},
				mouseleave : function(){
					$(this).removeAttr("title");
					$(this).find("> ul").hide();
				}
			}, "#gnb > ul > li > ul > li");
			// 2 Depth KeyBord Event
			$(document).on({
				focusin : function(){
					if($(this).next("ul").is(":animated")) return;
					$(this).parent().addClass("on").attr("title","선택됨").siblings().removeClass("on").removeAttr("title");
					$(this).next("ul").slideDown().parent().siblings().find("> ul").slideUp();
				}
			}, "#gnb > ul > li > ul > li > a");
		}
	},
	selectBox : {
		selectOpen : false,
		/**
		 * @function 디자인 select box 새엉 및 재셋팅 시
		 * @param {String} target - 디자인 셀렉트 셀렉터
		 *
		**/
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
		/**
		 * @function 디자인 select box 페이지 로드시 셋팅
		**/
		setting : function(){
			var $obj = $("[data-form='selectBox']");
			// 로드 시 디자인 셀렉트 생성
			$obj.each(function(i){
				$(this).addClass("aaa" + i)
				ui.selectBox.creat($(this));
			})
		},
		/**
		 * @function 디자인 select box 업데이트 및 동적 생성일 경우
		 * @param {String} target - 디자인 셀렉트 셀렉터
		 *
		**/
		update : function(target){
			var $obj = $(target).parent(".selectBox");
			ui.selectBox.creat($obj);
		},
		/**
		 * @function 디자인 select box 이벤트
		**/
		event : function(){
			$(document).on({
				click: function(){
					if($(this).next("ul").css("display") == "none"){
						$("[data-form='selectBox']").find("ul").hide();
						var idx = $(this).closest(".designSelect").next("select").find("option:selected").index();
						$(this).closest(".designSelect").addClass("on").find("ul").slideDown();
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
			$(document).on({
				click: function(e){
					e.preventDefault();
					var idx = $(this).parent().index();
					var text = $(this).text();
					$(this).closest(".designSelect").removeClass("on").find("> button").attr("title","열림").text(text);
					$(this).attr("title","선택됨").parent().siblings().find("> a").removeAttr("title");
					$(this).closest(".designSelect").next("select").find("option").eq(idx).attr("selected","selected").siblings().removeAttr("selected")
					$(this).closest(".designSelect").next("select").trigger("change");
					$(this).closest("ul").slideUp();
					ui.selectBox.selectOpen = false;
				}
			}, "[data-form='selectBox'] ul a");
			$(document).on({
				mouseup: function(e){
					var $obj =  $("[data-form='selectBox']");
					if (!$obj.is(e.target) && $obj.has(e.target).length === 0){
						$obj.find(".designSelect").removeClass("on");
						$obj.find(".designSelect ul").slideUp();
						$obj.find(".designSelect button").attr("title","열림");
						ui.selectBox.selectOpen = false;
					}
				}
			});
		},
		/**
		 * @function 디자인 select box initializer
		**/
		init : function(){
			ui.selectBox.setting();
			ui.selectBox.event();
		}
		// 디자인 셀렉트 리셋
	},
	datePicker : {
		/**
		 * @function Date Picker 셋팅
		 * jQuery Ui 참조
		**/
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
	/**
	 * @function UI initializer
	**/
	init : function(){
		ui.gnb.event();
		ui.selectBox.init();
		ui.datePicker.event();
	}
}

/*******************
 * jQuery function *
********************/

/**
 * @function 디자인 select box update jQuery function
**/
$.fn.update = function(){
	ui.selectBox.update(this);
}

/**
 * @function Window Popup
 * @param {String} url - 로드할 html
 *
**/
winPopup = function(url){
	var winW = document.body.clientWidth;
	var winH = screen.availHeight;
	var	popW = 800;
	var	popH = 600;
	var	top =(winH / 2) - (popH / 2);
	var	left = (winW / 2) - (popW / 2);
		left += window.screenLeft;
	var toolbar  = "no"
	var status = "'toolbar=" + toolbar + ", width=" + popW + ", height=" + popH + ", top=" + top + ", left=" + left + "'";
	window.open(url,"",status)
}
