import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  
} from "discord.js";

const button = new ButtonBuilder({
  custom_id: "subscribe",
  style: ButtonStyle.Primary,
  label: "Suscribe",
});

export const subscribeModal = async (interaction) => {
  const modal = new ModalBuilder()
    .setCustomId("subscribeModal")
    .setTitle("Se inscreva no desafio #300");

  // Add components to modal
  // Create the text input components
  const nameInput = new TextInputBuilder()
    .setCustomId("name")
    .setLabel("Nome")
    .setRequired(true)
    .setStyle(TextInputStyle.Short);

  const numberOfWorkoutInput = new TextInputBuilder()
    .setCustomId("initialNumberOfWorkouts")
    .setRequired(false)
    .setLabel("Quantos treinos você já fez até agora?")
    .setPlaceholder("Ex: 300, 250, 200, 150, 100, 50...")
    .setStyle(TextInputStyle.Short);

  const emailInput = new TextInputBuilder()
    .setCustomId("email")
    .setLabel("Email")
    .setRequired(true)
    .setStyle(TextInputStyle.Short);

  const goalInput = new TextInputBuilder()
    .setCustomId("goal")
    .setPlaceholder("Ex: 300, 250... escolha quantos treinos você quer fazer.")
    .setLabel("Qual seu objetivo?")
    .setStyle(TextInputStyle.Short);

  // An action row only holds one text input,
  // so you need one action row per text input.
  const firstActionRow = new ActionRowBuilder().addComponents(nameInput);
  const secondActionRow = new ActionRowBuilder().addComponents(
    numberOfWorkoutInput
  );
  const thirdActionRow = new ActionRowBuilder().addComponents(emailInput);
  const fourthActionRow = new ActionRowBuilder().addComponents(goalInput);

  // Add inputs to the modal
  modal.addComponents(
    firstActionRow as ActionRowBuilder<TextInputBuilder>,
    secondActionRow as ActionRowBuilder<TextInputBuilder>,
    thirdActionRow as ActionRowBuilder<TextInputBuilder>,
    fourthActionRow as ActionRowBuilder<TextInputBuilder>
  );

  // Show the modal to the user
  await interaction.showModal(modal);
};
