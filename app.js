// Дэлгэцтэй ажиллах контроллер
var uiController = (function () {
    // Ирээдүйд өөрчлөгдөж болох утгуудыг энд обьект болгон хадгалав
    var DOMstring = {
        inputType: ".add__type",
        inputDesc: ".add__description",
        inputValue: ".add__value",
        inputAdd: ".add__btn"
    }

    // Public ugugdulvvd ee return hij awna
    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMstring.inputType).value,
                desc: document.querySelector(DOMstring.inputDesc).value,
                value: document.querySelector(DOMstring.inputValue).value
            }
        },
        getDOMstrings: function () {
            return DOMstring;
        }
    }
})();

// Санхүүтай ажиллах контроллер
var financeController = (function () {
    var Income = function (id, desc, value) {
        this.id = id;
        this.desc = desc;
        this.value = value;
    }
    var Expense = function (id, desc, value) {
        this.id = id;
        this.desc = desc;
        this.value = value;
    }
    var data = {
        allItems: {
            inc: [],
            exp: []
        },
        totals: {
            inc: 0,
            exp:0
        }
    }
})();


var appController = (function (uiController, financeController) {

    var ctrlAddItem = function () {
        // Оруулах өгөгдөлийг бэлдэцээс олж авна
        console.log(uiController.getInput().type+ " "+ uiController.getInput().desc+" "+uiController.getInput().value);
        // Олж авсан өгөгдөлүүдээ санхүүгийн контроллерт дамжуулж тэнд хадгална

        // Олж авсан өгөгдөлүүдээ вэб дээрээ гаргана

        // Төсвийг тооцоолно

        // Эцсийн үлдэгдэл тооцоог дэлгэцэнд гаргана
    }
    var setupEventListeners = function () {
        var DOM = uiController.getDOMstrings();
        document.querySelector(DOM.inputAdd).addEventListener("click", function () {
            ctrlAddItem();
        })
        document.addEventListener("keypress", function (event) {
            // Enter товч дархад ажиллана
            if (event.keyCode === 13) {
                ctrlAddItem();
            }
        })
    }
    return {
        init: function () {
            setupEventListeners();
        }
    }
})(uiController, financeController);

appController.init();