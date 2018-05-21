/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
const buttonElement = document.querySelector('#addDiv');
const newDiv = document.createElement('div');

newDiv.setAttribute('draggable', true);
newDiv.style.backgroundColor = `rgb(${(Math.random() * 255)},${(Math.random() * 255)},${(Math.random() * 255)})`;
newDiv.style.width = (Math.random() * 100) + 'px';
newDiv.style.height = (Math.random() * 100) + 'px';
newDiv.style.top = (Math.random() * 100) + 'px';
newDiv.style.left = (Math.random() * 100) + 'px';

// buttonElement.addEventListener('click', function() {
//     homeworkContainer.appendChild(newDiv);
// });

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {
    const newDiv = document.createElement('div');

    newDiv.classList.add('draggable-div');
    newDiv.style.backgroundColor = `rgb(${(Math.random() * 255)},${(Math.random() * 255)},${(Math.random() * 255)})`;
    newDiv.style.width = (Math.random() * 100) + 'px';
    newDiv.style.height = (Math.random() * 100) + 'px';
    newDiv.style.top = (Math.random() * 100) + 'px';
    newDiv.style.left = (Math.random() * 100) + 'px';

    return newDiv;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
function addListeners(target) {
   target.onmousedown = function (e) {

        var coords = getCoords(target);
        var shiftX = e.pageX - coords.left;
        var shiftY = e.pageY - coords.top;

        target.style.position = 'absolute';
        document.body.appendChild(target);
        moveAt(e);

        target.style.zIndex = 1000;

        function moveAt(e) {
            target.style.left = e.pageX - shiftX + 'px';
            target.style.top = e.pageY - shiftY + 'px';
        }

        document.onmousemove = function (e) {
            moveAt(e);
        };

        target.onmouseup = function () {
            document.onmousemove = null;
            target.onmouseup = null;
        };

    }

    target.ondragstart = function () {
        return false;
    };

    function getCoords(elem) {   
            var box = elem.getBoundingClientRect();
            
        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    }
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации D&D
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
