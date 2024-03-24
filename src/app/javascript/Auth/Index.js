import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import {
    getFirestore,
    collection,
    doc,
    setDoc,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBl-YKR2hacNMjt_8gd4TafXlP9zfuAqls",
    authDomain: "prime-tv-489ce.firebaseapp.com",
    projectId: "prime-tv-489ce",
    storageBucket: "prime-tv-489ce.appspot.com",
    messagingSenderId: "647488934770",
    appId: "1:647488934770:web:4a8e6171236f21b7afc3eb",
    measurementId: "G-LT33SCY7S7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.getElementById("loginForm").addEventListener("submit", async event => {
    event.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        window.location.href = "../../../../index.html";
        alert("Login bem-sucedido!");
    } catch (error) {
        console.error("Erro ao fazer login:", error);
        alert("Erro ao fazer login. Verifique suas credenciais.");
    }
});

document.getElementById("createAccountForm").addEventListener("submit", async event => {
        event.preventDefault();
        let firstName = document.getElementById("FirstName").value;
        let lastName = document.getElementById("LastName").value;
        let userName = document.getElementById("UserName").value;
        let signUp_email = document.getElementById("signUp_email").value;
        let signUp_password = document.getElementById("signUp_password").value;

        signUp(signUp_email, signUp_password, firstName, lastName, userName);
    });

// Função para cadastrar um novo usuário
async function signUp(email, password, firstName, lastName, userName) {
    try {
        let userCredential = await createUserWithEmailAndPassword(auth, email, password);
        collectData(email, password, firstName, lastName, userName);
    } catch (error) {
        console.error("Erro ao cadastrar novo usuário:", error.code);
        if (error.code == "auth/missing-password") {
            let signUp_password = document.getElementById("signUp_password");
            signUp_password.classList.add("error");
            setTimeout(function () {
                signUp_password.classList.remove("error");
            }, 2000);
        }
        if (error.code == "auth/weak-password") {
            let text =
                "Deixe sua conta protegida, use número, letras maiúsculas e caracteres em sua senha, para torná-la mais forte.";
            pageAlerts("alert", "Senha fraca", text);
        }
        if (error.code == "auth/network-request-failed") {
            let text =
                "Talvez este e-mail já esteja vinculado a uma conta, estamos enfrentando problemas para ser vinculado.";
            pageAlerts("alert", "E-mail já vinculado?", text);
        }
        if (error.code == "auth/email-already-in-use") {
            let text =
                "Este e-mail já esteja vinculado a uma conta, deseja fazer login?";
            pageAlerts("confirm", "E-mail já vinculado", text, "login");
        }
    }
}

// Verificar se o usuário está autenticado
onAuthStateChanged(auth, user => {
    if (user) {
        window.collectData = function collectData(email, password, firstName, lastName, userName) {
            setDoc(doc(db, "users", user.uid), {
                name: `${firstName} ${lastName}`,
                email: user.email,
                profile_picture: "fp_13.jpg",
                userName: userName,
                firstName: firstName,
                lastName: lastName,
                yourPassword: password
            }).then(()=> {
              if (window.innerWidth < 576) {
                window.location.href = "../../../../index.html";
              } else {          
                window.location.href = "src/app/html/smart-index.html";
              }
            })
        };
        
    }
});

///////

var tabs = document.querySelectorAll(".tab-content");
var tabContent = document.querySelectorAll(".tab-content");

window.showTab = function showTab(tabId) {
    tabContent.forEach(tab => tab.classList.remove("active"));
    const selectedTab = document.getElementById(tabId);

    selectedTab.classList.add("active");

    if (tabId == "login") {
        document.querySelector("header .next-page").style.display = "none";
        document.querySelector("header .title").style.marginLeft = "-2em";
    } else {
        document.querySelector("header .next-page").style.display = "flex";
        document.querySelector("header .title").style.marginLeft = "3.5em";
    }
};

// Função para lidar com cliques nos botões de navegação
function handleNavClick(event) {
    const selectedPage = event.currentTarget.getAttribute("data-page");

    document.querySelector("#loading").style.display = "flex";
    setTimeout(function () {
        loadingHidden();
    }, 800);

    function loadingHidden() {
        document.querySelector("#loading").style.display = "none";
    }

    // Verifica se é uma tab ou stack tab
    if (selectedPage === "profile") {
        setTimeout(function () {
            // Stack tab
            showTab(selectedPage);
            window.history.pushState(
                {
                    page: selectedPage
                },
                null,
                `#${selectedPage}`
            );
        }, 200);
    } else {
        setTimeout(function () {
            // Bottom tab
            showTab(selectedPage);
            window.history.pushState(
                {
                    page: selectedPage
                },
                null,
                `#${selectedPage}`
            );
        }, 200);
    }
}

// Evento de popstate para lidar com o botão "voltar" do navegador
window.addEventListener("popstate", function (event) {
    const page = event.state ? event.state.page : "home";
    showTab(page);
});

function appBackButtonsNavigation() {
    history.back();
}

const navButtons = document.querySelectorAll(".option-bar");

// Adiciona eventos de clique aos botões de navegação
navButtons.forEach(button => {
    button.addEventListener("click", handleNavClick);
});

showTab("home");

const carousel = document.querySelector(".carousel");
const slides = document.querySelectorAll(".slide");

let currentIndex = 0;
let touchStartX = 0;
let touchEndX = 0;

function showSlide(index) {
    carousel.style.transform = `translateX(-${index * (16 + 2)}em)`;
}

function prevSlide() {
    currentIndex = currentIndex === 0 ? slides.length - 2 : currentIndex - 1;
    showSlide(currentIndex);
}

function nextSlide() {
    currentIndex = currentIndex === slides.length - 2 ? 0 : currentIndex + 1;
    showSlide(currentIndex);
}

carousel.addEventListener("touchstart", event => {
    touchStartX = event.touches[0].clientX;
});

carousel.addEventListener("touchend", event => {
    touchEndX = event.changedTouches[0].clientX;
    handleGesture();
});

function handleGesture() {
    if (touchEndX < touchStartX) {
        nextSlide();
    } else if (touchEndX > touchStartX) {
        prevSlide();
    }
}

showSlide(currentIndex);

let menu = document.querySelector("header .menu");
let menuOptions = document.querySelector("header .options");
menu.addEventListener("click", () => {
    menuOptions.classList.toggle("active");
});
