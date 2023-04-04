//Дэлгэцтэй ажиллах контроллер

var uiController = (function () {
  var DOMstring = {
    inputType: ".add__type",
    inputDesc: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
  };
  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstring.inputType).value,
        description: document.querySelector(DOMstring.inputDesc).value,
        value: document.querySelector(DOMstring.inputValue).value,
      };
    },
    getDomStrings: function () {
      return DOMstring;
    },
  };
})();

//Санхүүтэй ажиллах контроллер

var financeController = (function () {
  var Income = function (id, desc, value) {
    this.id = id;
    this.desc = desc;
    this.value = value;
  };
  var Expense = function (id, desc, value) {
    this.id = id;
    this.desc = desc;
    this.value = value;
  };
  var data = {
    items: {
      inc: {},
      exp: {},
    },
    totals: {
      inc: 0,
      exp: 0,
    },
  };
  return {
    addItem: function (type, desc, value) {
      var item, id;
      if (data.items[type].lenght === 0) id = 1;
      else {
        id = data.items[type][data.items[type].lenght - 1].id + 1;
      }
      if (type === "inc") {
        item = new Income(id, desc, value);
      } else {
        item = new Expense(id, desc, value);
      }
      data.items[type].push(item);
    },
  };
})();

//Программын холгогч контроллер

var appController = (function (uiController, financeController) {
  var ctrlAddItem = function () {
    // Оруулах өгөгдөлийг дэлгэцнээс олж авна.
    var input = uiController.getInput();
    // Олж авсан өгөгдөлүүдээ санхүүгийн контроллероор дамжуулж тэнд хадгална.
    financeController.addItem(input.type, input.description, input.value);
    // Олж авсан өгөгдөлүүдээ вэб дээрээ тохирох хэсэгт нь гаргана.
    // Төсвийг тооцоолно.
    // Эцсийн үлдэгдэл тооцоог дэлгэцэнд гаргана.
  };
  var setupEventListeners = function () {
    var DOM = uiController.getDomStrings();
    document.querySelector(DOM.addBtn).addEventListener("click", function () {
      ctrlAddItem();
    });
    document.addEventListener("keypress", function (event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };
  return {
    init: function () {
      console.log("Application started...");
      setupEventListeners();
    },
  };
})(uiController, financeController);

appController.init();
