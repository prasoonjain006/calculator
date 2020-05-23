// Main Class 
class Calculator{
    constructor(prevElement,currElement){
        this.prevElement=prevElement;
        this.currElement=currElement;
        this.clear();
    }

    // this will clear the text area
    clear(){
        this.prevOperand='';
        this.currOperand='';
        this.operation='';

    }

    // this will delete the last entered number
    delete(){
        this.currOperand=this.currOperand.toString().slice(0,-1);

    }

    // this will add all the numbers one after another 
    appendNumber(number){
        if(number==='.'  && this.currOperand.includes('.'))          // limit the '.' to be entered only once
            return;
        this.currOperand= this.currOperand.toString()  + number.toString();
    }

    // choosing the operation as entered by user and ,
    //shifting the first number above, creating space for second
    chooseOperation(operation){
        if(this.currOperand==='')
            return;
        if(this.prevOperand!=='')
            this.compute();
        this.operation=operation;
        this.prevOperand=this.currOperand;
        this.currOperand='';
    }

    //this will do all the calculation
    compute(){
        let result
        const curr =parseFloat(this.currOperand);
        const prev =parseFloat(this.prevOperand);
        if(isNaN(prev)  || isNaN(curr))
            return;
        switch(this.operation){
            case '+':
                result=prev + curr;
                break;
            case '-':
                result=prev-curr;
                break;
            case '*':
            result=prev*curr;
            break;
            case '÷':
                result=prev/curr;
                break;
            default:
                return;
        }
        this.currOperand=result;
        this.operation=undefined;
        this.prevOperand='';
    }

    //to display the number in correct format i.e including ',' 
    //by dividing it in two parts
    getDisplayNum(number){
        const stringNum=number.toString();
        const intNum = parseFloat(stringNum.split('.')[0]);                 //first part:-before decimal
        const decimalDigits =stringNum.split('.')[1];                       //second part:-after decimal
        let integerDisplay
        
        if(isNaN(intNum)) {                                                 
            integerDisplay='';
        } else {
            integerDisplay =intNum.toLocaleString('en',{ maximumFractionDigits:0})     // main function to add ','
        }
        if(decimalDigits!=null){
            return `${integerDisplay}.${decimalDigits}`;                            //add two parts together
        } else{
            return integerDisplay;
        }
        
    }

    // to display the entered number and output on the screen
    updateDisplay(){                        
        this.currElement.innerText = this.getDisplayNum(this.currOperand);
        if(this.operation!=null){
            this.prevElement.innerText= `${this.getDisplayNum(this.prevOperand)} ${this.operation}`;
        }else{
            this.prevElement.innerText='';
        }
        
    }
    
}


//declaring variables 
const numButtons =document.querySelectorAll("[data-number]");           //all buttons of numbers 
const operButtons =document.querySelectorAll("[data-operation]");       // buttons of operator
const equalButton =document.querySelector("[data-equal]");              //equal button
const delButton =document.querySelector("[data-delete]");               //delete button
const acButton = document.querySelector("[data-allClear]");             //AC all clear button
const prevElement = document.querySelector("[data-previous]");          //text area of the first number entered
const currElement = document.querySelector("[data-current]");           //text area of other number

// creating object of class calculator 
const calculator = new Calculator(prevElement,currElement);


// adding events to the number button
numButtons.forEach(button => {
    button.addEventListener('click',()=> {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})


// adding events to operator buttons
operButtons.forEach(button => {
    button.addEventListener('click',()=> {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})
//adding function to equal button
equalButton.addEventListener('click',button =>{
    calculator.compute();
    calculator.updateDisplay();
})

//adding function to All-Clear (AC) button
acButton.addEventListener("click",button =>{
    calculator.clear();
    calculator.updateDisplay();
})
//adding function to delete button
delButton.addEventListener("click",button =>{
    calculator.delete();
    calculator.updateDisplay();
})
