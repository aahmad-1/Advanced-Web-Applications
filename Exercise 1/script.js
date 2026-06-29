const breeds = ["Akita", "Beagle", "Malamute", "Pug", "Shiba"];

async function getImage(breed) {
  const imageRes = await fetch(`https://dog.ceo/api/breed/${breed.toLowerCase()}/images/random`);
  const imageData = await imageRes.json(); // no letters in the breed can be capital here for some reason
  return imageData.message;
}

async function getWikiText(breed) {
  const textRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${breed}`);
  const textData = await textRes.json(); // letters here can be uppercase or lowercase
  return textData.extract;
}

async function createWikiItem(breed) {
  const [imgURL, wikiText] = await Promise.all([getImage(breed), getWikiText(breed)]);

  const item = document.createElement("div");
  item.className = "wiki-item";

  const header = document.createElement("h1");
  header.className = "wiki-header";
  header.textContent = breed;

  const content = document.createElement("div");
  content.className = "wiki-content";

  const p = document.createElement("p");
  p.className = "wiki-text";
  p.textContent = wikiText;

  const imgContainer = document.createElement("div");
  imgContainer.className = "img-container";

  const img = document.createElement("img");
  img.className = "wiki-img";
  img.src = imgURL;

  imgContainer.appendChild(img);
  content.appendChild(imgContainer);
  content.appendChild(p);
  item.appendChild(header);
  item.appendChild(content);

  return item;
}

async function start() {
  const container = document.querySelector(".container");
  for (const breed of breeds) {
    const item = await createWikiItem(breed);
    container.appendChild(item);
  }
}

start();

/* testing stuff
const imageRes = await fetch(`https://dog.ceo/api/breed/akita/images/random`);
const imageData = await imageRes.json();
console.log(imageData)

the breed in this url CANT start with capital

console.log('')
console.log('')

const textRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/akita`);
const textData = await textRes.json();
console.log(textData);

breed here can start with capital

*/