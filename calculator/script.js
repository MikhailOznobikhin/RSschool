class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement;
      this.currentOperandTextElement = currentOperandTextElement;
      this.readyToReset = false;
      this.clear();
    }
  
    clear() {
      this.currentOperand = '';
      this.previousOperand = '';
      this.operation = undefined;
    }
  
    delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
  
    appendNumber(number) {
      if (number === '.' && this.currentOperand.includes('.')) return;
      this.currentOperand = this.currentOperand.toString() + number.toString();
    }
  
    chooseOperation(operation) {
        if(operation === 'โ'){
            this.operation = 'โ'
            this.compute();
        }
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '' && this.previousOperand !== '') {
            this.compute();  
        }
      this.operation = operation;
      this.previousOperand = this.currentOperand;
      this.currentOperand = '';
    }
  
    compute() {
      let computation;
      const prev = parseFloat(this.previousOperand);
      const current = parseFloat(this.currentOperand);
      
      if (this.operation === 'โ'){
        if(current < 0){alert('Error'); calculator.clear()}
        else{
        computation = Math.sqrt(current);
        this.readyToReset = true;
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
        }
      }

      if (isNaN(prev) || isNaN(current)) return;
      switch (this.operation) {
        case '+':
            computation = (prev*100 + current*100)/100;
            break
        case '-':
            computation = (prev*100 - current*100)/100;
            break
        case '*':
            computation = (prev*100) * (current*100)/(100*100);
            break
        case 'รท':
            computation = prev / current;
            break
        case '^':
            computation = prev ** current;
            break  
        default:
            return;
      }
      this.readyToReset = true;
      this.currentOperand = computation;
      this.operation = undefined;
      this.previousOperand = '';
    }
  
    getDisplayNumber(number) {
      const stringNumber = number.toString()
      const integerDigits = parseFloat(stringNumber.split('.')[0])
      const decimalDigits = stringNumber.split('.')[1]
      let integerDisplay
      if (isNaN(integerDigits)) {
        integerDisplay = ''
      } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
      }
      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
      } else {
        return integerDisplay
      }
    }
  
    updateDisplay(isSubstr = 0) {
      console.log(this.operation)
      if(isSubstr === 1){
        localStorage.setItem('isSubstrL', 1);
      }else{
        this.currentOperandTextElement.innerText =
          this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
          this.previousOperandTextElement.innerText =
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
          this.previousOperandTextElement.innerText = ''
        }
      }
    }
  }
  
  const numberButtons = document.querySelectorAll('[data-number]');
  const operationButtons = document.querySelectorAll('[data-operation]');
  const equalsButton = document.querySelector('[data-equals]');
  const deleteButton = document.querySelector('[data-delete]');
  const allClearButton = document.querySelector('[data-all-clear]');
  const previousOperandTextElement = document.querySelector('[data-previous-operand]');
  const currentOperandTextElement = document.querySelector('[data-current-operand]');
  const substractButton = document.querySelector('[data-substraction]');
 
  const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

  numberButtons.forEach(button => {
    button.addEventListener("click", () => {
  
        if(calculator.previousOperand === "" &&
        calculator.currentOperand !== "" &&
    calculator.readyToReset) {
            calculator.currentOperand = "";
            calculator.readyToReset = false;
        }
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay();
    })
  })
  
  operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText);
      calculator.updateDisplay();
    })
  })
  
  equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
  })
  
  allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
  })
  
  deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
  })

  substractButton.addEventListener('click', button => {
    a = document.querySelector('[data-previous-operand]').innerHTML.split('')
    b = a[a.length -1]
    console.log(b)
    if(
      b !== '+' || b !== '*' || b !== 'รท'|| b !== 'โ'
    ){
      console.log(a)
      console.log('ะฒัะฟ')
      document.querySelector('[data-current-operand]').innerText = '-';
      calculator.currentOperand = '-'
      calculator.updateDisplay(1)
    }
    if(b === '-'){
      document.querySelector('[data-current-operand]').innerText = '';
      calculator.currentOperand = ''
      console.log('ัะฐะฑะพัะฐะน')
    }
  })
