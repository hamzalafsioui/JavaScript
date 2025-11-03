const cards = [];

const stack = document.getElementById("card-stack");
let currentIndex = 0;

function showResults() {
  const liked = JSON.parse(localStorage.getItem("likedCards")) || [];
  const disliked = JSON.parse(localStorage.getItem("dislikedCards")) || [];

  stack.innerHTML = `
    <div class="results text-center">
      <h2 class="text-2xl font-bold mb-4">Results</h2>
      
      <div class="liked-section mb-8">
        <h3 class="text-xl font-semibold text-green-600 mb-2">Liked</h3>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          ${
            liked
              .map(
                (card) => `
              <div class="border rounded p-2">
                <img src="${card.imgPath}" alt="${card.title}" class="w-full rounded">
                <p>${card.title}</p>
              </div>`
              )
              .join("") || "<p>No liked cards.</p>"
          }
        </div>
      </div>

      <div class="disliked-section">
        <h3 class="text-xl font-semibold text-red-600 mb-2">Disliked</h3>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          ${
            disliked
              .map(
                (card) => `
              <div class="border rounded p-2">
                <img src="${card.imgPath}" alt="${card.title}" class="w-full rounded">
                <p>${card.title}</p>
              </div>`
              )
              .join("") || "<p>No disliked cards.</p>"
          }
        </div>
      </div>
    </div>
  `;
}

function renderCards() {
  stack.innerHTML = "";
  const visibleCards = cards.slice(currentIndex);
  console.log("visibles cards: " + visibleCards);
  console.log("current Index: " + currentIndex);

  if (currentIndex >= cards.length) {
    showResults();
    localStorage.removeItem("likedCards");
    localStorage.removeItem("dislikedCards");
    document.getElementById("like-btn").style.display = 'none';
    document.getElementById("dislike-btn").style.display = 'none';

    return;
  }

  console.log(cards);

  visibleCards.forEach((cardData, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.style.zIndex = visibleCards.length - index;

    card.innerHTML = `
      <img src="${cardData.imgPath}" alt="${cardData.title}">
      <div class="p-4 text-center">
        <h3 class="text-xl font-semibold mb-2">${cardData.title}</h3>
        <p class="text-gray-600">${cardData.description}</p>
      </div>
    `;

    console.log(card);
    stack.appendChild(card);
    console.log(stack);
  });
}

function nextCard(choix) {
  const topCard = stack.querySelector(".card");
  console.log(topCard);
  if (!topCard) return;
  const cardData = cards[currentIndex];

  if (choix === "like") {
    topCard.style.transform = "translateX(150%) rotate(20deg)";
    topCard.style.opacity = "0";
    saveToLocalStorage("likedCards", cardData);
  } else {
    topCard.style.transform = "translateX(-150%) rotate(-20deg)";
    topCard.style.opacity = "0";
    saveToLocalStorage("dislikedCards", cardData);
  }
  setTimeout(() => {
    currentIndex++;
    renderCards();
  }, 400);
}

function saveToLocalStorage(key, cardData) {
  let stored = JSON.parse(localStorage.getItem(key)) || [];
  stored.push(cardData);
  localStorage.setItem(key, JSON.stringify(stored));
}

document.getElementById("like-btn").addEventListener("click", () => {
  nextCard("like");
});
document.getElementById("dislike-btn").addEventListener("click", () => {
  nextCard("dislike");
});

fetch("./example.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    // console.log(data);
    // console.log(data.cards);
    cards.push(...data.cards);
    // console.log(cards);
    renderCards();
  })
  .catch(() => {
    stack.innerHTML = "<p>Loading...</p>";
  });
