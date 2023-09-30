import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';
import * as uuid from 'uuid';

describe('AuthController', () => {
  let URL: string = '/auth/login';
  const prisma = new PrismaClient();
  let app: INestApplication;
  const userId = uuid.v4();

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    await createUser(prisma, userId);

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await removeTestUser(prisma, userId);
    await app.close();
  });

  it('(POST) - Should authenticate', async () => {
    return request(app.getHttpServer())
      .post(URL)
      .send({
        login: 'john',
        password: 'john123',
      })
      .expect(201)
      .then((response) => {
        expect(response.body.access_token).toBeDefined();
      });
  });
});

const createUser = async (prisma: PrismaClient, userId: string) => {
  const password = await hash('john123', 10);

  await prisma.user.upsert({
    where: {
      email: 'john_don@default.com',
    },
    update: {},
    create: {
      id: userId,
      name: 'John Doe',
      email: 'john_don@default.com',
      password: password,
      coin: 'BRL',
      login: 'john',
      recoverCode: null,
    },
  });
};

const removeTestUser = async (prisma: PrismaClient, userId: string) => {
  await prisma.user.deleteMany({
    where: {
      id: userId,
    },
  });
};
