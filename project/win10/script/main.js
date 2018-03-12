window.onload =function () {
  doubleClick();
  drag();
  cClose();
  flop();
}

// 对象双击事件
function doubleClick() {
  var o = document.querySelectorAll(".item"),
      timer = null;
  for (var i = o.length - 1; i >= 0; i--) {
    o[i].ondblclick=(function () {
      timer=setInterval(function () {
        var a = this.id;
        var b = document.getElementById("drag-toggle");
        if(b.offsetHeight == 430){
          clearInterval(timer);
        }
        console.log(b);
        b.style.display="block";
        b.style.height= b.offsetHeight+10+"px";
        // console.log(this.id);
      });
    });
  }
}