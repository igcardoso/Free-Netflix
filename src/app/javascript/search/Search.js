document.addEventListener('DOMContentLoaded', function () {
	var BASE_URL = 'https://api.themoviedb.org/3';
	var API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8';

	var searchBox = document.getElementById('search-box');
	var recommendations = document.querySelector('#search .recommendations');
	var resultsContainer = document.querySelector('#search .results');

	searchBox.addEventListener('input', function () {
		var searchTerm = searchBox.value.trim();

		resultsContainer.innerHTML = '';
		recommendations.classList.add('hidden');
		if (searchTerm !== '') {
			searchMedia(searchTerm);
		}
	});


	async function searchMedia(searchTerm) {
		try {
			// Modifique a URL da API para incluir a busca
			var searchUrl = BASE_URL + '/search/multi?' + API_KEY + '&language=pt-BR&query=' + encodeURIComponent(searchTerm);

			const response = await fetch(searchUrl);
			const data = await response.json();

			if (data.results) {
				data.results.forEach((media, index) => {
					let card = document.createElement('div');
					card.classList.add('card');
					card.setAttribute('data-page', 'film-page');
					card.addEventListener('click', (event)=> {
						handleNavClick(event);
						getAllMoviesDetails(media.id, media.title || media.name, media.backgrop_path);
					});

					let clickEffect = document.createElement('div');
					clickEffect.classList.add('click-effect');

					let posterImg = document.createElement('img');
					posterImg.setAttribute('data-src', 'https://image.tmdb.org/t/p/w500' + media.poster_path);
					posterImg.classList.add('img');
					posterImg.alt = media.title || media.name + ' Poster';

					clickEffect.appendChild(posterImg);
					//
					// 					if (media.title || media.name) {
					// 						let title = document.createElement('p');
					// 						title.classList.add('title');
					// 						title.textContent = media.title || media.name;
					// 						clickEffect.appendChild(title);
					// 					}

					card.appendChild(clickEffect);
					if (media.poster_path != null || media.vote_count >= 90) {
						resultsContainer.appendChild(card);
					}
				});
			}
			initLazyLoad();
		} catch (error) {
			console.error('Erro ao obter dados da pesquisa:',
				error);
		}
	}

	// Iniciar o lazy loading
	function initLazyLoad() {
		const lazyImages = document.querySelectorAll('.img');

		lazyImages.forEach(imagens => imagens.classList.remove('loaded'));

		const lazyLoad = target => {
			const io = new IntersectionObserver((entries,
				observer) => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						const img = entry.target;
						img.src = img.dataset.src;
						observer.unobserve(img);
						img.classList.add('loaded');
					}
				});
			});

			io.observe(target);
		};

		lazyImages.forEach(lazyLoad);
	}

	// Agendar a descarga das imagens após 5 minutos de inatividade
	let timeoutId;

	function scheduleImageUnload() {
		clearTimeout(timeoutId);
		// timeoutId = setTimeout(() => {
		// 		unloadImages();
		// 	}, 200);
	}
	//
	// Descarregar imagens não visualizadas
	// function unloadImages() {
	// 	const loadedImages = document.querySelectorAll('.img[src^="https://image.tmdb.org/t/p/w500"]');
	//
	// 	loadedImages.forEach(img => {
	// 		img.removeAttribute('src');
	// 		img.classList.remove('loaded')
	// 	});
	// }

});