"use strict";
$(document).ready(function (){

	// Search function
	function search() {
		// Grab the search term value from input field
		var searchTerm = $('#search').val().toLowerCase();
		var searchYear = $('#year').val().toLowerCase();
		// Set empty HTML value for printing to page after getting search results
		var movieHTML = "";
		$.ajax({
			url: 'http://www.omdbapi.com/?s=' + searchTerm + '&y=' + searchYear + '&plot=short&r=json',
			method: 'GET',
			dataType: 'json',
			success: function(data) { // If search is successful, create HTMl with list items of movies
				// console.log(data);
					if (data.Response === "True") {
						$.each(data.Search, function(i, movie) {
								movieHTML += '<li><div class="poster-wrap">';
									if (movie.Poster != "N/A") { // If poster is available, display it
										movieHTML += '<a href="http://www.imdb.com/title/' + movie.imdbID + '" target="_blank" class="movie-poster"><img src="' + movie.Poster + '"></a>';
									} else { // If not, display icon placeholder
										movieHTML += "<i class='material-icons poster-placeholder'>crop_original</i>";
									}
								movieHTML += '</div>';
								movieHTML += '<span class="movie-title">' + movie.Title + '</span>';
								movieHTML += '<span class="movie-year">' + movie.Year + '</span></li>';
								// console.log(movieHTML);
						});
					} else if (data.Response === "False") { // If the response is false and no movies are found, display message
						movieHTML += '<li class="no-movies"><i class="material-icons icon-help">help_outline</i>No movies found that match: ' + searchTerm;
						$('.movie-list').html(movieHTML);
					}
			// Add HTML to page
			$('.movie-list').html(movieHTML); // Print the HTML with list of movies to the page		
			},
		}); // End AJAX Call
		
	} // End Search Function

	//Keyup Function
	$('input').keyup(function(){
		event.preventDefault();
		search();
	});
}); // End Document Ready