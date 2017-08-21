var index = 0,
		divImg = getById('banner').getElementsByTagName('div'),
		len = divImg.length-1,
		prevBtn = getById('prev'),
		nextBtn = getById('next');

function getById(id){
	return document.getElementById(id);
}

function toPrevImg(){
	index = index == 0 ? len : index-1;
	changeImg();
}

function toNextImg(){
	index = index == len ? 1 : index+1;
	changeImg();
}

function changeImg(){
	for(var i=0;i<=len; i++){
		divImg[i].style.display = 'none';
	}
	 divImg[index].style.display = 'block';
}

function main(){
	prevBtn.onclick=function(){
		toPrevImg();
	}
	nextBtn.onclick=function(){
		toNextImg();
	}
}
main();