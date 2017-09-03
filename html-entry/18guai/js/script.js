function waterfall(wrap, boxes){
	var boxWidth = boxes[0].offsetWidth + 20;
	var windowWidth = document.documentElement.clientWidth;
	var colsNum = Math.floor(windowWidth/boxWidth);

	// 给#wrap增加width，使其居中
	wrap.style.width = colsNum * boxWidth + 'px';

	// 每行根据高度的顺序在下面补充内容
	var colArray = new Array();
	for(var i=0; i<boxes.length;i++){
		if(i < colsNum){
			colArray[i] = boxes[i].offsetHeight + 20;
			console.log(colArray[i].offsetLeft);
		}else{
			var minHeight = Math.min.apply(null, colArray);
			var index = colArray.indexOf(minHeight);
			boxes[i].style.position = 'absolute';
			boxes[i].style.left = index * boxWidth + 'px';
			boxes[i].style.top = minHeight + 'px';
			colArray[index] += boxes[i].offsetHeight + 20;
		}
	}

}

window.onload = function() {
	var wrap = document.getElementById('wrap');
	var boxes = wrap.getElementsByTagName('div');
	waterfall(wrap, boxes);
}