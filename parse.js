const MULTIPLY_DIVIDE_REGEX =
  /(?<operand1>\S+)\s*(?<operation>[\/\*])\s*(?<operand2>\S+)/
const ADD_SUBSTRACT_REGEX =
  /(?<operand1>\S+)\s*(?<operation>(?<!e)[-\+])\s*(?<operand2>\S+)/
const EXPONENT_REGEX = /(?<operand1>\S+)\s*(?<operation>\^)\s*(?<operand2>\S+)/
const PARENTHESIS_REGEX = /\((?<equation>[^\(\)]*)\)/

export default function parse(equation) {
  // la primera evaluación debe ser el paréntesis para obtener las subecuaciones que pueden quedar dentro de la ecuación inicial
  if (equation.match(PARENTHESIS_REGEX)) {
    const subEquation = equation.match(PARENTHESIS_REGEX).groups.equation
    const result = parse(subEquation)
    const newEquation = equation.replace(PARENTHESIS_REGEX, result)
    return parse(newEquation)
  } else if (equation.match(MULTIPLY_DIVIDE_REGEX)) {
    const result = handleMath(equation.match(MULTIPLY_DIVIDE_REGEX).groups)
    const newEquation = equation.replace(MULTIPLY_DIVIDE_REGEX, result)
    return parse(newEquation)
  } else if (equation.match(ADD_SUBSTRACT_REGEX)) {
    const result = handleMath(equation.match(ADD_SUBSTRACT_REGEX).groups)
    const newEquation = equation.replace(ADD_SUBSTRACT_REGEX, result)
    return parse(newEquation)
  } else if (equation.match(EXPONENT_REGEX)) {
    const result = handleMath(equation.match(EXPONENT_REGEX).groups)
    const newEquation = equation.replace(EXPONENT_REGEX, result)
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
    case "^":
      return number1 ** number2
  }
}
