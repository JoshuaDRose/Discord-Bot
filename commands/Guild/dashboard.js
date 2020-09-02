module.exports.run = async (bot, message, args, settings) => {
  //Check if dashboard is enabled (config.js)
  if (bot.config.Dashboard.enabled == true) {
    message.channel.send(`${bot.config.Dashboard.domain}/manage/${message.guild.id}`)
  }
}
module.exports.config = {
	command: "dashboard",
  	aliases: ["db"]
}
module.exports.help = {
	name: "Dashboard",
	category: "Guild",
	description: "Displays a link to your Server's dashboard.",
	usage: '!dashboard',
}