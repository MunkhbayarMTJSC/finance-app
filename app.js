//UI Controller
var uiController = (function () {
    //Ирээдүйд өөрчлөгдөж болзошгүй өгөгдөлүүдийг обьектод хадгална
    var DOMString = {
        inputType: ".add__type",
        inputDesc: ".add__description",
        inputValue: ".add__value",
        inputAdd: ".add__btn",
        incomeList: '.income__list',
        expenseList: '.expenses__list',
        totalInc: '.budget__income--value',
        totalExp: '.budget__expenses--value',
        budgetVal: '.budget__value',
        precentVal: '.budget__expenses--percentage',
        containerDiv: '.container',
        expPresentLabel: '.item__percentage',
        dateLabel: '.budget__title--month',
        addType: '.add__type'
    }

    var noteListForeach = function (list, callback) {
        for (var i = 0; i < list.length; i++){
            callback(list[i],i);
        }
    }
    var formatNumber = function (num, type) {
        var numSplit, int, dec;

        num = Math.abs(num);
        num = num.toFixed(2); // 2 оронтой болгох (e.g. 2310.56)

        numSplit = num.split('.');
        int = numSplit[0];
        dec = numSplit[1];

        // Мянгатын таслалт оруулах
        if (int.length > 3) {
            int = int.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        return (type === 'exp' ? '- ' : '+ ') + int + '.' + dec;

    }
    return {
        getDOMString: function () {
            return DOMString;
        },
        getInput: function () {
            return {
                type: document.querySelector(DOMString.inputType).value,
                desc: document.querySelector(DOMString.inputDesc).value,
                value: parseInt(document.querySelector(DOMString.inputValue).value)
            }
        },
        deleteListItem: function (id) {
            var el = document.getElementById(id);
            el.parentNode.removeChild(el);
        },
        addListItem: function (item,type) {
            var html, list;
            if (type === 'inc') {
                list = DOMString.incomeList;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else {
                list = DOMString.expenseList;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            html = html.replace('%id%', item.id);
            html = html.replace('%desc%', item.desc);
            html = html.replace('%value%', formatNumber(item.value,type));
            document.querySelector(list).insertAdjacentHTML('beforeend', html);
        },
        clearField: function () {
            var fields = document.querySelectorAll(DOMString.inputDesc + ',' + DOMString.inputValue);
            var fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach(function (el) {
                el.value = '';
            });
            fieldsArr[0].focus();
        },
        showFinance: function (fin) {
            document.querySelector(DOMString.budgetVal).textContent = formatNumber(fin.finance,fin.finance);
            document.querySelector(DOMString.precentVal).textContent = fin.procent > 0 ? fin.procent + '%' : '---';
            document.querySelector(DOMString.totalInc).textContent = formatNumber(fin.totalInc, 'inc');
            document.querySelector(DOMString.totalExp).textContent = formatNumber(fin.totalExp,'exp');
        },
        showExpPrecents: function (expPresents) {
            // Бүх элэментүүдийг олж авсан
            var elements = document.querySelectorAll(DOMString.expPresentLabel);
            // Элемент болгоны хувьд зарлагын хувийг массиваас авч шивж оруулах
            noteListForeach(elements, function (el,index) {
                el.textContent = expPresents[index]+'%';
            })
        },
        displayDate: function () {
            var today = new Date();
            document.querySelector(DOMString.dateLabel).textContent = today.getFullYear()+' оны '+ today.getMonth()+' сар';
        },
        changeType: function () {
            var fields = document.querySelectorAll(DOMString.addType+','+ DOMString.inputDesc+','+ DOMString.inputValue);
            noteListForeach(fields, function (el) {
                el.classList.toggle('red-focus');
            })
            document.querySelector(DOMString.inputAdd).classList.toggle('red');
        }
    }
})();

//Finance Controller
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
        this.precent = -1;
    }
    Expense.prototype.calcPrecent = function (totalInc) {
        if (totalInc !== 0) {
            this.precent = Math.round((this.value / totalInc) * 100);
        } else {
            this.precent = 0;
        }
    }
    Expense.prototype.getPrecent = function () {
        return this.precent;
    }
    var data = {
        allItems: {
            inc: [],
            exp: []
        },
        totals: {
            inc: 0,
            exp: 0
        },
        finance: 0,
        procent:0
    }

    calculateTotal = function (type) {
        var sum = 0;
        data.allItems[type].forEach(function (el) {
            sum += el.value;
        })
        data.totals[type] = sum;
    }

    return {
        addItem: function (type, desc, value) {
            var item, id;
            // Орлогого зарлагийн өгөгдөлийн ID тохируулах
            if (data.allItems[type].length === 0) {
                id = 1;
            } else {
                id = data.allItems[type][data.allItems[type].length - 1].id + 1;
            }
            //Орлог зарлагийн алин болохыг тодорхойлоод item Орлого эсвэл зарлага үүсгэнэ. 
            if (type === 'inc') {
                item = new Income(id, desc, value);
            } else {
                item = new Expense(id, desc, value);
            }
            //Item-д түр хадгалсан байгаа орлог эсвэл зарлагаа data хадгалах хэсэгт нэмнэ
            data.allItems[type].push(item);
            //item-д байгаа орлог эсвэл зарлагыг буцаана.
            return item;
        },
        calculateFinance: function () {
            calculateTotal('inc');
            calculateTotal('exp');
            data.finance = data.totals.inc - data.totals.exp;
            if (data.totals.inc !== 0) {
                data.procent = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.procent = 0;
            }
        },
        getFinance: function () {
            return {
                finance: data.finance,
                procent: data.procent,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp
            }
        },
        deleteItem: function (type, id) {
            var ids = data.allItems[type].map(function (el) {
                return el.id;
            });
            var index = ids.indexOf(id);
            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }
        },
        calcPrecentages: function () {
            data.allItems.exp.forEach(function (el) {
                el.calcPrecent(data.totals.inc);
            })
        },
        getPresentages: function () {
            var allPrecent = data.allItems.exp.map(function (el) {
                return el.getPrecent();
            })
            return allPrecent;
        }
    }
})();

//App controller
var appController = (function (uiCtrl, finCtrl) {
    var ctrlAddItem = function () {
        // Оруулах өгөгдөлүүдийг дэлгэцнээс авна
        var input = uiCtrl.getInput();
        if (input.desc !== '' && input.value !== '') {
            // Олж авсан өгөгдөлүүдээ financeController хэсэгт хадгална
            var item = finCtrl.addItem(input.type, input.desc, input.value);
            // Олж авсан өгөгдөлүүдээ вэб дээр нь тохирох хэсэгт хадгална
            uiCtrl.addListItem(item, input.type);
            uiCtrl.clearField();
            // Төсвийг шинээр тооцоолоод дэлгэцэнд гаргана
            updateFinance();
            
        }
    }
    var updateFinance =  function(){
        // Төсвийг тооцоолно
        finCtrl.calculateFinance();
        // Эцэсийн үлдэгдэл 
        var finance = finCtrl.getFinance();
        // Дэлгэцэнд гаргана
        uiCtrl.showFinance(finance);
        // Элемэнтүүдийн хувийг тооцоолно
        finCtrl.calcPrecentages();
        // Элементүүддийн хувийг хүлээж авна
        var expPresents = finCtrl.getPresentages();
        // Элемэнтүүдийн хувийг шинэчлэнэ
        uiCtrl.showExpPrecents(expPresents);
    }
    var setupEventListener = function () {
        var DOM = uiCtrl.getDOMString();
        document.querySelector(DOM.inputAdd).addEventListener('click', function () {
            ctrlAddItem();
        })
        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13) {
                ctrlAddItem();
            }
        })

        document.querySelector(DOM.addType).addEventListener('change', uiCtrl.changeType);
        document.querySelector(DOM.containerDiv).addEventListener('click', function (event) {
            var id = event.target.parentNode.parentNode.parentNode.parentNode.id;
            if (id) {
                var arr = id.split('-');
                var type = arr[0];
                var fixedId = parseInt(arr[1]);
                // Санхүүгийн модулаас устгана
                finCtrl.deleteItem(type, fixedId);
                // Дэлгэц дээрээс энэ элемэнтийг устгана
                uiCtrl.deleteListItem(id);
                
                // Төсвийг дахин шинэчлэнэ
                updateFinance()
            }
        })
    }
    return {
        init: function () {
            uiCtrl.displayDate();
            uiCtrl.showFinance({
                finance: 0,
                procent: 0,
                totalInc: 0,
                totalExp: 0
            })
            setupEventListener();
        }
    }
})(uiController, financeController);

appController.init();