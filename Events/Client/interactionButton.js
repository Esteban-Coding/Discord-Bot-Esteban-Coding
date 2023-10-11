const {
  ChannelType,
  Embed,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  PermissionFlagsBits,
} = require("discord.js");

async function interactionButton(interaction, client) {
  //CREATE TICKET - @EVERYONE
  if (interaction.customId === "createTicket") {
    let canal = interaction.guild.channels.cache.find(
      (channel) => channel.topic === `${interaction.user.id}`
    );

    if (canal == undefined) {
      canal = await interaction.guild.channels.create({
        name: `📨┃${interaction.user.username}`,
        type: ChannelType.GuildText,
        parent: "1083465280560312380",
        topic: `${interaction.user.id}`,
        permissionOverwrites: [
          {
            id: interaction.user.id,
            allow: [
              "ViewChannel",
              "SendMessages",
              "AttachFiles",
              "CreateInstantInvite",
            ],
          },
          {
            id: interaction.guild.roles.everyone,
            deny: ["ViewChannel"],
          },
          {
            id: "1099895227105427618", //ID MOD ROL
            allow: [
              "ViewChannel",
              "SendMessages",
              "AttachFiles",
              "CreateInstantInvite",
              "ManageChannels",
            ],
          },
        ],
      });

      const embedClose = new EmbedBuilder()
        .setAuthor({
          name: `¡BIENVENID@ A TU TICKET!`,
          iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
        })
        .setDescription(
          `<@${interaction.user.id}>. Especifica tu problema o sugerencia y un <@&1099895227105427618> te responderá lo más pronto posible.`
        )
        .setColor("#2acaea");

      const buttonClose = new ActionRowBuilder().setComponents(
        new ButtonBuilder()
          .setLabel("Cerrar ticket")
          .setEmoji("🗑️")
          .setStyle(ButtonStyle.Danger)
          .setCustomId("closeTicket")
      );

      canal.send({ embeds: [embedClose], components: [buttonClose] });
    }

    interaction.reply({
      content: `:white_check_mark: ***TU TICKET HA SIDO CREADO ***<#${canal.id}>`,
      ephemeral: true,
    });
  }
  //CLOSE TICKETS - @OWNER @MODERADORES
  if (interaction.customId === "closeTicket") {
    if (
      interaction.member.roles.cache.has("1099895227105427618") ||
      interaction.member.permissions.has(PermissionFlagsBits.Administrator)
    ) {
      interaction.channel.delete();
    } else {
      interaction.reply({
        content: `🔒 SOLO UN <@&1099895227105427618> PUEDE REALIZAR ESTA ACCIÓN.`,
        ephemeral: true,
      });
    }
  }

  //UNMUTE - @MODERADORES
  if (interaction.customId.charAt(0) === "m") {
    if (
      interaction.member.roles.cache.has("1099895227105427618") ||
      interaction.member.permissions.has(PermissionFlagsBits.Administrator)
    ) {
      let avatar = await client.users.fetch(interaction.customId.slice(1));
      const user = interaction.guild.members.cache.get(
        interaction.customId.slice(1)
      );
      try {
        await user.timeout(null);
      } catch {}
      const embedUNMUTE = new EmbedBuilder()
        .setDescription(
          `:sound: **se le elimino el SILENCIO a** <@${interaction.customId.slice(
            1
          )}>`
        )
        .setThumbnail(avatar.displayAvatarURL())
        .setColor("#57F287")
        .setFooter({ text: `por ${interaction.user.username}` });

      interaction.update({ embeds: [embedUNMUTE], components: [] });
    } else {
      interaction.reply({
        content: `🔒 SOLO UN <@&1099895227105427618> PUEDE REALIZAR ESTA ACCIÓN.`,
        ephemeral: true,
      });
    }
  }

  //UNBAN - @MODERADORES
  if (interaction.customId.charAt(0) === "b") {
    if (
      interaction.member.roles.cache.has("1099895227105427618") ||
      interaction.member.permissions.has(PermissionFlagsBits.Administrator)
    ) {
      try {
        await interaction.guild.members.unban(interaction.customId.slice(1));
      } catch {}

      let avatar = await client.users.fetch(interaction.customId.slice(1));

      const embedUNMUTE = new EmbedBuilder()
        .setDescription(
          `:green_circle: **se le elimino el BANEO a** <@${interaction.customId.slice(
            1
          )}>`
        )
        .setThumbnail(avatar.displayAvatarURL())
        .setColor("#57F287")
        .setFooter({ text: `por ${interaction.user.username}` });
      interaction.update({ embeds: [embedUNMUTE], components: [] });
    } else {
      interaction.reply({
        content: `🔒 SOLO UN <@&1099895227105427618> PUEDE REALIZAR ESTA ACCIÓN.`,
        ephemeral: true,
      });
    }
  }
}

module.exports = {
  interactionButton,
};
