import { isToday } from "../utils/date";
import { userRepository } from "../database/repositories/users";
import { workoutRepository } from "../database/repositories/workout";
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle
} from "discord.js";

const button = new ButtonBuilder({
  custom_id: "register",
  style: ButtonStyle.Primary,
  label: "Registrar",
});

export const workoutModal = async (interaction) => {
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
    return buildModal(interaction);
  }

  // check if workout was done today
  const checkDate = isToday(new Date(workout?.createdAt));

  if (checkDate) {
    return interaction.user.send({
      content: `Você já registrou um treino hoje!`,
    });
  }

  return buildModal(interaction);
};

function buildModal(interaction) {
  const modal = new ModalBuilder()
    .setCustomId("workoutModal")
    .setTitle("Registre seu treino");

  const category = new TextInputBuilder()
    .setCustomId("category")
    .setLabel("Categoria")
    .setPlaceholder("Escolha uma categoria, ex: musculação")
    .setStyle(TextInputStyle.Short);

  const description = new TextInputBuilder()
    .setCustomId("description")
    .setLabel("Descrição")
    .setStyle(TextInputStyle.Paragraph);

  const firstActionRow = new ActionRowBuilder().addComponents(category);
  const secondActionRow = new ActionRowBuilder().addComponents(description);

  modal.addComponents(
    firstActionRow as ActionRowBuilder<TextInputBuilder>,
    secondActionRow as ActionRowBuilder<TextInputBuilder>,
  );

  return interaction.showModal(modal);
}
