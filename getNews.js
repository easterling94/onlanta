// 3) Перепишите функцию не используя await (promise only) 
/*
  После написания функции getNewsNew решил немного проверить себя и написал имитацию объекта с указанными в задаче методами.
  Вариант с async/await работает дольше, но поэлементно
  Вариант с Promise быстрее, но, возможно из-за того, что микротаски отрабатываеют с разной скоростью, некоторые ответы идут не по порядку.
  Ну и в целом очередной раз я понял, что async / await гораздо читабельнее, чем Promise
*/

const url = 'https://jsonplaceholder.typicode.com/todos'

const ClassComponent = {
  app: {
    newsService: {
      async getAllNews() {
        return await fetch(url).then(res => res.json())
      },
    },
    userService: {
      async getUser(id) {
        return await fetch(`${url}/${id}`).then(res => res.json())
      },
    },
    starsService: {
      async getUserStars(user) {
        return await fetch(`${url}/${user.id}`).then(res => res.json()).then(data => data)
      },
    },
  },
  // старый getNews с async / await
  async getNews() {
    const news = await this.app.newsService.getAllNews();
    for (const n of news) {
      const user = await this.app.userService.getUser(n.id) // для тестирования с jsonplaceholder исправил n.userId на n.id
      n.userName = user ? user.name : 'anonimous'
      n.userStars = user ? await this.app.starsService.getUserStars(user) : 0
      // console.log(n.userStars) // тут заметно что скорость не очень высокая, но соблюдается порядок
    }
    return news
  },
  // новый getNews с Promises
  async getNewsNew() {
    const news = new Promise((res) => {
      const data = this.app.newsService.getAllNews()
      res(data)
    })
  
    news.then(news => {
      for (const n of news) {
        const user = new Promise((res) => {
          const user = this.app.userService.getUser(n.id)
          res(user)
        })
        user.then(user => {
          const status = new Promise ((res) => {
            const status = this.app.starsService.getUserStars(user)
            res(status)
          })
          status.then(status => {
            n.userName = user ? user.title : 'anonimous';
            n.userStars = user ? status : 0;
            // console.log(n.userStars) // а здесь наоборот моментально отобращаются все логи, но порядок немного хромает
          })
        })
      }
    })
    return news
  }
}
