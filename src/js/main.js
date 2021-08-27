//Select ELEMENT
const form = document.querySelector("#form");
const inputField = document.querySelector("#inputField");
const resultWord = document.querySelector("#resultWord");

//AJAX Function 
const getApi = async () => {
    const url = "https://api.datamuse.com/words?";
    const queryPara = "rel_rhy=";
    const wordQuery = inputField.value;
    const endpoint = `${url}${queryPara}${wordQuery}`;
    try {
        const response = await fetch (endpoint);
        if(response.ok) {
            let data = await response.json();
            render(data)
        }
    }
    catch(error) {
        console.log("ERROR: ", error.message)
    }
};

//handle output form
const render = (event) => {
    if (!event) {
        console.log(event.status)
    }
    if (!event.length) {
        return resultWord.innerHTML = `<p>Try again..! <br> Something Went Wrong..</p>`
    }
    if (event) {
        inputField.value = "";
        inputField.blur()
        let wordList = []
        for(let i = 0; i < Math.min(event.length, 10); i++) {
            wordList.push(`<li>${event[i].word}</li>`)
            console.log(event[i].word)
        }
        const wordLists = wordList.join("");
        resultWord.innerHTML = `<p>You might interested in: </p><ol>${wordLists}</ol>`
    }
}
//handle default browser
const displaySearchArea = (event) => {
    event.preventDefault();
    while (resultWord.firstChild) {
        resultWord.removeChild(resultWord.firstChild)
    }
    getApi();
};
form.addEventListener('submit', displaySearchArea);

