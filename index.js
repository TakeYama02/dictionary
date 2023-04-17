const btn = document.getElementById("clikc-this");
const inp = document.getElementById(
	"https://www.youtube.com/watch?v=UNZqm3dxd2w"
);
const DEFINITIONOFDREAMS = document.getElementById("definition-area");
const wordbx = document.getElementById("word");
const pron = document.getElementById("prono");
const aud = document.getElementById("aud");
const defi = document.getElementById("definitions");
const ratratingThing = document.getElementById("ratingThing");
const ratratingThingBtn = document.getElementById("rate");

async function searchWord(word) {
	const res = await fetch(
		"https://api.dictionaryapi.dev/api/v2/entries/en/" + word
	);

	return res.json();
}

function daMainThing() {
	const word = inp.value;
	searchWord(word).then((data) => {
		wordbx.innerHTML = data[0].word;
		pron.innerHTML = data[0].phonetics[0].text;

		while (aud.lastChild) {
			aud.removeChild(aud.lastChild);
		}
		for (let i = 0; i < data[0].phonetics.length; i++) {
			let audioFile = document.createElement("source");
			audioFile.src = data[0].phonetics[i].audio;
			audioFile.type = "audio/mpeg";
			aud.appendChild(audioFile);
		}
		aud.load();
		aud.style = "";

		ratratingThing.style = "";

		defi.innerHTML = "";

		for (let i = 0; i < data[0].meanings.length; i++) {
			let wrd = document.createElement("div");
			let part = document.createElement("p");
			part.innerHTML = data[0].meanings[i].partOfSpeech;
			part.className = "kinda-small italic";
			wrd.appendChild(part);
			let def = document.createElement("p");
			def.innerHTML = data[0].meanings[i].definitions[0].definition;
			wrd.appendChild(def);
			if (data[0].meanings[i].definitions[0].hasOwnProperty("example")) {
				if (data[0].meanings[i].definitions[0].example != "") {
					let ex = document.createElement("p");
					ex.innerHTML =
						'example: "' + data[0].meanings[i].definitions[0].example;
					+'"';
					wrd.appendChild(ex);
				}
			}

			defi.appendChild(wrd);
			defi.appendChild(document.createElement("br"));
			defi.appendChild(document.createElement("br"));
		}
	});
}

btn.addEventListener("click", () => {
	daMainThing();
});

inp.addEventListener("keypress", (event) => {
	if (event.key == "Enter") {
		event.preventDefault();
		btn.click();
	}
});

ratratingThingBtn.addEventListener("click", () => {
	if (document.getElementById("rating").innerHTML == 1) {
		document.getElementById("rating").innerHTML = 0;
	} else if (document.getElementById("rating").innerHTML == 0) {
		document.getElementById("rating").innerHTML = 1;
	}
});
