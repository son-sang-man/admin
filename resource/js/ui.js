/*
* Creat : Madive 손상만
* Creat Date : 2017-07-10
* Last Update :2017-07-27
* Ver : 1.00
*/

// UI Module
var ui = {
	gnb : {
		event : function(){
			// 1 Depth Mouse Event
			$(document).on({
				mouseenter : function(){
					if($("#gnb > ul > li").find("ul").is(":animated")) return;
					$(this).addClass("on").attr("title","선택됨").siblings().removeClass("on").removeAttr("title");
					$(this).find("> ul").slideDown().parent().siblings().find("> ul").hide();
				},
				mouseleave : function(){
					if($(this).find("ul").is(":animated")) return;
					$(this).removeClass("on").removeAttr("title").find("> ul").hide();
				}
			}, "#gnb > ul > li");
			// 1 Depth KeyBord Event
			$(document).on({
				focusin : function(){
					if($(this).next("ul").is(":animated")) return;
					$(this).parent().addClass("on").attr("title","선택됨").siblings().removeClass("on").removeAttr("title");
					$(this).next("ul").slideDown().parent().siblings().find("> ul").hide();
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
					$(this).next("ul").slideDown().parent().siblings().find("> ul").hide();
				}
			}, "#gnb > ul > li > ul > li > a");
		}
	},
	location : {
		open : false,
		setting : function(){
			var $obj = $(".location > div");
			var itemDepthArray1 = new Array;
			var itemDepthArray2 = new Array;
			var itemDepthArray3 = new Array;
			var itemDepthArray4 = new Array;

			// Max 값 구하기
			$obj.find("> ul > li").each(function(i){
				$(this).find("> ul > li").each(function(){
					var itemW = $(this).find("span").width();
					switch(i){
						case 0 : itemDepthArray1.push(itemW); break;
						case 1 : itemDepthArray2.push(itemW); break;
						case 2 : itemDepthArray3.push(itemW); break;
						case 3 : itemDepthArray4.push(itemW); break;
					}
				});
			});

			// width값 조절
			$obj.find("> ul > li").each(function(i){
				var max,
					itemW = $(this).find("button > span").width();
				switch(i){
					case 0 : max = Math.max.apply(null, itemDepthArray1); break;
					case 1 : max = Math.max.apply(null, itemDepthArray2); break;
					case 2 : max = Math.max.apply(null, itemDepthArray3); break;
					case 3 : max = Math.max.apply(null, itemDepthArray4); break;
				}
				if(max < 180){
					$(this).find("button > span").css("width","180px");
				} else {
					$(this).find("button > span").css("width",max);
				}
			});
			$obj.find("> ul > li").css("position","relative");
			$obj.find("> ul > li > ul > li span").css("display","block");
		},
		event : function(e){
			$(document).on({
				click : function(){
					if(!$(this).parent().hasClass("on")){
						$(this).attr("title","활성화").parent().addClass("on").find("ul").css("visibility","visible").parent().siblings().removeClass("on").find("ul").css("visibility","hidden").prev().removeAttr("title");
							ui.location.open = true;
					} else {
						$(this).removeAttr("title").parent().removeClass("on").find("ul").css("visibility","hidden");
					}

				}
			}, ".location button");
			$(document).on({
				mouseup: function(e){
					var $obj =  $(".location > div > ul ul");
					if (!$obj.is(e.target) && $obj.has(e.target).length === 0){
						$obj.prev().removeAttr("title");
						$obj.parent().removeClass("on");
						$obj.css("visibility","hidden");
						ui.location.open = false;
					}
				}
			});
		},
		init : function(){
			ui.location.setting();
			ui.location.event();
		}
	},
	selectBox : {
		open : false,
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
					$wrap.css("width","130px");
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
						ui.selectBox.open = true;
					} else {
						$(this).closest(".designSelect").find("ul").slideUp();
						$(this).closest(".designSelect").find("button").attr("title","열림");
						ui.selectBox.open = false;
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
					ui.selectBox.open = false;
				}
			}, "[data-form='selectBox'] ul a");
			$(document).on({
				mouseup: function(e){
					var $obj =  $("[data-form='selectBox']");
					if (!$obj.is(e.target) && $obj.has(e.target).length === 0){
						$obj.find(".designSelect").removeClass("on");
						$obj.find(".designSelect ul").slideUp();
						$obj.find(".designSelect button").attr("title","열림");
						ui.selectBox.open = false;
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
		startDate : "",
		endDate : "",
		setting : function(){
			$(".datePicker").datepicker({
				closeText: '닫기 x',
				prevText: '이전달',
				nextText: '다음달',
				currentText: 'TODAY',
				showOn: "both",
				showButtonPanel: true,
				buttonImageOnly: false,
				buttonText: "<span>날짜 선택</span>",
				changeMonth: true,
				changeYear: true,
				monthNamesShort: ['1월','2월','3월','4월','5월','6월', '7월','8월','9월','10월','11월','12월'],
				dayNamesShort: ['일','월','화','수','목','금','토'],
				dayNamesMin: ['일','월','화','수','목','금','토'],
				dateFormat : "yy-mm-dd",
				onSelect : function(selectDate){
					if($(this).parent().parent().hasClass("dateWrap")){
						var idx = $(this).parent().index(); // 0 = 시작일, 1 = 종료일
						var startDate = ui.datePicker.startDate.replace(/-/gi, "");
						var endDate = ui.datePicker.endDate.replace(/-/gi, "");
						var selectedDate = selectDate.replace(/-/gi, "");
						if(idx == 0){
							if(selectedDate >= endDate){
								alert("기간 선택이 잘못되었습니다");
								$(this).val(ui.datePicker.startDate)
							} else {
								ui.datePicker.startDate = selectDate;
							}
						} else {
							if(selectedDate <= startDate){
								alert("기간 선택이 잘못되었습니다");
								$(this).val(ui.datePicker.endDate)
							} else {
								ui.datePicker.endDate = selectDate;
							}
						}
					}
				}
			});
			$(".dateArea").each(function(){
				var term = $(this).data("term");
				ui.datePicker.termSetting($(this), term);
			});
		},
		termSetting : function(target, data){
			var fromDate = new Date()
			var termNumber =  parseFloat(data.replace(/a-z/gi, ''))
			var term =  data.replace(/[0-9]/gi, '');
			var day = fromDate.getDate();
			var month = fromDate.getMonth() + 1;
			if(day < 10){
				day = "0" + day
			}
			if(month < 10){
				month = "0" + month
			}
			// ui.datePicker.endDate  = new Date(fromDate.getFullYear(),month,day);
			ui.datePicker.endDate = fromDate.getFullYear() + "-" + month + "-" + day;
			switch(term){
				case "d" : // 일
					fromDate.setDate(fromDate.getDate() - termNumber);
				break;
				case "w" : // 주
					fromDate.setDate(fromDate.getDate() - (termNumber*7));
				break;
				case "m" : // 월
					fromDate.setMonth(fromDate.getMonth() - termNumber);
				break;
				case "y" : // 년
					fromDate.setYear(fromDate.getFullYear() - termNumber);
				break;
			}
			var day = fromDate.getDate();
			var month = fromDate.getMonth() + 1;
			if(day < 10){
				day = "0" + day
			}
			if(month < 10){
				month = "0" + month
			}
			// ui.datePicker.startDate  = new Date(fromDate.getFullYear(),month,day);
			ui.datePicker.startDate = fromDate.getFullYear() + "-" + month + "-" + day;

			target.find(".dateWrap .dateBox:first-child .datePicker").val(ui.datePicker.startDate);
			target.find(".dateWrap .dateBox:last-child .datePicker").val(ui.datePicker.endDate);
		},
		termEvent : function(){
			$(document).on({
				click : function(){
					var term = $(this).data("term");
					var $target = $(this).closest(".dateArea");
					$(this).addClass("on").siblings().removeClass("on");
					ui.datePicker.termSetting($target, term)
				}
			}, ".dateArea .dateBtn button");
		},
		init : function(){
			ui.datePicker.setting();
			ui.datePicker.termEvent();
		}
	},
	table : {
		setting : function(){
			$(".tableTy1").each(function(){
				switch($(this).closest(".tableTy1").data("scroll")){
					case "horizontal" :
						$(this).find("> .header").css("overflow","hidden");
						$(this).find("> .body").css("overflow-x","scroll");
					break;
					case "vertical" :
						$(this).find("> .body").css({
							"overflow-y" : "scroll",
							"height" : "400px"
						});
					break;
					case  "all" :
						$(this).find("> .header").css("overflow","hidden");
						$(this).find("> .body").css({
							"overflow-x" : "scroll",
							"overflow-y" : "scroll",
							"height" : "400px"
						});
					break
				}
			});
		},
		event : function(){
			$(".tableTy1 .body").on({
				"scroll" : function(e){
					if($(this).closest(".tableTy1").data("scroll") == "horizontal" || $(this).closest(".tableTy1").data("scroll") == "all"){
						var scrollX = $(this).scrollLeft();
						$(this).siblings(".header").scrollLeft(scrollX);
					}
				}
			});
		},
		init : function(){
			ui.table.setting();
			ui.table.event();
		}
	},
	/**
	 * @function UI initializer
	**/
	init : function(){
		ui.gnb.event();
		ui.location.init();
		ui.selectBox.init();
		ui.datePicker.init();
		ui.table.init();
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
