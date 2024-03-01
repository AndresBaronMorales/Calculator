export class Calculator{
  #output = "";
  #input = "";
  #valueOne;
  #valueTwo;
  #operation = "";
  #result;
  #iconOperation = "";


  getOperation(){
    return this.#operation;
  }

  actionNumbers(input){
    if(!isNaN(this.#result)) this.#reset();
    
    this.#input += input;
  }

  actionOperations(operation){
    this.#operation = operation;

    if(isNaN(this.#valueOne)){
      this.#valueOne = parseFloat(this.#input);
      this.#input = "";
    }

    if(!isNaN(this.#result)){
      let tempValue = this.#result;
      let tempOperation = this.#operation;
      this.#reset();
      this.#valueOne = tempValue;
      this.#operation = tempOperation;
    }
  }

  actionEqual(){
    this.#valueTwo = parseFloat(this.#input);
    this.#input = "";
    this.#resultOperation();
  }

  actionClear(){
    this.#reset();
  }

  actionDelete(){
    this.#input = this.#input.slice(0, -1);
  }

  setData(output, input){
    if(!isNaN(this.#valueOne) && this.#operation !== "" && isNaN(this.#valueTwo)){
      this.#iconOperationHTML();
      this.#output = `<span>${this.#addComma(this.#valueOne)}</span>${this.#iconOperation}`;
    }

    if(!isNaN(this.#result)){
      this.#iconOperationHTML();
      this.#output = `${this.#addComma(this.#valueOne)}${this.#iconOperation}${this.#addComma(this.#valueTwo)}<i class="fa-solid fa-equals color-800 fs"></i><span class="color-100">${this.#addComma(this.#result)}</span>`;
    }
    
    if(!isNaN(this.#valueOne) && this.#operation === ""){
      this.#output = `${this.#addComma(this.#valueOne)}`;
    } 
    
    output.innerHTML = this.#output;
    input.innerHTML = this.#addComma(this.#input);
  }

  disabledButtons(buttons, bool){
    buttons.forEach(b => b.disabled = bool)
  }
  
  disabledButton(button, bool){
    button.disabled = bool;
  }

  #addComma(string){
    let stringValue = string.toString();
    if(stringValue.indexOf(".") === -1){
      return stringValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }else{
      let numberInt = "";
      let numberFloat = "";

      numberInt = stringValue.split(".")[0];
      numberFloat = stringValue.split(".")[1];

      return `${numberInt.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.${numberFloat}`
    }
  } 

  #resultOperation(){
    switch (this.#operation) {
      case "+":
        this.#result = this.#valueOne + this.#valueTwo;
        break;
      case "-":
        this.#result = this.#valueOne - this.#valueTwo;
        break;
      case "*":
        this.#result = this.#valueOne * this.#valueTwo;
        break;
      case "/":
        this.#result = this.#valueOne / this.#valueTwo;
        break;
      case "%":
        this.#result = this.#valueOne % this.#valueTwo;
        break;
      case "xn":
        this.#result =  this.#valueOne ** this.#valueTwo;
        break;
    }
  }

  #iconOperationHTML(){
    switch (this.#operation) {
      case "+":
        this.#iconOperation = `<i class="fa-solid fa-plus color-800 fs"></i>`;
        break;
      case "-":
        this.#iconOperation = `<i class="fa-solid fa-minus color-800 fs"></i>`;
        break;
      case "*":
        this.#iconOperation = `<i class="fa-solid fa-xmark color-800 fs"></i>`;
        break;
      case "/":
        this.#iconOperation = `<i class="fa-solid fa-divide color-800 fs"></i>`;
        break;
      case "%":
        this.#iconOperation = `<i class="fa-solid fa-percent color-800 fs"></i>`;
        break;
      case "xn":
        this.#iconOperation = `<i class="fa-solid fa-greater-than fa-rotate-270 color-800 fs"></i>`;
        break;
    }
  }

  #reset(){
    this.#output = "";
    this.#input = "";
    this.#valueOne = undefined;
    this.#valueTwo = undefined;
    this.#operation = "";
    this.#result = undefined;
    this.#iconOperation = "";
  }

}
