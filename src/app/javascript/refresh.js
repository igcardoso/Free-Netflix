const content = document.getElementById('content');
const pagesAndHeader = document.getElementById('pages-and-header');
const refreshIndicator = document.getElementById('refreshIndicator');
const iconRefreshIndicator = document.getElementById('iconRefreshIndicator');

let currentContent;
var isRefreshing;

content.addEventListener('scroll', handleScroll);

content.addEventListener('touchstart', handleTouchStart);

content.addEventListener('touchmove', handleTouchMove);

content.addEventListener('touchend', handleTouchEnd);


function handleScroll() {
	const isAtTop = currentContent.scrollTop === 0;

	if (isAtTop) {
		refreshIndicator.classList.remove('hide');
	} else {
		refreshIndicator.classList.add('hide');
	}
}

function handleTouchStart(event) {
	startY = event.touches[0].clientY;
	currentContent = event.currentTarget;
}

function handleTouchMove(event) {

	const currentContentPage = window.history.state ? window.history.state.page: 'home';
	let handle_currentContent = document.querySelector(`#${currentContentPage} .scroll`)

	if (handle_currentContent.scrollTop === 0 && event.touches[0].clientY > startY) {
		const offset = (event.touches[0].clientY - startY) / 5;
		refreshIndicator.style.transform = `translateY(${offset}px)`;
		pagesAndHeader.style.transform = `translateY(${offset}px)`;
		isRefreshing = offset > 100;
		startOfSpin = offset
	}
}

function handleTouchEnd() {
	if (isRefreshing) {
		Refresh();
	} else {
		refreshIndicator.style.transform = 'translateY(0)';
		pagesAndHeader.style.transform = `translateY(0)`;
		isRefreshing = false;
	}
}

function Refresh() {
	if (startOfSpin > 100) {
		iconRefreshIndicator.classList.add('spin');
	}
	setTimeout(() => {

		refreshIndicator.style.transform = 'translateY(0)';
		pagesAndHeader.style.transform = `translateY(0px)`;
	 isRefreshing = false;
		const page = window.history.state ? window.history.state.page: 'home';
		switch (page) {
			case 'home':
				contentHome();
				break;
			case 'search':
				contentSearch();
				break;
			case 'film-page':
				contentFilmPage();
				break;

			// default:
     // code
			}
			currentContent.scrollTop = 1;
			iconRefreshIndicator.classList.remove('spin');
		}, 2000);
	}
	