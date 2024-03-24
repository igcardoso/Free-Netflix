import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
    getAuth,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import {
    getFirestore,
    collection,
    doc,
    onSnapshot,
    setDoc,
    getDoc,
    getDocs,
    deleteDoc,
    updateDoc
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
const db = getFirestore(app);
console.log("Instância do Firestore:", db);
const auth = getAuth(app);

document.querySelector(".logout-button").addEventListener("click", () => {
    // Faço um logout do meu usuário (saio da aplicação).
    signOut(auth)
        .then(() => {
            pageAlerts("alert", "Conta desconectada", "");
        })
        .catch(error => {
            pageAlerts("alert", "Erro ao desconectar", "");
        });
});

// Verificar se o usuário está autenticado
onAuthStateChanged(auth, user => {
    if (user) {
      //==== USER DATA ====
      onSnapshot(doc(db, "users", user.uid), doc => {
          if (doc.exists()) {
              let userData = doc.data();
              console.log(userData);

              const userFirebaseData = [
                  {
                      name: userData.name,
                      profile: userData.profile_picture,
                      email: userData.email,
                      firstName: userData.firstName,
                      lastName: userData.lastName,
                      userName: userData.userName,
                      movieCast: userData.urlCast,
                      typeCast: userData.typeCast
                  }
              ];

              dataFirebase(userFirebaseData);
          } else {
              console.log(
                  "Nenhum documento encontrado para o usuário atual."
              );
          }
      });
     window.smartCast = function smartCast(value_update) {
          let user = auth.currentUser;
          if (user) {
           let documentRef = doc(db, "users", user.uid);
       
            let dataToUpdate = {
                urlCast: value_update
            };
    
            updateDoc(documentRef, dataToUpdate).then(() => {
                console.log('cast no ar')
            })
            .catch((error) => {
                console.error("Erro ao atualizar documento:", error);
            });
          } else {
            console.log('Usuario não está logado')
          }
      }
    } else {
        window.location.href = "/src/app/html/auth.html";
    }
});
