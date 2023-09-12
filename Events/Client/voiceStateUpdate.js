const { ChannelType } = require("discord.js");

async function voiceStateUpdate(voiceManager, oldState, newState) {
  const { member, guild } = oldState;
  const newChannel = newState.channel;
  const oldChannel = oldState.channel;
  const jointocreate = voiceManager.get(member.id);
  const members = oldChannel?.members
    .filter((m) => !m.user.bot)
    .map((m) => m.id);

  if (
    jointocreate &&
    oldChannel.id === jointocreate &&
    (!newChannel || newChannel.id !== jointocreate)
  ) {
    if (members.length > 0) {
      let randomID = members[Math.floor(Math.random() * members.length)];
      let randomMember = guild.members.cache.get(randomID);
      randomMember.voice.setChannel(oldChannel).then((v) => {
        oldChannel
          .setName(`🔹┃${randomMember.user.username}`)
          .catch((e) => null);
        oldChannel.permissionOverwrites.edit(randomMember, {
          Connect: true,
          ManageChannels: true,
          MuteMembers: true,
          KickMembers: true,
          DeafenMembers: true,
        });
      });
      voiceManager.set(member.id, null);
      voiceManager.set(randomMember.id, oldChannel.id);
    } else {
      voiceManager.set(member.id, null);
      oldChannel.delete().catch((e) => null);
    }
  }

  if (
    oldChannel !== newChannel &&
    newChannel &&
    newChannel.id === "1083044213421264956"
  ) {
    const voiceChannel = await guild.channels.create({
      name: `🔹┃${member.user.username}`,
      type: ChannelType.GuildVoice,
      parent: newChannel.parent,
      permissionOverwrites: [
        {
          id: member.id,
          allow: [
            "Connect",
            "ManageChannels",
            "MuteMembers",
            "KickMembers",
            "DeafenMembers",
          ],
        },
        {
          id: "1099895227105427618",
          allow: [
            "Connect",
            "ManageChannels",
            "MuteMembers",
            "KickMembers",
            "DeafenMembers",
          ],
        },
        {
          id: guild.id,
          allow: ["Connect"],
        },
      ],
    });

    voiceManager.set(member.id, voiceChannel.id);

    await newChannel.permissionOverwrites.edit(member, {
      Connect: false,
    });
    setTimeout(() => {
      newChannel.permissionOverwrites.delete(member);
    }, 3000);

    return setTimeout(() => {
      member.voice.setChannel(voiceChannel);
    }, 500);
  }
}

module.exports = {
  voiceStateUpdate,
};
