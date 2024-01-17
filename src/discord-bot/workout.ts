import { Message } from "discord.js";
import { userRepository } from "../database/repositories/users";
import { workoutRepository } from "../database/repositories/workout";
import { isToday } from "../utils/date";
const { DateTime } = require("luxon");

export const workout = async (msg: Message<boolean>) => {
  const user = await userRepository.findByDiscordId(msg.author.id);

  if (!user) {
    return msg.author.send({
      content: "Você não está inscrito no desafio #300",
    });
  }

  // check if user already has a workout registered today
  // if yes, return a message saying that he already has a workout registered
  const workout = await workoutRepository.findByUserIdAndDate(user.id);

  if (!workout) {
    await workoutRepository.insert({
      user_id: user.id,
      category: "strenght",
    });

    return msg.author.send({
      content: `Treino registrado com sucesso!`,
    });
  }

  // check if workout was done today
  const checkDate = isToday(new Date(workout?.createdAt));

  if (checkDate) {
    return msg.author.send({
      content: `Você já registrou um treino hoje!`,
    });
  } else {
    await workoutRepository.insert({
      user_id: user.id,
      category: "strenght",
    });

    return msg.author.send({
      content: `Treino registrado com sucesso!`,
    });
  }
};
