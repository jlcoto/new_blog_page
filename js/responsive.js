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
		id: "testing",
		title: "A/B Testing",
		image: "url(/img-layout/a_b_testing_background.png)",
		description: ["Designed an A/B test, including which metrics to measure and how long the test should be run.",
					"Analyzed the results of an A/B test that was ran by Udacity.",
					"Recommended a decision, and proposed a follow-up experiment."],
		skills: "Pandas, Matplotlib, Jupyter Notebook."
	}, {
		id: "earthquake",
		title: "Earthquakes visualization",
		image: "url(/img-post/earthquake_plot.jpg)",
		description: ["Developed visualization where users can fully interact with geographical and temporal features of earthquakes.",
					"Successfully integrated D3.js and Leaflet to produce animations and transitions.",
					"Project featured by Data Science Weekly."],
		skills: "D3.js, Leaflet, GeoPandas, Pandas, Python."
	},
	{
		id: "machine-learning",
		title: "Machine Learning",
		image: "url(/img-layout/machine_learning.png)",
		description: ["Identified which Enron employees are more likely to have committed fraud using machine learning and public Enron financial and email data.",
					"Trained and tested different algorithms and used feature selection techniques.",
					"Tunned algorithms’ parameters to improve original results."],
		skills: "Python, Scikit-learn, Pandas, machine learning."
	},
	{
		id: "exploratory-r",
		title: "Exploratory Analysis R",
		image: "url(/img-layout/exploratory_r.png)",
		description: ["Cleaned, merged and analyzed data on consequences of earthquake in the world from the 1900s.",
					"Created a notebook with clear steps for getting, cleaning and merging the data from different sources. Created a codebook with all the variables included in final dataset.",
					"Created more than 20 visualizations to understand the data. Analyzed the conditional relationships of deaths of earthquakes given its magnitude and regime type/gdp per capita."],
		skills: "R, R Studio, ggplot, Python, pandas, GeoPandas."
	},

];



var projectList = ''

projects.forEach(function (entry) {


	var projDescription = ''
	entry.description.forEach(function(pointer) {
		projDescription += "<li>" + pointer + "</li>"
	});

	$(".projects").append("<div class='proj-content'> \
		<div class='proj-background' id="+entry.id+ "> \
		<div class='title-pos text-right'> \
			<span class='proj-title'>" + entry.title + "</span> \
		</div> \
		<div class='proj-description'> \
			<ul class='proj-bullet-description'>" + projDescription + "</ul>"
			+ entry.skills +
		"</div> \
		</div>")

	$("#" +entry.id ).css("background", entry.image)
})




// Showing project descriptions

$(".proj-content").mouseover(function(){
	$(".proj-title").css({"margin-top": "50px"})
	$(".proj-description").fadeIn();
})

$(".proj-content").mouseleave(function(){
	$(".proj-description").hide();
	$(".proj-title").css({"margin-top": "250px"})
})