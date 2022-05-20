import sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';

import { app } from '../app';

import { Response } from 'superagent';
import { taskList } from '@prisma/client';

import prisma from '../models/connection';

chai.use(chaiHttp);

const { expect } = chai;

const getAllIds = async () => {
		const tasks = await prisma.taskList.findMany();

		let idsArray: number[] = [];

		tasks.forEach(({ id }) => {
			idsArray.push(Number(id));
		});

		return idsArray;
}

describe('Testa requisições "DELETE" para deletar uma tarefa pelo id', () => {
  let chaiHttpResponse: Response;

	describe('Testa a requisição "DELETE" para a rota /tasks/:id', () => {
    it('Testa se a requisição retorna status 200 quanto a tarefa é deletada corretamente', async () => {
      const allIds: number[] = await getAllIds();
      const lastId: number = allIds[allIds.length - 1];
      chaiHttpResponse = await chai
        .request(app)
        .delete(`/tasks/${lastId}`)

      expect(chaiHttpResponse.status).to.be.equal(200);
    });

    it('Testa se a requisição retorna a mensagem "Task deleted successfully" quando a tarefa é deletada corretamente', async () => {
      const allIds: number[] = await getAllIds();
      const lastId: number = allIds[allIds.length - 1];
      chaiHttpResponse = await chai
        .request(app)
        .delete(`/tasks/${lastId}`)

      expect(chaiHttpResponse.body.message).to.be.equal('Task deleted successfully');
    });

    it('Testa se a requisição retorna status 404 quando a tarefa a ser deletada não é encontrada', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .delete(`/tasks/9999999`)

      expect(chaiHttpResponse.status).to.be.equal(404);
    });

    it('Testa se a requisição retorna a mensagem "Task not found" quando a tarefa a ser deletada não é encontrada', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .delete(`/tasks/9999999`)

      expect(chaiHttpResponse.body.message).to.be.equal('Task not found');
    });
  });
});
