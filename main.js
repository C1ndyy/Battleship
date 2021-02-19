//---------------------------State Variables-------------------------//
let myGrid = createEmptyArray();
let enemyGrid = createEmptyArray();
const shipsSizes = [5,4,3,3,2,2];

const ships=[
    {name: "carrier", size: 5},
    {name: "battleship", size: 4},
    {name: "cruiser", size: 3},
    {name: "submarine", size: 3},
    {name: "patrol1", size: 2},
    {name: "patrol2", size: 2}
];

//--------------------------cached variables--------------------------//
const gridDiv=document.getElementById("my-grid");
const shipContainer=document.getElementById("ships-container")

//------------------------------Functions-----------------------------//
//renders an empty 10x10 grid in the DOM
function createEmptyGrid(){
    for (let i=0; i<10; i++){
        for (let j=0; j<10; j++){
            let div = document.createElement("div");
            div.id = `${i},${j}`;
            gridDiv.appendChild(div)
        }
    }
}

//returns a 10x10 array of zeroes
function createEmptyArray(){
    let arr=[]
    let arrayOfTen = [0,0,0,0,0,0,0,0,0,0];
    for (let i=0; i<10; i++){
        arr.push(arrayOfTen)    
    }
    return arr;
}    

//renders ships in DOM
function createShips(){
    ships.forEach(function(element){
        let divContainer = document.createElement("div");
        divContainer.id = element.name;
        shipContainer.appendChild(divContainer)
        for (let i=0; i<element.size; i++){
            let div = document.createElement("div");
            div.classList.add(element.name);
            divContainer.appendChild(div);
        }
    })
}


createEmptyGrid();
createShips();
console.log(ships[2].size)