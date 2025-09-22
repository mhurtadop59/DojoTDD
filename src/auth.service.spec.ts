import { AuthService, UsersRepository, User } from './auth.service';
import { describe, it, expect } from '@jest/globals';

describe('AuthService', () => {
  let service: AuthService;
  let usersRepoStub: UsersRepository;

  beforeEach(() => {
    usersRepoStub = {
      findByUsername: async (username: string): Promise<User | null> => {
        if (username === 'maahurta') return { username, password: '1234', locked: false };
        if (username === 'riskuser') return { username, password: 'abcd', locked: true };
        return null;
      },
    };

    service = new AuthService(usersRepoStub);
  });

  it('retorna true con credenciales válidas', async () => {
    await expect(service.login('maahurta', '1234')).resolves.toBe(true);
  });

  it('retorna false con contraseña inválida', async () => {
    await expect(service.login('maahurta', 'wrong')).resolves.toBe(false);
  });

  it('retorna false cuando el usuario no existe', async () => {
    await expect(service.login('noexiste', 'algo')).resolves.toBe(false);
  });

  it('retorna false si la cuenta está bloqueada', async () => {
    await expect(service.login('riskuser', 'abcd')).resolves.toBe(false);
  });
});
