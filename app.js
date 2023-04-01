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

var financeController = (function () {})();

//Программын холгогч контроллер

var appController = (function (uiController, financeController) {
  var DOM = uiController.getDomStrings();
  var ctrlAddItem = function () {
    // Оруулах өгөгдөлийг дэлгэцнээс олж авна.
    console.log(uiController.getInput());
    // Олж авсан өгөгдөлүүдээ санхүүгийн контроллероор дамжуулж тэнд хадгална.
    // Олж авсан өгөгдөлүүдээ вэб дээрээ тохирох хэсэгт нь гаргана.
    // Төсвийг тооцоолно.
    // Эцсийн үлдэгдэл тооцоог дэлгэцэнд гаргана.
  };
  document.querySelector(DOM.addBtn).addEventListener("click", function () {
    ctrlAddItem();
  });
  document.addEventListener("keypress", function (event) {
    if (event.keyCode === 13 || event.which === 13) {
      ctrlAddItem();
    }
  });
})(uiController, financeController);
