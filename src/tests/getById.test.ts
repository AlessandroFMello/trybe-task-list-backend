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

describe('Testa requisições "GET" para retornar cada task por id"', () => {
  let chaiHttpResponse: Response;

	describe('Testa a requisição "GET" para a rota /tasks/:id', () => {
		it('Testa se a requisição retorna status 200', async() => {
			const allIds: number[] = await getAllIds();
			allIds.forEach(async (id: number) => {
				chaiHttpResponse = await chai
					 .request(app).get(`/tasks/${id}`)

					expect(chaiHttpResponse.status).to.be.equal(200);
			});
		});

		it('Testa se a requisição retorna um objeto para cada id',async () => {
			const allIds: number[] = await getAllIds();
			allIds.forEach(async (id: number) => {
				chaiHttpResponse = await chai
					 .request(app).get(`/tasks/${id}`)

           expect(chaiHttpResponse.body).to.be.an('object');
			});
		});

		it('Testa se cada requisição que retorna estes objetos por id contém as propriedades devidas',async () => {
      const allIds: number[] = await getAllIds();
			allIds.forEach(async (id: number) => {
				chaiHttpResponse = await chai
					 .request(app).get(`/tasks/${id}`)

           const body = chaiHttpResponse.body;
           body.forEach((item: taskList) => {
             expect(item).to.have.property('id');
             expect(item).to.have.property('task');
             expect(item).to.have.property('status');
             expect(item).to.have.property('createdAt');
			  });
			});
		});

		it('Testa se caso não exista o id procurado retorne erro 404', async() => {
			chaiHttpResponse = await chai
			.request(app)
			.get('/tasks/99999999999')

			expect(chaiHttpResponse.status).to.be.equal(404)
		});

		it('Testa se caso não exista o id procurado retorne a mensagem de erro "Task not found"', async() => {
			chaiHttpResponse = await chai
			.request(app)
			.get('/tasks/99999999999')

			expect(chaiHttpResponse.body.message).to.be.equal("Task not found")
		});
  });
});
