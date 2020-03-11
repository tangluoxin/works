/*
 * 引入了move.js中的函数
 */

var prevIndex,nextIndex=0;
var timer=0;

window.onload=function(){

	var lis=document.querySelectorAll(".slider .list .item");
	
    //添加按钮点击事件，上一页
	document.querySelector(".prev").onclick=function(){
		slidePrev(lis,bullets);
	}
	//添加按钮点击事件，下一页
	document.querySelector(".next").onclick=function(){
		slideNext(lis,bullets);
	}
	
	var bullets=document.querySelectorAll(".slider .pagination .bullet");
	
	//绑定子弹点击事件
	b_onclick(lis,bullets);
	//默认开启自动轮播
	auto(lis,bullets);
	
	//监听鼠标移入，停止轮播
	document.querySelector(".slider").onmouseover=function(){
		console.log("stop");
		stop();
	}
	//监听鼠标移出，继续轮播
	document.querySelector(".slider").onmouseout=function(){
		console.log("start");
		auto(lis,bullets);
	}
	
	
}


/**
 * 绑定子弹点击事件
 * 
 * @method 绑定
 * @auhor 唐珞鑫
 * @version 2020.2.27
 * @param {Array[Element]} lis-li数组列表  
 * @param {Array[Element]} bullects-子弹（li）数组列表
 */
function b_onclick(lis,bullets){
	for(var i=0;i<bullets.length;i++){
		bullets[i].index=i;
		bullets[i].onclick=function(){
			prevIndex=nextIndex;
			nextIndex=this.index;
			b_slideTo(prevIndex,nextIndex,lis,bullets);
		}
		
	}
}


/**
 * 跳转到上一张
 * 
 * @method 跳到上一张
 * @auhor 唐珞鑫
 * @version 2020.2.27
 * @param {Array[Element]} lis-li数组列表  
 * @param {Array[Element]} bullects-子弹（li）数组列表
 */
function slidePrev(lis,bullets){
	prevIndex=nextIndex;
	nextIndex--;
	if(nextIndex<0){
		nextIndex=lis.length-1;
	}
	b_slideTo(prevIndex,nextIndex,lis,bullets);
}


/**
 * 跳转到下一张
 * 
 * @method 跳到下一张
 * @auhor 唐珞鑫
 * @version 2020.2.27
 * @param {Array[Element]} lis-li数组列表  
 * @param {Array[Element]} bullects-子弹（li）数组列表
 */
function slideNext(lis,bullets){
	prevIndex=nextIndex;
	nextIndex++;
	if(nextIndex==lis.length){
		nextIndex=0;
	}
	b_slideTo(prevIndex,nextIndex,lis,bullets);
}


/**
 * 用于对两张图片进行透明度切换
 * 
 * @method 透明度切换
 * @auhor 唐珞鑫
 * @version 2020.2.27
 * @param {int} prev-前一张图片在li中第几个  
 * @param {int} next-后一张图片在li中第几个
 */
function slideTo(prev,next,lis){
	move(lis[prev],"opacity",0);
	move(lis[next],"opacity",100);	
}


/**
 * 用于对两张图片进行透明度切换
 * 
 * @method 透明度切换(带焦点子弹)
 * @auhor 唐珞鑫
 * @version 2020.2.27
 * @param {int} prev-前一张图片在li中第几个  
 * @param {int} next-后一张图片在li中第几个
 */
function b_slideTo(prev,next,lis,bullets){
	bullets[prev].className="bullet";
	bullets[next].className="bullet focus";
	move(lis[prev],"opacity",0);
	move(lis[next],"opacity",100);	
}


/**
 * 自动进行轮播
 * 
 * @method 自动轮播
 * @auhor 唐珞鑫
 * @version 2020.2.27
 * @param {Array[Element]} lis-li数组列表  
 * @param {Array[Element]} bullects-子弹（li）数组列表
 */
function auto(lis,bullets){
	clearInterval(timer);
	timer=setInterval(function(){
		slideNext(lis,bullets);
	},3000);
}


/**
 * 停止自动轮播
 * 
 * @method 停止轮播
 * @auhor 唐珞鑫
 * @version 2020.2.27
 */
function stop(){
	clearInterval(timer);
}