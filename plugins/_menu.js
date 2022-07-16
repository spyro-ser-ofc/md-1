const bot = require('../lib/events')
const {
	ctt,
	addSpace,
	textToStylist,
	PREFIX,
	getUptime,
	PLUGINS,
	getRam,
} = require('../lib/')
const { VERSION } = require('../config')
bot.addCommand(
	{
		pattern: 'menu ?(.*)',
		fromMe: true,
		dontAddCommandList: true,
	},
	async (message, match) => {
		const date = new Date()
		let CMD_HELP = `╭────────────────╮
						Sᴘʏʀᴏ 
╰────────────────╯

╭────────────────
│ Pʀᴇғɪx : ${PREFIX}
│ Usᴇʀ : ${message.pushName}
│ Tɪᴍᴇ : ${date.toLocaleTimeString()}
│ Dᴀʏ : ${date.toLocaleString('en', { weekday: 'long' })}
│ Dᴀᴛᴇ : ${date.toLocaleDateString('hi')}
│ Vᴇʀsɪᴏɴ : ${VERSION}
│ Pʟᴜɢɪɴs : ${PLUGINS.count}
│ Rᴀᴍ : ${getRam()}
│ Uᴘᴛɪᴍᴇ : ${getUptime('t')}
╰────────────────
╭────────────────
`
		const commands = []
		bot.commands.map(async (command, index) => {
			if (
				command.dontAddCommandList === false &&
				command.pattern !== undefined
			) {
				commands.push(ctt(command.pattern))
			}
		})
		commands.forEach((command, i) => {
			CMD_HELP += `│ ${i + 1} ${addSpace(
				i + 1,
				commands.length
			)}${textToStylist(command.toUpperCase(), 'mono')}\n`
		})
		CMD_HELP += `╰────────────────`
		return await message.sendMessage('```' + CMD_HELP + '```')
	}
)
