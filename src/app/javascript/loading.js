document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#pages-and-header').style.display = 'none';
  setTimeout(function() {
    document.querySelector('#loading-app p').classList.add('netflix-effect');
  }, 700);
	setTimeout(function() {
		document.querySelector('#loading-app').style.display = 'none';
		document.querySelector('#pages-and-header').style.display = 'block';
	}, 4000);
});