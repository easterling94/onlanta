// 1) Найти все последовательности чисел в масиве и схлопнуть их в строке
/*
  Первый вариант - решение в лоб, но оно некрасивое. 
  После решения почитал как алгоритмически решить задачу и реализовал второе решение getRangesNew
*/ 
const getRanges = (arr) => {
  if (arr.length === 1) return arr[0].toString();
  if(!arr.every(el => typeof el === 'number')) {
    alert('Все передаваемые значения должны быть числовыми')
    return 'Ошибка'
  }
  const list = arr.filter((value, index, array) => array.indexOf(value) === index)
  list.sort((a, b) => a - b) // в примере значения уже были отсортированы, но этот шаг можно включить на всякий случай

  let ranges = [];
  let currentLeft = list[0];
  let currentRight = list[0];

  for (let i = 1; i < list.length; i++) {
    if (list[i] - 1 === list[i - 1] && list[i] + 1 === list[i + 1]) {
      currentRight = list[i];
      continue;
    }
    if (!list[i - 2] && currentLeft + 1 !== list[i]) {
      ranges.push(currentLeft.toString())
      currentLeft = list[i];
      currentRight = list[i];
    }
    if (!list[i + 1]) {
      list[i] - 1 === list[i - 1] ? ranges.push(`${currentLeft}-${list[i]}`) : ranges.push(list[i].toString())
      continue
    }

    if (list[i] - 1 !== list[i - 1] && list[i] + 1 === list[i + 1]) {
      currentLeft = list[i];
      currentRight = list[i];
      continue
    }
    if (list[i] - 1 !== list[i - 1] && list[i] + 1 !== list[i + 1]) {
      ranges.push(list[i].toString())
      currentLeft = list[i + 1];
      currentRight = list[i + 1];
      continue
    }
    if (list[i] - 1 === list[i - 1] && list[i] + 1 !== list[i + 1]) {
      ranges.push(`${currentLeft}-${list[i]}`)
      currentLeft = list[i + 1]
      currentRight = list[i + 1]
      continue
    }
    
  }

  return ranges.join(',');
}

const getRangesNew = (arr) => {
  if (arr.length === 1) return arr[0].toString();
  if(!arr.every(el => typeof el === 'number')) {
    alert('Все передаваемые значения должны быть числовыми')
    return 'Ошибка'
  }
  const list = arr.filter((value, index, array) => array.indexOf(value) === index)
  list.sort((a, b) => a - b)

  let result = [];
  for (i = 0; i < list.length;) {
    for (var j = 1; i + j < list.length && list[i+j] == list[i] + j; j++);
    if (j >= 2) { result.push( `${list[i]}-${list[i+j-1]}` ); i += j; } 
    else result.push(list[i++]);
  }
  return result.join(',');
}

// getRanges([0, 1, 2, 3, 4, 7, 8, 10]) // "0-4,7-8,10"
// getRanges([4,7,10]) // "4,7,10"
// getRanges([2, 3, 8, 9]) // "2-3,8-9"

// getRangesNew([0, 1, 2, 3, 4, 7, 8, 10]) // "0-4,7-8,10"
// getRangesNew([4,7,10]) // "4,7,10"
// getRangesNew([2, 3, 8, 9]) // "2-3,8-9"