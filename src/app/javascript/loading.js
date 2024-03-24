document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#pages-and-header').style.display = 'none';
  setTimeout(function() {
    document.querySelector('#loading-app .intro-static').classList.add('active');
    document.querySelector('#loading-app .intro-static').classList.add('hidden');
  }, 200);
	setTimeout(function() {
		document.querySelector('#loading-app').style.display = 'none';
		document.querySelector('#pages-and-header').style.display = 'block';
	}, 4000);
});