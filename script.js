// function parse(equation) {
//   const step = getNextStep()
//   const result = solve(step)
//   replaceNextStep(equation, step, result)
// }
const MULTIPLY_DIVIDE_REGEX =
  /(?<operand1>\S+)\s*(?<operation>[\/\*])\s*(?<operand2>\S+)/
const ADD_SUBSTRACT_REGEX =
  /(?<operand1>\S+)\s*(?<operation>(?<!e)[\-\+])\s*(?<operand2>\S+)/

const form = document.querySelector("#equation-form")
const input = form.querySelector("#equation")
const clear = form.querySelector(".clear-button")
const results = document.querySelector("#results")

form.addEventListener("submit", (e) => {
  e.preventDefault()

  results.textContent = parse(input.value)
})

function parse(equation) {
  console.log(equation)
  if (equation.match(MULTIPLY_DIVIDE_REGEX)) {
    const result = handleMath(equation.match(MULTIPLY_DIVIDE_REGEX).groups)
    const newEquation = equation.replace(MULTIPLY_DIVIDE_REGEX, result)
    return parse(newEquation)
  } else if (equation.match(ADD_SUBSTRACT_REGEX)) {
    const result = handleMath(equation.match(ADD_SUBSTRACT_REGEX).groups)
    const newEquation = equation.replace(ADD_SUBSTRACT_REGEX, result)
    return parse(newEquation)
  } else {
    return parseFloat(equation) // luego de aplicar todas las suboperaciones, va a devolver el resultado de la ecuación inicial
  }
}

function handleMath({ operand1, operand2, operation }) {
  const number1 = parseFloat(operand1)
  const number2 = parseFloat(operand2)

  switch (operation) {
    case "*":
      return number1 * number2
    case "/":
      return number1 / number2
    case "+":
      return number1 + number2
    case "-":
      return number1 - number2
  }
}

clear.addEventListener("click", () => {
  window.location.reload()
})
