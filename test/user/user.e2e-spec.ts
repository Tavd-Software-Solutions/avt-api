import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { PrismaClient } from '@prisma/client';
import * as uuid from 'uuid';

describe('UsersController', () => {
  let defaultUrl: string = '/users';
  const prisma = new PrismaClient();
  let app: INestApplication;
  let access_token: string = '';

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await cleanUserTable(prisma);
    await app.close();
  });

  it('(POST) - Should register a new user', async () => {
    return request(app.getHttpServer())
      .post(`${defaultUrl}/create`)
      .send(user)
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual({
          message: `User Joana Doe created successfully`,
        });
      });
  });

  it('(POST) - Should authenticate user', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        login: 'joana',
        password: 'joana123',
      })
      .expect(201)
      .then((response) => {
        expect(response.body).toBeDefined();
        access_token = response.body.access_token;
      });
  });

  it('(GET) - Should get a user', async () => {
    return request(app.getHttpServer())
      .get(`${defaultUrl}/get/${userId}`)
      .set('Authorization', `Bearer ${access_token}`)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({
          name: 'Joana Doe',
          email: 'joana_don@default.com',
          login: 'joana',
          coin: 'BRL',
        });
      });
  });

  it('(PUT) - Should update a user', async () => {
    return request(app.getHttpServer())
      .put(`${defaultUrl}/edit/${userId}`)
      .set('Authorization', `Bearer ${access_token}`)
      .send(updatedUser)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({
          name: 'Joana Doe3',
          email: 'joana_don@default.com',
          login: 'joana',
          coin: 'BRL',
        });
      });
  });

  it('(DELETE) - Should delete a user', async () => {
    return request(app.getHttpServer())
      .delete(`${defaultUrl}/delete/${userId}`)
      .set('Authorization', `Bearer ${access_token}`)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({
          message: `User Joana Doe3 deleted successfully`,
        });
      });
  });

  // it('(POST) - Should get recover code', async () => {
  //   return request(app.getHttpServer())
  //     .post(`${defaultUrl}/get-recover-code`)
  //     .set('Authorization', `Bearer ${access_token}`)
  //     .send({ email: 'joana_don@default.com' })
  //     .expect(200);
  // });

  // it('(POST) - Should validate recover code', async () => {
  //   return request(app.getHttpServer())
  //     .post(`${defaultUrl}/validate-recover-code`)
  //     .set('Authorization', `Bearer ${access_token}`)
  //     .send({ recoverCode: '123456' })
  //     .expect(200)
  //     .then((response) => {
  //       expect(response.body).toHaveProperty('access_token');
  //     });
  // });

  // it('(POST) - Should recover password', async () => {
  //   return request(app.getHttpServer())
  //     .post(`${defaultUrl}/recover-password`)
  //     .set('Authorization', `Bearer ${access_token}`)
  //     .send({ newPassword: 'joana1234' })
  //     .expect(200)
  //     .then((response) => {
  //       expect(response.body).toStrictEqual({
  //         message: 'Password updated successfully',
  //       });
  //     });
  // });
});

const cleanUserTable = async (prisma: PrismaClient) => {
  await prisma.user.deleteMany({});
};

const userId = uuid.v4();

const user = {
  id: userId,
  name: 'Joana Doe',
  email: 'joana_don@default.com',
  password: 'joana123',
  coin: 'BRL',
  login: 'joana',
  recoverCode: null,
};

const updatedUser = {
  id: userId,
  name: 'Joana Doe3',
  email: 'joana_don@default.com',
  password: 'joana123',
  coin: 'BRL',
  login: 'joana',
  recoverCode: null,
};
