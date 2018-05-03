/* ДЗ 2 - работа с массивами и объеектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
  for(var i = 0; i < array.length; i++){
    fn(array[i], i , array);
  }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
  var arr = [];

  for(var i  = 0; i < array.length; i++){
    arr.push(fn(array[i], i , array));
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

  for(var i = 0; i < array.length; i++){

    if(initial){
      var cur = i;
    } else {
      var cur = i + 1;
    }

    result = fn(result, array[cur], cur, array);    
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

  for(var name in obj){
    arr.push(name.toUpperCase());
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
  var from = from < 0 ? 0 : from

  for(var i = from; i < array.length; i++){
    if(to >= 0){
      if(to == 0){
        return arr
      } 
      if(to > i){
        arr.push(array[i])
      }
      
    } else {
      if((array.length + to) > i){
        arr.push(array[i])
      }
    }

    if(!to){
      arr.push(array[i])
    }
    
  }
  return arr;
}

// var array = [1, 2, 3, 4, 5, 6, 7];
// console.log(slice(array, -999, 4));
// console.log(array.slice(-99999, 4));

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
