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
        },
        addListItem: function (item,type) {
            // Орлого зарлагийн элементийг агуулсан HTML-г бэлтгэнэ
            var html, list;
            if (type === "inc") {
                list = '.income__list';
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else {
                list = '.expenses__list';
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            // Тэр HTML дотроо орлог зарлагуудыг replace ашиглаж өөрчилж өгнө
            html = html.replace('%id%', item.id);
            html = html.replace('%desc%', item.desc);
            html = html.replace('%value%', item.value);
            // Бэлтгээн HTML ээ DOM руу хийж өгнө.
            document.querySelector(list).insertAdjacentHTML('beforeend',html);
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
    return {
        addItem: function (type, desc, value) {
            var item, id;
            if (data.allItems[type].length === 0) {
                id = 1;
            } else {
                id = data.allItems[type][data.allItems[type].length - 1].id+1;
            }
            if (type === 'inc') {
                item = new Income(id, desc, value);
            } else {
                item = new Expense(id, desc, value);
            }
            data.allItems[type].push(item);
            return item;
        }
    }
})();


var appController = (function (uiController, financeController) {

    var ctrlAddItem = function () {
        // Оруулах өгөгдөлийг бэлдэцээс олж авна
        var input = uiController.getInput();
        // Олж авсан өгөгдөлүүдээ санхүүгийн контроллерт дамжуулж тэнд хадгална
        var item = financeController.addItem(input.type, input.desc, input.value);
        // Олж авсан өгөгдөлүүдээ вэб дээрээ гаргана
        uiController.addListItem(item, input.type);
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