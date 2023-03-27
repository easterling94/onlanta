// 4) реализовать функцию обращающуюся по переданному url и возвращающую resolve с результатом

const fetchData = async (url: string, timeoutMs = 5000): Promise<any> => {
  const retryLimit = 5;
  let result: any;
  const errorsArr = [404, 408, 500, 502, 503, 504, 522, 524] // можно предположить, что мы хотим ловить не все ошибки, а только определенные в массиве

  const asyncCall = () => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        const test = await fetch(url)
        if (test.ok) {
          resolve(test)
        }
        if (errorsArr.includes(test.status)) {
          reject(test)
        }
      }, timeoutMs / retryLimit)
    })
  }

  const tryFetch = async (tryCount: number) => {
    if (tryCount === 0) return
    if (result && result.ok) return
    await asyncCall().then(res => {
      console.log(res)
      return result = res
    }).catch(err => {
       {
        console.error(err)
        return result = err
      }
    })
    await tryFetch(tryCount - 1)
  }

  await tryFetch(retryLimit)
  return result
}

// const test = await fetchData('https://jsonplaceholder.typicode.com/todosssssss/1');
// test 
// имитация проблемного запроса, выдаст 5 раз по разу через 1 секунду лог с ошибкой, сама переменная test при вызове вернет объект response с описанием и со статусом 404

// const test = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
// test 
// корректный запрос, выдаст 1 через 1 секунду лог с объектом ответа, сама переменная test при вызове вернет объект нормальный response со статусом 200