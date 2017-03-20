window.onload = function() {
  document.querySelector('body').className = 'loaded onindex';
  var ing = false,
      nav = document.querySelectorAll('*[data-to]');
  for (var i = nav.length - 1; i >= 0; i--) {
    nav[i].onclick = function() {
      if (ing === true) return;

      ing = true;
      document.querySelector('#nav li.active').className = '';
      document.querySelector('body').className = 'loaded on' + this.getAttribute('data-to');
      document.querySelector('#nav a[data-to=' + this.getAttribute('data-to') + ']').parentNode.className = 'active';
      
      setTimeout(function() {
        ing = false;
      }, 400);
    }
  };
}

$(document).ready(function () {
    var delay = 1;
    var DELAY_STEP = 100;
    var animationOptions = { opacity: 1, top: 0};
    $('a:hover').animate(animationOptions).promise()
            .pipe(animateMain)
    function animateMain() {
        var dfd = $.Deferred();
        var els = $('.animate-init');
        var size = els.size();
        els.each(function (index, el) {
            delay++;
            $(el).delay(index * DELAY_STEP)
                    .animate(animationOptions);
            (size - 1 === index) && dfd.resolve();
        });
        return dfd.promise();
    }
});

$.getJSON("http://app.digua.me/libs/like.php?action=get", function (data) {
    $('.about-me span').html(data.like);
});
$('.info .icon-xin').click(function () {
    $.getJSON("http://app.digua.me/libs/like.php?action=add", function (data) {
        if (data.success) {
            $(".hp-state").remove();
            $("#hp-box").append("<div class="+"hp-state"+"></div>");
            $('.hp-state').addClass("hp-state-change");
            $('.about-me span').html(data.like);
            $('#bg').remove(".success").append("<div class="+"success><p>加血成功</p></div>");
            $('#bg .success').addClass("notice-in");
        }
        else {
            $('#bg').remove(".notice").append("<div class="+"notice><p>已经加过血啦~请明天再来加血</p></div>");
            $('#bg .notice').addClass("notice-in");
        }
    });
});