/*
 * http://love.hackerzhou.me
 */

// variables
var $win = $(window);
var clientWidth = $win.width();
var clientHeight = $win.height();

$(window).resize(function() {
    var newWidth = $win.width();
    var newHeight = $win.height();
    if (newWidth != clientWidth && newHeight != clientHeight) {
        location.replace(location);
    }
});

(function($) {
	$.fn.typewriter = function() {
		this.each(function() {
			var $ele = $(this), str = $ele.html(), progress = 0;
			$ele.html('');
			var timer = setInterval(function() {
				var current = str.substr(progress, 1);
				if (current == '<') {
					progress = str.indexOf('>', progress) + 1;
				} else {
					progress++;
				}
				$ele.html(str.substring(0, progress) + (progress & 1 ? '_' : ''));
				if (progress >= str.length) {
					clearInterval(timer);
				}
			}, 75);
		});
		return this;
	};
})(jQuery);

function timeElapse(date){
    var now = new Date();
    var diff = Math.floor((now - date) / 1000); // 时间差，单位为秒

    var days = Math.floor(diff / (24 * 3600));
    diff %= (24 * 3600);
    var hours = Math.floor(diff / 3600);
    diff %= 3600;
    var minutes = Math.floor(diff / 60);
    var seconds = diff % 60;

    // 格式化输出
    var result = `第 <span class="digit">${days}</span> 天 <span class="digit">${hours}</span> 小时 <span class="digit">${minutes}</span> 分钟 <span class="digit">${seconds}</span> 秒<span class="digit">${date}</span>`;
    
    // 更新页面中的元素
    document.getElementById("clock").innerHTML = result;

}
