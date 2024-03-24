function Play_1(id) {
  const contentIframe = document.querySelector('#play .media');
	const iframe = document.createElement('iframe');
	iframe.src = `https://embedder.net/e/${id}`;
	
	contentIframe.innerHTML = '';
	contentIframe.appendChild(iframe);
	console.log(id)
}