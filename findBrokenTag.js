// 2) Напишите функцию которая найдет первый не закрытый тег. Если теги вложены правильно вернуть true

const findBrokenTag = (tag) => {
  const regEx = /(?<=\<)(.*?)(?=\>)/g
  let errorTag = tag.match(regEx).filter((el) => el.slice(-1) !== '/' ) // убираем в т.ч. самозакрывающиеся тэги
  let result = [];
  for (let i = 0; i < (errorTag.length / 2) ; i++) {
    if ('/' + errorTag[i] !== errorTag[errorTag.length - 1 - i]) {
      result.push(errorTag[i])
    }
  }
  return result.length ? result.join(',') : true
}

// findBrokenTag('<div><span></span></div>') // true
// findBrokenTag('<div><span></Span></div>') // 'span'