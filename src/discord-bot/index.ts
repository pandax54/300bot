import { Client, GatewayIntentBits, Interaction, Message } from "discord.js";
// import { getAllUsers } from "./get-all-users";
import { getUser } from "./get-user";
import { subscribe } from "./subscribe-button";
import { subscribeModal } from "./subscribe-modal";
import { submitSubscription } from "./subscribe-submit";
// import { workout } from "./workout";
import { optionsButtons } from "./options-button";
import { workoutModal } from "./workout-modal";
import { submitWorkout } from "./workout-submit";
import { trackingCode } from "./tracking-code";

export const botInit = function () {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.DirectMessages,
      GatewayIntentBits.MessageContent,
    ],
  });

  client.on("ready", () => {
    console.log(`Logged in as ${client?.user?.tag}!`);
  });

  client.login(process.env.CLIENT_TOKEN);

  // listen every message created in the server
  client.on("messageCreate", async (msg: Message<boolean>) => {
    switch (msg.content) {
      // case "users":
      //   getAllUsers(msg);
      //   break;
      // case "workout":
      //   workout(msg);
      //   break;
      case "options":
        optionsButtons(msg);
        break;
      case "subscribe":
        subscribe(msg);
        break;
      default:
        break;
    }
  });

  client.on("interactionCreate", async (interaction: Interaction) => {
    if (interaction.isModalSubmit()) {
      switch (interaction.customId) {
        case "subscribeModal":
          submitSubscription(interaction);
          interaction.deferUpdate();
          break;
        case "workoutModal":
          submitWorkout(interaction);
          interaction.deferUpdate();
          break;
        default:
          break;
      }
    }

    if (interaction.isButton()) {
      switch (interaction.customId) {
        case "subscribe":
          subscribeModal(interaction);
          break;
        case "profile":
          getUser(interaction);
          interaction.deferUpdate();
          break
        case "tracking-workouts":
          trackingCode(interaction);
          interaction.deferUpdate();
          break;
        case "register":
          await workoutModal(interaction);
          break;
        default:
          break;
      }
    }
  });
};
