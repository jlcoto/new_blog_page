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
		image: "url(/img-layout/earthquake_plot.png)",
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
	{
		id: "data-wrangling",
		title: "Data Wrangling SQL and Pandas",
		image: "url(/img-layout/wrangling_data.png)",
		description: ["Parsed 140 Mb XML document to obtain relevant data.",
					"Cleaned, audited and corrected more than 2500 registries.",
					"Stored cleaned data in a SQL database, performed queries and generated plots. Created map plots to inspect georeferenced data."],
		skills: "Python, SQL, XML parsing, regular expressions, Pandas, BaseMap, GeoPandas."
	},
	{
		id: "exploratory-pandas",
		title: "Exploratory Analysis Pandas",
		image: "url(/img-layout/exploratory_analysis_pandas.png)",
		description: ["Analyzed Titanic Data.",
					"Studied relationships between variables and created visualizations.",
					"Answered questions about the variables related to surviving the Titanic."],
		skills: "Python, IPython, Pandas."
	},
	{
		id: "stats-python",
		title: "Statistical Analysis with Python",
		image: "url(/img-layout/stats_python.png)",
		description: ["Analyzed validity of stroop effect.",
					"Conducted exploratory analysis.",
					"Used different visualizations to understand the stroop effect."],
		skills: "Python, IPython, Pandas."
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
	$(".proj-title").css({"margin-top": "30px"})
	$(".proj-description").fadeIn();
})

$(".proj-content").mouseleave(function(){
	$(".proj-description").hide();
	$(".proj-title").css({"margin-top": "250px"})
})




