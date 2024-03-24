let touchStartYRefresh;
let isRefreshingCustom = false;
let startOfSpinCustom;

let currentPage = window.history.state ? window.history.state.page : 'home';

const contentElementCustom = document.getElementById('content');
let pagesAndHeaderElementCustom = document.querySelector(`#${currentPage} .scroll`);

contentElementCustom.addEventListener('touchstart', handleTouchStartCustom);
contentElementCustom.addEventListener('touchmove', handleTouchMoveCustom);
contentElementCustom.addEventListener('touchend', handleTouchEndCustom);

// Adicione um ouvinte de evento ao objeto window para detectar alterações no histórico de navegação

window.addEventListener('popstate', function(event) {
  setTimeout(function() {
    currentPage = event.state ? event.state.page : 'home';
    pagesAndHeaderElementCustom = document.querySelector(`#${currentPage} .scroll`);
  }, 1);
});

// Adicione um ouvinte de evento para os botões com o atributo data-page
document.addEventListener('click', function(event) {
  const targetButton = event.target.closest('[data-page]');
  if (targetButton) {
    const newPage = targetButton.getAttribute('data-page');
    navigateToPage(newPage);
  }
});

function navigateToPage(newPage) {
	 let page = document.getElementById(`${newPage}`);
    if (!page.classList.contains('floating-element') && newPage != "search") {
    	pagesAndHeaderElementCustom = document.querySelector(`#${newPage} .scroll`);
    }
}

function handleTouchStartCustom(event) {
  touchStartYRefresh = event.touches[0].clientY;
}

function handleTouchMoveCustom(event) {
	const currentContentPageCT = window.history.state ? window.history.state.page: 'home';
	let handle_currentContentCT = document.querySelector(`#${currentContentPageCT} .scroll`)
	
  const isAtBottom = contentElementCustom.scrollTop + contentElementCustom.clientHeight >= contentElementCustom.scrollHeight;
  const isPullingUp = event.touches[0].clientY < touchStartYRefresh;

  if (isAtBottom && isPullingUp) {
    const offset = (touchStartYRefresh - event.touches[0].clientY) / 10;
    pagesAndHeaderElementCustom.style.transform = `translateY(-${offset}px)`;
    startOfSpinCustom = offset;
  }
}

function handleTouchEndCustom() {
    pagesAndHeaderElementCustom.style.transform = `translateY(0)`;
}

