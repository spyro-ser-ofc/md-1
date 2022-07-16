const { bot } = require('../lib/')

bot(
	{ pattern: 'ping ?(.*)', fromMe: true, desc: 'To check ping' },
	async (message, match) => {
		const start = new Date().getTime()
		await message.sendMessage('```𝐏𝐈𝐍𝐆!```')
		const end = new Date().getTime()
		return await message.sendMessage(
			'*𝐏𝐎𝐍𝐆!*\n ```' + (end - start) + '``` *ms*'
		)
	}
)
