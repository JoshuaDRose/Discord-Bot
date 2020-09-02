const Discord = require('discord.js')
const { Globalban } = require('../../modules/models')
module.exports.run = async (bot, message, args, settings) => {
	//Make sure only bot owner can do this command
	if (message.author.id !== bot.config.ownerID) return
	//delete message
	if (message.deletable) message.delete()
	//Get user and reason
	let banned = message.mentions.users.first() || bot.users.resolve(args[0])
	let bReason = (args.join(" ").slice(22)) ? args.join(" ").slice(22) : "No reason given"
	//Make sure user was found
	if (!banned) return	message.channel.send({embed:{color:15158332, description:`${bot.config.emojis.cross} I was unable to find this user.`}}).then(m => m.delete({ timeout: 10000 }))

	Globalban.findOne({
		userID: banned.id,
	}, (err, res) => {
		if (err) console.log(err)
		if (!res) {
			const newBan = new Globalban({
				userID: banned.id,
				guildID: message.guild.id,
				reason: bReason
			})
			newBan.save().catch(e => console.log(e))
			var embed = new Discord.MessageEmbed()
				.setColor(8359053)
				.setAuthor(`[GLO-BAN] ${banned.username}#${banned.discriminator} has been globally banned`, `${(banned.avatar) ? `https://cdn.discordapp.com/avatars/${banned.id}/${banned.avatar}.png` : `https://cdn.discordapp.com/embed/avatars/${banned.discriminator % 5}.png`}`)
				.setDescription(`**Reason:** ${bReason}`)
			//ban user
			message.guild.member(banned).ban({ reason: bReason })
			//send message
			message.channel.send(embed).then(m => m.delete({ timeout: 10000 }))
		} else {
			message.channel.send({embed:{color:15158332, description:`${bot.config.emojis.cross} User is already globally banned.`}}).then(m => m.delete({ timeout: 10000 }))
		}
	})
}
module.exports.config = {
	command: "addban",
	aliases: ["addban"]
}
module.exports.help = {
	name: "Addban",
	category: "Host",
	description: "Add a ban to the global ban",
	usage: '!addban {user} [reason]',
}