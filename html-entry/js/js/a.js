var index = 0,
		divImg = getById('banner').getElementsByTagName('div'),
		len = divImg.length-1,
		prevBtn = getById('prev'),
		nextBtn = getById('next'),
		dotsImg = getById('dots').getElementsByTagName('span');

function getById(id){
	return document.getElementById(id);
}

function toPrevImg(){
	index = index == 0 ? len : index-1;
	changeImg();
	changeDots();
}

function toNextImg(){
	index = index == len ? 0 : index+1;
	changeImg();
	changeDots();
}

function changeImg(){
	for(var i=0;i<=len; i++){
		divImg[i].style.display = 'none';
	}
	 divImg[index].style.display = 'block';
}

function changeDots(){
	for(var i=0; i<=len;i++){
		dotsImg[i].className = '';
	}
	dotsImg[index].className = 'active';
}

function changeDotsAndImg(){
	changeImg();
	changeDots();
}

function main(){
	prevBtn.onclick=function(){
		toPrevImg();
	}
	nextBtn.onclick=function(){
		toNextImg();
	}

	for(var j=0;j<=len;j++){
		dotsImg[j].id = j;
		dotsImg[j].onclick = function(){
			index = Number(this.id);
			changeDotsAndImg();
		}
	}
}
main();
