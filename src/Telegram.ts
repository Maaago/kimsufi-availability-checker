import TelegramBot from "node-telegram-bot-api";

export default class Telegram
{
	telegramBot: TelegramBot | undefined;

	constructor()
	{
		const telegramBotToken = Bun.env.TELEGRAM_BOT_TOKEN;
		if(telegramBotToken)
			this.telegramBot = new TelegramBot(telegramBotToken);
	}

	sendMessage(message: string): void
	{
		if(this.telegramBot)
			this.telegramBot.sendMessage(Bun.env.TELEGRAM_CHAT_ID!, message)
				.catch((e: any) => console.error("Can't send message: "+e.message));
	}
}