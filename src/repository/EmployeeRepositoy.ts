import { Prisma } from "@prisma/client";
import { HttpResponse, IEmployee, IRepositoy } from "../protocols/protocols";
import { Request } from "express";
import { Security } from "../security/segurity";
import prisma from '../ASingletonPrismaClient/SingletonPrisma';

export class EmployeeRepository implements IRepositoy {

  private security: Security;

      constructor() {

        this.security = new Security();
      }

  async create(data: IEmployee): Promise<HttpResponse<IEmployee | string >> {

    try {
      const created = await prisma.employee.create({
        data: {
          id_clientLaboratory: data.id_clientLaboratory,
          name: data.name,
          login: data.login,
          password: await this.security.encript(data.password),
          counsil:  data.counsil ? data.counsil : null,
          number_council:  data.number_council ? data.number_council : null,
          medical_specialty:  data.medical_specialty ? data.medical_specialty : null,
          signatory:  data.signatory ? data.signatory : null,
          dateInative: data.dateInative,
          role_id: data.role_id,
        },
        select: {
          id_clientLaboratory: true,
          id: true,
          name: true,
          login: true,
          password: false,
          role_id: true,
          active: true,
          counsil: true,
          number_council: true,
          medical_specialty: true,
          signatory: true,
          dateInative: true,
          newPassWord: true
        }
      });

      return {
        statusCode: 200,
        send: created as IEmployee,
      };
    } catch (error) {
      
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        let errorMessage;

        switch (error.code) {
            case 'P2002':
                errorMessage = 'O login já está em uso. Por favor, escolha outro.';
                break;
            case 'P2003':
                errorMessage = 'O id_clientLaboratory é inválido.';
                break;
            default:
                errorMessage = 'Ocorreu um erro ao processar a solicitação.';
                break;
        }

        throw new Error(errorMessage);

    } else {
      throw new Error(error);
    }

    }finally {
      await this.disconnect();
    }
  }

  async getOne(req: Request): Promise<HttpResponse<IEmployee | string>> {
    try {
      const id = req.params.id;
      const one = await prisma.employee.findUnique({
        where: {
          id: String(id),
        },select: {
          id_clientLaboratory: true,
          id: true,
          name: true,
          login: true,
          password: false,
          role_id: true,
          counsil: true,
          number_council: true,
          medical_specialty: true,
          signatory: true,
          active: true,
          dateInative: true,
          newPassWord: true
        }
      });
      return {
        statusCode: 200,
        send: one as IEmployee,
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

  async getAll(limit:number, page:number): Promise<HttpResponse<IEmployee[] | string>> {
    try {
      const skip = (page - 1) * limit;
      const many = await prisma.employee.findMany({
      skip:skip,
      take:limit,
      select: {
          id_clientLaboratory: true,
          id: true,
          name: true,
          login: true,
          password: false,
          role_id: true,
          counsil: true,
          number_council: true,
          medical_specialty: true,
          signatory: true,
          active: true,
          dateInative: true,
          newPassWord: true
        }
      });
      return {
        statusCode: 200,
        send: many as IEmployee[],
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

  async getOnePassWord(loginUser: string): Promise<HttpResponse<IEmployee | string>> {
    try {


      const login = await prisma.employee.findUnique({
        where: {
          login: loginUser,
        },
        select: {
          password: true,
          name: true,
          role_id:true,
          id_clientLaboratory: true,
          counsil: true,
          number_council: true,
          medical_specialty: true,
          signatory: true,
          newPassWord: true,
          active:true
        },
      });

      return {
        statusCode: 200,
        send: login
      };
    } catch (error) {
      
      return {
        statusCode: 400,
        send: null
      };
    } finally {
      await this.disconnect();
    }
  }

  async update(req: Request): Promise<HttpResponse<IEmployee | string>> {
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

  async delete(req: Request): Promise<HttpResponse<IEmployee | string>> {
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


  async getAllByLab(limit:number, page:number,lab:number): Promise<HttpResponse<IEmployee[] | string>> {
    try {     
      const skip = (page - 1) * limit;
      const many = await prisma.employee.findMany({
      skip:skip,
      take:limit,
        where: { 
          id_clientLaboratory: Number(lab) 
        },
        select: {
          id_clientLaboratory: true,
          id: true,
          name: true,
          login: true,
          password: false,
          counsil: true,
          number_council: true,
          medical_specialty: true,
          signatory: true,
          role_id: true,
          active: true,
          dateInative: true
        }
      });
      

      return {
        statusCode: 200,
        send: many as IEmployee[],
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


  async getOneByLab(req:Request): Promise<HttpResponse<IEmployee[] | string>> {
    try {

      const {lab , employee} = req.params;
      const one = await prisma.employee.findMany({
        where: { 
          id_clientLaboratory: Number(lab),
          id: String(employee) 
        },
        select: {
          id_clientLaboratory: true,
          id: true,
          name: true,
          login: true,
          password: false,
          counsil: true,
          number_council: true,
          medical_specialty: true,
          signatory: true,
          role_id: true,
          active: true,
          dateInative: true
        }
      });
      
      if(one.length==0){

        throw new Error(`Nenhum funcionario encontrado para este id ${employee} do Lab codigo ${lab}.`)
      }
      return {
        statusCode: 200,
        send: one as IEmployee[],
      };
    } catch (error) {
      
      throw new Error(error.message)

    } finally {
      await this.disconnect();
    }
  }


  async updatePassWord(lab:string, employee:string, data:IEmployee): Promise<HttpResponse<IEmployee | string>> {
    
    try {
      await prisma.employee.update({
        where: { 
          id_clientLaboratory: Number(lab),
          id: String(employee) 
         },
        data: {
          password:await this.security.encript(data.password),
          newPassWord:false
        }
      });

      return {
        statusCode: 200,
        send: "Senha atualizada com sucesso."
      };
    } catch (error) {
      
      throw new Error(error.mensage);

    }finally {
      await this.disconnect();
    }
  }







  async updateByLab(lab:string, employee:string, data:IEmployee): Promise<HttpResponse<IEmployee | string>> {
    try {

      const updated = await prisma.employee.update({
        where: { 
          id_clientLaboratory: Number(lab),
          id: String(employee) 
         },
        data: {
          name: data.name,
          login: data.login,
          dateInative: data.dateInative,
          role_id: data.role_id,
          counsil:  data.counsil,
          number_council:  data.number_council,
          medical_specialty:  data.medical_specialty,
          signatory:  data.signatory,
          newPassWord: data.newPassWord,
          active:data.active
        },
        select: {
          id_clientLaboratory: true,
          id: true,
          name: true,
          login: true,
          password: false,
          role_id: true,
          counsil: true,
          number_council: true,
          medical_specialty: true,
          signatory: true,
          active: true,
          dateInative: true,
          newPassWord: true
        }
      });

      return {
        statusCode: 200,
        send: updated as IEmployee,
      };
    } catch (error) {
      
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        let errorMessage;

        switch (error.code) {
            case 'P2002': 
                errorMessage = 'O login já está em uso. Por favor, escolha outro.';
                break;
            case 'P2003': 
                errorMessage = 'O id_clientLaboratory é inválido.';
                break;
            case 'P2025':
                errorMessage = `Nenhum profissional encontrado para este id ${employee} do Lab codigo ${lab}.`;
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

  async deleteByLab(req: Request): Promise<HttpResponse<IEmployee | string>> {

    const {lab , employee} = req.params;

    try {


      const updated = await prisma.employee.delete({
        where: { 
          id_clientLaboratory: Number(lab),
          id: String(employee) 
        },
        select: {
          id_clientLaboratory: true,
          id: true,
          name: true,
          login: true,
          password: false,
          role_id: true,
          counsil: true,
          number_council: true,
          medical_specialty: true,
          signatory: true,
          active: true,
          dateInative: true
        }
      });
      return {
        statusCode: 200,
        send: `Funcionario nome: ${updated.name} de id:${updated.id} foi deletado com sucesso `,
      };
    } catch (error) {

      
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        let errorMessage:string;

        switch (error.code) {
            case 'P2025':
                errorMessage = `Nenhum profissional encontrado para este id ${employee} do Lab codigo ${lab}.`;
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
      const total = await prisma.employee.count();
      return total

    } catch (error) {
      throw new Error(error.message)
    } finally {
      await this.disconnect();
    }
  }

  async countAllByLab(lab:number): Promise<number | string> {
    try {
      const total = await prisma.employee.count({ where: { 
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

  private dateNow():string {
    const dateNow = new Date();
    const formattedDateNow = `${String(dateNow.getDate()).padStart(2, '0')}-${String(dateNow.getMonth() + 1).padStart(2, '0')}-${dateNow.getFullYear()} ${String(dateNow.getHours()).padStart(2, '0')}-${String(dateNow.getMinutes()).padStart(2, '0')}-${String(dateNow.getSeconds()).padStart(2, '0')}`;
    return formattedDateNow
  }
}
