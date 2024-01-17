import { CacheType, ModalSubmitInteraction } from "discord.js";
import { userRepository } from "../database/repositories/users";
import { UserRole } from "../utils/enums";


export const submitSubscription = async (interaction: ModalSubmitInteraction<CacheType>) => {
  
  const field = interaction.components.map(item => {
    return {
      name: item.components[0].customId,
      value: item.components[0].value,
    }
  })

  try {
    const user = await userRepository.insert({
      discordId: interaction.user.id,
      discordAuthor: JSON.stringify(interaction.user),
      name: field.find(item => item.name === "name")?.value ?? "",
      initialNumberOfWorkouts: Number(field.find(item => item.name === "initialNumberOfWorkouts")?.value ?? 0),
      email: field.find(item => item.name === "email")?.value ?? "",
      goal: Number(field.find(item => item.name === "goal")?.value) ?? 300,
      role: UserRole.user,
    });
  
    return interaction.user.send({
      content: "Obrigado por se inscrever no desafio #300",
    });
  } catch (error) {
    console.error("error:", error);
  }
};
