require('dotenv').config()
const { Bot, GrammyError, HttpError, Keyboard, InlineKeyboard } = require('grammy');


const { hydrate } = require('@grammyjs/hydrate')
const bot = new Bot(process.env.BOT_API_KEY);
bot.use(hydrate());

bot.command('start' , async (ctx) => {
	await ctx.react('👍')
	await ctx.reply("Hello I am Bot", {
		reply_parameters: {message_id: ctx.msg.message_id}
	});
})

bot.command('mood', async (ctx) => {
	const moodKeyboard = new Keyboard().text('Good').row().text('Normal').row().text('Bad').resized().oneTime()
	await ctx.reply('What is your mood?', {
		reply_markup: moodKeyboard
	})
})

bot.command('share', async (ctx) => {
	const shareKeyboard = new Keyboard().requestLocation('Location').requestContact('Contact').requestPoll('Poll').placeholder('Share something....').resized().oneTime()

	await ctx.reply('What do you wnat to share?', {
		reply_markup: shareKeyboard
	})
})

bot.command('Owner' , async (ctx) => {
	await ctx.reply('My Owner is @ismail5400')
})

bot.on(':contact' , async (ctx) => {
	await ctx.reply('Thanks for contact me!')
})

bot.hears('Good' , async (ctx) => {
	await ctx.reply ("Cool!")
})

bot.hears('Normal' , async (ctx) => {
	await ctx.reply("Good!")
})

bot.hears('Bad', async (ctx) => {
	await ctx.reply("Dont worry)")
})

bot.hears('ID', async (ctx) => {
	await ctx.reply(`Your ID is: ${ctx.from.id}`)
})



bot.on('message:text' , async (ctx) => {
	await ctx.reply('We need to think about it....')
})
bot.on('message:voice', async(ctx) => {
	await ctx.reply('I cant listen voice messages')
})

bot.api.setMyCommands([
	{
		command: 'start', description: 'Start bot',
	},
	{
		command: 'mood', description: 'Mood',
	},
	{
		command: 'share', description: 'Share',
	},
]),



// bot.on('msg', async (ctx) => {
// 	console.log(ctx.from);
// })



bot.command(['say_hello', 'hello', 'say_hi'], async (ctx) =>{
	await ctx.reply('Hello!')
})



bot.catch((error) => {
	const ctx = err.ctx;
	console.error(`Error while handling update ${ctx.update.update_id}:`)
	const e = err.error;

	if(e instanceof GrammyError) {
		console.error("Error in request:", e.description);
	} else if (e instanceof HttpError) {
		console.error("Could not contact Telegram:", e);
	} else {
		console.error("Unknown error:", e);
	}
})

bot.start();