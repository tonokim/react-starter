
//toastr参数
export const toastConfig = {
	timeOut: 3000,
	extendedTimeOut: 1000,
	closeButton:true,
	showAnimation: 'animated fadeIn', //or other animations from animate.css
	hideAnimation: 'animated fadeOut',
}

//生成时间戳
export function createTimeStamp(){
  return parseInt(new Date().getTime() / 1000) + '';
}


//格式化时间
export function DateFormat(val){
  const now = new Date(val * 1000).toLocaleString();
  return now;
}

export function validPhone(val){
	const reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
	return reg.test(val);
}

export function getEleLeft(e){
	let left = 0;
	do{
		left += e.offsetLeft;
	}while((e = e.offsetParent).nodeName != 'BODY');
	return left;
}

export function getEleTop(e){
	let top = 0;
	do{
		top += e.offsetTop;
	}while((e = e.offsetParent).nodeName != 'BODY')
	return top;
}
