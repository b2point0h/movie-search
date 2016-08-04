"use strict";
$(document).ready(function (){

	// Search function
	function search() {
		// Grab the search term value from input field
		var searchTerm = $('#search').val().toLowerCase();
		var searchYear = $('#year').val().toLowerCase();
		// Set empty HTML value for printing to page after getting search results
		var movieHTML = "";
		var movieModal = "";
		$.ajax({
			url: 'http://www.omdbapi.com/?s=' + searchTerm + '&y=' + searchYear + '&plot=full&r=json',
			method: 'GET',
			dataType: 'json',
			success: function(data) { // If search is successful, create HTMl with list items of movies
				// console.log(data);
					if (data.Response === "True") {
						$.each(data.Search, function(i, movie) {
								movieHTML += '<li><div class="poster-wrap">';
									if (movie.Poster != "N/A") { // If poster is available, display it
										movieHTML += '<a href="#" data-toggle="modal" data-target="#' + movie.imdbID + '"><img src="' + movie.Poster + '"></a>';
									} else { // If not, display icon placeholder
										movieHTML += "<i class='material-icons poster-placeholder'>crop_original</i>";
									}
								movieHTML += '</div>';
								movieHTML += '<span class="movie-title">' + movie.Title + '</span>';
								movieHTML += '<span class="movie-year">' + movie.Year + '</span></li>';
								
								// Create Bootstrap modals that are populated with search results
								movieModal += '<div class="modal fade" tabindex="-1" role="dialog" id="' + movie.imdbID + '"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title">' + movie.Title + ' (' + movie.Year + ')' + '</h4></div>';
								movieModal += '<div class="modal-body">' + '<img src="' + movie.Poster + '"><br><br>IMDB Rating: ' + movie.imdbRating + '<br><br>Plot Synopsis:<br>' + movie.Plot + '</div>';
								movieModal += '<div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button><a href="http://www.imdb.com/title/' + movie.imdbID +'" target="_blank"><button type="button" class="btn btn-primary">Link to IMDB</button></a></div></div></div></div>'
						});
					} else if (data.Response === "False") { // If the response is false and no movies are found, display message
						movieHTML += '<li class="no-movies"><i class="material-icons icon-help">help_outline</i>No movies found that match: ' + searchTerm;
						$('.movie-list').html(movieHTML);
					}
			// Add HTML to page
			$('.movie-list').html(movieHTML); // Print the HTML with list of movies to the page
			$('.main-content').append(movieModal); // Append the movie modals the page
			},
		}); // End AJAX Call

	} // End Search Function

	$('.movie-poster').on('click', function(){
		console.log("Clicked");
	});	

	//Keyup Function
	$('input').keyup(function(){
		event.preventDefault();
		search();
	});
}); // End Document Ready