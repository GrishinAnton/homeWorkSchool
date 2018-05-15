/* ДЗ 4 - работа с DOM */

/*
 Задание 1:

 1.1: Функция должна создать элемент с тегом DIV

 1.2: В созданный элемент необходимо поместить текст, переданный в параметр text

 Пример:
   createDivWithText('loftschool') // создаст элемент div, поместит в него 'loftschool' и вернет созданный элемент
 */
function createDivWithText(text) {
    var elem = document.createElement('div');

    elem.textContent = text;

    return elem;
}

/*
 Задание 2:

 Функция должна вставлять элемент, переданный в переметре what в начало элемента, переданного в параметре where

 Пример:
   prepend(document.querySelector('#one'), document.querySelector('#two')) // добавит элемент переданный первым аргументом в начало элемента переданного вторым аргументом
 */
function prepend(what, where) {
    where.insertBefore(what, where.firstChild);
}

/*
 Задание 3:

 3.1: Функция должна перебрать все дочерние элементы узла, переданного в параметре where

 3.2: Функция должна вернуть массив, состоящий из тех дочерних элементов следующим соседом которых является элемент с тегом P

 Пример:
   Представим, что есть разметка:
   <body>
      <div></div>
      <p></p>
      <a></a>
      <span></span>
      <p></p>
   </dody>

   findAllPSiblings(document.body) // функция должна вернуть массив с элементами div и span т.к. следующим соседом этих элементов является элемент с тегом P
 */
function findAllPSiblings(where) {
    var arr = [];

    for (var i = 0; i < where.children.length -1; i++) {
        if (where.children[i].nextElementSibling.tagName == 'P') {
            arr.push(where.children[i])
        }
    }

    return arr;
}

/*
 Задание 4:

 Функция представленная ниже, перебирает все дочерние узлы типа "элемент" внутри узла переданного в параметре where и возвращает массив из текстового содержимого найденных элементов
 Но похоже, что в код функции закралась ошибка и она работает не так, как описано.

 Необходимо найти и исправить ошибку в коде так, чтобы функция работала так, как описано выше.

 Пример:
   Представим, что есть разметка:
   <body>
      <div>привет</div>
      <div>loftschool</div>
   </dody>

   findError(document.body) // функция должна вернуть массив с элементами 'привет' и 'loftschool'
 */
function findError(where) {
    var result = [];

    for (var child of where.children) {
        result.push(child.innerText);
    }

    return result;
}

/*
 Задание 5:

 Функция должна перебрать все дочерние узлы элемента переданного в параметре where и удалить из него все текстовые узлы

 Задачу необходимо решить без использования рекурсии, то есть можно не уходить вглубь дерева.
 Так же будьте внимательны при удалении узлов, т.к. можно получить неожиданное поведение при переборе узлов

 Пример:
   После выполнения функции, дерево <div></div>привет<p></p>loftchool!!!
   должно быть преобразовано в <div></div><p></p>
 */
function deleteTextNodes(where) {

    for (var i = 0; i < where.childNodes.length; i++ ) {
        if (where.childNodes[i].nodeType == 3) {
            where.removeChild(where.childNodes[i])
        }
    }
}

/*
 Задание 6:

 Выполнить предудыщее задание с использование рекурсии - то есть необходимо заходить внутрь каждого дочернего элемента (углубляться в дерево)

 Задачу необходимо решить без использования рекурсии, то есть можно не уходить вглубь дерева.
 Так же будьте внимательны при удалении узлов, т.к. можно получить неожиданное поведение при переборе узлов

 Пример:
   После выполнения функции, дерево <span> <div> <b>привет</b> </div> <p>loftchool</p> !!!</span>
   должно быть преобразовано в <span><div><b></b></div><p></p></span>
 */
function deleteTextNodesRecursive (where) {
    for (var i = 0; i < where.childNodes.length; i++) { 
        if (where.childNodes[i].nodeType == 3) {
            where.childNodes[i].remove()
        }
        
        if (where.childNodes.length && where.childNodes[i] !== undefined) {            
            deleteTextNodesRecursive (where.childNodes[i])
        }

        continue
    }
}

/*
 Задание 7 *:

 Необходимо собрать статистику по всем узлам внутри элемента переданного в параметре root и вернуть ее в виде объекта
 Статистика должна содержать:
 - количество текстовых узлов
 - количество элементов каждого класса
 - количество элементов каждого тега
 Для работы с классами рекомендуется использовать classList
 Постарайтесь не создавать глобальных переменных

 Пример:
   Для дерева <div class="some-class-1"><b>привет!</b> <b class="some-class-1 some-class-2">loftschool</b></div>
   должен быть возвращен такой объект:
   {
     tags: { DIV: 1, B: 2},
     classes: { "some-class-1": 2, "some-class-2": 1 },
     texts: 3
   }
 */
function collectDOMStat(root, obj = { tags: {}, classes: {} }) {
    console.dir(root.childNodes)
    console.dir(root)
   
    if (root.tagName) {
        obj.tags[root.tagName] === undefined 
            ? obj.tags[root.tagName] = 1 
            : obj.tags[root.tagName]++;
    } 

    if (root.classList) {
        for (let i = 0; i < root.classList.length; i++) {
            obj.classes[root.classList[i]] === undefined 
                ? obj.classes[root.classList[i]] = 1 
                : obj.classes[root.classList[i]]++;
        }
    }

    if (root.nodeType === 3) {
        
        obj.texts === undefined 
            ? obj.texts = 1
            : obj.texts++;
    }

    for (let i = 0; i < root.childNodes.length; i++) {
        
        if (root.childNodes.length && root.childNodes[i] !== undefined) {            
            collectDOMStat(root.childNodes[i], obj);
        }
    }

    return obj;
}

console.log(collectDOMStat(document.body))

// function collectDOMStat(root, statistic = { tags: {}, classes: {} }) {
//     [...root.childNodes].forEach(elem => {       
//         if (elem.data) {
//             (statistic.texts !== undefined) 
//                 ? ++statistic.texts
//                 : statistic.texts = 1
//         } else {
//             (statistic.tags[elem.nodeName] !== undefined)
//                 ? ++statistic.tags[elem.nodeName]
//                 : statistic.tags[elem.nodeName] = 1
      
//             elem.classList.forEach(item => {
//                 (statistic.classes[item] !== undefined)
//                     ? ++statistic.classes[item]
//                     : statistic.classes[item] = 1
//             })
//         }
  
//         if (elem.children) {
//             collectDOMStat(elem, statistic)
//         }
//     })

//     return statistic
// }

/*
 Задание 8 *:

 8.1: Функция должна отслеживать добавление и удаление элементов внутри элемента переданного в параметре where
 Как только в where добавляются или удаляются элементы,
 необходимо сообщать об этом при помощи вызова функции переданной в параметре fn

 8.2: При вызове fn необходимо передавать ей в качестве аргумента объект с двумя свойствами:
   - type: типа события (insert или remove)
   - nodes: массив из удаленных или добавленных элементов (в зависимости от события)

 8.3: Отслеживание должно работать вне зависимости от глубины создаваемых/удаляемых элементов

 Рекомендуется использовать MutationObserver

 Пример:
   Если в where или в одного из его детей добавляется элемент div
   то fn должна быть вызвана с аргументом:
   {
     type: 'insert',
     nodes: [div]
   }

   ------

   Если из where или из одного из его детей удаляется элемент div
   то fn должна быть вызвана с аргументом:
   {
     type: 'remove',
     nodes: [div]
   }
 */
function observeChildNodes(where, fn) {

    let observer = new MutationObserver(mutations => {
        var arr = [];
        var obj = { 
            'type': '', 
            'nodes': []
        };

        mutations.forEach(mutation => {            

            if (mutation.addedNodes.length) {
                mutation.addedNodes.forEach((item)=>{
                    arr.push(item)
                })
                
                obj.type = 'insert'
            }

            if (mutation.removedNodes.length) {
                mutation.removedNodes.forEach((item)=>{
                    arr.push(item)
                })                
                obj.type = 'remove'
            }

        });  
        obj.nodes = arr;
        fn(obj)
    });
    
    var config = { childList: true, characterData: true, subtree: true };
    
    observer.observe(where, config);

}

export {
    createDivWithText,
    prepend,
    findAllPSiblings,
    findError,
    deleteTextNodes,
    deleteTextNodesRecursive,
    collectDOMStat,
    observeChildNodes
};
