import { ButtonInteraction } from "discord.js";
import { userRepository } from "../database/repositories/users";

export const trackingCode = async (interaction: ButtonInteraction) => {
  const user = await userRepository.findByDiscordId(interaction.user.id);

  const savedWorkouts = user?.workouts?.length ?? 0;

  if (!user) {
    return interaction.user.send({
      content: "Você não está inscrito no desafio #300",
    });
  }

  return interaction.user.send({
    embeds: [
      {
        fields: [
          {
            name: "Treinos realizados/objetivo",
            value: (savedWorkouts + user.initialNumberOfWorkouts) + "/" + user.goal,
          },
        ],
      },
    ],
  });
};
