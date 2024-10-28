import { HttpResponse,IClientLaboratory , IRepositoy } from "../protocols/protocols";
import { Request } from "express";
import prisma from '../ASingletonPrismaClient/SingletonPrisma';
import { Prisma } from "@prisma/client";


export class ClientLaboratory implements IRepositoy {


  async create(data: IClientLaboratory): Promise<HttpResponse<IClientLaboratory | string>> {
    try {


      const created = await prisma.clientLaboratory.create({
        data: {
          fantazyName: data.fantazyName,
          socialReason: data.socialReason,
          councilLab:data.councilLab,
          numberCouncilLab: data.numberCouncilLab,
          cnpj: data.cnpj,
          state: data.state,
          cep: data.cep,
          street: data.street,
          number: data.number,
          neighborhood: data.neighborhood,
          additionalInfo: data.additionalInfo,
          nameTechnicalManager: data.nameTechnicalManager,
          council_Tec_Manager: data.council_Tec_Manager,
          number_Council_Tec_Manager: data.number_Council_Tec_Manager,
          nameFinancialManager: data.nameFinancialManager,
          email: data.email,
          phone: data.phone
        },
      });

      return {
        statusCode: 200,
        send: created as IClientLaboratory,
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

  async getOneByLoging(id:number): Promise<HttpResponse<IClientLaboratory | string>> {
    try {
      const one = await prisma.clientLaboratory.findMany({
        where: {
          id: Number(id),
        },
      });

      if(one.length===0){        
        throw new Error(`Nenhum Laboratório encontrado para este id ${id}.`)
      }
      return {
        statusCode: 200,
        send: one as IClientLaboratory,
      };
    } catch (error) {
      throw new Error(error)

    } finally {
      await this.disconnect();
    }
  }

  async getOne(req: Request): Promise<HttpResponse<IClientLaboratory | string>> {
    try {
      const id = req.params.id;
      const one = await prisma.clientLaboratory.findMany({
        where: {
          id: Number(id),
        },
      });

      if(one.length===0){        
        throw new Error(`Nenhum Laboratório encontrado para este id ${id}.`)
      }
      return {
        statusCode: 200,
        send: one as IClientLaboratory,
      };
    } catch (error) {
      throw new Error(error)

    } finally {
      await this.disconnect();
    }
  }


  async update(req: Request): Promise<HttpResponse<IClientLaboratory | string>> {
    try {
      const id = req.params.id;
      const data: IClientLaboratory = req.body;
      const one = await prisma.clientLaboratory.findMany({
        where: {
          id: Number(id),
        },
      });
      if(one.length===0){        
        throw new Error(`Nenhum Laboratório encontrado para este id ${id}.`)
      }
      const updated = await prisma.clientLaboratory.update({
        where: { id: Number(id) },
        data: {
          fantazyName: data.fantazyName,
          socialReason: data.socialReason,
          councilLab:data.councilLab,
          numberCouncilLab: data.numberCouncilLab,
          cnpj: data.cnpj,
          state: data.state,
          cep: data.cep,
          street: data.street,
          number: data.number,
          neighborhood: data.neighborhood,
          additionalInfo: data.additionalInfo,
          nameTechnicalManager: data.nameTechnicalManager,
          council_Tec_Manager: data.council_Tec_Manager,
          number_Council_Tec_Manager: data.number_Council_Tec_Manager,
          nameFinancialManager: data.nameFinancialManager,
          email: data.email,
          phone: data.phone,
          active:data.active,
          adminBlock:data.adminBlock,
          paymentBlock:data.paymentBlock
        },
      });


      return {
        statusCode: 200,
        send: updated as IClientLaboratory,
      };
    } catch (error) {
      throw new Error(error)
    } finally {
      await this.disconnect();
    }
  }

  async getAll(limit:number, page:number): Promise<HttpResponse<IClientLaboratory[] | string>> {
    try {

      const skip = (page - 1) * limit;
      const many = await prisma.clientLaboratory.findMany({
      skip:skip,
      take:limit
      })
     
      return {
        statusCode: 200,
        send: many as IClientLaboratory[],
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
  async delete(req: Request): Promise<HttpResponse<IClientLaboratory | string>> {
   
   
    const id = req.params.id;
    try {
      await prisma.clientLaboratory.delete({
        where: {
          id: Number(id),
        }
      });
      return {
        statusCode: 200,
        send: `Laboratório id ${id} deletado com sucesso.`,
      };
    } catch (error) {

      
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        let errorMessage:string;

        switch (error.code) {
            case 'P2025':
                errorMessage = `Nenhum laboratório encontrado para este Lab codigo ${id}.`;
                break;
            case 'P2003':
                  errorMessage = `O laboratório com código ${id} não pode ser excluído porque há dependências em outras tabelas. Verifique os registros relacionados a esse laboratório.`;
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
      const total = await prisma.clientLaboratory.count();
      return total

    } catch (error) {
      throw new Error(error.message)
    } finally {
      await this.disconnect();
    }
  }

  async disconnect() {
    await prisma.$disconnect();
  }
}
