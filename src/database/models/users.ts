import { join } from "path";
import type { Pojo, RelationMappings } from "objection";
import { Model } from "objection";
import { BaseModel } from "./base";
import { lowerCaseObjectProperty } from "../../utils/helpers";
import { UserRole } from "../../utils/enums";

interface Workout {
  userId: number;
  description: string;
  category: string;
}

interface DiscordAuthor {
  id: string;
  bot: boolean;
  system: boolean;
  flags: { bitfield: number };
  username: string;
  globalName: string;
  discriminator: string;
  avatar: string;
  banner?: string;
  accentColor?: string;
  avatarDecoration: string | null;
}

export class User extends BaseModel {
  static tableName = "users";

  name!: string;
  discordId!: string;
  discordAuthor!: DiscordAuthor;
  email!: string;
  goal!: string;
  role!: UserRole;
  initialNumberOfWorkouts!: number;

  workouts?: Workout[];

  static get virtualAttributes() {
    return [
      "totalNumberOfWorkouts"
    ];
  }

  get totalNumberOfWorkouts(): number {
    return this.initialNumberOfWorkouts + (this.workouts?.length || 0);
  }

  static relationMappings(): RelationMappings {
    return {
      workouts: {
        relation: Model.HasManyRelation,
        modelClass: join(__dirname, "workouts"),
        join: {
          from: "users.id",
          to: "workouts.userId",
        },
      },
    };
  }

  $formatDatabaseJson(json: Pojo): Pojo {
    json = super.$formatDatabaseJson(json);

    return lowerCaseObjectProperty(json, "email");
  }
}
