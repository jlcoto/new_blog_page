$(".nav-menu").click(function(){
	$(".nav-list").slideToggle();
	$("#sky-blue-triangle").slideToggle();
});


$(window).on('resize', function(){
	if($(window).width() > 768) {
		$("#sky-blue-triangle").css('display', 'none');
		$(".nav-list").show();
	} else if (($(window).width() < 768) && ($("#sky-blue-triangle").css('display') == 'none')) {
			$(".nav-list").hide();
		}
	}
)

// Enlarging images with bootstrap modals

$(function() {
    	$('.enlarge-img').on('click', function() {
    		var imageToModal = $(this).attr('src').split("large")[0] + "modal.jpg"
    		console.log(imageToModal);
			$('.enlargeImageModalSource').attr('src', imageToModal);
			$('#enlargeImageModal').modal('show');
			$('.modal-title').text($(this).attr('alt'))
			$('.enlargeImageModalSource').attr('alt', $(this).attr('alt'));
		});
});
