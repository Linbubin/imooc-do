var index = 0,
		mainDiv = getById('main'),
		divImg = getById('banner').getElementsByTagName('div'),
		len = divImg.length-1,
		prevBtn = getById('prev'),
		nextBtn = getById('next'),
		dotsImg = getById('dots').getElementsByTagName('span'),
		menuFirst = document.getElementsByClassName('menu-first'),
		subMenu = getById('sub-menu'),
		innerBox = document.getElementsByClassName('inner-box'),
		menu = getById('menu'),
		subMenuIndex,
		timer;

function getById(id){
	return document.getElementById(id);
}

function toPrevImg(){
	index = index == 0 ? len : index-1;
	changeDotsAndImg();
}

function toNextImg(){
	index = index == len ? 0 : index+1;
	changeDotsAndImg();
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

function changeSubMenu(){
	for(var z=0;z<innerBox.length;z++){
		innerBox[z].style.display='none';
	}
	innerBox[subMenuIndex].style.display = 'block';
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

	for(var i=0;i<menuFirst.length; i++){
		menuFirst[i].id = 'a' + i;
		menuFirst[i].onmouseover = function(){
			subMenu.className = "sub-menu";
			subMenuIndex = this.id.replace('a','');
			changeSubMenu();
		}
	}

	menu.onmouseout = function(){
		subMenu.className = "sub-menu hide";
	}

	subMenu.onmouseover = function(){
		subMenu.className = "sub-menu";
	}

	subMenu.onmouseout = function(){
		subMenu.className = "sub-menu hide";
	}

	mainDiv.onmouseover = function(){
		console.log('over');
		timer && clearInterval(timer);
	}

	mainDiv.onmouseout = function(){
		console.log('out');
		timer = setInterval(function(){
			toNextImg();
		}, 1000);
	}
	mainDiv.onmouseout();

}
main();
