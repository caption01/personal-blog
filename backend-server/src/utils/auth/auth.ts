import { randomBytes, scryptSync } from 'crypto';

const BUFFER_BYTE = 8;

function genSalt(): string {
  return randomBytes(BUFFER_BYTE).toString('hex');
}

async function hash(salt: string, password: string): Promise<string> {
  return await scryptSync(password, salt, 32).toString('hex');
}

export async function generatePassword(inputPassword: string): Promise<string> {
  const newSalt = genSalt();
  const hashPassword = await hash(inputPassword, newSalt);

  return `${hashPassword}.${newSalt}`;
}

export async function isPasswordEqual(
  inputPassword: string,
  dbPassword: string,
): Promise<boolean> {
  const [_dbHashPassword, _dbSalt] = dbPassword.split('.');
  const hashInputPassword = await hash(inputPassword, _dbSalt);

  return hashInputPassword === _dbHashPassword;
}
