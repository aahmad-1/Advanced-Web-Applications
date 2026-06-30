async function getImage(breed) {
    const imageRes = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
    const imageData = await imageRes.json();

    return {
        imageURL: imageData.message,
        breedFromURL: imageData.message.split('/breeds/')[1].split('/')[0]
    }
}

async function getWikiText(breed) {
    const wikiRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${breed}`)
    const wikiData = await wikiRes.json();

    if (wikiData.extract) {
        return wikiData.extract
    }

    return "No data about the dog available"

}

async function createWikiItem(breed) {
    let {imageURL, breedFromURL} = await getImage(breed);
    let breedName, breedWiki;

    if (breedFromURL.includes('-')){
        breedWiki = breedFromURL
            .split('-')
            .reverse()
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join('_') //holy shititttt
        breedName = breedWiki.split('_').join(' ');
    } else {
        breedWiki = breedFromURL;
        breedName = breedFromURL.charAt(0).toUpperCase() + breedFromURL.slice(1)
    }

    const wikiText = await getWikiText(breedWiki);

    const wiki_item = document.createElement("div");
    wiki_item.className = "wiki-item";

    const wiki_header = document.createElement("h1");
    wiki_header.className = "wiki-header";
    wiki_header.textContent = breedName;

    const wiki_content = document.createElement("div");
    wiki_content.className = "wiki-content";


    const wiki_text = document.createElement("div");
    wiki_text.className = "wiki-text";
    wiki_text.textContent = wikiText;

    const img_container = document.createElement("div");
    img_container.className = "img-container";

    const wiki_img = document.createElement("img");
    wiki_img.className = "wiki-img";
    wiki_img.src = imageURL

    img_container.appendChild(wiki_img);
    wiki_content.append(img_container, wiki_text);
    wiki_item.append(wiki_header, wiki_content)

    return wiki_item;

}

async function getDogs() {
    const breedsRes = await fetch(`https://dog.ceo/api/breeds/list/all`);
    const breedsData = await breedsRes.json();
    const breeds = Object.keys(breedsData.message);

    return breeds;

}

async function initializedCode() {
    const container = document.querySelector(".container");

    try {
        const breeds = await getDogs();

        for (let i = 0; i < 5; i++) {
            const random = Math.floor(Math.random() * breeds.length);
            const dog = breeds[random];

            const item = await createWikiItem(dog);
            container.appendChild(item);
        }
    } catch (e) {
        console.error("initializedCode failed:", e);
    }
}

initializedCode();




// tested stuff below, not deleting for archive purposes

// const breedsRes = await fetch(`https://dog.ceo/api/breeds/list/all`);
// const breedsData = await breedsRes.json();
// const breeds = Object.keys(breedsData.message);
// const length = breeds.length;
// console.log(Math.floor(Math.random() * length)) // random int from 0-107
// const random = Math.floor(Math.random() * length);
// const dog = breeds[random]
// console.log(dog)
// console.log(length);

// console.log('')


// const imageRes = await fetch(`https://dog.ceo/api/breed/${dog}/images/random`);
// const imageData = await imageRes.json();
// console.log(imageData)
// const imageURL = imageData.message;
// console.log(`imageURL: ${imageURL}`)

// const breedFromURL = imageURL.split('/breeds/')[1].split('/')[0];
// console.log(`breedFromURL: ${breedFromURL}`);
// let breedName;
// let breedWiki;
// if (breedFromURL.includes('-')) {
//     breedWiki = breedFromURL
//         .split('-')
//         .reverse()
//         .map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('_') //holyyy shitttt
//     console.log(`breedWiki: ${breedWiki}`);

//     let breedName = breedWiki.split('_').join(" ");
//     console.log(`breedName: ${breedName}`);
// } else {
//     breedWiki = breedFromURL;
//     console.log(`breedWiki: ${breedWiki}`);
//     breedName = breedFromURL.charAt(0).toUpperCase() + breedFromURL.slice(1)
//     console.log(`breedName: ${breedName}`);
// }

// let wikiText;

// try {
//     const textRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${breedWiki}`)
//     const textData = await textRes.json();
//     if (textData.extract) {
//         wikiText = textData.extract;
//         console.log(`wikiText: ${wikiText}`)
//     } else {
//         wikiText = "No data about the dog available.";
//         console.log(`wikiText: ${wikiText}`)
//     }
// } catch (e) {
//     console.log(e);
// }