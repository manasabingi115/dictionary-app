import "./styles.css";

var url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

var input = document.getElementById("searchBox");
var result = document.getElementById("result");
var para = document.getElementById("para");
var audio;

input.addEventListener("keyup", (event) => {
  let inWord = input.value;

  if (event.keyCode === 13) {
    console.log("Enter key is pressed");
    para.innerHTML = `<p id="searching-para">searching for ${inWord}...</p>`;
    fetch(`${url}${inWord}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        audio = new Audio("https:" + data[0].phonetics[0].audio);

        result.innerHTML = `
    <div id="mainWord">
  <span><h2>${inWord}</h2><span id="phonetic">${data[0].meanings[0].partOfSpeech}:  /${data[0].phonetic}/</span></span>
  <i class= 'fas fa-volume-up' id="audio"></i>
</div><br>
<div id="words">
    <div>
      <h3>Meaning:</h3>
      <span>${data[0].meanings[0].definitions[0].definition}</span>
    </div><br>
    <div>
      <h3>Example:</h3>
      <span>${data[0].meanings[0].definitions[0].example}</span>
    </div><br>
    <div>
      <h3>Origin:</h3>
      <span id ="lastWord">${data[0].origin}</span>
    </div>
</div>`;
        para.innerHTML = "";
        document.getElementById("audio").addEventListener("click", function () {
          audio.play();
        });
      });
  }
});

document.querySelector("#cut").addEventListener("click", function () {
  document.getElementById("searchBox").value = "";
});
