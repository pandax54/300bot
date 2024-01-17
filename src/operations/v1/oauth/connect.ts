import { Operation } from "../../operations";
import { DiscordCredentials } from "../../../database/models/discord";
import { discordRepository } from "../../../database/repositories/discord";
import axios from "axios";
import config from "../../../config";

export type Input = Partial<DiscordCredentials>;

class OauthConnect extends Operation<Input, void> {
  protected async run(requestData: Input): Promise<void> {
    const { code, permissions, guildId } = requestData;

    console.log("code", code);

    await discordRepository.insert({
      code,
      permissions,
      guild_id: guildId,
    });

    // if (code) {
    //   const body = new URLSearchParams({
    //     client_id: config.discord.clientId,
    //     client_secret: config.discord.clientSecret,
    //     code,
    //     grant_type: "authorization_code",
    //     redirect_uri: config.discord.redirectUri,
    //     scope: "identify",
    //   }).toString();

    //   const tokenResponseData = await axios.post(
    //     "https://discord.com/api/oauth2/token",
    //     body,
    //     {
    //       headers: {
    //         "Content-Type": "application/x-www-form-urlencoded",
    //       },
    //     }
    //   );

    //   const oauthData = await tokenResponseData.data.json();

    //   const userResult = await axios.get("https://discord.com/api/users/@me", {
    //     headers: {
    //       authorization: `${oauthData.token_type} ${oauthData.access_token}`,
    //     },
    //   });

    //   console.log(await userResult.data.json());
    // }
  }
}

export const oauthConnect = new OauthConnect();
