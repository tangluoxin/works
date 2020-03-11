$(document).ready(function(){
	$(window).on("load",function(){
		imgLocation();
	})
})

function imgLocation(){
	var box=$(".pin");
	var boxWidth=box.eq(0).width();
	var windowWidth=$(window).width();
	var num=Math.floor(windowWidth/boxWidth);
	var imgArra=[];//存放每一列的高度
	box.each(function(index,value){
		if(index<num){
			imgArra[index]=box.eq(index).height();
		}else{
			var minHeight=Math.min.apply(imgArra,imgArra);
			var minIndex=$.inArray(minHeight,imgArra);
			console.log(minIndex);
			$(value).css({
				position:"absolute",
				top:minHeight,
				left:box.eq(minIndex).position().left
			})
			imgArra[minIndex]+=box.eq(index).height();
		}
	})
}
