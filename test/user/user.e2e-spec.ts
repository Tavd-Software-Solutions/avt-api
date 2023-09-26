import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { PrismaClient } from '@prisma/client';

describe('UsersController', () => {
  let defaultUrl: string = '/users';
  const prisma = new PrismaClient();
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await prisma.user.deleteMany({});
    await app.close();
  });

  const user = {
    name: 'John Doe',
    email: 'john_don@default.com',
    password: 'john123',
    coin: 'BRL',
    login: 'john',
    recoverCode: null,
  };

  it('(POST) - Should register a new user', async () => {
    return request(app.getHttpServer())
      .post(`${defaultUrl}/create`)
      .send(user)
      .expect(201)
      .then((response) => {
        expect(response.body).toStrictEqual({
          message: `User John Doe created successfully`,
        });
      });
  });
});
