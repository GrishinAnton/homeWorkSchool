/* ДЗ 2 - работа с массивами и объеектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
    for (var i = 0; i < array.length; i++) {
        fn(array[i], i, array);
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
    var arr = [];

    for (var i = 0; i < array.length; i++) {
        arr.push(fn(array[i], i, array));
    }

    return arr;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {

    var result = initial || array[0];
    var cur = 0;

    if (!initial) {
        cur = 1;
    }

    for (var i = cur; i < array.length; i++) {   

        result = fn(result, array[i], i, array);    
    }  

    return result;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
    var arr = [];

    for (var name in obj) {
        if (obj.hasOwnProperty(name)) {
            arr.push(name.toUpperCase());
        }         
    }

    return arr;
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from, to) {
    var arr = [];
    var start = from < 0 ? 0 : from;

    if (arguments.length <= 1) {
        return array
    }

    for (var i = start; i < array.length; i++) {
        if (to >= 0) {
            if (to == 0) {
                return arr
            }

            if (to > i) {
                arr.push(array[i])
            }
        
        } else {
            if ((array.length + to) > i) {
                arr.push(array[i])
            }
        }

        if (!to) {
            arr.push(array[i])
        }    
    }

    return arr;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) { 
    return new Proxy(obj, {      
        set(target, prop, value) {
            target[prop] = value * value;

            return true;
        }
    });
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
