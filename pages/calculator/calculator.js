Page({
  data: {
    input: [],
    buttons: [
      "%", "CE", "C", "←",
      "1/x", "x²", "√x", "/",
      "7", "8", "9", "x",
      "4", "5", "6", "-",
      "1", "2", "3", "+",
      "00", "0", ".", "="
    ]
  },

  onHandleClick(e) {
    const value = e.currentTarget.dataset.value;
    let newArray = [...this.data.input];

    switch (value) {
      case "=":
        this.handleEqual();
        break;

      case "C":
      case "CE":
        this.handleClear();
        break;

      case "←":
        this.handleBackspace(newArray);
        break;

      case "%":
      case "1/x":
      case "x²":
      case "√x":
        this.handleSpecialOperation(value);
        break;

      default:
        newArray.push(value);
        this.setData({
          input: newArray
        });
        break;
    }
  },

  handleEqual() {
    try {
      const result = this.calculator(this.data.input);
      this.setData({
        input: [result]
      });
    } catch (error) {
      this.setData({
        input: ["Error"]
      });
    }
  },

  handleClear() {
    this.setData({
      input: []
    });
  },

  handleBackspace(newArray) {
    newArray.pop();
    this.setData({
      input: newArray
    });
  },

  handleSpecialOperation(operation) {
    try {
      const number = parseFloat(this.verifyAndConcat(this.data.input));
      let result;

      switch (operation) {
        case "%":
          result = number / 100;
          break;
        case "1/x":
          result = 1 / number;
          break;
        case "x²":
          result = Math.pow(number, 2);
          break;
        case "√x":
          result = Math.sqrt(number);
          break;
      }

      this.setData({
        input: [result]
      });
    } catch (error) {
      this.setData({
        input: ["Error"]
      });
    }
  },

  verifyAndConcat(array) {
    let concatenated = "";

    for (let item of array) {
      if (!isNaN(item)) {
        concatenated += item;
      } else {
        throw new Error(`Elemento no válido encontrado: ${item}`);
      }
    }

    const result = Number(concatenated);

    if (isNaN(result)) {
      throw new Error("La concatenación no resultó en un número válido.");
    }

    return result;
  },

  calculator(input) {
    let acc = 0;
    let currentNumber = "";
    let operator = "+";

    for (let item of input) {
      if (!isNaN(item) || item === ".") {
        currentNumber += item;
      } else {
        acc = this.performOperation(acc, Number(currentNumber), operator);
        currentNumber = "";
        operator = item;
      }
    }

    if (currentNumber !== "") {
      acc = this.performOperation(acc, Number(currentNumber), operator);
    }
    return acc;
  },

  performOperation(acc, num, operator) {
    switch (operator) {
      case "+":
        return acc + num;
      case "-":
        return acc - num;
      case "x":
        return acc * num;
      case "/":
        if (num === 0) {
          throw new Error("División entre 0");
        } else {
          return acc / num;
        }
        default:
          throw new Error(`Operador no válido: ${operator}`);
    }
  },

  onLoad() {}
});