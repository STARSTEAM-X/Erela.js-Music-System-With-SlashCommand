const { ApplicationCommandType } = require('discord.js');

module.exports = {
    name: 'play',
    description: "Play The Music With Link Or Keyword",
	type: ApplicationCommandType.ChatInput,
    cooldown: 1000,
    options: [{
        name: "music",
        description:'link or keyword',
        type: 3,
        required: true
      },
    ],
    run: async (client, interaction) => {
        try {
            if (!interaction.member.voice.channel) return interaction.reply("you need to join a voice channel.")
            const data = interaction.options.get("music")
            Keyword = await data.value
            res = await client.manager.search(Keyword, interaction.author);
            if (res.loadType === "LOAD_FAILED") throw res.exception;
            const player = client.manager.create({
                guild: interaction.guild.id,
                voiceChannel: interaction.member.voice.channel.id,
                textChannel: interaction.channel.id,
            });
            if(!player.playing){
                player.connect();
            }
            if(res.loadType === "PLAYLIST_LOADED"){
                for (let i = 0; i < res.tracks.length; i++) {
                    await player.queue.add(res.tracks[i]);
                }
            }else{
                await player.queue.add(res.tracks[0]);
            }
            if (!player.playing && !player.paused && !player.queue.size) player.play()
            return interaction.reply(`Queued ${res.tracks[0].title}.`);
        } catch (e) {
            console.log(e)
            return interaction.reply(e)
        }
    }
  };