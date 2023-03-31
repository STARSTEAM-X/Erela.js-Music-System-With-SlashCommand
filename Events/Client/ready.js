const client = require('../..')
const {
	ActivityType
} = require('discord.js')
const chalk = require('chalk')
const mongoose = require('mongoose')
mongoose.set('strictQuery', true);

client.on("ready", () => {
	const activities = [{
			name: `STARSTEAM_X`,
			type: ActivityType.Streaming,
			url: "https://www.twitch.tv/STARSTEAM_X"
		}

		// { name: `Twitch : STARSTEAM_X`, type: ActivityType.Competing },

		// { name: `Twitch : STARSTEAM_X`, type: ActivityType.Custom },

		// { name: `Twitch : STARSTEAM_X`, type: ActivityType.Listening },

		// { name: `Twitch : STARSTEAM_X`, type: ActivityType.Watching },

		// { name: `Twitch : STARSTEAM_X`, type: ActivityType.Playing },

		// { name: `Twitch : STARSTEAM_X`, type: ActivityType.Streaming },

	];
	const status = [
		'online', // ออนไลน์
		// 'dnd', //ไม่อยู่
		// 'idle', // หลับ
		// 'invisible',
		// 'offline',
	];
	let i = 0;
	setInterval(() => {
		if (i >= activities.length) i = 0
		client.user.setActivity(activities[i])
		i++;
	}, 5000);

	let s = 0;
	setInterval(() => {
		if (s >= activities.length) s = 0
		client.user.setStatus(status[s])
		s++;
	}, 30000);


	client.manager.init(client.user.id);
	const Database = process.env.MONGO_DB
	if (Database) {
		mongoose.connect(Database, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		}).then(() => {
			console.log(chalk.cyan("Mongo Database • Connected"))
			console.log(chalk.magenta(`
░██████╗████████╗░█████╗░██████╗░░██████╗████████╗███████╗░█████╗░███╗░░░███╗░░░░░░░░██╗░░██╗
██╔════╝╚══██╔══╝██╔══██╗██╔══██╗██╔════╝╚══██╔══╝██╔════╝██╔══██╗████╗░████║░░░░░░░░╚██╗██╔╝
╚█████╗░░░░██║░░░███████║██████╔╝╚█████╗░░░░██║░░░█████╗░░███████║██╔████╔██║░░░░░░░░░╚███╔╝░
░╚═══██╗░░░██║░░░██╔══██║██╔══██╗░╚═══██╗░░░██║░░░██╔══╝░░██╔══██║██║╚██╔╝██║░░░░░░░░░██╔██╗░
██████╔╝░░░██║░░░██║░░██║██║░░██║██████╔╝░░░██║░░░███████╗██║░░██║██║░╚═╝░██║░░░░░░░░██╔╝╚██╗
╚═════╝░░░░╚═╝░░░╚═╝░░╚═╝╚═╝░░╚═╝╚═════╝░░░░╚═╝░░░╚══════╝╚═╝░░╚═╝╚═╝░░░░░╚═╝████████╚═╝░░╚═╝                                                                                    
		Login 		: ${client.user.tag}
		Devloper 	: ${"STARSTEAM_X"}
		`))
		}).catch((err) => {
			console.log(err)
		});
	}
	console.log(chalk.cyan(`Client Status  • Online`))
});