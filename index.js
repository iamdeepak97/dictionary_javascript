const inputEl = document.getElementById("input");
const infoTextEl = document.getElementById("info-text");
const meaningcontainerEl = document.getElementById("meaning-container");
const titleEl = document.getElementById("title");
const meaningEl = document.getElementById("meaning");
const audioEl = document.getElementById("audio");

async function fetchAPI(Word) {
  try {
    infoTextEl.style.display = "block";
    meaningcontainerEl.style.display = "none";
    infoTextEl.innerText = `Searching the meaning of "${Word}`;
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${Word}`;
    const result = await fetch(url).then((res) => res.json());

    if (result.title) {
      meaningcontainerEl.style.display = "none";
      infoTextEl.style.display = "block";
      titleEl.innerText = word;
      meaningEl.innerText = "N/A";
      audioEl.style.display = "none";
    } else {
      infoTextEl.style.display = "none";
      meaningcontainerEl.style.display = "block";
      audioEl.style.display = "inline-flex";

      titleEl.innerText = result[0].word;
      meaningEl.innerText = result[0].meanings[0].definitions[0].definition;
      audioEl.src = result[0].phonetics[0].audio;
    }
  } catch (error) {
    console.log(error);
    infoTextEl.innerText =
      "No word Found! An error happened,try again later or check your internet connectivity!";
  }
}

inputEl.addEventListener("keyup", (e) => {
  if (e.target.value && e.key === "Enter") fetchAPI(e.target.value);
});
