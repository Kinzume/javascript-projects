//https://www.w3schools.com/jsref/met_document_queryselectorall.asp
//https://www.w3schools.com/jsref/met_document_queryselector.asp
//https://www.w3schools.com/cssref/css_selectors.asp
//querySelectorAll can select CSS selectors such as .classes and [attributes]. querySelector is similar to querySelectorAll but only selects the first element
//https://www.w3schools.com/tags/att_global_data.asp
//You can make custom attributes (data-* attributes)

const numBtns=document.querySelectorAll('[data-num]')
const oprBtns=document.querySelectorAll('[data-opr]')
const eqlBtn=document.querySelector('[data-eql]')
const aclBtn=document.querySelector('[data-all-clr]')
const delBtn=document.querySelector('[data-del]')
const preOut=document.querySelector('[data-pre-opd]')
const curOut=document.querySelector('[data-cur-opd]')

//https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/es6/use-class-syntax-to-define-a-constructor-function
//Creating a calculator constructor using class keyword
//https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/object-oriented-programming/make-code-more-reusable-with-the-this-keyword
//https://www.w3schools.com/js/js_this.asp
//https://www.youtube.com/watch?v=5AWRivBk0Gw&ab_channel=WebDevSimplified

//The class is a "blueprint" to making different calculators.
//A new calculator can be created (instanciated) using the new keyword (eg. const myCalculator=new Calculator(...)) that will automatically call the constructor function with the variables passed into Calculator()
//Here, the this keyword is being used in an object method (i.e. constructor method, a special object method)
class Calculator{
    constructor(upperDisplay,lowerDisplay){
        //console.log(upperDisplay)
        //console.log(lowerDisplay)
        this.upper=upperDisplay
        this.lower=lowerDisplay
        this.clear()
    }
    clear(){
        this.currentOperand=''
        this.previousOperand=''
        this.operation=undefined
    }
    delete(){
        //https://www.w3schools.com/jsref/jsref_slice_string.asp
        this.currentOperand=this.currentOperand.toString().slice(0,-1)

    }
    appendNum(number){
        //https://www.w3schools.com/jsref/jsref_includes.asp
        if (number==='.'&&this.currentOperand.includes('.'))return

        //https://www.w3schools.com/jsref/jsref_tostring_number.asp
        //https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/basic-javascript/concatenating-strings-with-plus-operator
        this.currentOperand=this.currentOperand.toString()+number.toString()
    }
    chooseOpr(operation){
        if (this.currentOperand==='')return
        if (this.previousOperand!==''){
            this.compute()
        }
        this.operation=operation
        this.previousOperand=this.currentOperand
        this.currentOperand=''
    }
    compute(){
        //https://www.w3schools.com/jsref/jsref_parsefloat.asp
        //https://www.w3schools.com/jsref/jsref_isnan.asp
        //https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/basic-javascript/selecting-from-many-options-with-switch-statements
        //https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/basic-javascript/adding-a-default-option-in-switch-statements
        let computation
        const prev=parseFloat(this.previousOperand)
        const curr=parseFloat(this.currentOperand)
        if (isNaN(prev)||isNaN(curr))return
        switch(this.operation){
        case '+':
            computation=prev+curr
            break
        case '-':
            computation=prev-curr
            break
        case '*':
            computation=prev*curr
            break
        case '/':
            computation=prev/curr
            break
        default:
            return
        }
        this.currentOperand=computation
        this.operation=undefined
        this.previousOperand=''
    }   
    getDisplayNumber(number){
        //https://www.w3schools.com/jsref/jsref_tolocalestring_number.asp
        //
        const stringNumber=number.toString()
        const integerDigits=parseFloat(stringNumber.split('.')[0])
        const decimalDigits=stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)){
            integerDisplay=''
        }
        else{
            integerDisplay=integerDigits.toLocaleString('en',{
                maximumFractionDigits:0
            })
        }
        if(decimalDigits!=null){
            return `${integerDisplay}.${decimalDigits}`
        }
        else{
            return integerDisplay
        }
    }
    updateDisplay(){
        //https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/es6/create-strings-using-template-literals
        this.lower.innerText=this.getDisplayNumber(this.currentOperand)
        /**/
        if (this.operation!=null){
            this.upper.innerText=`${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }
        else{
            this.upper.innerText=''
        }

    }
}

//Here a new object called myCalculator has been instanciated
//The constructor method will set myCalculator's upperDisplay (this.preOut) to preOut (i.e. the displayTop div) and lowerDisplay (this.curOut) to curOut (i.e. the displayBot div)
//So the this keyword is refering to the myCalculator object
//The constructor will also call the myCalculator object's clear() function
const myCalculator=new Calculator(preOut,curOut)


//https://www.w3schools.com/jsref/jsref_foreach.asp
//Iterate over each number button. A for loop could be used but the forEach method will do the exact same thing
//https://www.w3schools.com/jsref/prop_node_innertext.asp
//Differences between innerText and innerHTML
//Add an event listener to each number button; when it is clicked, myCalculator will call the appendNum method with the button's innerText passed into it
//N.B. When passing parameters into the addEvenListener method, call an anonymous function and pass the parameters inside that function
//https://www.w3schools.com/jsref/met_document_addeventlistener.asp
numBtns.forEach(currentBtn=>{
    //console.log(currentBtn)
    currentBtn.addEventListener('click',()=>{
        myCalculator.appendNum(currentBtn.innerText)
        myCalculator.updateDisplay()
    })
})

oprBtns.forEach(currentBtn=>{
    //console.log(currentBtn)
    currentBtn.addEventListener('click',()=>{
        myCalculator.chooseOpr(currentBtn.innerText)
        myCalculator.updateDisplay()
    })
})

eqlBtn.addEventListener('click',currentBtn=>{
    myCalculator.compute()
    myCalculator.updateDisplay()
})

aclBtn.addEventListener('click',currentBtn=>{
    myCalculator.clear()
    myCalculator.updateDisplay()
})

delBtn.addEventListener('click',currentBtn=>{
    myCalculator.delete()
    myCalculator.updateDisplay()
})