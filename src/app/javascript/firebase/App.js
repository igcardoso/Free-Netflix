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
            pageAlerts('alert', 'Conta desconectada', '')
        })
        .catch(error => {
            pageAlerts('alert', 'Erro ao desconectar', '')
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
                        userName: userData.userName
                    }
                ];

                dataFirebase(userFirebaseData);
            } else {
                console.log(
                    "Nenhum documento encontrado para o usuário atual."
                );
            }
        });
      //==== RECORD FAVORITE MOVIES ====
        window.movieSaveInDataBase = function movieSaveInDataBase(movieId, movieTitle, movieBackground) {
            let userDocRef = doc(db, "users", auth.currentUser.uid); // Obtém uma referência ao documento do usuário
            let movieSaveCollectionRef = collection(userDocRef, "movieSave"); // Cria uma referência para a coleção "movieSave" dentro do documento do usuário

            // Adiciona um novo documento dentro da coleção "movieSave"
            setDoc(doc(movieSaveCollectionRef, `${movieId}`), {
                id: movieId,
                title: movieTitle,
                background: movieBackground
            }) .catch(error => {
                    console.error(
                        "Erro ao adicionar novo documento à coleção 'movieSave':",
                        error
                    );
                });
        };
      //==== SHOW FAVORITE MOVIES ====
        window.displayMovieIds = async function displayMovieIds() {
            const user = auth.currentUser;
            if (user) {
                try {
                    // Referência para a coleção "movieSave" do usuário atual
                    const movieSaveCollectionRef = collection(db, "users", user.uid, "movieSave");
        
                    // Ouvir alterações na coleção "movieSave"
                    onSnapshot(movieSaveCollectionRef, snapshot => {
                        // Limpar a exibição atual
                        clearDisplay();
                        console.log(snapshot.empty)
                        if (snapshot.empty) {
                          no_movies(false);
                        } else {
                          no_movies(true)
                          snapshot.forEach(doc => {
                            getLibraryMovies(doc.data().id, doc.data().title, doc.data().background);
                            
                        })
                        }
                    });
                } catch (error) {
                    console.error("Erro ao exibir os IDs dos filmes:", error);
                }
            } else {
                console.error("Usuário não autenticado.");
            }
        };
        window.profilePhotoOptions = async function profilePhotoOptions() {
            const user = auth.currentUser;
            if (user) {
                try {
                    const movieSaveCollectionRef = collection(
                        db,
                        "public_collection",
                        "profilePhotos",
                        "all"
                    );

                    onSnapshot(movieSaveCollectionRef, snapshot => {
                        // Limpar a exibição atual
                        clearDisplayPublicData();
                        snapshot.forEach(doc => {
                        display_profilePhotoOptions(doc.data().url);
                        });
                    
                    });
                } catch (error) {
                    console.error("Erro ao exibir as fotos de perfil:", error);
                }
            } else {
                console.error("Usuário não autenticado.");
            }
        };
        window.updateProfilePhoto = function updateProfilePhoto(value_update) {
            let user = auth.currentUser;
            if (user) {
             let documentRef = doc(db, "users", user.uid);
         
              let dataToUpdate = {
                  profile_picture: value_update
              };
      
              updateDoc(documentRef, dataToUpdate).then(() => {
                  profilePhotoOptions();
              })
              .catch((error) => {
                  console.error("Erro ao atualizar documento:", error);
              });
            } else {
              console.log('Usuario não está logado')
            }
        }
        
       window.smartCast = function smartCast(value_update, type) {
            let user = auth.currentUser;
            if (user) {
             let documentRef = doc(db, "users", user.uid);
         
              let dataToUpdate = {
                  urlCast: value_update,
                  typeCast: type
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
      //==== DELETE MOVIE FROM LIST ====
        window.deleteMovieDocument = async function deleteMovieDocument(documentId) {
          try {
              const docRef = doc(db, "users", auth.currentUser.uid, "movieSave", `${documentId}`);
              await deleteDoc(docRef);
              check_if_still_saved();
          } catch (error) {
              console.error("Erro ao excluir o documento do filme:", error);
          }
        }

        
        function clearDisplay() {
          document.querySelector("#library .library-slides").innerHTML = "";
        }
        function clearDisplayPublicData() {
            let all = document.querySelectorAll('.dataPublic_dynamic');
            all.forEach(all=> all.innerHTML = "");
        }

        
        function no_movies(argument) {
          if (argument == false) {
            document.querySelector("#library .no-movies").classList.add('active');
          } else {
            document.querySelector("#library .no-movies").classList.remove('active');
          }
        }
        
       	displayMovieIds();
        profilePhotoOptions();
    } else {
        window.location.href = "/src/app/html/auth.html";
    }
});
