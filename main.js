//---------------------------State Variables-------------------------//
let myArray = createEmptyArray();
let compArray = createEmptyArray();
let myTurn = true;
let AIGuessesLeft = generateGuessesArray()

const ships=[
    {name: "carrier", size: 5, color: "rgb(252, 186, 162)"},
    {name: "battleship", size: 4, color: "rgb(130, 191, 248)"},
    {name: "cruiser", size: 3, color: "rgb(184, 241, 161)"},
    {name: "submarine", size: 3, color: "rgb(200, 169, 236)"},
    {name: "patrol1", size: 2, color: "rgb(248, 221, 130)"},
    {name: "patrol2", size: 2, color: "rgb(248, 221, 130)"}
];

//--------------------------cached variables--------------------------//
const body=document.querySelector("body");
const myGridDiv=document.getElementById("my-grid");
const compGridDiv=document.getElementById("comp-grid");
const shipContainer=document.getElementById("ships-container");
let startButton=document.getElementById("start-button");
let selectedShip=document.querySelector(".selected");

//------------------------------Functions-----------------------------//
//renders an empty 10x10 grid in the DOM
function createEmptyGrid(id, parentDivElement){
    for (let i=0; i<10; i++){
        for (let j=0; j<10; j++){
            let div = document.createElement("div");
            div.id = `${id},${i},${j}`;
            parentDivElement.appendChild(div);
        }
    }
}

//returns a 10x10 array of zeroes
function createEmptyArray(){
    let arr=[];
    for (let i=0; i<10; i++){
        row=[];
        for (let j=0; j<10; j++){
            row.push(0); 
        }
        arr.push(row);  
    }
    return arr;
}    

//renders ships in DOM for user placement on grid on starting page
function createShips(){
    ships.forEach(function(element){
        let divContainer = document.createElement("div");
        divContainer.id = element.name;
        divContainer.classList.add("ship");
        shipContainer.appendChild(divContainer)
        for (let i=0; i<element.size; i++){
            let div = document.createElement("div");
            div.classList.add(element.name);
            divContainer.appendChild(div);
        }
    })
}

//generate random ship locations
function generateRandomShipLocations(){
    let axis = 1;   // 1 = vertical, -1 = horizantal
    ships.forEach(function(ship){
        let shipPlaced = false;
        while (shipPlaced == false){
            let x = Math.floor(Math.random() * 10);
            let y = Math.floor(Math.random() * 10);
            if (checkFit(x,y,ship.size,axis) == true){
                // console.log(x,y,ship.size,axis)
                placeShip(x,y,ship.size,axis);
                shipPlaced = true;
                axis *= -1;
            }
        }    
    })
}

//generateRandomShipLocations will use this function to check if generating ship in this location will conflict with existing ships or extend past board
function checkFit(x,y,shipLength,axis){
    //for vertical ship
    if (axis === 1){
        for(i=0; i<shipLength; i++){
            if (x+i > 9) return false;
            if (compArray[x+i][y] != 0) return false;
        }
    }
    //for horizantal ships    
    if (axis === -1){
        for(i=0; i<shipLength; i++){
            if (y+i > 9) return false;
            if (compArray[x][y+i] != 0) return false;
        }
    }
    return true;
}

//after confirming fit, generateRandomShipLocations will use this function to update game state array
function placeShip(x,y,shipLength,axis){
    if (axis === 1){
        for(i=0; i<shipLength; i++){
            compArray[x+i][y] = 2
        }
    }    
    if (axis === -1){
        for(i=0; i<shipLength; i++){
            compArray[x][y+i] = 2
        }
    }
}

//check hit - updates game state array and returns true or false - does not work on already clicked cells
function checkHit(array,x,y){
    //if empty (0) update game state array to miss (1)
    if (array[x][y] === 0){
        array[x][y] = 1;
        return false;
    }
    //if cell has ship (2) update game state array to hit (3)
    else if (array[x][y] === 2){
        array[x][y] = 3;
        return true;
    }
}

//check win - returns true if no hidden ships remain in array
function checkWin(array){
    for (let i = 0; i < 10; i++){
        for (let j = 0; j < 10; j++){
            if (array[i][j] === 2) return false;
        }

    }
    alert("GAME OVER")
    return true;
}

//AI launch attach--> TODO: Hard Mode
function generateAIGuess(){
    // console.log(AIGuessesLeft)
    return AIGuessesLeft.pop()
}

//creates a shuffled array of all possible guesses
function generateGuessesArray(){
    let arr=[]
    for (let i=0; i<10; i++){
        for (let j=0; j<10; j++){
            arr.push([i,j])
        }
    }
    //Fisher-Yates shuffle algorithm below taken from 'The Art of Computer Programming' by Donald E. Knuth
    for (let i=arr.length-1; i>0; i--){
      let j= Math.floor(Math.random() * i)
      let temp = arr[i]
      arr[i] = arr[j]
      arr[j] = temp
    }
    return arr;
}

createEmptyGrid("myArray", myGridDiv); //my DOM Grid
createEmptyGrid("compArray", compGridDiv) //comp DOM Grid
createShips();

console.log(compArray)

//render
function render(){
    for (let i=0; i<10; i++){
        for (let j=0; j<10; j++){
            //convert index of game state array to an ID - to target the ID of button being rendered
            let cellID = `${i},${j}`;
            //render of player grid
            if (myArray[i][j] === 0){
                document.getElementById(`myArray,${cellID}`).innerHTML = ""; //empty
            }
            if (myArray[i][j] === 1){
                document.getElementById(`myArray,${cellID}`).innerHTML = "⨉"; //miss
            }
            if (myArray[i][j] === 2){
                document.getElementById(`myArray,${cellID}`).innerHTML = "▢"; //ship-intact
            }
            if (myArray[i][j] === 3){
                document.getElementById(`myArray,${cellID}`).innerHTML = "☒"; //ship-hit
            }
            //render of computer grid
            if (compArray[i][j] === 0){
                document.getElementById(`compArray,${cellID}`).innerHTML = ""; //empty
            }
            if (compArray[i][j] === 1){
                document.getElementById(`compArray,${cellID}`).innerHTML = "⨉"; //miss
            }           
            if (compArray[i][j] === 2){
                document.getElementById(`compArray,${cellID}`).innerHTML = ""; //ship-intact-hidden
            }
            if (compArray[i][j] === 3){
                document.getElementById(`compArray,${cellID}`).innerHTML = "☒"; //ship-hit
            }
        }
    }
}

//TESTING STUFF- REMOVE LATER
myArray[0][0]=2
myArray[0][1]=2
myArray[0][2]=2
myArray[0][3]=2
myArray[0][4]=2
myArray[0][5]=2
myArray[0][6]=2
myArray[0][7]=2
myArray[0][8]=2
myArray[0][9]=2



//------------------------------Event Listeners-----------------------------//

//Select Ship
shipContainer.addEventListener("click", function(evt){
    let clickedShip = evt.target.parentElement
    if (clickedShip.classList.contains("selected")) clickedShip.classList.toggle("selected");
    else {
        let allShips = document.querySelectorAll(".ship");
        allShips.forEach(function(ship){
            ship.classList.remove("selected");
        })
        if (clickedShip.classList.contains("ship")){
            clickedShip.classList.toggle("selected");
        }
    }
})

//flips axis of selected ship
document.addEventListener('keyup', function(e){
    let clickedship = document.querySelector('.selected');
    clickedship.classList.toggle("horizantal");
});

//Place ship on Grid
// myGridDiv.addEventListener("click", function(e){
//     console.log(selectedShip.id)

// })

//Clears Starting Page
startButton.addEventListener("click", function(e){
    shipContainer.style.display="none";
    startButton.style.display="none";
    compGridDiv.style.display="grid"
    body.classList.remove("page-1-layout")
    body.classList.add("page-2-layout")
    generateRandomShipLocations()
}
)

compGridDiv.addEventListener("click", function(e){

    let clickedCell = e.target.id.split(",");
    checkHit(compArray, Number(clickedCell[1]), Number(clickedCell[2]))
    render()
    checkWin(compArray)
    myTurn = false


    let AIGuess = generateAIGuess()
    checkHit(myArray, AIGuess[0], AIGuess[1])
    render()
    checkWin(myArray)
    myTurn = true
})
