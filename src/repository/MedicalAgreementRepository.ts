import { Prisma } from "@prisma/client";
import { HttpResponse, IMedicalAgreement, IRepositoy } from "../protocols/protocols";
import { Request } from "express";
import prisma from '../ASingletonPrismaClient/SingletonPrisma';

export class MedicalAgreementRepository implements IRepositoy {



  async create(data: IMedicalAgreement): Promise<HttpResponse<IMedicalAgreement | string >> {

    try {

      const one = await prisma.medicalAgreement.findMany({
        where: { 
          id_clientLaboratory: Number(data.id_clientLaboratory),
          cnpj: data.cnpj
        }
      });
      
      if(one.length != 0 ){

        throw new Error(`Já existe um conênio cadastrado com o  numero CNPJ: ${data.cnpj} nesse laboratório de Id: ${data.id_clientLaboratory}.`)
      }

      const created = await prisma.medicalAgreement.create({
        data: {
          id_clientLaboratory: data.id_clientLaboratory,
          fantazyName: data.fantazyName,
          socialReason: data.socialReason,
          cnpj: data.cnpj,
          state: data.state,
          cep: data.cep,
          street: data.street,
          number: data.number,
          neighborhood: data.neighborhood,
          additionalInfo: data.additionalInfo,
          technicalManager: data.technicalManager,
          financialManager: data.financialManager,
          email: data.email,
          phone: data.phone
        }
      });

      return {
        statusCode: 200,
        send: created as IMedicalAgreement,
      };
    } catch (error) {

        throw new Error(error);

    }finally {
      await this.disconnect();
    }
  }

  async getOne(req: Request): Promise<HttpResponse<IMedicalAgreement | string>> {
    try {
      const id = req.params.id;
      const one = await prisma.medicalAgreement.findUnique({
        where: {
          id: String(id),
        }
      });
      return {
        statusCode: 200,
        send: one as IMedicalAgreement,
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

  async getAll(limit:number, page:number): Promise<HttpResponse<IMedicalAgreement[] | string>> {
    try {
      const skip = (page - 1) * limit;
      const many = await prisma.medicalAgreement.findMany({
      skip:skip,
      take:limit
      });
      return {
        statusCode: 200,
        send: many as IMedicalAgreement[],
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

  

  async update(req: Request): Promise<HttpResponse<IMedicalAgreement | string>> {
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

  async delete(req: Request): Promise<HttpResponse<IMedicalAgreement | string>> {
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


  async getAllByLab(limit:number, page:number,lab:number): Promise<HttpResponse<IMedicalAgreement[] | string>> {
    try {     
      const skip = (page - 1) * limit;
      const many = await prisma.medicalAgreement.findMany({
      skip:skip,
      take:limit,
        where: { 
          id_clientLaboratory: Number(lab) 
        }
      });
      
      return {
        statusCode: 200,
        send: many as IMedicalAgreement[],
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


  async getOneByLab(req:Request): Promise<HttpResponse<IMedicalAgreement[] | string>> {
    try {

      const {lab , ma} = req.params;
      const one = await prisma.medicalAgreement.findMany({
        where: { 
          id_clientLaboratory: Number(lab),
          id: String(ma) 
        }
      });
      
      if(one.length==0){

        throw new Error(`Nenhum convênio encontrado para este id ${ma} do Lab codigo ${lab}.`)
      }
      return {
        statusCode: 200,
        send: one as IMedicalAgreement[],
      };
    } catch (error) {
      
      throw new Error(error.message)

    } finally {
      await this.disconnect();
    }
  }

  async updateByLab(lab:string, ma:string, data:IMedicalAgreement): Promise<HttpResponse<IMedicalAgreement | string>> {
    try {

      const updated = await prisma.medicalAgreement.update({
        where: { 
          id_clientLaboratory: Number(lab),
          id: String(ma) 
         },
         data: {
          fantazyName: data.fantazyName,
          socialReason: data.socialReason,
          cnpj: data.cnpj,
          state: data.state,
          cep: data.cep,
          street: data.street,
          number: data.number,
          neighborhood: data.neighborhood,
          additionalInfo: data.additionalInfo,
          technicalManager: data.technicalManager,
          financialManager: data.financialManager,
          email: data.email,
          phone: data.phone
        }
      });

      return {
        statusCode: 200,
        send: updated as IMedicalAgreement,
      };
    } catch (error) {
      
      let errorMessage: string;
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        
        
        switch (error.code) {
            case 'P2025':
                errorMessage = `Nenhum convênio encontrado para este id ${ma} do Lab codigo ${lab}.`;
                
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

  async deleteByLab(req: Request): Promise<HttpResponse<IMedicalAgreement | string>> {


    const {lab , ma} = req.params;
    try {

      const updated = await prisma.medicalAgreement.delete({
        where: { 
          id_clientLaboratory: Number(lab),
          id: String(ma) 
        }
      });
      return {
        statusCode: 200,
        send: ` Convênio nome: ${updated.fantazyName} de id:${updated.id} foi deletado com sucesso `,
      };
    } catch (error) {

      
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        let errorMessage:string;

        switch (error.code) {
            case 'P2025':
                errorMessage = `Nenhum convênio encontrado para este id ${ma} do Lab codigo ${lab}.`;
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
      const total = await prisma.medicalAgreement.count();
      return total

    } catch (error) {
      throw new Error(error.message)
    } finally {
      await this.disconnect();
    }
  }

  async countAllByLab(lab:number): Promise<number | string> {
    try {
      const total = await prisma.medicalAgreement.count({ where: { 
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
