require('dotenv').config();
import { Client, GatewayIntentBits } from 'discord.js';
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on('ready', () => {
  console.log(`Logged in as ${client?.user?.tag}!`);
});

// client.on('interactionCreate', async interaction => {
// 	console.log('interaction:', interaction);
//   if (!interaction.isChatInputCommand()) return;

//   if (interaction.commandName === 'ping') {
//     await interaction.reply('Pong!');
//   }
// });

client.login(process.env.CLIENT_TOKEN);

client.on('messageCreate', msg => {
	console.log('msg:', msg.content);
	 if (msg.content === 'Hello') {
		 msg.reply(`Hello ${msg.author.username}`);
	 }
	});