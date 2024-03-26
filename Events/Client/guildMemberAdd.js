async function guildMemberAdd(client) {
  const Discord = require("discord.js");
  const Canvas = require("canvas");
  const { registerFont } = require("canvas");
  const canvas = Canvas.createCanvas(1028, 468);
  const ctx = canvas.getContext("2d");

  registerFont("./Resources/Milky-Honey.ttf", { family: "Milky Honey" });

  const background = await Canvas.loadImage(
    "https://cdn.discordapp.com/attachments/1061773400336519179/1222038226966155315/welcome.jpg?ex=6614c2c9&is=66024dc9&hm=19b249751c7469e3104e3c952ddd84b9e6b9f5261aedbd8c0b6d50e1894df16e&"
  );
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  ctx.textAlign = "center";
  ctx.fillStyle = "#ffffff";
  ctx.font = `60px "Milky Honey", "Sans"`;
  ctx.fillText(`${client.user.username}`, 514, 400);
  ctx.textAlign = "center";
  ctx.beginPath();
  ctx.arc(514, 161, 124, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();
  ctx.textAlign = "center";
  const avatar = await Canvas.loadImage(
    client.user.displayAvatarURL({
      size: 1024,
      dynamic: false,
      extension: "jpg",
    })
  );
  ctx.drawImage(avatar, 390, 35, 255, 255);
  const attachment = new Discord.AttachmentBuilder(
    canvas.toBuffer(),
    "./Resources/welcome.jpg"
  );
  client.guild.channels.cache.get("1061773400336519179").send({
    content: `:wave: **¡SALUDOS <@${client.user.id}>!**\n**Echa un vistazo al <#1057754123342184479>.**\n**¡Espero que disfrutes nuestra comunidad!**`,
    files: [attachment],
  });
}

module.exports = {
  guildMemberAdd,
};
