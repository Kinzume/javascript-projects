const number=document.getElementsByClassName("num"); //Store the number clicked as a variable
const operation=document.getElementsByClassName("op");
//console.log(operation[0])
const dispBot=document.getElementById("displayBot"); //Store the current number input as a variable
let dispTop=document.getElementById("displayTop") //Store the current number and current operation as a variable
const output=[]; //Store the numbers and operations clicked in an array


for (let i=0;i<number.length;i++){
    //Add event listeners for each number for when the user clicks on the number
    number[i].addEventListener("click", newNumber);
}
function newNumber(){
    // Displays the number clicked on the display and adds the number to the output array
   //console.log(this.childNodes[0]) //this refers to the HTML element that received the event (i.e. the button)
   dispBot.innerHTML+=this.childNodes[0].nodeValue
   output.push(this.childNodes[0].nodeValue)
   //console.log(dispBot)
}
/**/

for (let i=0;i<operation.length;i++){
    //Add event listeners for each operation for when the user clicks on the operation
    operation[i].addEventListener("click", newOperation);
}

function newOperation(_click){
    //console.log(this.childNodes)
    
    if(output[output.length-1]==this.childNodes[0].nodeValue){
        //console.log(_click.target.innerHTML==output[output.length-1])
        //console.log("already pressed")
        //console.log("output is now:"+ output)
    }
    else {
        dispTop.innerHTML=dispBot.innerHTML;
        dispTop.innerHTML+=this.childNodes[0].nodeValue;
        dispBot.innerHTML="";
        output.push(this.childNodes[0].nodeValue);
        console.log(output)
    }
}

const cancelEverything=document.getElementById("cancelEvery");
cancelEverything.addEventListener("click",cancelEveryth);
function cancelEveryth(){
    disp.innerHTML="";
    output.splice(0);
}
