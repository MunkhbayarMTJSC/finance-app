//Дэлгэцтэй ажиллах контроллер

var uiController = (function () {})();

//Санхүүтэй ажиллах контроллер

var financeController = (function () {})();

//Программын холгогч контроллер

var appController = (function (uiController, financeController) {
  var ctrlAddItem = function () {
    // Оруулах өгөгдөлийг дэлгэцнээс олж авна.
    // Олж авсан өгөгдөлүүдээ санхүүгийн контроллероор дамжуулж тэнд хадгална.
    // Олж авсан өгөгдөлүүдээ вэб дээрээ тохирох хэсэгт нь гаргана.
    // Төсвийг тооцоолно.
    // Эцсийн үлдэгдэл тооцоог дэлгэцэнд гаргана.
  };
  document.querySelector(".add__btn").addEventListener("click", function () {
    ctrlAddItem();
  });
  document.addEventListener("keypress", function (event) {
    if (event.keyCode === 13 || event.which === 13) {
      ctrlAddItem();
    }
  });
})(uiController, financeController);
