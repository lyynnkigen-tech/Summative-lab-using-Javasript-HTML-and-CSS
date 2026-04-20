const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const wordTitle = document.getElementById('wordTitle');
const definitionDisplay = document.getElementById('definitionDisplay');
const audioPlayer = document.getElementById('audioPlayer');
const synonymsList = document.getElementById('synonymsList');
const sourceLink = document.getElementById('sourceLink');

async function getWord(word){
    try{
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

        if (!response.ok) {
            throw new Error("Word not found");
        }
        const data = await response.json();
        const entry = data[0];

        wordTitle.textContent = entry.word;
        definitionDisplay.textContent = entry.meanings[0].definitions[0].definition;
        
        const audioData = entry.phonetics.find(p => p.audio );
        if (audioData) {
            audioPlayer.src = audioData.audio;
            audioPlayer.style.display = "block";
        } else {
            audioPlayer.style.display = "none"; 
        }
        const synonyms = entry.meanings[0].definitions[0].synonyms || [];
        synonymsList.textContent = synonyms.length > 0 ? synonyms.join(", ") : "None found.";
        sourceLink.href = entry.sourceUrls[0];
    }
    catch (error) {
        wordTitle.textContent = "Error";
        definitionDisplay.textContent = "Sorry, we couldn't find that word. Try another!";
        audioPlayer.style.display = "none";
        synonymsList.textContent = "None";
    }
}
searchForm.addEventListener('submit', (event) => {
    event.preventDefault(); 
    const word = searchInput.value.trim();
    if (word) {
        getWord(word);
    }
});
