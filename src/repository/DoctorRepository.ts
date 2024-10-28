import { Prisma } from "@prisma/client";
import { HttpResponse, IDoctor, IRepositoy } from "../protocols/protocols";
import { Request } from "express";
import prisma from '../ASingletonPrismaClient/SingletonPrisma';

export class DoctorRepository implements IRepositoy {


  async create(data: IDoctor): Promise<HttpResponse<IDoctor | string >> {

    try {

      const one = await prisma.doctor.findMany({
        where: { 
          id_clientLaboratory: Number(data.id_clientLaboratory),
          council:data.council,
          numberCouncil:data.numberCouncil
        }
      });
      
      if(one.length != 0 ){

        throw new Error(`Ja existe um profissional Num. Concelho: ${data.numberCouncil}, do Concelho: ${data.council} cadastrado nesse laboratório de Id: ${data.id_clientLaboratory}.`)
      }

      const created = await prisma.doctor.create({
        data: {
          id_clientLaboratory: data.id_clientLaboratory,
          name: data.name,
          typeDoctor: data.typeDoctor,
          council: data.council,
          numberCouncil: data.numberCouncil,
        }
      });

      return {
        statusCode: 200,
        send: created as IDoctor,
      };
    } catch (error) {

        throw new Error(error);

    }finally {
      await this.disconnect();
    }
  }

  async getOne(req: Request): Promise<HttpResponse<IDoctor | string>> {
    try {
      const id = req.params.id;
      const one = await prisma.doctor.findUnique({
        where: {
          id: String(id),
        }
      });
      return {
        statusCode: 200,
        send: one as IDoctor,
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

  async getAll(limit:number, page:number): Promise<HttpResponse<IDoctor[] | string>> {
    try {
      const skip = (page - 1) * limit;
      const many = await prisma.doctor.findMany({
      skip:skip,
      take:limit
      });
      return {
        statusCode: 200,
        send: many as IDoctor[],
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

  

  async update(req: Request): Promise<HttpResponse<IDoctor | string>> {
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

  async delete(req: Request): Promise<HttpResponse<IDoctor | string>> {
    try {
      
      return {
        statusCode: 500,
        send: 'Essa operação não deve ser executada, use deleteByLab',
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


  async getAllByLab(limit:number, page:number,lab:number): Promise<HttpResponse<IDoctor[] | string>> {
    try {     
      const skip = (page - 1) * limit;
      const many = await prisma.doctor.findMany({
      skip:skip,
      take:limit,
        where: { 
          id_clientLaboratory: Number(lab) 
        }
      });
      
      return {
        statusCode: 200,
        send: many as IDoctor[],
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


  async getOneByLab(req:Request): Promise<HttpResponse<IDoctor[] | string>> {
    try {

      const {lab , doctor} = req.params;
      const one = await prisma.doctor.findMany({
        where: { 
          id_clientLaboratory: Number(lab),
          id: String(doctor) 
        }
      });
      
      if(one.length==0){

        throw new Error(`Nenhum profissional encontrado para este id ${doctor} do Lab codigo ${lab}.`)
      }
      return {
        statusCode: 200,
        send: one as IDoctor[],
      };
    } catch (error) {
      
      throw new Error(error.message)

    } finally {
      await this.disconnect();
    }
  }

  async updateByLab(lab:string, doctor:string, data:IDoctor): Promise<HttpResponse<IDoctor | string>> {
    try {

      const updated = await prisma.doctor.update({
        where: { 
          id_clientLaboratory: Number(lab),
          id: String(doctor) 
         },
         data: {
            name: data.name,
            typeDoctor: data.typeDoctor,
            council: data.council,
            numberCouncil: data.numberCouncil,
            dateInative: data.dateInative,
            active: Boolean(data.active)
          }
      });

      return {
        statusCode: 200,
        send: updated as IDoctor,
      };
    } catch (error) {

      
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        let errorMessage: string;

        switch (error.code) {
            case 'P2025':
                errorMessage = `Nenhum profissional encontrado para este id ${doctor} do Lab codigo ${lab}.`;
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

  async deleteByLab(req: Request): Promise<HttpResponse<IDoctor | string>> {


    const {lab , doctor} = req.params;
    try {

      const updated = await prisma.doctor.delete({
        where: { 
          id_clientLaboratory: Number(lab),
          id: String(doctor) 
        }
      });
      return {
        statusCode: 200,
        send: ` Profisional nome: ${updated.name} de id:${updated.id} foi deletado com sucesso `,
      };
    } catch (error) {

      
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        let errorMessage:string;

        switch (error.code) {
            case 'P2025':
                errorMessage = `Nenhum profissional encontrado para este id ${doctor} do Lab codigo ${lab}.`;
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
      const total = await prisma.doctor.count();
      return total

    } catch (error) {
      throw new Error(error.message)
    } finally {
      await this.disconnect();
    }
  }

  async countAllByLab(lab:number): Promise<number | string> {
    try {
      const total = await prisma.doctor.count({ where: { 
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
