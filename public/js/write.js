$(document).ready(function() {
  $('.summernote').summernote({
    height: 150, //set editable area's height
    codemirror: { // codemirror options
      theme: 'monokai'
    }
  });
});

$('.btn-success').click(function(){
if($('.summernote').summernote('code').length > 0) {
	$.ajax({
		url: '/write',
		type: 'post',
		data: {contentCode: $('.summernote').summernote('code')},
		success: function (data) {
			window.location.href = '/home'
		}
	})
}

})