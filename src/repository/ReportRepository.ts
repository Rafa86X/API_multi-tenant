import { HttpResponse, IReport, IRepositoy } from "../protocols/protocols";
import { Request, Response } from "express";
import prisma from '../ASingletonPrismaClient/SingletonPrisma';
import { Prisma } from "@prisma/client";


export class ReportRepository implements IRepositoy {


  async create(data:  IReport ): Promise<HttpResponse< IReport  | string>> {
    try {


      const created = await prisma.report.create({
        data: {
          id_clientLaboratory: data.id_clientLaboratory,
          lab_fantazyName: data.lab_fantazyName,
          lab_cnpj: data.lab_cnpj,
          lab_numberCouncilLab: data.lab_numberCouncilLab,
          lab_state: data.lab_state,
          lab_cep: data.lab_cep,
          lab_street: data.lab_street,
          lab_numberStreet: data.lab_numberStreet,
          lab_neighborhood: data.lab_neighborhood,
          lab_additionalInfo: data.lab_additionalInfo,
          rt_lab_name: data.rt_lab_name,
          rt_lab_council: data.rt_lab_council,
          rt_lab_number_council: data.rt_lab_number_council,
          signatory_counsil: data.signatory_counsil,
          signatory_number_council: data.signatory_number_council,
          signatory_name: data.signatory_name,
          patient_name: data.patient_name,
          patient_dateBirth: data.patient_dateBirth,
          patient_gender: data.patient_gender,
          medicalAgreement_cnpj: data.medicalAgreement_cnpj,
          medicalAgreement_fantazyName:data.medicalAgreement_fantazyName,
          doctor_requesting_name:data.doctor_requesting_name,
          doctor_requesting_counsil:data.doctor_requesting_counsil,
          doctor_requesting_numCounsil:data.doctor_requesting_numCounsil,
          exam_body: data.exam_body,
          exam_name: data.exam_name,
          exam_date: data.exam_date,
          report_date: data.report_date,
          report_state: data.report_state,
          price: data.price
        },
      });

      return {
        statusCode: 200,
        send: created as  IReport ,
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

  async getOne(req: Request): Promise<HttpResponse< IReport  | string>> {
    try {
      
      return {
        statusCode: 500,
        send: 'Essa operação não deve ser executada, use getOneByLab',
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

  async getAllByLab(limit:number, page:number,lab:number): Promise<HttpResponse<IReport[] | string>> {
    try {     
      const skip = (page - 1) * limit;
      const many = await prisma.report.findMany({
      skip:skip,
      take:limit,
        where: { 
          id_clientLaboratory: Number(lab) 
        }
      });
      
      return {
        statusCode: 200,
        send: many as IReport[],
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

  async getOneByLab(req:Request): Promise<HttpResponse<IReport[] | string>> {
    try {

      const {lab , report} = req.params;
      const one = await prisma.report.findMany({
        where: { 
          id_clientLaboratory: Number(lab),
          id: String(report) 
        }
      });
      
      if(one.length==0){

        throw new Error(`Nenhum laudo este id: ${report} do Lab codigo: ${lab}.`)
      }
      return {
        statusCode: 200,
        send: one as IReport[],
      };
    } catch (error) {
      
      throw new Error(error.message)

    } finally {
      await this.disconnect();
    }
  }

  async updateByLab(lab:string, report:string, data:IReport): Promise<HttpResponse< IReport  | string>> {
    try {

      const one = await prisma.report.findMany({
        where: {
          id_clientLaboratory: Number(lab),
          id: String(report),
        },
      });
      if(one.length===0){        
        throw new Error(`Nenhum Laudo encontrado para este código id: ${report}.`)
      }
      const updated = await prisma.report.update({
        where: { id: String(report) },
        data: {
          lab_fantazyName: data.lab_fantazyName,
          lab_cnpj: data.lab_cnpj,
          lab_numberCouncilLab: data.lab_numberCouncilLab,
          lab_state: data.lab_state,
          lab_cep: data.lab_cep,
          lab_street: data.lab_street,
          lab_numberStreet: data.lab_numberStreet,
          lab_neighborhood: data.lab_neighborhood,
          lab_additionalInfo: data.lab_additionalInfo,
          rt_lab_name: data.rt_lab_name,
          rt_lab_council: data.rt_lab_council,
          rt_lab_number_council: data.rt_lab_number_council,
          signatory_counsil: data.signatory_counsil,
          signatory_number_council: data.signatory_number_council,
          signatory_name: data.signatory_name,
          patient_name: data.patient_name,
          patient_dateBirth: data.patient_dateBirth,
          patient_gender: data.patient_gender,
          medicalAgreement_cnpj: data.medicalAgreement_cnpj,
          medicalAgreement_fantazyName:data.medicalAgreement_fantazyName,
          doctor_requesting_name:data.doctor_requesting_name,
          doctor_requesting_counsil:data.doctor_requesting_counsil,
          doctor_requesting_numCounsil:data.doctor_requesting_numCounsil,
          exam_body: data.exam_body,
          exam_name: data.exam_name,
          exam_date: data.exam_date,
          report_date: data.report_date,
          report_state: data.report_state,
          price: data.price,
          paid: data.paid,
          ative: data.ative
        },
      });

      return {
        statusCode: 200,
        send: updated as  IReport ,
      };
    } catch (error) {
      throw new Error(error)
    } finally {
      await this.disconnect();
    }
  }

  async getAll(limit:number, page:number): Promise<HttpResponse< IReport [] | string>> {
    try {

      const skip = (page - 1) * limit;
      const many = await prisma.report.findMany({
      skip:skip,
      take:limit
      })
     
      return {
        statusCode: 200,
        send: many as  IReport [],
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

  async deleteByLab(req: Request): Promise<HttpResponse<IReport | string>> {

    let deletedReport: IReport;
    try {
      const {lab , report} = req.params;


      const reportData = await prisma.report.findUnique({
      where: {
            id_clientLaboratory: Number(lab), 
            id: String(report),
          },
      });

      if(reportData == null){
        throw new Error(`Nenhum laudo encontrado para o ID: ${report}`);
      }

      if (reportData && reportData.ative === false) {
        deletedReport = await prisma.report.delete({
          where: {
            id: String(report),
          },
        });
      } 
      else {
        throw new Error("O Laudo não foi deletado porque o campo 'ATIVO' não está falso.");
      }


      return {
        statusCode: 200,
        send: `Laudo de id:${deletedReport.id} foi deletado com sucesso.`,
      };
    } catch (error) {

      throw new Error(error);
    } finally {
      await this.disconnect();
    }
  }


  async update(req: Request): Promise<HttpResponse<IReport | string>> {
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


  async delete(req: Request): Promise<HttpResponse< IReport  | string>> {
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

  async dasative(req: Request): Promise<HttpResponse< IReport  | string>> {
    try {
      const id = req.params.id;
      const updated = await prisma.report.update({
        where: {
          id: String(id),
        },
        data: {
          ative: false,
        },
      });
      return {
        statusCode: 200,
        send: updated as  IReport ,
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

  async countAll(): Promise<number | string> {
    try {
      const total = await prisma.report.count();
      return total

    } catch (error) {
      throw new Error(error.message)
    } finally {
      await this.disconnect();
    }
  }

  
  async countAllByLab(lab:number): Promise<number | string> {
    try {
      const total = await prisma.report.count({ where: { 
        id_clientLaboratory: Number(lab) 
      }});
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
