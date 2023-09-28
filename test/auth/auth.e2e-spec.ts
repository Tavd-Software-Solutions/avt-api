import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('AuthController', () => {
  let URL: string = '/auth/login';
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
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
