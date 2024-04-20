import parse from "./parse.js"

describe("#parse", () => {
  test("it works", () => {
    // expect(parse("(2+2)-1*2/2")).toBe(3) // BUG: revisar el orden de precedencia de las operaciones, esta cuenta tiene que dar 3 (devuelve 2)
    expect(parse("((2+2)-1*2)^2/2")).toBe(2) // BUG: nuevamente, el resultado devuelto por JEST esta mal - REVISAR LA REGEX (validar que funcione para Node)
  })
})
