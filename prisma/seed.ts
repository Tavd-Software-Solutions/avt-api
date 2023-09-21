import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const logger = new Logger();
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: {
      email: 'John Doe',
    },
    update: {},
    create: {
      name: 'John Doe',
      email: 'john_don@default.com',
      password: 'john123',
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
