const puppeteer = require('puppeteer')
const mongo = require('mongodb').MongoClient

const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)

let db, promotions, promotions2

async function run() {}

mongo.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  (err, client) => {
    if (err) {
      console.error(err)
      return
    }
    db = client.db('promotions')
    promotions = db.collection('promotions')
    promotions2 = db.collection('promotions2')
    ;(async () => {
      const browser = await puppeteer.launch({ headless: false })
      const page = await browser.newPage()
      await page.goto('https://www.indiegamebundles.com/')

      /* Run javascript inside the page */
      const data = await page.evaluate(() => {
        const list = []
        const items = Array.from(
          document.querySelectorAll('div.td-module-meta-info')
        ).slice(0, 10)

        items.forEach(item => {
          list.push({
            promotion: item.querySelector('.td-module-title a').innerHTML,
            category: item.querySelector('.td-post-category').innerHTML,
            link: item.querySelector('.td-module-title a').getAttribute('href'),
            date: Date()
          })
        })

        return list
      })

      console.log(data)
      promotions.deleteMany({})
      promotions.insertMany(data)
      const data2 = []
      let myagr = [
        {
          $merge: {
            into: 'promotions2',
            on: '_id',
            whenMatched: 'keepExisting',
            whenNotMatched: 'insert'
          }
        }
      ]
      db.collection('promotions').aggregate(myagr).toArray(data2)
      db.collection('promotions').createIndex(
        { promotion: 1 },
        { unique: true }
      )
      /* {
          $merge: {
            into: { db: 'promotions', coll: 'promotions' },
            on: 'promotion',
            whenMatched: 'keepExisting',
            whenNotMatched: 'insert'
          }
        } */

      await browser.close()
    })()
  }
)
