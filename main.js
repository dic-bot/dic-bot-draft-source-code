// Response for Uptime Robot
const http = require("http");
http
  .createServer(function(request, response) {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Discord bot is active now \n");
  })
  .listen(3000);

// Discord bot implements
const Discord = require("discord.js");
const Client = new Discord.Client();
//##bot#######################################################################################################################
Client.on("ready", message => {
  console.log("準備完了");
});
Client.on("message", message => {
  if (message.author.bot) {
    return;
  }
  if (message.content.match(/^db~s-contact /i)) {
    let embed = new Discord.MessageEmbed();
    message.channel.send(
      embed
        .setColor(0x0328fc)
        .setTitle("連絡が完了しました！")
        .setDescription(
          `『${message.content.replace(/^db~s-contact /i, "")}』
ご連絡ありがとうございます。
後日開発チームよりDMを送信いたします。`
        )
    );
    Client.channels.cache
      .get("705629969199398912")
      .send(
        `**<@${
          message.author.id
        }>さんからの連絡**\n連絡内容：\n===============\n${message.content.replace(
          /^db~s-contact /i,
          ""
        )}\n===============`
      );
  }
  if (message.content.match(/^db~s-news /i)) {
    const ch_name = "db-お知らせ";
    let embed = new Discord.MessageEmbed()
      .setColor(0x0328fc)
      .setTitle("開発チームより")
      .setDescription(message.content.replace(/^db~s-news /i, ""))
    Client.channels.cache.forEach(channel => {
      if (channel.name === ch_name) {
        channel.send(embed)
      }
    });
  }
});

//############################################################################################################################
if (process.env.DISCORD_BOT_TOKEN == undefined) {
  console.log("please set ENV: DISCORD_BOT_TOKEN");
  process.exit(0);
}

Client.login(process.env.DISCORD_BOT_TOKEN);
