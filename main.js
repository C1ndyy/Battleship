//---------------------------State Variables-------------------------//
let myArray = createEmptyArray();
let compArray = createEmptyArray();
const shipsSizes = [5,4,3,3,2,2];

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
            parentDivElement.appendChild(div)
        }
    }
}

//returns a 10x10 array of zeroes
function createEmptyArray(){
    let arr=[]
    for (let i=0; i<10; i++){
        row=[]
        for (let j=0; j<10; j++){
            row.push(0) 
        }
        arr.push(row)  
    }
    return arr;
}    

//renders ships in DOM
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

createEmptyGrid("myGrid", myGridDiv); //my DOM Grid

createShips();

render("myGrid")

//render
function render(grid){
    for (let i=0; i<10; i++){
        for (let j=0; j<10; j++){
            //convert index of game state array to an ID - to target the ID of button being rendered
            let cellID = `${grid},${i},${j}`;
            if (myArray[i][j] === 0){
                document.getElementById(cellID).innerHTML = ""; //empty
            }
            if (myArray[i][j] === 1){
                document.getElementById(cellID).innerHTML = "⨉"; //miss
            }
            if (myArray[i][j] === 2){
                document.getElementById(cellID).innerHTML = "▢"; //ship-intact
            }
            if (myArray[i][j] === 3){
                document.getElementById(cellID).innerHTML = "☒"; //ship-hit
            }
        }
    }
}


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

//flips orientation of selected ship
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
    createEmptyGrid("compGrid", compGridDiv) //comp DOM Grid
    compGridDiv.style.display="grid"
    body.classList.remove("page-1-layout")
    body.classList.add("page-2-layout")
}
)
 