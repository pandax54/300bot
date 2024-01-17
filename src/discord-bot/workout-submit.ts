import { CacheType, ModalSubmitInteraction } from "discord.js";
import { workoutRepository } from "../database/repositories/workout";
import { WorkoutCategory } from "../utils/enums";
import { userRepository } from "../database/repositories/users";
import { isToday } from "../utils/date";

export const submitWorkout = async (
  interaction: ModalSubmitInteraction<CacheType>
) => {
  
  const field = interaction.components.map((item) => {
    return {
      name: item.components[0].customId,
      value: item.components[0].value,
    };
  });

  const user = await userRepository.findByDiscordId(interaction.user.id);

  if (!user) {
    return interaction.user.send({
      content: "Você não está inscrito no desafio #300",
    });
  }

  // check if user already has a workout registered today
  // if yes, return a message saying that he already has a workout registered
  const workout = await workoutRepository.findByUserIdAndDate(user.id);

  if (!workout) {
    const field = interaction.components.map((item) => {
      return {
        name: item.components[0].customId,
        value: item.components[0].value,
      };
    });

    await workoutRepository.insert({
      userId: user.id,
      description:
        field.find((item) => item.name === "description")?.value ?? "",
      category:
        field.find((item) => item.name === "category")?.value ??
        WorkoutCategory.strength,
    });

    return interaction.user.send({
      content: "Treino registrado com sucesso!",
    });
  } else {
    const checkDate = isToday(new Date(workout?.createdAt));
    console.log(checkDate);

    if (checkDate) {
      return interaction.user.send({
        content: `Você já registrou um treino hoje!`,
      });
    }

    await workoutRepository.insert({
      userId: user.id,
      description:
        field.find((item) => item.name === "description")?.value ?? "",
      category:
        field.find((item) => item.name === "category")?.value ??
        WorkoutCategory.strength,
    });

    return interaction.user.send({
      content: "Treino registrado com sucesso!",
    });

  }
};
