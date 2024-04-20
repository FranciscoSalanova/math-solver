// function parse(equation) {
//   const step = getNextStep()
//   const result = solve(step)
//   replaceNextStep(equation, step, result)
// }
import parse from "./parse.js"

const form = document.querySelector("#equation-form")
const input = form.querySelector("#equation")
const clear = form.querySelector(".clear-button")
const results = document.querySelector("#results")

form.addEventListener("submit", (e) => {
  e.preventDefault()

  results.textContent = parse(input.value)
  console.log(results)
})

clear.addEventListener("click", () => {
  window.location.reload()
})
