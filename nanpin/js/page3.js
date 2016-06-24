var info = {};
var newsType = 0;
var pageIndex = 1;
var ids = [];
var total = 0;
var current = 0;
var maxIndex = 0;
var timer = null;
var loopIndex = 0;
var loopTotal = 1;

var search = WebStorage.Session.Get('search');
var json = JSON.parse(search);

function NewsList(isnext) {
	var isload = false;
	if (isnext) {
		if (pageIndex < maxIndex) {
			pageIndex += 1;
			isload = true;
		}
	} else {
		if (pageIndex > 1) {
			pageIndex -= 1;
			isload = true;
		}
	}
	if (isload || maxIndex == 0) {
		if (newsType == 9) {
			Ajax(server + 'api/news/type', {
				type: newsType
			}, 'get', 'json', function(r) {
				$('.block').show()
				var result = '';
				var temp = '<td><span>{name}</span><img src="' + server + 'api/news/image/{img}" id={id} /></td>'
				for (var i = 0; i < r.length; i++) {
					result += temp.replace(/\{name\}/, r[i].footer)
						.replace(/\{img\}/, r[i].image)
						.replace(/\{id\}/, r[i].id)
				}
				$('.block tr').html(result);
				$('.block img').each(function() {
					$(this).click(function() {
						var id = $(this).attr('id');
						ShowItem(null, id)
					})
				})
			})
		} else {
			Ajax(server + 'api/news', {
				id: newsType,
				index: maxIndex == 0 ? 1 : pageIndex,
				size: 2000
			}, 'get', 'json', function(r) {
				info.rows = r.rows;
				info.total = r.total;
				for (var i = 0; i < info.rows.length; i++) {
					ids.push(info.rows[i].id);
				}
				total = r.total;
				ShowItem(current);
				swipt('list',
					function() {
						if (current < total) {
							current += 1;
							ShowItem(current)
						}
					},
					function() {
						if (current > 0) {
							current -= 1;
							ShowItem(current)
						}
					})
			})
		}
	}
}

function ShowItem(index, id) {
	console.log(current, total)
	if (id) $('.delete').show()
	else $('.delete').hide()
	id = id ? id : ids[index];
	Ajax(server + 'api/news/detail', {
		id: id
	}, 'get', 'json', function(r) {
		if (r.title) {
			$('.logo').css('top', 60)
			$('.logo').css('left', 60)
			$('.logo').css('height', 636)
			$('.title').show()
			var isNeedLoop = false;
			var img = server + 'api/news/image/' + r.image;
			var i1 = $('.logo').get(0);
			$(i1).attr('src', img);
			if (r.image1) {
				var img1 = server + 'api/news/image/' + r.image1;
				var i2 = $('.logo').get(1);
				$(i2).attr('src', img1);
				isNeedLoop = true;
				loopTotal += 1;
			}
			if (r.image2) {
				var img2 = server + 'api/news/image/' + r.image2;
				var i3 = $('.logo').get(2);
				$(i3).attr('src', img2);
				isNeedLoop = true;
				loopTotal += 1;
			}
			$('.title span').html(r.title);
			$('.title small').html(r.updatetime);
			$('.content').html(r.content + '<p class="footer">' + r.footer + '</p>');
			if (isNeedLoop) {
				timer = setInterval(function() {
					if (loopIndex < loopTotal - 1) {
						loopIndex += 1;
					} else {
						loopIndex = 0;
					}
					$('.logo').hide();
					var showLog = $('.logo').get(loopIndex);
					$(showLog).show()
				}, 5000)
			}
		} else {
			$('.title').hide()
			if (r.footer) {
				$('.logo').css('top', 110)
				$('.logo').css('left', 110)
				var foots = [];
				if (r.footer.indexOf(',') >= 0) {
					foots = r.footer.split(',')
				} else {
					foots = r.footer.split('，')
				}
				var img = server + 'api/news/image/' + r.image;
				var i1 = $('.logo').get(0);
				$(i1).attr('src', img);
				$(i1).css('height', 424);
				var title1 = $('.logotitle').get(0);
				$(title1).html(foots[0]);
				$(title1).show()
				var img1 = server + 'api/news/image/' + r.image1;
				var i2 = $('.logo').get(1);
				var title2 = $('.logotitle').get(1);
				if (foots[1]) {
					$(i2).attr('src', img1);
					$(i2).css('left', 864);
					$(i2).css('height', 424);
					$(i2).show()
					$(title2).css('left', 864);
					$(title2).html(foots[1]);
					$(title2).show()
				} else {
					$(i2).hide()
					$(title2).hide()
				}
			} else {
				$('.logo').css('top', 60)
				$('.logo').css('left', 60)
				$('.logo').css('height', 636)
				var img = server + 'api/news/image/' + r.image;
				var i1 = $('.logo').get(0);
				$(i1).attr('src', img);
				$(i1).css('width', 1485);
			}
		}

		$('.model').show();
	})
}

Ajax(server + 'api/menu', {
	m: json.m,
	c: json.c
}, 'get', 'json', function(data) {
	$('header').html(data[0].name)
	newsType = data[0].id;
	NewsList(true);
})

$('.delete').click(function() {
	$('.model').hide()
})

$('.home').click(function() {
	window.location.href = "index.html"
})

$('.last').click(function() {
	window.location.href = "page2.html"
})

$('body').click(function(e) {
	/*
	var x = e.clientX;
	var t = $('body').width() / 2;
	var isnext = x > t ? true : false;
	
	if (isnext) {
		if (current < total - 1) {
			current += 1;
			ShowItem(current)
		}
	} else {
		if (current > 0) {
			current -= 1;
			ShowItem(current)
		}
	}
	/**/
})