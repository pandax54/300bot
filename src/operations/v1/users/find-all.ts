
import { Operation } from '../../operations'
import { userRepository } from '../../../database/repositories/users'
import { User } from '../../../database/models/users'


class GetAllUsers extends Operation<never, User[]> {
  protected async run(): Promise<User[]> {
    const users = await userRepository.findAllWithWorkouts()
    return users
  }
}

export const getAllUsers = new GetAllUsers()
