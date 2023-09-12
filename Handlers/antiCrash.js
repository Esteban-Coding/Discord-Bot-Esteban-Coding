const { EmbedBuilder, WebhookClient } = require(`discord.js`);
const { inspect } = require("util");
const webhook = new WebhookClient({
  url: "https://discord.com/api/webhooks/1099878023706198118/TBmouubvr3RZSNX2Gwe2UDgtkgyQr4rqL_mrM-4ZyIrk7609upsPfPh9H3g91FRPICXf",
});

module.exports = (client) => {
  const embed = new EmbedBuilder().setColor("Red");
  client.on("error", (err) => {
    console.log(err);
    embed
      .setTitle("Discord API Error")
      .setURL("https://discordjs.guide/popular-topics/errors.html#api-errors")
      .setDescription(
        `\`\`\`${inspect(err, { depth: 0 }).slice(0, 1000)}\`\`\``
      )
      .setTimestamp();
    return webhook.send({ embeds: [embed] });
  });

  process.on("unhandledRejection", (reason, promise) => {
    console.log(reason, "\n", promise);
    embed
      .setTitle("Unhandled Rejection/Catch")
      .setURL("https://nodejs.org/api/process.html#event-unhandledrejection")
      .addFields(
        {
          name: "Reason",
          value: `\`\`\`${inspect(reason, { depth: 0 }).slice(0, 1000)}\`\`\``,
        },
        {
          name: "Promise",
          value: `\`\`\`${inspect(promise, { depth: 0 }).slice(0, 1000)}\`\`\``,
        }
      )
      .setTimestamp();
    return webhook.send({ embeds: [embed] });
  });

  process.on("uncaughtException", (err, origin) => {
    console.log(err, "\n", origin);
    embed
      .setTitle("Unhandled Exception")
      .setURL("https://nodejs.org/api/process.html#event-uncaughtexception")
      .addFields(
        {
          name: "Error",
          value: `\`\`\`${inspect(err, { depth: 0 }).slice(0, 1000)}\`\`\``,
        },
        {
          name: "Origin",
          value: `\`\`\`${inspect(origin, { depth: 0 }).slice(0, 1000)}\`\`\``,
        }
      )
      .setTimestamp();
    return webhook.send({ embeds: [embed] });
  });

  process.on("uncaughtExceptionMonitor", (err, origin) => {
    console.log(err, "\n", origin);
    embed
      .setTitle("Unhandled Exception Monitor")
      .setURL(
        "https://nodejs.org/api/process.html#event-uncaughtexceptionmonitor"
      )
      .addFields(
        {
          name: "Error",
          value: `\`\`\`${inspect(err, { depth: 0 }).slice(0, 1000)}\`\`\``,
        },
        {
          name: "Origin",
          value: `\`\`\`${inspect(origin, { depth: 0 }).slice(0, 1000)}\`\`\``,
        }
      )
      .setTimestamp();
    return webhook.send({ embeds: [embed] });
  });
};
