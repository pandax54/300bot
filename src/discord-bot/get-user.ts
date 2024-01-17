import { ButtonInteraction } from "discord.js";
import { userRepository } from "../database/repositories/users";

export const getUser = async (interaction: ButtonInteraction) => {
  const user = await userRepository.findByDiscordId(interaction.user.id);

  if (!user) {
    return interaction.user.send({
      content: "Você não está inscrito no desafio #300",
    });
  }

  return interaction.user.send({
    content: `${user?.name} profile`,
    embeds: [
      {
        title: `${user?.name} profile`,
        description: "Informações atualizadas do usuário",
        fields: [
          {
            name: "Name",
            value: user?.name ?? "no name",
          },
          {
            name: "Discord username",
            value: user?.discordAuthor?.globalName ?? "no discord username",
          },
          {
            name: "Email",
            value: user?.email ?? "no email",
          },
          {
            name: "Objetivo",
            value: user?.goal ?? "exercise more",
          },
          {
            name: "Total number of workouts",
            value: String(user?.totalNumberOfWorkouts),
          },
        ],
      },
    ],
  });
};
