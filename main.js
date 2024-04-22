let posts = JSON.parse(localStorage.getItem('posts')) || [
  { title: "DevinAI - Votre Guide Vers l'Avenir Numérique", date: "2024 AVR 15", categorie: "Technology", content: "DevinAI est bien plus qu'un simple programme informatique, c'est votre allié pour naviguer dans le monde complexe de la technologie. Doté d'une intelligence artificielle avancée, DevinAI utilise des algorithmes de pointe pour anticiper vos besoins et vous fournir des solutions avant même que vous ne les demandiez. Que vous cherchiez à optimiser votre entreprise, à explorer de nouvelles opportunités ou à résoudre des défis techniques, DevinAI est là pour vous guider à chaque étape du chemin. Avec DevinAI à vos côtés, l'avenir numérique n'est plus une énigme, mais une source infinie de possibilités à explorer.", image: "divin.png" },
  { title: "La Mangouste, Chasseur Agile des Tropiques", date: "2024 AVR 12", categorie: "Culture", content: "La mangouste, avec sa silhouette élancée et son pelage d'un brun roux tacheté, est un prédateur redoutable des régions tropicales. Agile et rapide, elle se faufile habilement à travers la végétation dense à la recherche de proies, utilisant sa vue perçante et son odorat aiguisé pour traquer sa proie. Bien que souvent solitaire, la mangouste peut également chasser en groupe, coordonnant ses mouvements avec une précision remarquable pour submerger des proies plus grandes.", image: "test.jpg" }

];

function savePostsToLocalStorage() {
  localStorage.setItem('posts', JSON.stringify(posts));
}
function getp(){
  const storedp = localStorage.getItem("posts");
  return storedp ? JSON.parse(storedp) : [];
}

function renderPosts() {
  const cardContainer = document.getElementById("cardContainer");
  cardContainer.innerHTML = '';
  posts.forEach(element => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("col-md-12", "custom-card");
    cardDiv.innerHTML = `
      <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
        <div class="col p-4 d-flex flex-column position-static">
          <strong class="d-inline-block mb-2 text-primary">${element.categorie}</strong>
          <h3 class="mb-0">${element.title}</h3>
          <div class="mb-1 text-muted">${element.date}</div>
          <p class="card-text mb-auto">${element.content}</p>
        </div>
        <div class="col-auto d-none d-lg-block">
          <img src="${element.image}" class="bd-placeholder-img" width="400" height="250" />
        </div>
        <div>
          <button type="button" class="btn btn-info" onclick="modifier('${element.title}')">Modifier</button> 
          <button type="button" class="btn btn-danger mt-2" onclick="supprimerArticle('${element.title}')">Supprimer</button>
        </div>
        <div class="input-group mb-3">
        <button id="like-button" class="like-button"
        style="background-color: white; border-color: white white ;"><i id="i"
            class="fa-regular fa-heart"></i></button>
        <input type="text" class="form-control" placeholder="Add comment"
            aria-label="Recipient's username" aria-describedby="button-addon2">
        <button class="btn btn-outline-secondary" type="button" id="button-addon2"><i
                class="fa-regular fa-face-smile" style="color: #000000;"></i></button>
    </div>
        </div>
    `;
    cardContainer.appendChild(cardDiv);
  });
}



function toggleForm() {
  const form = document.getElementById("articleForm");
  form.style.display = form.style.display === "none" ? "block" : "none";
}

function ajouterPost() {
  const title = document.getElementById('title').value;
  const date = document.getElementById('date').value;
  const category = document.getElementById('categorie').value;
  const content = document.getElementById('content').value;
  const image = document.getElementById('image').value;
  const new_post = { title, date, category, content, image };
  posts.push(new_post);
  savePostsToLocalStorage();
  renderPosts();
  return false;
}

function supprimerArticle(titre) {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];

  let index = -1;
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].title === titre) {
      index = i;
      break;
    }
  }

  if (index !== -1) {
    posts.splice(index, 1);
    localStorage.setItem("posts", JSON.stringify(posts));
    renderPosts();
  } else {
    console.log("L'article n'a pas été trouvé.");
  }

}
function search_post() {
  const searchText = document.getElementById('search_title').value.toLowerCase();
  const cardContainer = document.getElementById("cardContainer");
  cardContainer.innerHTML = '';

  posts.forEach(element => {
    if (element.title.toLowerCase().includes(searchText)) {
      const cardDiv = document.createElement("div");
      cardDiv.classList.add("col-md-12", "custom-card");
      cardDiv.innerHTML = `
        <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
          <div class="col p-4 d-flex flex-column position-static">
            <strong class="d-inline-block mb-2 text-primary">${element.categorie}</strong>
            <h3 class="mb-0">${element.title}</h3>
            <div class="mb-1 text-muted">${element.date}</div>
            <p class="card-text mb-auto">${element.content}</p>
          </div>
          <div class="col-auto d-none d-lg-block"> 
            <img src="${element.image}" class="bd-placeholder-img" width="400" height="250" />
          </div>
          <button type="button" class="btn btn-danger mt-2" onclick="supprimerArticle('${element.title}')">Supprimer</button>
        </div>
      `;
      cardContainer.appendChild(cardDiv);
    }
  });
}



// Get a reference to the like button element and the icon element
const likeButton = document.getElementById("like-button");
// Get all "like" buttons by their class name
const likeButtons = document.querySelectorAll(".like-button");

// Initialize a variable to track the like state for each item
const isLiked = Array.from(likeButtons).fill(false);

// Function to toggle the like state and update the button icon
function toggleLike(index) {
    return function () {
        const likeButton = likeButtons[index];
        const likeIcon = likeButton.querySelector("i");

        if (isLiked[index]) {
            likeIcon.classList.remove("fas");
            likeIcon.classList.add("far");
            likeIcon.style.color = ""; 
        } else {
            likeIcon.classList.remove("far");
            likeIcon.classList.add("fas");
            likeIcon.style.color = "#ff0000";
        }
        isLiked[index] = !isLiked[index];
    };
}

likeButtons.forEach((button, index) => {
    button.addEventListener("click", toggleLike(index));
});
function modifier(titre) {
  const index = posts.findIndex(post => post.title === titre);
  
  if (index !== -1) {
    const title = prompt("Nouveau titre : ", posts[index].title);
    const date = prompt("Nouvelle date : ", posts[index].date);
    const category = prompt("Nouvelle catégorie : ", posts[index].categorie);
    const content = prompt("Nouveau contenu : ", posts[index].content);
    const image = prompt("Nouvelle image : ", posts[index].image);
    
    posts[index] = { title, date, category, content, image };
    
    localStorage.setItem('posts', JSON.stringify(posts));
    renderPosts();
  } else {
    console.log("L'article n'a pas été trouvé.");
  }
}

renderPosts();

