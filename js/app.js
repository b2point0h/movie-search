"use strict";
$(document).ready(function (){
	let apikey = "6df1ff9f";
	// Search function
	function search() {
		// Grab the search term value from input field
		let searchTerm = $('#search').val().toLowerCase(),
				searchYear = $('#year').val().toLowerCase(),				
				// Set empty HTML value for printing to page after getting search results
				movieHTML = "";
		$.ajax({
			url: 'http://www.omdbapi.com/?apikey=' + apikey + '&s=' + searchTerm + '&y=' + searchYear + '&plot=full',
			method: 'GET',
			dataType: 'json',
			success: function(data) { // If search is successful, create HTMl with list items of movies
				 
					if (data.Response === "True") {
						$.each(data.Search, function(i, movie) {
								movieHTML += '<li id="' + movie.imdbID + '"><div class="poster-wrap">';
									if (movie.Poster != "N/A") { // If poster is available, display it
										movieHTML += '<a class="movie-poster" href="#" data-toggle="modal" data-target="#' + movie.imdbID + '"><img src="' + movie.Poster + '"></a>';
									} else { // If not, display icon placeholder
										movieHTML += "<i class='material-icons poster-placeholder'>crop_original</i>";
									}
								movieHTML += '</div>';
								movieHTML += '<span class="movie-title">' + movie.Title + '</span>';
								movieHTML += '<span class="movie-year">' + movie.Year + '</span></li>';																
						});						
					} else if (data.Response === "False") { // If the response is false and no movies are found, display message
						movieHTML += '<li class="no-movies"><i class="material-icons icon-help">help_outline</i>No movies found that match: ' + searchTerm;
						$('.movie-list').html(movieHTML);
					}
			// Add HTML to page
			$('.movie-list').html(movieHTML); // Print the HTML with list of movies to the page
				
			},// End Success
		}); // End AJAX Call
	} // End Search Function

	
	$('#movies').on('click', "li", function(e) {		
		
		//Prevents the bootstrap modal from bubbling the add '.in' class to the target click
		e.stopPropagation();
		let movieModal = "",
				movieId = $(this).attr('id');
		
		$.ajax({
			url: 'http://www.omdbapi.com/?apikey=' + apikey + '&i=' + movieId + '&plot=full',
			method: 'GET',
			dataType: 'json',
			success: function(data) {				
					movieModal += '<div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title">' + data.Title + ' (' + data.Year + ')' + '</h4></div>';
					movieModal += '<div class="modal-body">' + '<img src="' + data.Poster + '"><br><br>IMDB Rating: ' + data.imdbRating + '<br><br>Plot Synopsis:<br>' + data.Plot + '</div>';
					movieModal += '<div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button><a href="http://www.imdb.com/title/' + data.imdbID +'" target="_blank"><button type="button" class="btn btn-primary">Link to IMDB</button></a></div></div>';
			$('.modal-dialog').html(movieModal); // Update the clicked modal
			$('#posterModal').modal('show');
			}
		}); // End AJAX call


	});// End Click function

	

	let delay = (function(){
	  let timer = 0;
	  return function(callback, ms){
	    clearTimeout (timer);
	    timer = setTimeout(callback, ms);
	  };
	})();
	//Keyup Function
	$('input').keyup(function(){
		delay(function(){
			search();
		}, 500);
	});
}); // End Document Ready