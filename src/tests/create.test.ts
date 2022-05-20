import sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';

import { app } from '../app';

import { Response } from 'superagent';
import { taskList } from '@prisma/client';

import prisma from '../models/connection';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa requisições "POST" para criar uma nova tarefa"', () => {
  let chaiHttpResponse: Response;

	describe('Testa a requisição "POST" para a rota /tasks', () => {
    it('Testa se a requisição retorna status 200 quanto a nova tarefa é criada corretamente', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/tasks')
        .send({task: "new task"})
        .set('Content-Type', 'application/json')

    expect(chaiHttpResponse.status).to.be.equal(200);
    });

    it('Testa se a requisição retorna status 401 quanto a nova tarefa é criada sem corpo', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/tasks')
        .send({})
        .set('Content-Type', 'application/json')

    expect(chaiHttpResponse.status).to.be.equal(401);
    });
    it('Testa se a requisição retorna a mensagem "Task field is required" quanto a nova task é criada sem corpo', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/tasks')
        .send({})
        .set('Content-Type', 'application/json')

      expect(chaiHttpResponse.body.message).to.be.equal("Task field is required");
    });

    it('Testa se a requisição retorna status 400 quanto a nova tarefa é criada sem corpo', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/tasks')
        .send({task: ''})
        .set('Content-Type', 'application/json')

    expect(chaiHttpResponse.status).to.be.equal(400);
    });
    it('Testa se a requisição retorna a mensagem "Task field is required" quanto a nova task é criada sem corpo', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/tasks')
        .send({task: ''})
        .set('Content-Type', 'application/json')

      expect(chaiHttpResponse.body.message).to.be.equal("All fields must be filled");
    });
  });
});
