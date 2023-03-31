const client = require('../..')
const chalk = require('chalk')

const Server = require("../../Database/Server")
const mongoose = require('mongoose')
const MyModelX = mongoose.model('Server')

const date = require('date-and-time')

const {
    Routes
} = require("discord-api-types/v10")
const {
    REST
} = require("@discordjs/rest")

client.on("guildCreate", async guild => {


    const GuildData = guild

    const rest = new REST({
        version: "10"
    }).setToken(process.env.TOKEN);
    await rest.put(
        GuildData.id ?
        Routes.applicationGuildCommands(process.env.CLIENT_ID, GuildData.id) :
        Routes.applicationCommands(process.env.CLIENT_ID), {
            body: client.slashCommands
        },
    );

    const users = await MyModelX.findOne({
        guildid: GuildData.id
    })
    if (!users) { // Not Have Data In Database


        const now = new Date();
        const value = date.format(now, 'YYYY/MM/DD HH:mm:ss');

        let iconUrl = `https://cdn.discordapp.com/icons/${GuildData.id}/${GuildData.icon}.webp`


        let X = new Server({
            guildname: GuildData.name,
            guildid: GuildData.id,
            guildicon: iconUrl,
            memberCount: GuildData.memberCount,
            ownerId: GuildData.ownerId,
            CreatedAt: value,
            UpdatedAt: value,
        })
        try {
            X.save().then(() => console.log(chalk.magenta(`${GuildData.name} : SAVE DATA`)));
        } catch (e) {
            console.log(e)
        }
    }
    if (users) { // Have Data In Database

        const now = new Date();
        const value = date.format(now, 'YYYY/MM/DD HH:mm:ss');

        let iconUrl = `https://cdn.discordapp.com/icons/${GuildData.id}/${GuildData.icon}.webp`


        await Server.findOneAndUpdate({
            guildid: GuildData.id
        }, {
            guildname: GuildData.name,
            guildid: GuildData.id,
            guildicon: iconUrl,
            memberCount: GuildData.memberCount,
            ownerId: GuildData.ownerId,
            UpdatedAt: value,
        }, {
            new: true
        }).then(() => console.log(chalk.green(`${GuildData.name} : Updated`)));
    }
})