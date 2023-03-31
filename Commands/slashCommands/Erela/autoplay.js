const { ApplicationCommandType } = require('discord.js');

module.exports = {
    name: 'autoplay',
    description: "Autoplay The Music",
	type: ApplicationCommandType.ChatInput,
    cooldown: 1000,
    options: [{
        name: "mode",
        description:'ON OR OFF',
        type: 3,
        choices:[
            {name: "ON", value: "ON"},
            {name: "OFF", value: "OFF"},
        ],
        required: true
      },
    ],
    run: async (client, interaction) => {
        try {
            if (!interaction.member.voice.channel) return interaction.reply("you need to join a voice channel.")
            const player = await client.manager.players.get(interaction.guildId)
            if (!player || !player.playing) {
                interaction.reply('there is no music playing!');
                return
            }

            const Mode = await interaction.options.getString('mode')

            if(Mode === 'ON'){
                client.manager.players.setAutoplay = true
                player.queue.shuffle();
                return interaction.reply('Autoplay this Music!');
            }else if(Mode === 'OFF'){
                client.manager.players.setAutoplay = false
                return interaction.reply('Cancal Autoplay this Music!');
            }
        } catch (e) {
            console.log(e)
            return interaction.reply(e)
        }
    }
};