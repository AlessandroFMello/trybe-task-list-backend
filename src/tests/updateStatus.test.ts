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

describe('Testa requisições "PATCH" para atualizar um status por id"', () => {
  let chaiHttpResponse: Response;

	describe('Testa a requisição "PATCH" para a rota /tasks/:id', () => {
		it('Testa se a requisição retorna status 200 com as informações corretas de update', async() => {
			const allIds: number[] = await getAllIds();
        chaiHttpResponse = await chai
        .request(app)
        .patch(`/tasks/${allIds[0]}`)
        .send({status:'CURRENT'})
        .set('Content-Type', 'application/json')
    
        expect(chaiHttpResponse.status).to.be.equal(200);
		});

		it('Testa se a requisição retorna status 401 quanto é realizada com sem corpo', async() => {
			const allIds: number[] = await getAllIds();
        chaiHttpResponse = await chai
        .request(app)
        .patch(`/tasks/${allIds[0]}`)
        .send({})
        .set('Content-Type', 'application/json')
    
        expect(chaiHttpResponse.status).to.be.equal(401);
		});

    it('Testa se a requisição retorna a mensagem "Status field is required" quando é realizada sem corpo', async() => {
			const allIds: number[] = await getAllIds();
        chaiHttpResponse = await chai
        .request(app)
        .patch(`/tasks/${allIds[0]}`)
        .send({})
        .set('Content-Type', 'application/json')
    
        expect(chaiHttpResponse.body.message).to.be.equal('Status field is required');
		});

    it('Testa se a requisição retorna a mensagem "All fields must be filled" quando o campo status é passado vazio', async() => {
			const allIds: number[] = await getAllIds();
        chaiHttpResponse = await chai
        .request(app)
        .patch(`/tasks/${allIds[0]}`)
        .send({status: ''})
        .set('Content-Type', 'application/json')
    
        expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
		});

		it('Testa se caso não exista o id procurado retorne erro 404', async() => {
			chaiHttpResponse = await chai
			.request(app)
			.patch('/tasks/999999')
      .send({status:'CURRENT'})
      .set('Content-Type', 'application/json')

			expect(chaiHttpResponse.status).to.be.equal(404)
		});

		it('Testa se caso não exista o id procurado retorne a mensagem de erro "Task not found"', async() => {
			chaiHttpResponse = await chai
			.request(app)
			.patch('/tasks/999999')
      .send({status:'CURRENT'})
      .set('Content-Type', 'application/json')

			expect(chaiHttpResponse.body.message).to.be.equal("Task not found")
		});
  });
});
