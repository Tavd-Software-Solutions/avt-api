import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const logger = new Logger();
const prisma = new PrismaClient();

async function main() {
  const password = await hash('john123', 10);

  await prisma.user.upsert({
    where: {
      email: 'john_don@default.com',
    },
    update: {},
    create: {
      name: 'John Doe',
      email: 'john_don@default.com',
      password: password,
      coin: 'BRL',
      login: 'john',
      recoverCode: null,
    },
  });
}

main()
  .catch((e) => {
    logger.error('Prisma connection error', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
