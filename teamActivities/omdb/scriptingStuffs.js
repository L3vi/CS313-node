function search() {
	let searchValue = document.getElementById('search').value;
	let searchResults = document.getElementById('searchResults');
	// var results

	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://www.omdbapi.com/?apikey=byuidaho&s=' + searchValue);
	xhr.send(null);

	xhr.onreadystatechange = function() {
		let DONE = 4;
		let OK = 200;
		if (xhr.readyState === DONE) {
			if (xhr.status === OK) {
				var results = JSON.parse(xhr.responseText);

				console.log(JSON.parse(xhr.responseText));

				searchResults.innerHTML = "<ul>";
				results.Search.map(movie => {
					searchResults.innerHTML += '<li>' + movie.Title;
				
					searchResults.innerHTML += '<button type="button" onclick="getMovie(\'' + movie.imdbID + '\')">View Details</button></li>';
				});
				searchResults.innerHTML += "</ul>";
			} else {
				console.log('Error: ' + xhr.status);
			}
		}
	};
}

function getMovie(id) {
	console.log(id);
	let searchResults = document.getElementById('searchResults');
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://www.omdbapi.com/?apikey=byuidaho&i=' + id);
	xhr.send(null);

	xhr.onreadystatechange = function() {
		let DONE = 4;
		let OK = 200;
		if (xhr.readyState === DONE) {
			if (xhr.status === OK) {
				console.log(JSON.parse(xhr.responseText));
				var movieInformation = JSON.parse(xhr.responseText);
				searchResults.innerHTML = '<p>Title: ' + movieInformation.Title + '</p>';
				searchResults.innerHTML += '<p>Awards: ' + movieInformation.Awards + '</p>';
				searchResults.innerHTML += '<p>Score: ' + movieInformation.Metascore + '</p>';
				searchResults.innerHTML += '<p>Rating: ' + movieInformation.Rated + '</p>';
				searchResults.innerHTML += '<img src=' + movieInformation.Poster + '/>';
				

				
			} else {
				console.log('Error: ' + xhr.status);
			}
		}
		
	};	
}