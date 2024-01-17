import { userRepository } from "../database/repositories/users";
import {
  ButtonBuilder,
  ButtonStyle,
  Message,
} from "discord.js";

const registerBtn = new ButtonBuilder({
  custom_id: "register",
  style: ButtonStyle.Primary,
  label: "registrar treino",
});

const numberOfWorkoutsBtn = new ButtonBuilder({
  custom_id: "tracking-workouts",
  style: ButtonStyle.Primary,
  label: "Contar treinos",
});

const profileBtn = new ButtonBuilder({
  custom_id: "profile",
  style: ButtonStyle.Primary,
  label: "Ver perfil",
});

export const optionsButtons = async (msg: Message<boolean>) => {
  console.log(msg.author.id);
  console.log(msg.author);
  const user = await userRepository.findByDiscordId(msg.author.id);

  if (!user) {
    return msg.author.send({
      content: "Você não está inscrito no desafio #300",
    });
  }

  if (user?.role !== "user") {
    return msg.reply({
      content: "Você não tem permissão para usar esse comando",
    });
  }

  return msg.reply({
    content: "Selecione uma opção",
    components: [
      {
        type: 1,
        components: [registerBtn, numberOfWorkoutsBtn, profileBtn],
      },
    ],
  });
};
