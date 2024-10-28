import { Prisma } from "@prisma/client";
import { HttpResponse, IExam_Model, IRepositoy } from "../protocols/protocols";
import { Request } from "express";
import prisma from '../ASingletonPrismaClient/SingletonPrisma';

export class Exam_ModelRepository implements IRepositoy {



  async create(data: IExam_Model): Promise<HttpResponse<IExam_Model | string >> {

    try {

      const one = await prisma.exam_Model.findMany({
        where: { 
          id_clientLaboratory: Number(data.id_clientLaboratory),
          exam_code: data.exam_code
        }
      });
      
      if(one.length != 0 ){

        throw new Error(`Já existe um Modelo de Exame cadastrado com o código : ${data.exam_code} nesse laboratório de Id: ${data.id_clientLaboratory}.`)
      }

      const created = await prisma.exam_Model.create({
        data: {
          id_clientLaboratory: data.id_clientLaboratory,
          exam_code:           data.exam_code,
          name:                data.name,
          deadline_days:       data.deadline_days,
          price:               data.price,
          exam_body:           data.exam_body
        }
      });

      return {
        statusCode: 200,
        send: created as IExam_Model,
      };
    } catch (error) {

        throw new Error(error);

    }finally {
      await this.disconnect();
    }
  }

  async getOne(req: Request): Promise<HttpResponse<IExam_Model | string>> {
    try {
      const id = req.params.id;
      const one = await prisma.exam_Model.findUnique({
        where: {
          id: String(id),
        }
      });
      return {
        statusCode: 200,
        send: one as IExam_Model,
      };
    } catch (error) {
      return {
        statusCode: 400,
        send: error.message,
      };
    } finally {
      await this.disconnect();
    }
  }

  async getAll(limit:number, page:number): Promise<HttpResponse<IExam_Model[] | string>> {
    try {
      const skip = (page - 1) * limit;
      const many = await prisma.exam_Model.findMany({
      skip:skip,
      take:limit
      });
      return {
        statusCode: 200,
        send: many as IExam_Model[],
      };
    } catch (error) {
      return {
        statusCode: 400,
        send: error,
      };
    } finally {
      await this.disconnect();
    }
  }

  

  async update(req: Request): Promise<HttpResponse<IExam_Model | string>> {
    try {
      
      return {
        statusCode: 500,
        send: 'Essa operação não deve ser executada, use updateByLab',
      };
    } catch (error) {
      return {
        statusCode: 400,
        send: error,
      };
    } finally {
      await this.disconnect();
    }
  }

  async delete(req: Request): Promise<HttpResponse<IExam_Model | string>> {
    try {
      
      return {
        statusCode: 500,
        send: 'Essa operação não deve ser executada, , use deleteByLab',
      };
    } catch (error) {
      return {
        statusCode: 400,
        send: error,
      };
    } finally {
      await this.disconnect();
    }
  }


  async getAllByLab(limit:number, page:number,lab:number): Promise<HttpResponse<IExam_Model[] | string>> {
    try {     
      const skip = (page - 1) * limit;
      const many = await prisma.exam_Model.findMany({
      skip:skip,
      take:limit,
        where: { 
          id_clientLaboratory: Number(lab) 
        }
      });
      
      return {
        statusCode: 200,
        send: many as IExam_Model[],
      };
    } catch (error) {
      return {
        statusCode: 400,
        send: error,
      };
    } finally {
      await this.disconnect();
    }
  }


  async getOneByLab(req:Request): Promise<HttpResponse<IExam_Model[] | string>> {
    try {

      const {lab , em} = req.params;
      const one = await prisma.exam_Model.findMany({
        where: { 
          id_clientLaboratory: Number(lab),
          id: String(em) 
        }
      });
      
      if(one.length==0){

        throw new Error(`Nenhum Modelo de Exame encontrado para este id ${em} do Lab codigo ${lab}.`)
      }
      return {
        statusCode: 200,
        send: one as IExam_Model[],
      };
    } catch (error) {
      
      throw new Error(error.message)

    } finally {
      await this.disconnect();
    }
  }

  async updateByLab(lab:string, em:string, data:IExam_Model): Promise<HttpResponse<IExam_Model | string>> {
    try {

      const updated = await prisma.exam_Model.update({
        where: { 
          id_clientLaboratory: Number(lab),
          id: String(em) 
         },
         data: {
          exam_code:           data.exam_code,
          name:                data.name,
          deadline_days:       data.deadline_days,
          price:               data.price,
          exam_body:           data.exam_body,
          internet_delivery:   data.internet_delivery
        }
      });

      return {
        statusCode: 200,
        send: updated as IExam_Model,
      };
    } catch (error) {
      
      let errorMessage: string;
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        
        
        switch (error.code) {
            case 'P2025':
                errorMessage = `Nenhum Modelo de Exame encontrado para este id ${em} do Lab codigo ${lab}.`;                
                break;
            default:
                errorMessage = error.message;
                break;
        }

        throw new Error(errorMessage);

    } else {
      throw new Error(error.mensage);
    }
      

    }finally {
      await this.disconnect();
    }
  }

  async deleteByLab(req: Request): Promise<HttpResponse<IExam_Model | string>> {


    const {lab , em} = req.params;
    try {

      const updated = await prisma.exam_Model.delete({
        where: { 
          id_clientLaboratory: Number(lab),
          id: String(em) 
        }
      });
      return {
        statusCode: 200,
        send: `Modelo de Exame de nome: ${updated.name} de id:${updated.id} foi deletado com sucesso `,
      };
    } catch (error) {

      
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        let errorMessage:string;

        switch (error.code) {
            case 'P2025':
                errorMessage = `Nenhum Modelo de Exame encontrado para este id ${em} do Lab codigo: ${lab}.`;
                break;
            default:
                errorMessage = error.message;
                break;
        }

        throw new Error(errorMessage);

    } else {
      throw new Error(error.mensage);
    }
    } finally {
      await this.disconnect();
    }
  }

  async countAll(): Promise<number | string> {
    try {
      const total = await prisma.exam_Model.count();
      return total

    } catch (error) {
      throw new Error(error.message)
    } finally {
      await this.disconnect();
    }
  }

  async countAllByLab(lab:number): Promise<number | string> {
    try {
      const total = await prisma.exam_Model.count({ where: { 
        id_clientLaboratory: Number(lab) 
      }});
      return total

    } catch (error) {
      throw new Error(error.message)
    } finally {
      await this.disconnect();
    }
  }
  

  async disconnect():Promise<void>{
    await prisma.$disconnect();
  }
}
