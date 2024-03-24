var tabs = document.querySelectorAll('.tab-content');
var tabContent = document.querySelectorAll('.tab-content');
var stackTabs = document.querySelectorAll('.stack-tab-content');

var appBackButtons = document.querySelectorAll('.back');

function updateHeaderVisibility() {
    const isAnyStackTabActive = Array.from(stackTabs).some(tab =>
        tab.classList.contains("active")
    );
    const cogElement = document.querySelector("#profile");
    const searchElement = document.querySelector("#search");
    const filmPageElement = document.querySelector("#film-page");
    const episodeDetails = document.querySelector("#episode-details");
    const playElement = document.querySelector("#play");
    const trailerElement = document.querySelector("#trailer");
    const channelsElement = document.querySelector("#channels");
    const homeElement = document.querySelector("#home");
    const navBar = document.querySelector("nav");
    const header = document.querySelector("header");

    if (isAnyStackTabActive) {
        // header.classList.add('hidden');
        header.classList.add("hidden-display");
        navBar.style.display = "flex";
    } else if (cogElement.classList.contains("active")) {
        header.classList.add("hidden-display");
        // header.classList.remove('hidden');
        navBar.style.display = "flex";
    } else if (searchElement.classList.contains("active")) {
        // header.classList.add('hidden');
        header.classList.add("hidden-display");
        navBar.style.display = "flex";
    } else if (filmPageElement.classList.contains("active")) {
        // header.classList.remove('hidden');
        header.classList.add("hidden-display");
        navBar.style.display = "none";
        document.querySelector("#play .media").innerHTML = "";
        document.querySelector("#trailer .media").innerHTML = "";
    } else if (episodeDetails.classList.contains("active")) {
        // header.classList.remove('hidden');
        header.classList.add("hidden-display");
        navBar.style.display = "none";
        document.querySelector("#play .media").innerHTML = "";
        document.querySelector("#trailer .media").innerHTML = "";
    } else if (playElement.classList.contains("active")) {
        // header.classList.remove('hidden');
        header.classList.add("hidden-display");
        navBar.style.display = "none";
    } else if (channelsElement.classList.contains("active")) {
        // header.classList.remove('hidden');
        header.classList.add("hidden-display");
        navBar.style.display = "none";
    } else if (trailerElement.classList.contains("active")) {
        // header.classList.remove('hidden');
        header.classList.add("hidden-display");
        navBar.style.display = "none";
    } else if (homeElement.classList.contains("active")) {
        // header.classList.remove('hidden');
        header.classList.remove("hidden-display");
        navBar.style.display = "flex";
        document.querySelector("#channels .media iframe").src = "";
    } else {
        navBar.style.display = "flex";
        header.classList.remove("hidden-display");
        document.querySelector("#channels .media iframe").src = "";
    }
}

function capitalizeFirstLetter(palavra) {
	return palavra.charAt(0).toUpperCase() + palavra.slice(1);
}

function displayPageName(event) {
	setTimeout(function() {
		const pageName = window.history.state ? window.history.state.page: 'home';
		const pageTitle = document.querySelector('#name-page');
		const title = capitalizeFirstLetter(pageName);
		switch (title) {
			case 'Home':
				pageTitle.innerText = "Inicio";
				pageTitle.classList.remove('hidden');
				break;
			case 'Library':
				pageTitle.innerText = "Biblioteca";
				pageTitle.classList.remove('hidden');
				break;
			case 'Discover':
				pageTitle.innerText = "Descobrir";
				pageTitle.classList.remove('hidden');
				break;

			default:
				pageTitle.classList.add('hidden');
			}
		}, 1);
	}


	function showTab(tabId) {

		tabContent.forEach(tab => tab.classList.remove('active'));
		const selectedTab = document.getElementById(tabId);

		selectedTab.classList.add('active');
		contentFilmPage();

		const markerNavBottom = document.querySelectorAll('.option-nav-bottom');

		if (tabId != 'play' && tabId != 'episode-details' && tabId != 'film-page' && tabId != 'channels') {
			markerNavBottom.forEach(option => {
				markerNavBottom.forEach(all => all.classList.remove('active'));
				document.querySelector(`[data-page=${tabId}]`).classList.add('active');
			})
		}


		if (tabId != 'profile' && !selectedTab.classList.contains('stack-tab-content') && !selectedTab.classList.contains('floating-element')) {
			
			let pageAreaWithScroll = document.querySelector(`#${tabId} .scroll`);
			let header = document.querySelector('header');

			header.classList.toggle("sticky", pageAreaWithScroll.scrollTop > 0);
			pageAreaWithScroll.addEventListener("scroll", function() {
				header.classList.toggle("sticky", pageAreaWithScroll.scrollTop > 0);
			});


			let FilmPageHeader = document.querySelector('#film-page .header');

			FilmPageHeader.classList.toggle("sticky", pageAreaWithScroll.scrollTop > 0);
			pageAreaWithScroll.addEventListener("scroll", function() {
				FilmPageHeader.classList.toggle("sticky", pageAreaWithScroll.scrollTop > 0);

			});

			let episodePageHeader = document.querySelector('#episode-details .header');

			episodePageHeader.classList.toggle("sticky", pageAreaWithScroll.scrollTop > 0);
			pageAreaWithScroll.addEventListener("scroll", function() {
				episodePageHeader.classList.toggle("sticky", pageAreaWithScroll.scrollTop > 0);

			});


		}
		displayPageName();
		updateHeaderVisibility();
	}

	// Função para lidar com cliques nos botões de navegação
	function handleNavClick(event) {
		const selectedPage = event.currentTarget.getAttribute('data-page');
		
		
			let away = document.querySelector('#click-away');
			if (!away.classList.contains('active')) {
				document.querySelector('#loading').style.display = 'flex';
				setTimeout(function() {
					loadingHidden();
				}, 800);
			} else {
				document.querySelector('#loading').style.display = 'none';
			}

			function loadingHidden() {
				document.querySelector('#loading').style.display = 'none';
			}


		// Verifica se é uma tab ou stack tab
		if (selectedPage === 'profile') {
			setTimeout(function() {
				// Stack tab
				showTab(selectedPage);
				window.history.pushState({
					page: selectedPage
				}, null, `#${selectedPage}`);
			}, 200);
		} else {
			setTimeout(function() {
				// Bottom tab
				showTab(selectedPage);
				window.history.pushState({
					page: selectedPage
				}, null, `#${selectedPage}`);
			}, 200);
		}
	}

	// Evento de popstate para lidar com o botão "voltar" do navegador
	window.addEventListener('popstate', function (event) {
		const page = event.state ? event.state.page: 'home';
		showTab(page);
	});


	function appBackButtonsNavigation() {
		history.back();
	}

	appBackButtons.forEach(btn => {
		btn.addEventListener("click", ()=> {
			appBackButtonsNavigation();
		})
	});
	