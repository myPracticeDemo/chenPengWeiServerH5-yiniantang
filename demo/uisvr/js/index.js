$(document).ready(function() {
	var invitation = {
		init: function() {
			this.onEvent();
			this.initPage();
		},
		initPage:function(){
			//如果是Android机
			if(!navigator.userAgent.match(/(iphone|ipad|ipod)/gi)){
				var swiper = document.getElementById("swiper");
				var scale = window.screen.height / window.screen.width;
				var ua = navigator.userAgent.toLowerCase();
				if(ua.match(/MicroMessenger/i)=="micromessenger") {
					//如果是在微信平台上打开
					swiper.style.height = document.body.clientWidth * scale-68 + "px";
				} else {
					swiper.style.height = document.body.clientWidth * scale + "px";
				}
			}


		},
		onEvent: function() {
			this.initSwiper();
			this.onClick();
		},
		initSwiper: function() {
			var _this = this;
			var mySwiper = new Swiper('.swiper-container', {
				// pagination: '.swiper-pagination',
				//paginationClickable: true,
				speed: 500,
				mousewheelControl: true,
				direction: 'vertical',
				onSlideChangeEnd: function(swpier) {
					_this.pageAction(swpier);
				}

			});
		},
		pageAction: function(object) {
			var n = object.activeIndex,
				per = object.previousIndex;

			var elem_now = object.slides[n]; //当前页面
			var elem_pre = object.slides[per]; //上一页面

			//第四页种植基地动画
			var plantEle=$(elem_now).find(".J_plantationBox");
			if(plantEle.length>0){
				plantEle.addClass("J_animaPlant");
			}else{
				$(".J_plantationBox").removeClass("J_animaPlant");
			}

			//第七页 第八页 白云飘过动画
			function animation(elCls){
				var elShadow=$(elem_now).find(elCls);
				if(elShadow.length>0){
					//elShadow.addClass("J_aniShadow");
					elShadow.eq(0).addClass("J_aniShadow");
					var positionTimer2=setTimeout(function(){
						elShadow.eq(1).addClass("J_aniShadow");
					},200);
					var positionTimer3=setTimeout(function(){
						elShadow.eq(2).addClass("J_aniShadow");
					},400);
				}else{
					clearTimeout(positionTimer2);
					clearTimeout(positionTimer3);
					$(elCls).removeClass("J_aniShadow");
				}
			}
			animation(".J_seventhIconSBox");
			animation(".J_eighthIconSBox");

			//现在与未来动画逻辑
			var nowFuture=$(elem_now).find(".J_threeImg");
			if(nowFuture.length>0){
				//console.log(nowFuture.eq(2).get(0));
				nowFuture.eq(2).addClass("J_nowFutureAni");
				//var timer1=setTimeout(function(){
				//	nowFuture.eq(2).addClass("J_nowFutureAni");
				//},300);
				var timer2=setTimeout(function(){
					nowFuture.eq(1).addClass("J_nowFutureAni");
				},200);
				var timer3=setTimeout(function(){
					nowFuture.eq(0).addClass("J_nowFutureAni");
				},400);
			}else{
				//clearTimeout(timer1);
				clearTimeout(timer2);
				clearTimeout(timer3);
				$(".J_threeImg").removeClass("J_nowFutureAni");
			}

			//我们希望你。。。和最后一页 我们一直在等你 文墨动画
			var mental=$(elem_now).find(".J_mental");
			if(mental.length>0){
				mental.addClass("J_mentalAnimation");
			}else{
				$(".J_mental").removeClass("J_mentalAnimation");
			}


		},
		onClick: function() {
			var self = this;
			//表单提交
			$("#submitBtn").on("click", function(e) {
				e.preventDefault();
				e.stopPropagation();
				var cuEl=$(this);
				//校验职位
				if(Zepto("select[name='positionName']").val()=="0"){
					Zepto(".J_floatListBox").show(400).find(".J_floatCon").html("").append('<span class="float-result-inner" style="background-color: #000;">请选择你有意向的职位!</span>');
					setTimeout(function(){
						Zepto(".J_floatListBox").hide(400)
					},2000);
					return;
				}
				//校验姓名
				if(Zepto("input[name='userName']").val()==""){
					Zepto(".J_floatListBox").show(400).find(".J_floatCon").html("").append('<span class="float-result-inner" style="background-color: #000;">姓名不能为空!</span>');
					setTimeout(function(){
						Zepto(".J_floatListBox").hide(400)
					},2000);
					return;
				}
				//校验手机号码
				var phoneStr=Zepto("input[name='userTel']").val();
				if(phoneStr==""){
					Zepto(".J_floatListBox").show(400).find(".J_floatCon").html("").append('<span class="float-result-inner" style="background-color: #000;">手机号码不能为空!</span>');
					setTimeout(function(){
						Zepto(".J_floatListBox").hide(400)
					},2000);
					return;
				}
				if(isNaN(phoneStr)){
					Zepto(".J_floatListBox").show(400).find(".J_floatCon").html("").append('<span class="float-result-inner" style="background-color:#000;">手机号码必须为数字!</span>');
					setTimeout(function(){
						Zepto(".J_floatListBox").hide(400)
					},2000);
					return;
				}
				cuEl.attr("disabled",true);
				Zepto.ajax({
					type: "POST",
					url: "", 
					data:$("#form1").serializeArray(), 
					success: function(data) {
						console.log(data);
						cuEl.attr("disabled",false);
						if(data.success){
							$(".J_floatListBox").show(400).find(".J_floatCon").html("").append('<span class="float-result-inner" style="background-color: #000;">'+data.message+'</span>');
							setTimeout(function(){
								Zepto(".J_floatListBox").hide(400)
							},2000);
						}else{
							$(this).attr("disabled",false);
							$(".J_floatListBox").show(400).find(".J_floatCon").html("").append('<span class="float-result-inner" style="background-color: #000;">'+data.message+'</span>');
							setTimeout(function(){
								Zepto(".J_floatListBox").hide(400)
							},2000);
						}
					},
					error: function(err) {
						cuEl.attr("disabled",false);
						$(".J_floatListBox").show(400).find(".J_floatCon").html("").append('<span class="float-result-inner" style="background-color: #000;">网络问题，请重试！</span>');
						setTimeout(function(){
							Zepto(".J_floatListBox").hide(400)
						},2000);
						$("select[name='positionName'] option").eq(0).attr("selected",true);
						Zepto("input[name='userName'],input[name='userTel']").val("");
					}
				})
			});
			//浮层的关闭事件 ,点击整个屏幕关闭
			//$(".J_floatClose").click(function(){
			//	Zepto(this).closest(".J_floatListBox").hide();
			//});
			$("body").click(function(){
				if(Zepto(".J_floatListBox").eq(0).css("display")=="block"){
					Zepto(".J_floatListBox").eq(0).hide();
				}
			});

		}

	};
	invitation.init();

})