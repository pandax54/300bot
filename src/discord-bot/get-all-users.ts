import { Message } from "discord.js";
import { userRepository } from "../database/repositories/users";

export const getAllUsers = async (msg: Message<boolean>) => {
  const user = await userRepository.findByDiscordId(msg.author.id);

  if (!user?.role || user?.role !== "admin") {
    return msg.reply(
      "Você não tem permissão para executar esse comando. Somente administradores podem executar esse comando."
    );
  }
  const users = await userRepository.findAllWithWorkouts();

  return msg.author.send({
    content: "Lista de usuários cadastrados",
    embeds: users.map((user) => {
      return {
        title: `${user?.name} profile`,
        description: "Informações atualizadas do usuário",
        fields: [
          {
            name: "Name",
            value: user?.name ?? "no name",
          },
          {
            name: "Discord username",
            value: user?.discordAuthor.globalName ?? "no discord username",
          },
          {
            name: "Email",
            value: user?.email ?? "no email",
          },
          {
            name: "Objetivo",
            value: user?.goal ?? 300,
          },
          {
            name: "Total number of workouts",
            value: String(user?.totalNumberOfWorkouts ?? 0),
          },
        ],
      };
    }),
  });
};
