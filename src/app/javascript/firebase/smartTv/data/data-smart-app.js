window.dataFirebase = function dataFirebase(userFirebaseData) {
  userFirebaseData.forEach((data, index) => {
     
    document.querySelector("iframe").setAttribute('src', data.movieCast);
    if (data.typeCast == 'serie') {
      let btnNext = document.querySelector('.next-episode');
      
      btnNext.addEventListener('click', ()=> {
        let nextEpisode = `${removerUltimoNumeroDaUrl(data.movieCast)}-${obterUltimoNumeroDaUrl(data.movieCast) + 1}`;
        console.log(nextEpisode);
        smartCast(nextEpisode)
      })
      document.querySelector("h1").innerHTML = "Você está assistindo, Episodio " + obterUltimoNumeroDaUrl(data.movieCast);
      
      
      window.menuHidden = function menuHidden() {
        logoutButton.classList.remove('active');
        nextEpisodeButton.classList.remove('active');
        title.classList.remove('active');
      }
      window.menuVisible = function menuVisible() {
        logoutButton.classList.add('active');
        nextEpisodeButton.classList.add('active');
        title.classList.add('active');
      }
    } else {
      window.menuHidden = function menuHidden() {
        logoutButton.classList.remove('active');
        nextEpisodeButton.classList.remove('active');
        title.classList.remove('active');
      }
      window.menuVisible = function menuVisible() {
        logoutButton.classList.add('active');
        nextEpisodeButton.classList.remove('active');
        title.classList.remove('active');
      }
    }
  });
}


window.obterUltimoNumeroDaUrl = function obterUltimoNumeroDaUrl(url) {
  const regex = /[-\/](\d+)(?!.*[-\/])/;
  const match = url.match(regex);

  if (match) {
    return parseInt(match[1]);
  } else {
    return null;
  }
}

window.removerUltimoNumeroDaUrl = function removerUltimoNumeroDaUrl(url) {
  // Expressão regular para encontrar o último número após o último hífen ou barra na URL
  const regex = /[-\/]\d+(?!.*[-\/])/;

  // Remove o último número da URL substituindo-o por uma string vazia
  const novaUrl = url.replace(regex, '');

  return novaUrl;
}
let displayOptions = document.querySelector('.hover-options');
let logoutButton = document.querySelector('.logout-button');
var nextEpisodeButton = document.querySelector('.next-episode');
var title = document.querySelector('h1');
// 
// displayOptions.addEventListener('touchstart', ()=> {
//   logoutButton.classList.add('active');
// });
// displayOptions.addEventListener('touchend', ()=> {
//   logoutButton.classList.remove('active');
// });
// 
displayOptions.addEventListener('mouseenter', ()=> {
  menuVisible();
});
displayOptions.addEventListener('mouseleave', ()=> {
  setTimeout(function() {
    menuHidden();
  }, 2000);
});

menuVisible();
setTimeout(function() {
  menuHidden();
}, 6000);
