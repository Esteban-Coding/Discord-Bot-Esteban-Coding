const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("commands")
    .setDescription(
      "📋 Muestra la lista de comandos disponibles para los moderadores (ADMIN)"
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  execute(interaction, client) {
    interaction.reply({
      content: ":white_check_mark: ***COMMAND EXECUTED***",
      ephemeral: true,
    });

    const embedBAN = new EmbedBuilder()
      .setTitle("MODERACIÓN")
      .setDescription(
        `Los siguientes comandos son de mucha importancia para mantener el orden y facilitar la gestión del grupo. Su uso inadecuado puede llegar a ser distituido de dicho rol de moderador, inclusive puede llegar a ser baneado del grupo en casos extremos. Manten tu postura y cordialidad con este rol.`
      )
      .setColor("#3498db")
      .addFields(
        { name: "COMANDOS", value: `\u200B` },
        { name: "🔇 ⋅ /MUTE", value: `Silencia a un usuario` },
        { name: "🚷 ⋅ /KICK", value: `Expulsa a un usuario` },
        { name: "🚷♾️ ⋅ /BAN", value: `Banea a un usuario` },
        {
          name: "🧹 ⋅ /CLEAR",
          value: `Eliminar cierta cantidad de mensajes de un canal o de un miembro (max 99 por comando)`,
        },
        { name: "🔒⛔ ⋅ /LOCK", value: `Desactivar canal a los miembros` },
        { name: "🔓✅ ⋅ /UNLOCK", value: `Activar canal a los miembros` },
        {
          name: "✂️🎫 ⋅ /CLOSE_TICKET",
          value: `Acaba la conversación del ticket en el que se ejecuta el comando`,
        },
        { name: "📢 ⋅ /POST", value: `Cuadro de contenido personalizado` },
        { name: "🤖💬 ⋅ /SAY", value: `Repite lo que escribas` },
        { name: "📕 ⋅ /RULES", value: `Cartel con las reglas` }
      )
      .setFooter({ text: "version 2" });

    const channel = client.channels.cache.get("1062826719721033869");
    channel.send({ embeds: [embedBAN] });
  },
};
