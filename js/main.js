import { Calculator } from "./calculator.js";

document.addEventListener("DOMContentLoaded",()=>{
  //DOM Display
  const output = document.getElementById("output");
  const input = document.getElementById("input");

  //DOM Buttons
  const buttonsNumbers = document.querySelectorAll("[data-calculator='number']");
  const buttonsOperations = document.querySelectorAll("[data-calculator='operation']");
  const buttonEqual = document.getElementById("equal");
  const buttonClear = document.getElementById("clear");
  const buttonDelete = document.getElementById("delete");

  //Calculator
  const calculator = new Calculator();

  //Events Numbers Click
  buttonsNumbers.forEach(bn => {
    bn.addEventListener("click",()=>{
      //Btn Clear Enabled
      if(buttonClear.disabled){
        calculator.disabledButton(buttonClear, false);
      }

      calculator.disabledButton(buttonDelete, false);

      calculator.actionNumbers(bn.value);
      calculator.setData(output, input);

      if(input !== ""){
        calculator.disabledButtons(buttonsOperations, false);
      }

      if(calculator.getOperation() !== ""){
        calculator.disabledButtons(buttonsOperations, true);
        calculator.disabledButton(buttonEqual, false);
      }
    })
  })

  //Events Operations Click
  buttonsOperations.forEach(bo => {
    bo.addEventListener("click",()=>{
      calculator.actionOperations(bo.value);
      calculator.setData(output, input);
      calculator.disabledButton(buttonDelete, true);
    })
  })

  //Event Click Equal
  buttonEqual.addEventListener("click",()=>{
    calculator.actionEqual();
    calculator.setData(output, input);
    calculator.disabledButton(buttonEqual, true);
    calculator.disabledButtons(buttonsOperations, false);
    calculator.disabledButton(buttonDelete, true);
  })

  /* Event Click Delete */
  buttonDelete.addEventListener("click",()=>{
    calculator.actionDelete();
    calculator.setData(output, input);
  })

  //Event Click Clear
  buttonClear.addEventListener("click",()=>{
    calculator.actionClear();
    calculator.setData(output, input);
    calculator.disabledButton(buttonEqual, true);
    calculator.disabledButtons(buttonsOperations, true);
    calculator.disabledButton(buttonDelete, true);
    buttonClear.disabled = true;
  })

})
