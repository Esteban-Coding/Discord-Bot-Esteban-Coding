const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
} = require("discord.js");

const { Guilds, GuildMembers, GuildMessages, GuildVoiceStates } =
  GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember, Channel } = Partials;

const { loadEvents } = require("./Handlers/eventHandler");
const { loadCommands } = require("./Handlers/commandHandler");

const client = new Client({
  intents: [Guilds, GuildMembers, GuildMessages, GuildVoiceStates],
  partials: [User, Message, GuildMember, ThreadMember, Channel],
});

client.commands = new Collection();
client.config = require("./config.json");

client.login(client.config.token).then(() => {
  loadEvents(client);
  loadCommands(client);
});

require(`./Handlers/antiCrash`)(client);

client.on("ready", () => {});

client.on("guildMemberAdd", () => {});

let voiceManager = new Collection();
const { voiceStateUpdate } = require("./Events/Client/voiceStateUpdate.js");
client.on("voiceStateUpdate", async (oldState, newState) => {
  voiceStateUpdate(voiceManager, oldState, newState);
});

const { interactionButton } = require("./Events/Client/interactionButton.js");
client.on("interactionCreate", async (interaction) => {
  if (interaction.isButton()) {
    interactionButton(interaction, client);
  }
});
