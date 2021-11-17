// TODO: Autocomplete the input with AJAX calls.
const container = document.querySelector("#container");
const search = document.querySelector("#search");
const results = document.querySelector("#results");
const random = "https://random-word-api.herokuapp.com/word";
const url = (word) => { return `https://wagon-dictionary.herokuapp.com/autocomplete/${word}`; };
const row = (word) => { return `<li>${word}</li>`; };

const find = () => {
  results.style.filter = "blur(8px)";
  results.style.opacity = 0;
  fetch(url(search.value)).then(r => r.json()).then((d) => {
    results.innerHTML = "";
    d.words.forEach((word, index) => {
      results.insertAdjacentHTML("beforeend", row(word));
    });
    results.style.filter = "blur(0px)";
    results.style.opacity = 1;
  });
};

search.style.opacity = 1;
container.style.width = "50vh";

setTimeout(() => {
  search.focus();
  fetch(random).then(r => r.json()).then((d) => {
    const w = d[0];
    [...w.substr(0, w.length / 2)].forEach((letter, index) => {
      setTimeout(() => {
        search.value += letter;
        find();
      }, index * 700);
    });
  });
}, 1000);


search.addEventListener("input", () => find());
