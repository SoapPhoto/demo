window.onload=(function(){
  drag();
  cClose();
  flop();
});

function cClose() { //东西多了可以抽出来一个关闭函数
  var mainPanel = document.getElementById('drag-toggle'),
      btnClose = document.getElementById('btn-close'),
      timer = null;
    btnClose.onclick=(function() {
      timer = setInterval(function () {
        if(mainPanel.offsetHeight == 0){
          clearInterval(timer);
        }
        mainPanel.style.height = mainPanel.offsetHeight-10+"px";
        // console.log(mainPanel.offsetHeight);
      },1);
      window.setTimeout(close,200); 
    });
   function close() {
     mainPanel.style.display="none";
   }
}

function flop() {  //卡牌大师
  var mainPanel = document.querySelector('.main-panel'),
      backPanel = document.querySelector('.back-panel'),
      btnSet = document.getElementById('btn-set');
      btnSet.onclick=(function () {
        mainPanel.className +=' main-panel-rotate';
        backPanel.className +=' back-panel-rotate';
      });
}

function drag () {
  var moveArea = document.getElementById('drag-toggle');
  moveArea.onmousedown = fnDown;
}

function fnDown(event){
  event = event;
  nodeNone = event.target.nodeName;
  var moveArea = document.getElementById('drag-toggle'),
      disX=event.clientX-moveArea.offsetLeft,
      disY=event.clientY-moveArea.offsetTop;
  document.onmousemove = function (event) {
    event = event;
    console.log(event.target.nodeName);
    fnMove(event,disX,disY);
  }
  if( nodeNone == 'INPUT' || nodeNone == 'IMG' || nodeNone == 'A' || nodeNone == 'BUTTON'){ //阻止在这些标签执行拖动
      document.onmousemove=null;
      document.onmouseup=null;
  }else{}


  document.onmouseup=function () {
    document.onmousemove=null;
    document.onmouseup=null;
  }
}

function fnMove(e, posX, posY){
  var moveArea = document.getElementById('drag-toggle'),
      l=e.clientX-posX,
      t=e.clientY-posY,
      winW=document.documentElement.clientWidth,
      winH=document.documentElement.clientHeight,
      maxW=winW-moveArea.offsetWidth,
      maxH=winH-moveArea.offsetHeight;
      e.stopPropagation();
  if(l<0){
    l=0;
  }else if(l>maxW){
    l=maxW;
  }
  if(t<0){
    t=0;
  }else if(t>maxH){
    t=maxH;
  }
  moveArea.style.left=l+'px';
  moveArea.style.top=t+'px';
}