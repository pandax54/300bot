import { ButtonBuilder, ButtonStyle, Message } from "discord.js";
import { userRepository } from "../database/repositories/users";

const button = new ButtonBuilder({
  custom_id: "subscribe",
  style: ButtonStyle.Primary,
  label: "Inscrever-se",
});

export const subscribe = async (msg: Message<boolean>) => {
  
  const user = await userRepository.findByDiscordId(msg.author.id);
  
  // if (user?.role !== "user") {
  //   return msg.reply({
  //     content: "Você não tem permissão para usar esse comando",
  //   });
  // }

  return msg.reply({
    content: "Clique no botão abaixo para se inscrever no desafio #300",
    components: [
      {
        type: 1,
        components: [button],
      },
    ],
  });
};