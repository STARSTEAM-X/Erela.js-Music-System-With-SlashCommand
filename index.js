const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const { Manager } = require("erela.js");
const filterPlugin = require("erela.js-filter")
const chalk = require('chalk')

const client = new Client({
	intents: [
		GatewayIntentBits.DirectMessageReactions,
		GatewayIntentBits.DirectMessageTyping,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.GuildBans,
		GatewayIntentBits.GuildEmojisAndStickers,
		GatewayIntentBits.GuildIntegrations,
		GatewayIntentBits.GuildInvites,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildMessageTyping,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.GuildScheduledEvents,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildWebhooks,
		GatewayIntentBits.Guilds,
		GatewayIntentBits.MessageContent,
	],
	partials: [
		Partials.Channel,
		Partials.Message,
		Partials.User,
		Partials.GuildMember,
		Partials.Reaction
	]
});

const config = require('./config.json');
require('dotenv').config()

client.commands = new Collection()
client.aliases = new Collection()
client.events = new Collection();
client.slashCommands = new Collection();
client.prefix = config.prefix

module.exports = client;

const nodes = [{ host: config.Lavalink_Host, password: config.Lavalink_Password, port: parseInt(config.Lavalink_Port)}];
client.manager = new Manager({
	nodes,
	send: (id, payload) => {
	  const guild = client.guilds.cache.get(id);
	  if (guild) guild.shard.send(payload);
	},
	autoPlay: true,
	plugins: [new filterPlugin()]
});

client.manager.players.setAutoplay = false
client.manager.players.LastPlay = ""


client.manager.on("nodeConnect", node => {
	console.log(chalk.cyan(`Erela.js Connect To "${node.options.identifier}" Status : connected.`))
})

// client.manager.on("nodeError", (node, error) => {
//     console.log(`Node "${node.options.identifier}" encountered an error: ${error.message}.`)
// })


client.manager.on("trackStart", (player, track) => {
	client.manager.players.LastPlay = track
	const channel = client.channels.cache.get(player.textChannel);
	channel.send(`Now playing: \`${track.title}\``);
	// console.log(`Now playing: \`${track.title}\``);
});

client.manager.on("queueEnd", async player => {
	let Autoplay = client.manager.players.setAutoplay
	let LastPlay = client.manager.players.LastPlay

	const random = async() =>{
		const artist = LastPlay.author;
		const searchResult = await player.search(artist)
		const track = searchResult.tracks[Math.floor(Math.random() * searchResult.tracks.length)];
		if (track.author === artist) {
			player.queue.add(track);
			// console.log(`Added song "${track.title}" by "${track.author}" to the queue`);
			player.play()
		}else{
			random()
		}
	}
	if(!Autoplay){
		const channel = client.channels.cache.get(player.textChannel);
		channel.send("Queue has ended.");
		console.log("Queue has ended.");
		player.destroy();
	}else{
		random()
	}
});

client.on("raw", d => client.manager.updateVoiceState(d));

['events','prefixCommands', 'slashCommand'].forEach((handler) => {
  require(`./Handlers/${handler}`)(client)
});

client.login(process.env.TOKEN)
