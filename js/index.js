

// 预加载
var imgsArr=document.getElementsByTagName("img");
var num=0;
var precent=0;
console.log(imgsArr)
for (var i = 0; i <imgsArr.length; i++) {
	var img=new Image();
	img.src=imgsArr[i].src;
	img.onload=function  () {
		num++;
		console.log(num);
		precent=parseInt(num/imgsArr.length*100);

		$(".prevOnLoad>p").text(precent+"%");

		if (num==imgsArr.length) {
			$(".prevOnLoad").css("display","none");
			gameStartFn ();
		}
	}
};




function gameStartFn () {
		

var height1=5;
// 判断是否撞墙
var wallbol=false;
// 时间
var timeBol=true;
// 点击看一看
$(".index>.enter>img").on("touchstart",function(){
	$(this).parent().parent().animate({
		"width":0
	})
	$(".choosePeople").animate({
		"left":'0',
		"top":0
	})

})
// 选取人物
var a=0;
var srcS="images/baike";
$(".choosePeople>.small>div").on("touchstart",function(){
	a++;
	// 字体变色
	$(this).siblings().children("p").css("color","black");
	$(this).children("p").css("color","red");
	// 切换人物
		for(var i=0;i<$(".choosePeople>.small>div").length;i++){
			// 获取当前图片地址
			var src=$(".choosePeople>.small>div").eq(i).children("img").attr("src").split("-")[0]+"-off.png";
			$(".choosePeople>.small>div").eq(i).children("img").attr("src",src);
		}
		srcS=$(this).children("img").attr("src").split("-")[0];
		$(this).children("img").attr("src",srcS+"-on.png")

	$(".choosePeople>.big").animate({
		"margin-left":$(this).index()*-100+"%"
	})

})

// 点击选定人物
$("#choosed>img").on("touchstart",function(){
	$(".choosePeople").animate({
		"left":"-100%"
	})
	$(".beginGame").animate({
		"left":'0',
		"top":0
	})

	// 改变站着的人物
	$(".people>img").attr("src",srcS+"-go.png");


})

// 时间倒数
function timeFn(){
	timeBol=true;
	var t=10;
	var shiT=20;
	var timeTimer=setInterval(function(){
		if (t<=0) {
			t=10;
		}
		t--;
		shiT--;
		$(".time>p>img:last-child").attr("src","images/t"+t+".png");

		if (shiT>=10) {
			$(".time>p>img:first-child").attr("src","images/t1.png")
		}else{
			$(".time>p>img:first-child").attr("src","images/t0.png");
			$(".time>p>img:last-child").attr("src","images/t0.png")
		}
		// 时间结束
		if (shiT<17) {
			clearInterval(timeTimer);
			clearInterval(gunziTimer);
			clearInterval(yunTimer);
			$(".gameOver").animate({
				left:0
			})
		}

	},1000)
}




var gunziTimer=null;
var deg=10;
var deg1=-1
gunziFn();
// 棍子转动
function gunziFn(){
	gunziTimer= setInterval(function(){

		if (deg>57||deg<-57) {
			deg1 =-deg1;
		};
		deg +=deg1;
		$(".xipan").css("transform","rotate("+deg+"deg)");
	},15)
	

}


// 箱子移动
var objArr=[];
var windowW=document.documentElement.clientWidth;

window.onresize=function  () {
	windowW=document.documentElement.clientWidth;
}


$(".food>p").each(function(){
	var obj={
		x:$(this).position().left,
		r:randomFn(),
		w:$(this).outerWidth(),
		y:$(this).position().top,
		h:$(this).outerHeight(),
		index:$(this).index()
	}
	objArr.push(obj);
})
console.log(objArr);

var xipan=$(".xipan");
// 判断是吃到食物，只吃一个
var eatBol=true;
// 判断吃到食物就返回
var eatBackBol=false;
var imgArr=["goods1.png","goods4.png","rusuan3.png","sugar3.png","cake2.png","sugar2.png"];

 var yunTimer= setInterval(function(){
	for(var j=0;j<objArr.length;j++){
		var p=objArr[j];
		// 判断云是否撞墙
		if (p.x+p.w>=windowW||p.x<=0) {
			p.r =-p.r;
		};


		// 判斷是否吃到食物

		var sLeft=xipan.position().left;
		var sTop=xipan.position().top;
		var sRight=xipan.width()+sLeft;
		var sBootom=sTop+xipan.height();


		var bLeft=p.x;
		var bTop=p.y;
		var bRight=p.w+bLeft;
		var bBootom=bTop+p.h;


		if (eatBol&&height1>0&&sRight>bLeft&&sBootom>bTop&&sLeft<bRight&&sTop<bBootom) {
			eatBackBol=true;
			eatBol=false;
			console.log("吃到啦");
			// $(".food>p").eq(p.index).children().css("display","none");

			// 出现新的食物
			
			$(".food>p").eq(p.index).children().attr("src","images/"+imgArr[parseInt(Math.random()*6)]);

		

		};

		p.x +=p.r;
		$(".food>p").eq(j).css("left",p.x+'px');
	}

},10)

// 随机数
function randomFn(){
	var random=parseInt(-3+Math.random()*6);
	while(random==0){
		random=parseInt(-2+Math.random()*4);
	}
	return random;
}
// 点击红色。吸盘伸长
// 判断重复点击bol
var clickBol=false;
$(".action").on("touchstart",function(){
	
	if (timeBol) {
		timeFn();
	}
	timeBol=false;

	if (clickBol) {
		// 伸長時不能重複點擊
		return;
	}
	wallbol=false;
	clickBol=true;
	eatBol=true
	clearInterval(gunziTimer);
	height1=5;
	// 换图片
	$(this).css("background-image","url(images/button-off.png)")
	


	var height=$(".xipan>img").height();

	var scaleTimer= setInterval(function(){
		
		// // 判断吸盤是否碰墙
		var oLeft=$(".xipan").offset().left;
		var oTop=$(".xipan").offset().top;
		if (oLeft<=0||oLeft>$(".beginGame").width()-$(".xipan").width()||oTop+$(".xipan").height()>$(".beginGame").height()) {
			if (wallbol) {
				console.log("加减过啦");
			}else{
				height1 = -height1;
				console.log("撞墙");
				wallbol=true;
			}
		}
		height +=height1;
		if (height<=110) {
			clickBol=false
			eatBackBol=false;
			clearInterval(scaleTimer)
			gunziFn();

			$(".action").css("background-image","url(images/button-on.png)")
			return;
		}
		
		// console.log(height)
		$(".xipan>img:nth-child(1)").css("height",height+"px");

	},10)

})
// 点击查看排名
$(".lookScore").on("touchstart",function(){
	$(".scoreBang").animate({
		left:0
	},500,function  () {
		$(".prizePage").css("left","100%");
		$(".gameOver").css("left","100%");
	})
})
// 点击领取奖品
$(".getPrize").on("touchstart",function () {
	$(".prizePage").animate({
		left:0
	},500,function  () {
		$(".scoreBang").css("left","100%");
		$(".gameOver").css("left","100%");
	})

})
// 点击奖品中的返回游戏
$(".backGameP").on("touchstart",function  () {
	$(".scoreBang").css("z-index",103);
	$(".scoreBang").animate({
		left:0
	},500,function  () {
		$(".prizePage").css("left","100%");
		$(".scoreBang").css("z-index",102);
		$(".gameOver").css("left","100%");
	})
})
// 点击成绩榜中的返回游戏
$(".backGame").on("touchstart",function  () {
	$(".gameOver").css("z-index",103);
	$(".gameOver").animate({
		left:0
	},500,function  () {
		$(".prizePage").css("left","100%");
		$(".scoreBang").css("left","100%");
		$(".gameOver").css("z-index",101);
	})
})


}


