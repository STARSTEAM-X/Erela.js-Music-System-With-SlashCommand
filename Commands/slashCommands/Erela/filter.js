const { ApplicationCommandType } = require('discord.js');

module.exports = {
    name: 'filter',
    description: "Filter The Music",
	type: ApplicationCommandType.ChatInput,
    cooldown: 1000,
    options: [{
        name: "mode",
        description:'ON OR OFF',
        type: 3,
        choices:[
            {name: "Clear", value: "Clear"},
            {name: "Nightcore", value: "Nightcore"},
            {name: "Daycore", value: "Daycore"},
            {name: "Vaporwave", value: "Vaporwave"},
            {name: "Pop", value: "Pop"},
            {name: "Soft", value: "Soft"},
            {name: "TrebbleBass", value: "TrebbleBass"},
            {name: "EightD", value: "EightD"},
            {name: "Karaoke", value: "Karaoke"},
            {name: "Vibrato", value: "Vibrato"},
            {name: "Tremolo", value: "Tremolo"},
            {name: "Earrape", value: "Earrape"},
            {name: "Distortion", value: "Distortion"},
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

            if(Mode === 'Clear'){
                player.clearFilters(true);
                return interaction.reply(`Filter Set : ${Mode}`);
            }else if(Mode === 'Nightcore'){
                player.setNightcore();
                return interaction.reply(`Filter Set : ${Mode}`);
            }else if(Mode === 'Daycore'){
                player.setDaycore();
                return interaction.reply(`Filter Set : ${Mode}`);
            }else if(Mode === 'Vaporwave'){
                player.setVaporwave();
                return interaction.reply(`Filter Set : ${Mode}`);
            }else if(Mode === 'Pop'){
                player.setPop();
                return interaction.reply(`Filter Set : ${Mode}`);
            }else if(Mode === 'Soft'){
                player.setSoft();
                return interaction.reply(`Filter Set : ${Mode}`);
            }else if(Mode === 'TrebbleBass'){
                player.setTrebbleBass();
                return interaction.reply(`Filter Set : ${Mode}`);
            }else if(Mode === 'EightD'){
                player.setEightD();
                return interaction.reply(`Filter Set : ${Mode}`);
            }else if(Mode === 'Karaoke'){
                player.setKaraoke();
                return interaction.reply(`Filter Set : ${Mode}`);
            }else if(Mode === 'Vibrato'){
                player.setVibrato();
                return interaction.reply(`Filter Set : ${Mode}`);
            }else if(Mode === 'Tremolo'){
                player.setTremolo();
                return interaction.reply(`Filter Set : ${Mode}`);
            }else if(Mode === 'Earrape'){
                player.setEarrape();
                return interaction.reply(`Filter Set : ${Mode}`);
            }else if(Mode === 'Distortion'){
                player.setDistortion();
                return interaction.reply(`Filter Set : ${Mode}`);
            }
        } catch (e) {
            console.log(e)
            return interaction.reply(e)
        }
    }
};