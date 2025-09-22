export interface User {
  username: string;
  password: string;
  locked: boolean;
}

export interface UsersRepository {
  findByUsername(username: string): Promise<User | null>;
}

export class AuthService {
  constructor(private usersRepo: UsersRepository) {}

  async login(username: string, password: string): Promise<boolean> {
    const user = await this.usersRepo.findByUsername(username);

    if (!user) return false;        // usuario no existe
    if (user.locked) return false;  // usuario bloqueado
    return user.password === password; // validar contraseña
  }
}
