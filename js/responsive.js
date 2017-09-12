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
    		var imageToModal
    		if($(this).attr('src').endsWith(".png")) {
				imageToModal = $(this).attr('src')
    		} else {
    			imageToModal = $(this).attr('src').split("large")[0] + "modal.jpg"
    		}
			$('.enlargeImageModalSource').attr('src', imageToModal);
			$('#enlargeImageModal').modal('show');
			$('.modal-title').text($(this).attr('alt'))
			$('.enlargeImageModalSource').attr('alt', $(this).attr('alt'));
		});
});


// Show selected Projects

var projects = [
	{
		title: "A/B Testing",
		description: ["Designed an A/B test, including which metrics to measure and how long the test should be run.",
					"Analyzed the results of an A/B test that was ran by Udacity.",
					"Recommended a decision, and proposed a follow-up experiment."],
		skills: "Pandas, Matplotlib, Jupyter Notebook."
	},
];



var projectList = ''

projects.forEach(function (entry) {

	var projDescription = ''
	entry.description.forEach(function(pointer) {
		projDescription += "<li>" + pointer + "</li>"
	});

	projectList += "<div class='proj-content'> \
		<div class='proj-background'> \
		<div class='title-pos text-right'> \
			<span class='proj-title'>" + entry.title + "</span> \
		</div> \
		<div class='proj-description'> \
			<ul class='proj-bullet-description'>" + projDescription + "</ul>"
			+ entry.skills +
		"</div> \
		</div>"
})

$(".projects").append(projectList);



// Showing project descriptions

$(".proj-content").mouseover(function(){
	$(".proj-title").css({"margin-top": "50px"})
	$(".proj-description").fadeIn();
})

$(".proj-content").mouseleave(function(){
	$(".proj-description").hide();
	$(".proj-title").css({"margin-top": "250px"})
})