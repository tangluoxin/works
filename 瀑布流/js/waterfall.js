
$(document).ready(function(){
	//图片加载之后进行显示
	$(window).on("load",function(){
		imgLocation();
		var dataImg={"data":[{"src":"1.jpg"},{"src":"2.jpg"}]};
		$(window).scroll(function(){
			//获取最后一张图片距离顶端的高度-它自身的一半
			console.log(getSidHeight());
			if(getSidHeight()){
				$.each(dataImg.data, function(index,value) {
					var pin=$("<div>").addClass("pin").appendTo(".main");
					var box=$("<div>").addClass("box").appendTo(pin);
					var img=$("<img>").attr("src","img/"+$(value).attr("src")).appendTo(box);
				});
				imgLocation();
			}
		})
	})
})
function getSidHeight(){
	var box=$('.pin');
	var lastImgHeight=(box.last().get(0)).offsetTop-Math.floor(box.last().height()/2);
	var documentHeight=$(document).height();//当前窗口高度
	var scrollHeight=$(window).scrollTop();//滚动距离
	return(lastImgHeight<documentHeight+scrollHeight)?true:false;
}

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

