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
        title: item.querySelector('.td-module-title a').innerHTML,
        promotion: item.querySelector('.td-module-title a').innerHTML,
        category: item.querySelector('.td-post-category').innerHTML,
        link: item.querySelector('.td-module-title a').getAttribute('href')
      })
    })
    return list
  })

  // console.log(data)
  insertPromosInDB(data)

  await browser.close()
})()

function insertPromosInDB(promos) {
  promos.forEach(async promo => {
    //promo['promotion'] = slugify(promo.promotion)
    if (!(await Promotion.findOne({ promotion: promo.promotion }))) {
      await Promotion.create(promo)
    }
  })
}

function slugify(str) {
  str = str.replace(/^\s+|\s+$/g, '') // trim
  str = str.toLowerCase()

  // remove accents, swap ñ for n, etc
  var from = 'ãàáäâáº½èéëêìíïîõòóöôùúüûñç·/_,:;'
  var to = 'aaaaaeeeeeiiiiooooouuuunc------'
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
  }

  str = str
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-') // collapse dashes

  return str
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
