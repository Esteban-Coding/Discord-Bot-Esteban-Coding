module.exports = {
  name: "ready",
  once: true,

  execute(client) {
    console.log("🟢 BOT ON");

    client.user.setActivity("en Twitch", {
      type: 1,
      url: "https://www.twitch.tv/EstebanCoding",
    });
  },
};
