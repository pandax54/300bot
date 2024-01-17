export enum Env {
  Local = 'local',
  Production = 'production',
}


const getValuesOf = <K extends string, V>(obj: { [key in K]: V }): K[] =>
  Object.keys(obj).filter((key): key is K => Number.isNaN(Number(key)))

export enum UserRole {
  admin = 'admin',
  user = 'user',
}

export const userRoleValues = getValuesOf(UserRole)


export enum WorkoutCategory {
  strength = 'musculação',
  cardio = 'cardio',
  hiit = 'HIIT',
  yoga = 'yoga',
  pilates = 'pilates',
  running = 'corrida',
  other = 'outros',
  mix = 'combinação de modalidades',
}