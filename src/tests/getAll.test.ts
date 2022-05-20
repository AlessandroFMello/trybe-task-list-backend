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

describe('Testa requisições "GET" para retornar todas as tasks"', () => {
  let chaiHttpResponse: Response;

  describe('Testa a requisição "GET" para a rota /tasks', () => {
		it('Testa se a requisição retorna status 200',async () => {
			chaiHttpResponse = await chai
				 .request(app).get('/tasks');
			
			expect(chaiHttpResponse.status).to.be.equal(200);
		});

		it('Testa se a requisição retorna no corpo um array',async () => {
			chaiHttpResponse = await chai
				 .request(app).get('/tasks');
			
			expect(chaiHttpResponse.body).to.be.an('array');
		});

		it('Testa se a requisição retorna objetos dentro do array',async () => {
			chaiHttpResponse = await chai
				 .request(app).get('/tasks');
			
			const body = chaiHttpResponse.body;
			body.forEach((item: taskList) => {
					expect(item).to.be.an('object');
			});
		});

		it('Testa se a requisição que retorna estes objetos contém as propriedades devidas',async () => {
			chaiHttpResponse = await chai
				 .request(app).get('/tasks');
			
			const body = chaiHttpResponse.body;
			body.forEach((item: taskList) => {
				expect(item).to.have.property('id');
				expect(item).to.have.property('task');
				expect(item).to.have.property('status');
				expect(item).to.have.property('createdAt');
			});
		});
  });
});
