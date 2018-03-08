$('input[type="button"]').click(function(){
	$.ajax({
		url: '/writeComment',
		type: 'post',
		data: {
			code: window.location.href.split('main/')[1],
			content: $('textarea').val()
		},
		success: function (data) {
			console.log(111111111)
			window.location.reload()
		}
	})

})