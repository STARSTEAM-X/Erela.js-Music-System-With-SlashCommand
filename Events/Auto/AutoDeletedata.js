const client = require('../..')

const chalk = require('chalk')


const Server = require("../../Database/Server")
const Level = require("../../Database/Level")
const mongoose = require('mongoose')
const MyModelX = mongoose.model('Server')
const MyModel = mongoose.model('Level')

client.on('guildDelete', async guild => {

    const GuildData = guild

    try {
        MyModelX.findOneAndDelete({
            guildid: GuildData.id
        }, function (err, docs) {
            if (err) {
                console.log(err)
            } else {
                console.log(chalk.red(`${docs.guildname} : Deleted`))
            }
        });
    } catch (e) {
        console.log(e)
    }

});