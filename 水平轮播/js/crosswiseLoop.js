
var shownIndex=1;
var timer=0;

window.onload=function(){
	//获取ul元素
	var list=document.querySelector(".slider .list");
	//获取li元素组
	var lis=document.querySelectorAll(".slider .list .item");
	buildLoop(list,lis);
	//获取子弹元素
	var bullets=document.querySelectorAll(".slider .pagination .bullet");
	
	//绑定上一页点击事件
	document.querySelector(".prev").onclick=function(){
		slidePrev(list,lis,bullets);
	}
	//绑定下一页点击事件
	document.querySelector(".next").onclick=function(){
		slideNext(list,lis,bullets);
	}
	
	//绑定子弹点击事件
	b_onclick(list,lis,bullets);
	
	auto(list,lis,bullets);
	
	//监听鼠标移出
	document.querySelector(".slider").onmouseout=function(){
		auto(list,lis,bullets);
	}
	//监听鼠标移入
	document.querySelector(".slider").onmouseover=function(){
		stop(list,lis,bullets);
	}

}

/**
 * 复制ul中图片，形成假性循环，同时改变ul样式，让图片变成一行
 * 
 * @method 构造循环图
 * @author 唐珞鑫
 * @version 2020.2.28
 * @param {Element} ul-标签元素
 * @param {Array[Element]} lis-ul下所有匹配的li数组列表
 */
function buildLoop(ul,lis){
	var copyFirst=lis[0].cloneNode(true);
	var copyLast=lis[lis.length-1].cloneNode(true);
	ul.appendChild(copyFirst);
	ul.insertBefore(copyLast,lis[0]);
	ul.style.width=((lis.length+2)*lis[0].offsetWidth)+"px";
    ul.style.left=-lis[0].offsetWidth+"px";
}



/**
 * 绑定子弹点击事件
 * 
 * @method 绑定
 * @auhor 唐珞鑫
 * @version 2020.2.29
 * @param {Element} ul-标签元素
 * @param {Array[Element]} lis-li数组列表  
 * @param {Array[Element]} bullects-子弹（li）数组列表
 */
function b_onclick(ul,lis,bullets){
	for(var i=0;i<bullets.length;i++){
		bullets[i].index=i;
		bullets[i].onclick=function(){
			shownIndex=this.index;
			shownIndex++;
			b_slideTo(shownIndex,ul,lis,bullets);
		}
		
	}
}


/**
 * 跳转到上一张
 * 
 * @method 跳到上一张
 * @auhor 唐珞鑫
 * @version 2020.2.29
 * @param {Element} ul-标签元素
 * @param {Array[Element]} lis-li数组列表  
 * @param {Array[Element]} bullects-子弹（li）数组列表
 */
function slidePrev(ul,lis,bullets){
	shownIndex--;
	b_slideTo(shownIndex,ul,lis,bullets);
}


/**
 * 跳转到下一张
 * 
 * @method 跳到下一张
 * @auhor 唐珞鑫
 * @version 2020.2.29
 * @param {Element} ul-标签元素
 * @param {Array[Element]} lis-li数组列表  
 * @param {Array[Element]} bullects-子弹（li）数组列表
 */
function slideNext(ul,lis,bullets){
	shownIndex++;
	b_slideTo(shownIndex,ul,lis,bullets);
}


/**
 * 对整个ul进行水平方向的移动
 * 
 * @method 水平切换
 * @auhor 唐珞鑫
 * @version 2020.2.29
 * @param {int} Index-将要显示的图片的标号，从1开始  
 * @param {Element} ul-标签元素
 * @param {Array[Element]} lis-li数组列表  
 */
function slideTo(Index,ul,lis){
	
	if(Index==-1){
		ul.style.left=-(lis.length)*lis[0].offsetWidth+"px";
		Index=lis.length-1;
		shownIndex=lis.length-1;
	}else if(Index==(lis.length+2)){
		ul.style.left=-lis[0].offsetWidth+"px";
		Index=2;
		shownIndex=2;
	}
		var newleft=-Index*lis[0].offsetWidth;
		move_all(ul,{
			left:newleft
		});
		
}


/**
 * 对整个ul进行水平方向的移动
 * 
 * @method 水平切换(带焦点子弹)
 * @auhor 唐珞鑫
 * @version 2020.2.29
 * @param {int} Index-将要显示的图片的标号，从1开始  
 * @param {Element} ul-标签元素
 * @param {Array[Element]} lis-li数组列表  
 * @param {Array[Element]} bullects-子弹（li）数组列表
 */
function b_slideTo(Index,ul,lis,bullets){

	if(Index==-1){
		ul.style.left=-(lis.length)*lis[0].offsetWidth+"px";
		Index=lis.length-1;
		shownIndex=lis.length-1;
	}else if(Index==(lis.length+2)){
		ul.style.left=-lis[0].offsetWidth+"px";
		Index=2;
		shownIndex=2;
	}
	
	for(var i=0;i<bullets.length;i++){
		bullets[i].className="bullet";
	}
	if(Index==(bullets.length+1)){
		bullets[0].className="bullet focus";
	}else if(Index==0){
		var m=(bullets.length-1);
		bullets[m].className="bullet focus";
	}else{
		bullets[Index-1].className="bullet focus";
	}
		
		var newleft=-Index*lis[0].offsetWidth;
		move_all(ul,{
			left:newleft
		});
}


/**
 * 自动进行轮播
 * 
 * @method 自动轮播
 * @auhor 唐珞鑫
 * @version 2020.2.29
 * @param {Element} ul-标签元素
 * @param {Array[Element]} lis-li数组列表  
 * @param {Array[Element]} bullects-子弹（li）数组列表
 */
function auto(ul,lis,bullets){
	clearInterval(timer);
	timer=setInterval(function(){
		slideNext(ul,lis,bullets);
	},3000);
}


/**
 * 停止自动轮播
 * 
 * @method 停止轮播
 * @auhor 唐珞鑫
 * @version 2020.2.29
 */
function stop(){
	clearInterval(timer);
}