const API_key = 'api_key=1cf50e6248dc270629e802686245c2c8';
const BASE_url = 'https://api.themoviedb.org/3';

function sharedPage() {
	function getURLParameter(name) {
		name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
		var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
		var results = regex.exec(location.search);
		return results === null ? '': decodeURIComponent(results[1].replace(/\+/g, ' '));
	}

	const shareId = getURLParameter('share');

	function getMovieShare(filmeId) {
		const share_detalhesUrl = `${BASE_url}/movie/${filmeId}?${API_key}&language=pt-BR`;

		fetch(share_detalhesUrl)
		.then(response => response.json())
		.then(share_data => {
			console.log(share_data);

			let selectedShare = 'film-page';

			if (selectedShare === 'profile') {
				setTimeout(function() {
					getAllMoviesDetails(share_data.id, share_data.title || share_data.name, share_data.backdrop_path);
					showTab(selectedShare);
					updateHeaderVisibility();
					window.history.pushState({
						page: selectedShare
					}, null, `#${selectedShare}`);
				}, 200);
			} else {
				setTimeout(function() {
					getAllMoviesDetails(share_data.id, share_data.title || share_data.name, share_data.backdrop_path);
					showTab(selectedShare);
					updateHeaderVisibility();
					window.history.pushState({
						page: selectedShare
					}, null, `#${selectedShare}`);
				}, 200);
			}
		})
		.catch(error => {
			console.error('Ocorreu um erro:', error);
		});
	}


	getMovieShare(shareId);
}

function checkParameterShare() {
	const urlParams = new URLSearchParams(window.location.search);
	const parametroShare = urlParams.get('share');

	if (parametroShare !== null) {
		sharedPage();
	} else {
		console.log('A URL não contém o parâmetro ?share=');
	}
}

checkParameterShare();