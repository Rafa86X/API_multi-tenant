import { Prisma } from "@prisma/client";
import { HttpResponse, IPatient, IRepositoy } from "../protocols/protocols";
import { Request } from "express";
import prisma from '../ASingletonPrismaClient/SingletonPrisma';

export class PatientRepository implements IRepositoy {


  async create(data: IPatient): Promise<HttpResponse<IPatient | string >> {

    try {

      if(data.id_medicalAgreement != null){
        const one = await prisma.medicalAgreement.findMany({
          where: { 
            id_clientLaboratory: Number(data.id_clientLaboratory),
            id : String(data.id_medicalAgreement)
          }
        });
        if(one.length == 0 ){
  
          throw new Error(`Não existe cadastro de um convênio id: ${data.id_medicalAgreement} para o seu laboraório id: ${data.id_clientLaboratory}.`)
        }
      }

      const created = await prisma.patient.create({
        data: {
          id_clientLaboratory: data.id_clientLaboratory,
          name: data.name,
          id_medicalAgreement: String(data.id_medicalAgreement),
          dateBirth: data.dateBirth,
          gender: data.gender,
          cpf: data.cpf,
          email: data.email,
          phone: data.phone,
          socialName: data.socialName
        }
      });

      return {
        statusCode: 200,
        send: created as IPatient,
      };
    } catch (error) {

        throw new Error(error);

    }finally {
      await this.disconnect();
    }
  }

  async getOne(req: Request): Promise<HttpResponse<IPatient | string>> {
    try {
      const id = req.params.id;
      const one = await prisma.patient.findUnique({
        where: {
          id: String(id),
        }
      });
      return {
        statusCode: 200,
        send: one as IPatient,
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

  async getAll(limit:number, page:number): Promise<HttpResponse<IPatient[] | string>> {
    try {
      const skip = (page - 1) * limit;
      const many = await prisma.patient.findMany({
      skip:skip,
      take:limit
      });
      return {
        statusCode: 200,
        send: many as IPatient[],
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

  

  async update(req: Request): Promise<HttpResponse<IPatient | string>> {
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

  async delete(req: Request): Promise<HttpResponse<IPatient | string>> {
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


  async getAllByLab(limit:number, page:number,lab:number): Promise<HttpResponse<IPatient[] | string>> {
    try {     
      const skip = (page - 1) * limit;
      const many = await prisma.patient.findMany({
      skip:skip,
      take:limit,
        where: { 
          id_clientLaboratory: Number(lab) 
        }
      });
      
      return {
        statusCode: 200,
        send: many as IPatient[],
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


  async getOneByLab(req:Request): Promise<HttpResponse<IPatient[] | string>> {
    try {

      const {lab , patient} = req.params;
      const one = await prisma.patient.findMany({
        where: { 
          id_clientLaboratory: Number(lab),
          id: String(patient) 
        }
      });
      
      if(one.length==0){

        throw new Error(`Nenhum paciente encontrado para este id ${patient} do Lab codigo ${lab}.`)
      }
      return {
        statusCode: 200,
        send: one as IPatient[],
      };
    } catch (error) {
      
      throw new Error(error.message)

    } finally {
      await this.disconnect();
    }
  }

  async updateByLab(lab:string, patient:string, data:IPatient): Promise<HttpResponse<IPatient | string>> {
    try {

      const updated = await prisma.patient.update({
        where: { 
          id_clientLaboratory: Number(lab),
          id: String(patient) 
         },
         data: {
          name: data.name,
          id_medicalAgreement: data.id_medicalAgreement,
          dateBirth: data.dateBirth,
          gender: data.gender,
          cpf: data.cpf,
          email: data.email,
          phone: data.phone,
          socialName: data.socialName
        }
      });

      return {
        statusCode: 200,
        send: updated as IPatient,
      };
    } catch (error) {
      
      let errorMessage: string;
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        
        
        switch (error.code) {
            case 'P2025':
                errorMessage = `Nenhum paciente encontrado para este id ${patient} do Lab codigo ${lab}.`;

                
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

  async deleteByLab(req: Request): Promise<HttpResponse<IPatient | string>> {


    const {lab , patient} = req.params;
    try {

      const updated = await prisma.patient.delete({
        where: { 
          id_clientLaboratory: Number(lab),
          id: String(patient) 
        }
      });
      return {
        statusCode: 200,
        send: `Paciente nome: ${updated.name} de id:${updated.id} foi deletado com sucesso.`,
      };
    } catch (error) {

      
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        let errorMessage:string;

        switch (error.code) {
            case 'P2025':
                errorMessage = `Nenhum paciente encontrado para este id ${patient} do Lab codigo ${lab}.`;
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
      const total = await prisma.patient.count();
      return total

    } catch (error) {
      throw new Error(error.message)
    } finally {
      await this.disconnect();
    }
  }

  async countAllByLab(lab:number): Promise<number | string> {
    try {
      const total = await prisma.patient.count({ where: { 
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
