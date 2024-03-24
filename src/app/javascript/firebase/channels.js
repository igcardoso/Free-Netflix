// Selecionar o elemento iframe
let iframe_rendering_channels = document.querySelector('#channels .media iframe');

// Selecionar o elemento slide onde as divs dos canais serão adicionadas
let channelsSlide = document.getElementById('channelsSlide');

// Lista de links e nomes dos canais
let channelData = [
  { link: "https://playertv.net/tv.php?c=megapix",
    name: "megapix"
  },
  { link: "https://playertv.net/tv.php?c=tc-premium",
    name: "Telecine Premium"
  },
  { link: "https://playertv.net/c/wbr.php?id=tcFun",
    name: "Telecine Fun"
  },
  { link: "https://playertv.net/tv.php?c=tnt",
    name: "TNT"
  },
  { link: "https://playertv.net/c/wbr.php?id=tcTouch",
    name: "Telecine Touch"
  },
  { link: "https://playertv.net/c/wbr.php?id=tcPipoca",
    name: "Telecine Pipoca"
  },
  { link: "https://playertv.net/tv.php?c=tc-cult",
    name: "Telecine Cult"
  },
  { link: "https://playertv.net/c/wbr.php?id=tcAction",
    name: "Telecine Action"
  },
  { link: "https://playertv.net/tv.php?c=star-plus",
    name: "Star Plus"
  },
  { link: "https://playertv.net/tv.php?c=space",
    name: "Space"
  },
  { link: "https://playertv.net/c/wbr.php?id=sbt",
    name: "Sbt"
  },
  { link: "https://playertv.net/playplusembed/live.php?ch=4",
    name: "Record"
  },
  { link: "https://playertv.net/c/wbr.php?id=nick",
    name: "Nickelodeon"
  },
  { link: "https://playertv.net/c/wbr.php?id=nickjr",
    name: "Nick junior"
  },
  { link: "https://playertv.net/tv.php?c=nat-geo",
    name: "National Geographic"
  },
  { link: "https://playertv.net/c/u.php?id=h1",
    name: "History"
  },
  { link: "https://playertv.net/tv.php?c=hbo-plus",
    name: "HBO Plus"
  },
  { link: "https://playertv.net/tv.php?c=hbo-family",
    name: "HBO Family"
  },
  { link: "https://playertv.net/tv.php?c=hbo2",
    name: "HBO 2"
  },
  { link: "https://playertv.net/tv.php?c=hbo",
    name: "HBO"
  },
  { link: "https://playertv.net/c/u.php?id=h2",
    name: "History 2"
  },
  { link: "https://playertv.net/tv.php?c=fx",
    name: "FX"
  },
  { link: "https://playertv.net/tv.php?c=disney",
    name: "Disney"
  },
  { link: "https://playertv.net/tv.php?c=d-world",
    name: "Discovery World"
  },
  { link: "https://playertv.net/tv.php?c=d-turbo",
    name: "Discovery Turbo"
  },
  { link: "https://playertv.net/tv.php?c=d-science",
    name: "Discovery Science"
  },
  { link: "https://playertv.net/tv.php?c=d-kids",
    name: "Discovery Kids"
  },
  { link: "https://playertv.net/tv.php?c=d-hh",
    name: "Discovery H&H"
  },
  { link: "https://playertv.net/tv.php?c=d-channel",
    name: "Discovery Channel"
  },
  { link: "https://playertv.net/c/wbr.php?id=comedyCentral",
    name: "Comedy Central"
  },
  { link: "https://playertv.net/tv.php?c=cinemax",
    name: "Cinemax"
  },
  { link: "https://playertv.net/c/wbr.php?id=cnn",
    name: "CNN"
  },
  { link: "https://playertv.net/tv.php?c=cartoon",
    name: "Cartoon Network"
  },
  { link: "https://playertv.net/c/wbr.php?id=bbb",
    name: "BBB"
  }
];

// Iterar sobre os dados dos canais e criar dinamicamente as divs dos canais
channelData.forEach((channel, index) => {
  // Criar a div do canal
  let channelDiv = document.createElement('div');
  channelDiv.classList.add('channel', 'option-bar');
  channelDiv.setAttribute('data-page', 'channels');

  // Criar a imagem do poster do canal
  // let posterImg = document.createElement('img');
//   posterImg.classList.add('poster-channel');
//   posterImg.src = `accets/channels/poster-${channel.name.toLowerCase().replace(" ", "-")}.png`;
// 
  // Criar a imagem do logo do canal
  let logoImg = document.createElement('img');
  logoImg.src = `accets/channels/logo-${channel.name.toLowerCase().replace(" ", "-")}.png`;
  logoImg.alt = 'logo';
  logoImg.classList.add('logo');

  // Criar o parágrafo com o nome do canal
  let channelName = document.createElement('p');
  channelName.textContent = channel.name;

  // Adicionar os elementos à div do canal
  // channelDiv.appendChild(posterImg);
  channelDiv.appendChild(logoImg);
  channelDiv.appendChild(channelName);

  // Adicionar event listener para mudar o canal ao clicar
  channelDiv.addEventListener('click', () => {
    iframe_rendering_channels.setAttribute('src', channel.link);
  });

  // Adicionar a div do canal ao slide
  channelsSlide.appendChild(channelDiv);
});
