let bombs;
let gameOver = false;
let points = 0;
let clickCounter = 0;
document.getElementById("play-button").addEventListener("click", startGame);

function startGame() {
    const level = parseInt(document.querySelector("select").value);
    let cellsnumbers;
    switch(level) {
        case 1:
            cellsnumbers = 100;
            break;
        case 2:
            cellsnumbers = 81;
            break;
        case 3:
            cellsnumbers = 49;
            break;
        default:
            cellsnumbers = 100;
    }



    // CREARE UNA GRGLIA 10X10 CON NUMERI CASUALI DA 1 A 100

    const numberOfSqaure = cellsnumbers;
    const numbers = generateRandomNumbersArray(numberOfSqaure);
    console.log(numbers);
    

    // Per ogni numero generato genero le caselle della griglia 
    const grid =document.querySelector(".grid");
        grid.innerHTML = "";
    for (let i = 0; i < numbers.length; i++) {
        const currentNumber = numbers[i];
        const newItem = generateGridItem(currentNumber);
        newItem.addEventListener("click", handleItemClick);
        grid.append(newItem);
    }

    // Genero le bombe
    bombs = generateBombs(16, cellsnumbers);
    console.log(bombs);
}


/**
 * bombe
 * @param {number} maxNumber
 * @param {number} numbersQuantity
 * @returns {Array}
*/
function generateBombs(numbersQuantity, maxNumber) {
    const number = [];
    while(number.length < numbersQuantity) {
        const rndNumber = getRndInteger(1, maxNumber)
        if(!number.includes(rndNumber)){
            number.push(rndNumber);
        }
    }
    return number;
}

// Funzione
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
/**
 * Description: Funzione che genera un array con numbersQuantity elementi tra 1 e numbersQuantity senza ripetizioni
 * @param {any} numbersQuantity
 * @returns {any}
*/
function generateRandomNumbersArray(numbersQuantity) {
    const numbersArray = [];

    while(numbersArray.length < numbersQuantity) {
        //Generare un numero
        const rndNumber = getRndInteger(1, numbersQuantity);
        //Se non è presente nell'array pusho il numero
        if (!numbersArray.includes(rndNumber)) {
            numbersArray.push(rndNumber);
        }
    }
    return numbersArray;
}

// DOM related functions
function generateGridItem(text) {
    const newSquare = document.createElement("div")
    newSquare.classList.add("grid-item")
    newSquare.innerHTML = `<span>${text}</span>`;
    return newSquare;
}

// CLICK SE è BOMBA O NO
function handleItemClick() {
    const clickNumber = parseInt(this.textContent);
    if (gameOver === false) {
        if (bombs.includes(clickNumber)) {
            console.log("BOMBAAA");
            this.classList.add("red");
            alert("hai preso la bomba, ma hai totalizzato " + points + " punti");
            gameOver = true;
        } else {
            this.classList.add("cyan");
            points++;
            document.getElementById("points-counter").textContent = `CONTATORE PUNTI: ${points}`;
        }        
    console.log(clickNumber);
    }   
}

