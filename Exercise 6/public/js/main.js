const offerForm = document.getElementById("offerForm");
const offersContainer = document.getElementById("offersContainer");

// load all offers
async function loadOffers() {

    offersContainer.innerHTML = "";
    const response = await fetch("/offers");
    const offers = await response.json();
    // console.log(offers);

    offers.forEach((offer) => {
        // console.log(offer);

        const offerDiv = document.createElement("div");
        offerDiv.className = "col s12 m6 l4 offerDiv";

        const card = document.createElement("div");
        card.className = "card hoverable";

        const cardImage = document.createElement("div");
        cardImage.className = "card-image";

        if (offer.imagePath) {

            const img = document.createElement("img");
            img.className = "responsive-img";
            img.src = offer.imagePath;

            cardImage.appendChild(img);

        }

        const title = document.createElement("span");
        title.className = "card-title";
        title.textContent = offer.title;

        cardImage.appendChild(title);

        const cardContent = document.createElement("div");
        cardContent.className = "card-content";

        const description = document.createElement("p");
        description.textContent = offer.description;

        const price = document.createElement("p");
        price.textContent = `Price: ${offer.price}€`;

        cardContent.appendChild(description);
        cardContent.appendChild(price);

        card.appendChild(cardImage);
        card.appendChild(cardContent);

        offerDiv.appendChild(card);

        offersContainer.appendChild(offerDiv);

    });

}

// upload offer
offerForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const formData = new FormData(offerForm);

    const response = await fetch("/upload", {
        method: "POST",
        body: formData
    });

    const result = await response.json();
    // console.log(result);
    alert(result.message);

    offerForm.reset();
    loadOffers();
});

loadOffers();