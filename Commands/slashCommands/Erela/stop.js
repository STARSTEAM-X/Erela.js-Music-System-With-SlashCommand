const { ApplicationCommandType } = require('discord.js');

module.exports = {
    name: 'stop',
    description: "Stop The Music",
	type: ApplicationCommandType.ChatInput,
    cooldown: 1000,
    run: async (client, interaction) => {
        try {
            if (!interaction.member.voice.channel) return interaction.reply("you need to join a voice channel.");
            const player = await client.manager.players.get(interaction.guildId)
            player.queue.clear()
            player.destroy()
            interaction.reply("Stop The Music");
        } catch (e) {
            console.log(e)
            return interaction.reply(e)
        }
    }
};