// server koa
import Koa from "koa";
import Router from "koa-router";
require("dotenv").config();
import {
  Client,
  GatewayIntentBits,
  ButtonBuilder,
  ButtonStyle,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} from "discord.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const app = new Koa();

const router = new Router();

router.get("/", async (ctx) => {
  ctx.body = "hello world";
});

router.get("/connect", async (ctx) => {
  ctx.body = "hello world";

  // https://cbe4-201-2-148-184.ngrok-free.app/connect?code=0cDGZQAEIMd8Aq5WdA2sbOgyw8rbPc&guild_id=1195364594886119486&permissions=8
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3008, () => {
  console.log("server is running at http://localhost:3008");
});

const button = new ButtonBuilder({
  custom_id: "a cool button",
  style: ButtonStyle.Primary,
  label: "Click Me",
});

client.on("ready", () => {
  console.log(`Logged in as ${client?.user?.tag}!`);
});

client.login(process.env.CLIENT_TOKEN);

// listen to events

// listen every message created in the server
client.on("messageCreate", (msg) => {
  console.log("msg:", msg.content);
  if (msg.content === "Hello") {
    //  msg.author.send('hello back'); // respond to the user in private
    msg.author.send({
      content: "hello back",
      components: [
        {
          type: 1,
          components: [button],
        },
      ],
    }); // respond to the user in private
    //  msg.reply(`Hello ${msg.author.username}`); // respond to the user in the channel
  }
});

client.on("interactionCreate", async (interaction) => {
  console.log("interaction:", interaction);

  if (interaction.isModalSubmit()){
    console.log('modal submit:', JSON.stringify(interaction, null, 2));
    await interaction.reply({
      content: 'Thanks for submitting!',
      ephemeral: true
    });
  }
  
  if (interaction.isButton()) {
    if (interaction.customId === "a cool button") {
      // Create the modal
      const modal = new ModalBuilder()
        .setCustomId("myModal")
        .setTitle("My Modal");
  
      // Add components to modal
  
      // Create the text input components
      const favoriteColorInput = new TextInputBuilder()
        .setCustomId("favoriteColorInput")
        // The label is the prompt the user sees for this input
        .setLabel("What's your favorite color?")
        // Short means only a single line of text
        .setStyle(TextInputStyle.Short);
  
      const hobbiesInput = new TextInputBuilder()
        .setCustomId("hobbiesInput")
        .setLabel("What's some of your favorite hobbies?")
        // Paragraph means multiple lines of text.
        .setStyle(TextInputStyle.Paragraph);
  
      // An action row only holds one text input,
      // so you need one action row per text input.
      const firstActionRow = new ActionRowBuilder().addComponents(
        favoriteColorInput
      );
      const secondActionRow = new ActionRowBuilder().addComponents(hobbiesInput);
  
      // Add inputs to the modal
      modal.addComponents(
        firstActionRow as ActionRowBuilder<TextInputBuilder>,
        secondActionRow as ActionRowBuilder<TextInputBuilder>
      );
  
      // Show the modal to the user
      await interaction.showModal(modal);
    }

  }

});
