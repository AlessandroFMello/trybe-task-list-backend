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

describe('Testa requisições "PUT" para atualizar uma task por id"', () => {
  let chaiHttpResponse: Response;

	describe('Testa a requisição "PUT" para a rota /tasks/:id', () => {
		it('Testa se a requisição retorna status 200 com as informações corretas de update', async() => {
			const allIds: number[] = await getAllIds();
        chaiHttpResponse = await chai
        .request(app)
        .put(`/tasks/${allIds[0]}`)
        .send({task: "updated task"})
        .set('Content-Type', 'application/json')
    
        expect(chaiHttpResponse.status).to.be.equal(200);
		});

		it('Testa se a requisição retorna status 401 quanto é realizada com sem corpo', async() => {
			const allIds: number[] = await getAllIds();
        chaiHttpResponse = await chai
        .request(app)
        .put(`/tasks/${allIds[0]}`)
        .send({})
        .set('Content-Type', 'application/json')
    
        expect(chaiHttpResponse.status).to.be.equal(401);
		});

    it('Testa se a requisição retorna a mensagem "Task field is required" quando é realizada sem corpo', async() => {
			const allIds: number[] = await getAllIds();
        chaiHttpResponse = await chai
        .request(app)
        .put(`/tasks/${allIds[0]}`)
        .send({})
        .set('Content-Type', 'application/json')
    
        expect(chaiHttpResponse.body.message).to.be.equal('Task field is required');
		});

	// 	it('Testa se cada requisição que retorna estes objetos por id contém as propriedades devidas',async () => {
  //     const allIds: number[] = await getAllIds();
	// 		allIds.forEach(async (id: number) => {
	// 			chaiHttpResponse = await chai
	// 				 .request(app).get(`/tasks/${id}`)

  //          const body = chaiHttpResponse.body;
  //          body.forEach((item: taskList) => {
  //            expect(item).to.have.property('id');
  //            expect(item).to.have.property('task');
  //            expect(item).to.have.property('status');
  //            expect(item).to.have.property('createdAt');
	// 		  });
	// 		});
	// 	});

		it('Testa se caso não exista o id procurado retorne erro 404', async() => {
			chaiHttpResponse = await chai
			.request(app)
			.put('/tasks/999999')
      .send({task: "updated task"})
      .set('Content-Type', 'application/json')
      console.log(chaiHttpResponse.status)
      console.log(chaiHttpResponse.body)

			expect(chaiHttpResponse.status).to.be.equal(404)
		});

		it('Testa se caso não exista o id procurado retorne a mensagem de erro "Task not found"', async() => {
			chaiHttpResponse = await chai
			.request(app)
			.put('/tasks/999999')
      .send({task: "updated task"})
      .set('Content-Type', 'application/json')

			expect(chaiHttpResponse.body.message).to.be.equal("Task not found")
		});
  });
});
