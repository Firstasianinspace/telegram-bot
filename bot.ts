import { Bot } from "grammy";
import { Menu } from "@grammyjs/menu";
import sequelize from "./db.js";
import userModel from "./models.js";
import axios, { AxiosResponse } from "axios";
// import userModel from "./models.js";

const bot = new Bot("6538685421:AAG-ef6wLSjdeFIc1QWjjl6Xr4QBHH_RDi4"); // <-- put your bot token between the "" (https://t.me/BotFather)

const menu = new Menu("my-menu-identifier")
  .text("Welcome to Shop", (ctx) => ctx.reply("Some info about shop")).row()
  .submenu("Catalog", "catalog-menu")
  .text("Balance", async (ctx) => {
    const chatId = ctx.chat?.id.toString()
    try {
      console.log(chatId)
      const user = await userModel.findOne({ where: { chatId: chatId }})
      console.log(user)
    } catch (e) {
      console.log(e)
    }
  })

const catalog = new Menu("catalog-menu")
  .text("Green", async (ctx) => {
    // ctx.reply("Powered by grammY")
    const { data } = await axios.get("http://194.67.65.247:1337/api/orders")
    const onlyGreens = data.map((s: any) => s.type === 'green' && s.active)
    ctx.reply(onlyGreens.toString())
  })
  .back("Go Back");

menu.register(catalog)
// Make it interactive.
bot.use(menu);


bot.command("start", async (ctx) => {
  const chatId = ctx.chat.id
  await sequelize.authenticate()
  await sequelize.sync()
  try {
    await userModel.create({chatId})
  } catch (e) {
    console.log(e)
  }
  console.log('Connection has been established successfully.');
  await ctx.reply("Check out this menu:", { reply_markup: menu });
});



// bot.on("message", async (ctx) => {
//   const text = ctx.message.text
//   const chatId = ctx.chat.id
//   if (text === 'info') {
//     const user = await userModel.findOne({ where: { chatId }})
//     console.log(user)
//     ctx.reply(`Your balance is ${user}`)
//   }
// });

bot.start();
// import { Bot } from "grammy";
// import { Menu } from "@grammyjs/menu";
// import axios, { AxiosResponse } from "axios";
// import sequelize from "./db.js";
// import userModel from "./models.js";

// interface IOrderItemAttributes {
//   title: string;
//   active: boolean;
//   price: number,
//   createdAt: string;
//   publishedAt: string;
//   district: string;
//   description: string;
// }

// interface IOrderItem {
//   id: number;
//   attributes: IOrderItemAttributes
// }

// const checkUserInDatabase = async (id: string) => {
//   try {
//     const data = await axios.get(`http://194.67.65.247:1337/api/users`)
//     const includesUser = data.data.find((s: any) => s.telegramID === id)
//     return includesUser?.id || null
//   } catch (e) {
//     console.log(e)
//   }
// }

// const getUserID = (ctx: any) => ctx.reply_to_message ? ctx.reply_to_message.from.id : ctx.from.id

// const getActiveItems = async () => {
//   const data = await axios.get('http://194.67.65.247:1337/api/orders')
//   return data.data.map((s: IOrderItem) => s.attributes.active)
// }

// // Create an instance of the `Bot` class and pass your bot token to it.
// const bot = new Bot("6538685421:AAG-ef6wLSjdeFIc1QWjjl6Xr4QBHH_RDi4"); // <-- put your bot token between the ""
// // You can now register listeners on your bot object `bot`.
// // grammY will call the listeners when users send messages to your bot.

// // Handle other messages.
// // Create a simple menu.
// const menu = new Menu("my-menu-identifier")
//   .text("Welcome to Shop", (ctx) => ctx.reply("Some info about shop")).row()
//   .text("How to buy", (ctx) => {
//     ctx.reply("A lot of info how to buy")
//     // const testing = async () => {
//     //   const userID = getUserId(ctx)
//     //   ctx.reply(`${userID}`)
//     //   if (data.data.error.status === 404) {
//     //     axios.post('http://194.67.65.247:1337/api/telegram-users', {
//     //       uniqueID: userID,
//     //       balance: 0,
//     //     })
//     //   }
//     // }
//   })
//   .text('Last order', (ctx) => {
//   }).row()
//   .text("My orders", async (ctx) => {
//     const id = checkUserInDatabase(getUserID(ctx))
//     const data = await axios.get(`http://194.67.65.247:1337/api/users/${id}?populate=orders`)
//     let response
//     if (data.data.orders.length === 0) response = "You don't have any orders yet"
//     ctx.reply(`${response}`)
//   })
//   .text("Balance", (ctx) => {
//     const balance = 0
//     ctx.reply(`Your balance is ${balance}`)
//   })
//   .text("Buy", (ctx) => {
//     const data = getActiveItems()
//     ctx.reply(`${data}`)
//   })


//  // Make it interactive.
// bot.use(menu);

// bot.command("start", async (ctx) => {
//   const chatId = ctx.chat.id
//   try {
//     await sequelize.authenticate()
//     await sequelize.sync()
//     await userModel.create({chatId})
//   } catch (e) {

//   }
//   try {
//     ctx.reply('Проверяем новый ли пользователь')
//     const response = await checkUserInDatabase(getUserID(ctx))
//     await ctx.reply('Завершили проверку')
//     if (!response) {
//       await ctx.reply('Регистрируем')
//       await axios.post('http://194.67.65.247:1337/api/users', {
//         "email": "aleksen2@gmail.com",
//         "username": ctx.from?.username,
//         "password": "Qwe123123",
//         "role": "",
//         "confirmed": true,
//         "telegramID": getUserID(ctx)
//       })
//       await ctx.reply('Зарегистрировали')
//       await ctx.reply("МЕНЮ:", { reply_markup: menu });
//     } else {
//       await ctx.reply('Уже зарегистирован')
//       await ctx.reply("МЕНЮ:", { reply_markup: menu });
//     }
//     // TO-DO убрать
//   } catch (e) {
//     ctx.reply(`${e}`)
//     ctx.reply('Поймали ошибку')
//     // TO-DO убрать
//   }
// });

// bot.start();