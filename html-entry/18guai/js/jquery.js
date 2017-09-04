var datas = [
{
	'src': 'img/01.jpg',
	'info': '第一怪 竹筒当烟袋'
},{
	'src': 'img/02.jpg',
	'info': '第二怪 草帽当锅盖'
},{
	'src': 'img/03.jpg',
	'info': '第三怪 这边下雨那边晒'
},{
	'src': 'img/04.jpg',
	'info': '第四怪 四季服装同穿戴'
},{
	'src': 'img/05.jpg',
	'info': '第五怪 火车没有汽车快'
},{
	'src': 'img/06.jpg',
	'info': '第六怪 火车不通国内通国外'
},{
	'src': 'img/07.jpg',
	'info': '第七怪 老奶爬山比猴快'
},{
	'src': 'img/08.jpg',
	'info': '第八怪 鞋子后面多一块'
},{
	'src': 'img/09.jpg',
	'info': '第九怪 脚趾四季露在外'
},{
	'src': 'img/10.jpg',
	'info': '第十怪 鸡蛋拴着卖'
},{
	'src': 'img/11.jpg',
	'info': '第十一怪 粑粑叫饵块'
},{
	'src': 'img/12.jpg',
	'info': '第十二怪 花生蚕豆数着卖'
},{
	'src': 'img/13.jpg',
	'info': '第十三怪 三个蚊子一盘菜'
},{
	'src': 'img/14.jpg',
	'info': '第十四怪 四个竹鼠一麻袋'
},{
	'src': 'img/15.jpg',
	'info': '第十五怪 树上松毛扭着卖'
},{
	'src': 'img/16.jpg',
	'info': '第十六怪 姑娘叫老太'
},{
	'src': 'img/17.jpg',
	'info': '第十七怪 小和尚可以谈恋爱'
},{
	'src': 'img/18.jpg',
	'info': '第十八怪 背着娃娃再恋爱'
},
]

function waterfall(wrap, boxes){
	var boxWidth = boxes.eq(0).width() + 40;
	var windowWidth = $(window).width();
	var colsNum = Math.floor(windowWidth/boxWidth);

	// // 给#wrap增加width，使其居中
	wrap.width(colsNum * boxWidth);

	// // 每行根据高度的顺序在下面补充内容
	var colArray = new Array();
	for(var i=0; i<boxes.length;i++){
		if(i < colsNum){
			colArray[i] = boxes.eq(i).height() + 40;
		}else{
			var minHeight = Math.min.apply(null, colArray);
			var index = colArray.indexOf(minHeight);
			setStyle(boxes.eq(i), minHeight, index * boxWidth, i);
			colArray[index] += boxes[i].offsetHeight + 20;
		}
	}
}

// 给div设置样式
var getStartNum = 0;
function setStyle(box, top, left, index) {
	if(getStartNum >= index){
		return;
	}
	box.css({
		'position': 'absolute',
		'left': left,
		'top': top,
		'opacity': 0
	}).stop().animate({
		'opacity': 1
	}, 1000)
	getStartNum = index;
}

// 追加盒子
function appendBox(wrap, boxes) {
	var lastDiv = wrap.children('div').eq(-1);
	// 窗口高度 + 窗口下拉高度 >= 最后一个div的高
	if($(window).height() + $(window).scrollTop() >= lastDiv.height() + 20 + lastDiv.offset().top){
		for(var j=0;j<datas.length;j++) {
			wrap.append('<div><img src="'+ datas[j].src +'"><a href="#">'+ datas[j].info +'</a></div>');
		}
		waterfall(wrap, wrap.children('div'));
	}
}

$(document).ready(function(event) {
	var wrap = $('#wrap');
	var boxes = $('#wrap').children('div');
	waterfall(wrap, boxes);

	$(this).scroll(function(event) {
		appendBox(wrap, boxes);
	})
})
