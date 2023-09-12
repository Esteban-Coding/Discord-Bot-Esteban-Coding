const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("chat_lock")
    .setDescription("🔒⛔ Desactivar canal a los miembros (MOD)")
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  execute(interaction) {
    const { guild, channel } = interaction;

    const embed = new EmbedBuilder()
      .setTitle(`🔒 ESTE CANAL HA SIDO DESACTIVADO TEMPORALMENTE.`)
      .setColor("#ff0000");

    channel.permissionOverwrites.edit(guild.id, { SendMessages: false });

    interaction.reply({ embeds: [embed] });
  },
};
