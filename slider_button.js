//一、定义了一个获取元素的方法
function getEle(selector){
    return document.querySelector(selector);
}
//二、获取到需要用到的DOM元素
var box = getEle("#doctor-confirm-slider-botton"),//容器
    bgColor = getEle(".slider-bgColor"),//背景色
    txt = getEle(".slider-txt"),//文本
    slider = getEle(".slider"),//滑块
    icon = getEle(".slider>img"),
    successMoveDistance = box.offsetWidth- slider.offsetWidth,//解锁需要滑动的距离
    downX,//用于存放鼠标按下时的位置
    isSuccess = false;//是否解锁成功的标志，默认不成功

//三、给滑块添加鼠标按下事件
slider.onmousedown = mousedownHandler;

// browser has its own drag and drop for the elements, so we need to diable it
slider.ondragstart = function() {
  return false;
}

//3.1鼠标按下事件的方法实现
function mousedownHandler(e){
    bgColor.style.transition = "";
    slider.style.transition = "";
    var e = e || window.event || e.which;
    downX = e.clientX;
    //在鼠标按下时，分别给鼠标添加移动和松开事件
    document.onmousemove = mousemoveHandler;
    document.onmouseup = mouseupHandler;
};

//四、定义一个获取鼠标当前需要移动多少距离的方法
function getOffsetX(offset,min,max){
    if(offset < min){
        offset = min;
    }else if(offset > max){
        offset = max;
    }
    return offset;
}

//3.1.1鼠标移动事件的方法实现
function mousemoveHandler(e){
    var e = e || window.event || e.which;
    var moveX = e.clientX;
    var offsetX = getOffsetX(moveX - downX,0,successMoveDistance);
    var bgColorWidth = offsetX + 53;
    bgColor.style.width = bgColorWidth + "px";
    slider.style.left = offsetX + "px";

    if(offsetX == successMoveDistance){
        success();
    }
    //如果不设置滑块滑动时会出现问题（目前还不知道为什么）
    e.preventDefault();
};

//3.1.2鼠标松开事件的方法实现
function mouseupHandler(e){
    if(!isSuccess){
        bgColor.style.width = 0 + "px";
        slider.style.left = 0 + "px";
        bgColor.style.transition = "width 0.8s linear";
        slider.style.transition = "left 0.8s linear";
    }
    document.onmousemove = null;
    document.onmouseup = null;
};

//五、定义一个滑块解锁成功的方法
function success(){
    isSuccess = true;
    txt.innerHTML = "解锁成功";
    bgColor.style.backgroundColor ="lightgreen";
    slider.className = "slider active";
    icon.className = "iconfont icon-xuanzhong";
    //滑动成功时，移除鼠标按下事件和鼠标移动事件
    slider.onmousedown = null;
    document.onmousemove = null;
};
