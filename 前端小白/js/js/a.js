var index = 1,
		divImg = getById('banner').getElementsByTagName('div'),
		len = divImg.length;

function getById(id){
	return document.getElementById(id);
}

function toPrevImg(){
	index = index == 1 ? len : index-1;
	changeImg();
}

function toNextImg(){
	index = index == len ? 1 : index+1;
	changeImg();
}

function changeImg(){
	for(var i=0;i<len; i++){
		divImg[i].style.display = none;
	}
	divImg[index].style.display = 'block';
}