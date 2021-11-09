const puppeteer = require('puppeteer')
const mongoose = require('mongoose')
const Promotion = require('./models/Promotion')

mongoose.connect('mongodb://localhost/promotions', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
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
        link: item.querySelector('.td-module-title a').getAttribute('href')
      })
    })
    return list
  })

  insertPromosInDB(data)

  await browser.close()
})()

function insertPromosInDB(promos) {
  promos.forEach(async promo => {
    if (!(await Promotion.findOne({ promotion: promo.promotion }))) {
      await Promotion.create(promo)
    }
  })
}

/*
async function run() {
  console.log('Server started!!')

  const newPromotion = {
    promotion: 'promo bue da fixe',
    category: 'categoria bue da fixe',
    link: 'link bue da fixe'
  }

  const promo = await Promotion.findOne({ promotion: newPromotion.promotion })
  console.log('pesquisa: ', promo)

  if (!promo) {
    const createdPromo = await Promotion.create(newPromotion)
    console.log('nova promo inserida na BD: ', createdPromo)
  }
}

run()
*/
