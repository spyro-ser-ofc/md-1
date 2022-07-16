const { bot, genHydratedButtons, antiList, enableAntiFake } = require('../lib/')

bot(
	{
		pattern: 'antifake ?(.*)',
		fromMe: true,
		desc: 'set antifake',
		type: 'misc',
		onlyGroup: true,
	},
	async (message, match) => {
		if (!match)
			return await message.sendMessage(
				await genHydratedButtons(
					[
						{
							urlButton: {
								text: 'Example',
								url: 'https://github.com/spyro-ser-ofc/whatsapp-bot-md/wiki/antifake',
							},
						},
						{ button: { id: 'antifake list', text: '𝑳𝑰𝑺𝑻' } },
						{ button: { id: 'antifake on', text: '𝑶𝑵' } },
						{ button: { id: 'antifake off', text: '𝑶𝑭𝑭' } },
					],
					'Antifake'
				),
				{},
				'template'
			)
		if (match == 'list') {
			let list = ''
			let codes = await antiList(message.jid, 'fake')
			await message.sendMessage(codes.join(','))
			codes.forEach((code, i) => {
				list += `${i + 1}. ${code}\n`
			})
			return await message.sendMessage('```' + list + '```')
		}
		if (match == 'on' || match == 'off') {
			await enableAntiFake(message.jid, match)
			return await message.sendMessage(
				`_Antifake ${match == 'on' ? 'Activated' : 'Deactivated'}_`
			)
		}
		await enableAntiFake(message.jid, match)
		return await message.sendMessage('_Antifake Updated_')
	}
)
