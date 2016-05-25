$(function() {
	var item = +WebStorage.Session.Get('item');
	Ajax(server + 'api/menu', {
		m: item
	}, 'get', 'json', function(data) {
		var length = data.length;
		var html = "";
		for (var i = 1; i <= length; i++) {
			var m = data[i - 1].m;
			var c = data[i - 1].c;
			if (item == 5) {
				html += '<li><img src="img/2-' + item + '-' + c + '.png" m="' + m+ '" c="' + c + '" /></li>'
			} else if (item == 1) {
				html += '<li><img src="img/2-' + item + '-' + c + '.png" m="' + m+ '" c="' + c + '" /></li>'
			} else {
				html += '<li><img src="img/2-' + item + '-' + c + '.png" m="' + m+ '" c="' + c + '" /></li>'
			}
		}
		$('nav ul').html(html)
		$('nav').addClass('item' + length)

		$('nav ul li img').each(function(index) {
			$(this).click(function() {
				var m = $(this).attr('m');
				var c = $(this).attr('c');
				WebStorage.Session.Set('search', JSON.stringify({
					m: m,
					c: c
				}))
				window.location.href = 'page3.html'
			})
		})
	})
})

$('.home').click(function() {
	window.location.href = "index.html"
})