/* 动画效果相关函数封装
 * 2020.2.27
 */

/**
 * 获取元素当前对应属性的样式，排除浏览器兼容性问题
 * 
 * @method 获取当前样式
 * @auhor 唐珞鑫
 * @version 2020.2.27
 * @param {Element} el-元素节点
 * @param {String} attitude-属性
 * @return {String} -属性值
 */
function getStyle(el,attribute){
	if(getComputedStyle){
		return getComputedStyle(el)[attribute];
	}else{
		return el.currentStyle[attribute];
	}
}

/** 
 * 改变元素位置或透明度致目标值，越接近目标值改变速度越小
 * 
 * @method 动态改变
 * @auhor 唐珞鑫
 * @version 2020.2.27
 * @param {Element} el-元素节点  
 * @param {String} attitude-需改变的属性 
 * @param {int} target-目标值
 */
function move(el,attribute,target){
	clearInterval(el.timerID);
	el.timerID=setInterval(function(){
		var current;
		if(attribute=="opacity"){
			current=parseFloat(getStyle(el,attribute))*100;
		   
		}else{
			current=parseInt(getStyle(el,attribute));
		}
		
		var speed=(target-current)/20;
		if(speed>0){
			speed=Math.ceil(speed);//正数向上取整，避免小数被归零停在中途
		}else{
			speed=Math.floor(speed);//负数向下取整
		}
		if(attribute=="opacity"){
			el.style[attribute]=(current+speed)/100;
		}else{
			el.style[attribute]=current+speed+"px";
		}
		
		
	},20)
}

/**
 * 改变元素位置或透明度致目标值，越接近目标值改变速度越小
 * 
 * @method 动态改变多个样式
 * @auhor 唐珞鑫
 * @version 2020.2.27
 * @param {Element} el-元素节点  
 * @param {Object} attitudes-需改变的属性列表
 */
function move_all(el,attributes){
	clearInterval(el.timerID);
	el.timerID=setInterval(function(){
		
		for(var attribute in attributes){
			var current;
			var target=attributes[attribute]
			if(attribute=="opacity"){
				current=parseFloat(getStyle(el,attribute))*100;
		   
			}else{
				current=parseInt(getStyle(el,attribute));
			}
			
			var speed=(target-current)/20;
			if(speed>0){
				speed=Math.ceil(speed);//正数向上取整，避免小数被归零停在中途
			}else{
				spee=Math.floor(speed);//负数向下取整
			}
			if(attribute=="opacity"){
				el.style[attribute]=(current+speed)/100;
			}else{
				el.style[attribute]=current+speed+"px";
			}
			
		}
		
		
	},20)
}

//window.onload=function(){
//	//test
//	var odiv=document.getElementById("div");
//	var odiv2=document.getElementById("div2");
//	
//	move(odiv,"opacity",50);
//	move_all(odiv2,{
//		width:200,
//		left:500,
//		opacity:20
//	});
//}
