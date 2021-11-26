// console.log('start:')
// const puppeteer = require('puppeteer')
// const mongoose = require('mongoose')
// const Promotion = require('./models/Promotion')
// // Require the necessary discord.js classes
// const { Client, Intents } = require('discord.js')
// const { token, dblink } = require('./config.json')

// console.log('constant loader:' + token)

// mongoose.connect(dblink, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// ;(async () => {
//   const browser = await puppeteer.launch({ headless: false })
//   const page = await browser.newPage()
//   await page.goto('https://www.indiegamebundles.com/')

//   /* Run javascript inside the page */
//   const data = await page.evaluate(() => {
//     const list = []
//     const items = Array.from(
//       document.querySelectorAll('div.td-module-meta-info')
//     ).slice(0, 10)

//     items.forEach(item => {
//       list.push({
//         title: item.querySelector('.td-module-title a').innerHTML,
//         category: item.querySelector('.td-post-category').innerHTML,
//         link: item.querySelector('.td-module-title a').getAttribute('href')
//       })
//     })
//     return list
//   })

//   insertPromosInDB(data)

//   await browser.close()
// })()

// function insertPromosInDB(promos) {
//   promos.forEach(async promo => {
//     promo['promotion'] = slugify(promo.title)
//     if (!(await Promotion.findOne({ promotion: promo.promotion }))) {
//       await Promotion.create(promo)
//     }
//   })
// }

// function slugify(str) {
//   str = str.replace(/^\s+|\s+$/g, '') // trim
//   str = str.toLowerCase()

//   // remove accents, swap ñ for n, etc
//   var from = 'ãàáäâáº½èéëêìíïîõòóöôùúüûñç·/_,:;'
//   var to = 'aaaaaeeeeeiiiiooooouuuunc------'
//   for (var i = 0, l = from.length; i < l; i++) {
//     str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
//   }

//   str = str
//     .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
//     .replace(/\s+/g, '-') // collapse whitespace and replace by -
//     .replace(/-+/g, '-') // collapse dashes

//   return str
// }

// // Create a new client instance
// const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

// // When the client is ready, run this code (only once)
// client.once('ready', async send => {
//   console.log('Ready!')
//   const list = await linkReturn()
//   const channel = client.channels.cache.get('911340226033635388')
//   for (let i = 0; i < list.length; i++) {
//     channel.send(`list${list[i]['link']}`)
//   }
//   await Promotion.updateMany({ sent: false }, { sent: true })
// })

// client.on('interactionCreate', async interaction => {
//   if (!interaction.isCommand()) return

//   const { commandName } = interaction
//   if (commandName === 'server') {
//     var arr = ['ai não', 'xau', 'não sei', 'só se for na playstation']

//     var randIndex = arr[Math.floor(Math.random() * arr.length)]

//     await interaction.reply(`Jimmy says: ${randIndex}`)
//   }
// })

// // Login to Discord with your client's token

// client.login(token)

// async function linkReturn() {
//   return await Promotion.find(
//     {
//       sent: false
//     },
//     {
//       _id: 0,
//       promotion: 0,
//       category: 0,
//       title: 0,
//       createdAt: 0,
//       updatedAt: 0,
//       __v: 0,
//       sent: 0
//     }
//   )
// }

// /*
// async function run() {
//   console.log('Server started!!')

//   const newPromotion = {
//     promotion: 'promo bue da fixe',
//     category: 'categoria bue da fixe',
//     link: 'link bue da fixe'
//   }

//   const promo = await Promotion.findOne({ promotion: newPromotion.promotion })
//   console.log('pesquisa: ', promo)

//   if (!promo) {
//     const createdPromo = await Promotion.create(newPromotion)
//     console.log('nova promo inserida na BD: ', createdPromo)
//   }
// }

// run()
// */

console.log('teste')
