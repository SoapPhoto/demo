$(document).ready(function(){

	//Code to center the content div
	$box = $('.content');
	$ht = $box.height()+175;
	$win_ht = $(window).height();

	if ($win_ht>$ht) {
		$box.css({
			'left' : '50%',
			'top' : '50%',
			'margin-left' : -$box.width()/2 + 'px',
      'margin-top' : -$ht/3 + 'px'
		});
	}else{
		$box.css({
			'left' : '50%',
			'margin-left' : -$box.width()/2 + 'px',
			'margin-top' : '60px',
			'margin-bottom' : '60px'
		});
	}

    //code for the background slider
    $.backstretch([
      "img/1.jpg"
    ], {
        fade: 1000,
        duration: 150000
    });
    
    $(".content").fadeIn(1500,function(){});

    $.getJSON("http://app.digua.me/libs/like.php?action=get", function (data) {
        $('.btn i').html(data.like);
    });
    $('.left').click(function () {
        $.getJSON("http://app.digua.me/libs/like.php?action=add", function (data) {
            if (data.success) {
                $('.like-view').html('很好，你通过了地瓜的最后考验_(:з」∠)_');
                $('.head').html('<img src="../img/logo.png">');
                $('.menu').html('<a href="http://digua.moe" class="btn left"><div>进入</div></a>');
                $.backstretch([
                  "img/1.jpg"
                ], {
                    fade: 1500,
                    duration: 150000
                });
            }
            else {
                $('.like-view').html('你已经通过地瓜的考验了，不需要再喜欢了_(:з」∠)_');
                $('.head').html('<img src="../img/logo.png">');
                $('.menu').html('<a href="http://digua.moe" class="btn left"><div>进入</div></a>');
                $.backstretch([
                  "img/1.jpg"
                ], {
                    fade: 1500,
                    duration: 150000
                });
                // $("body").fadeOut(2000,function(){window.history.back()});
            }
        });
    });

    $('.right').click(function (e) {
        $.getJSON("http://app.digua.me/libs/like.php?action=add", function (data) {
            if (data.success) {
                $('.btn i').html(data.like);
                $('.like-view').html('既然你不喜欢吃，那就准备好接受地瓜的惩罚吧！');
            }
            else {
                $('.like-view').html('既然你不喜欢吃，那就准备好接受地瓜的惩罚吧！');
                $('.head').html('<img src="../img/avatar.png">');
                $.backstretch([
                  "img/1.gif",
                  "img/2.gif",
                ], {
                    fade: 0,
                    duration: 1850
                });
                // $("body").fadeOut(2000,function(){window.history.back()});
            }
        });
    });


   /* function ChangeBackground(img) {
        $('#home').fadeTo(300, 0, function () {
            $(this).css({
                'background': 'url(\'../static/img/' + img + '.jpg\')',
                'background-repeat': 'no-repeat',
                'background-size': 'cover'
            });
        }).fadeTo(300, 2);
    }*/
});

if(getCookie('read') == null)
{
    SetCookie('read','42');
}


function SetCookie(name,value)//两个参数，一个是cookie的名子，一个是值
{
    var Days = 30; //此 cookie 将被保存 30 天
    var exp = new Date();    //new Date("December 31, 9998");
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

function getCookie(name)//取cookies函数
{
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
    if(arr != null) return unescape(arr[2]); return null;
}

