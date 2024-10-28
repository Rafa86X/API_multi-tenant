import { Prisma } from "@prisma/client";
import { HttpResponse, IMedicalAgreement_ExamModel, IRepositoy } from "../protocols/protocols";
import { Request } from "express";
import prisma from '../ASingletonPrismaClient/SingletonPrisma';

export class Agreement_ExamRepository {



  async create(data: IMedicalAgreement_ExamModel): Promise<HttpResponse<IMedicalAgreement_ExamModel | string >> {

    try {

      const one = await prisma.medicalAgreement_ExamModel.findMany({
        where: {
          id_clientLaboratory: data.id_clientLaboratory,
          id_MedicalAgreement: data.id_MedicalAgreement,
          id_exam_model: data.id_exam_model
        },
      });

      if(one.length != 0){        
        throw new Error(`Já existe a relação entre esse Convênio e este Exame`)
      }

      const created = await prisma.medicalAgreement_ExamModel.create({
        data: {
          id_clientLaboratory: data.id_clientLaboratory,
          id_MedicalAgreement: data.id_MedicalAgreement,
          id_exam_model: data.id_exam_model
        }
      });

      return {
        statusCode: 200,
        send: created as IMedicalAgreement_ExamModel,
      };
    } catch (error) {

        throw new Error(error);

    }finally {
      await this.disconnect();
    }
  }

  async getExamCodesByAgrements(req): Promise<HttpResponse<string[] | string>> {
    
    const { lab } = req.params;
    const { fname } = req.body;
    
    try {
      
      const examCodes = await prisma.medicalAgreement.findMany({
        where: {
          id_clientLaboratory:Number(lab),
          fantazyName:String(fname), 
        },
        select: {
          MedicalAgreement_ExamModel: {
            select: {
              Exam_Model: {
                select: {
                  exam_code: true
                },
              },
            },
          },
        },
      });
  
      const codes = examCodes.flatMap(agreement =>
        agreement.MedicalAgreement_ExamModel.flatMap(m =>
          m.Exam_Model ? [m.Exam_Model.exam_code] : [] 
        )
      );
        if (codes.length === 0) {
        return {
          statusCode: 404,
          send: 'Nenhum exame cadastrado para esse convênio.',
        };
      }
  
      return {
        statusCode: 200,
        send: codes,
      };
    } catch (error) {
      return {
        statusCode: 500,
        send: error.message,
      };
    } finally {
      await this.disconnect();
    }
  }
  

  async getAllFantazyNamesByExamCode(req): Promise<HttpResponse<string[] | string>> {
    
    const { lab } = req.params;
    const { examCode } = req.body;

    try {

      const agreements = await prisma.medicalAgreement.findMany({
        where: {
          id_clientLaboratory: Number(lab),
          MedicalAgreement_ExamModel: {
            some: {
              Exam_Model: {
                exam_code: examCode, 
              },
            },
          },
        },
        select: {
          fantazyName: true, 
        },
      });
  
      
      const fantazyNames = agreements.map(agreement => agreement.fantazyName);
  
     
      if (fantazyNames.length === 0) {
        return {
          statusCode: 404,
          send: 'Nenhum convênio cadastrado para esse exame.',
        };
      }
  
      return {
        statusCode: 200,
        send: fantazyNames,
      };
    } catch (error) {
      return {
        statusCode: 500,
        send: error.message,
      };
    } finally {
      await this.disconnect();
    }
  }
  

  async delete(req: Request): Promise<HttpResponse<IMedicalAgreement_ExamModel | string>> {
    const { lab } = req.params;
    const { id_exam_model, id_MedicalAgreement } = req.body;

    try {

      await prisma.medicalAgreement_ExamModel.delete({
        where: {
          id_clientLaboratory_id_exam_model_id_MedicalAgreement: {
            id_clientLaboratory: Number(lab),
            id_exam_model: id_exam_model,
            id_MedicalAgreement: id_MedicalAgreement
          }
        }
      });
      
      return {
        statusCode: 500,
        send: 'Relação médico exame deletada com sucesso.',
      };
    } catch (error) {

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        let errorMessage:string;

        switch (error.code) {
            case 'P2025':
                errorMessage = `Nenhuma relação deste Exame id: ${id_exam_model} com este Convênio id: ${id_MedicalAgreement} encontrada para esse laboratório id: ${lab}.`;
                break;
            default:
                errorMessage = error.message;
                break;
        }

        throw new Error(errorMessage);
      }


    } finally {
      await this.disconnect();
    }
  }
 

  async disconnect():Promise<void>{
    await prisma.$disconnect();
  }
}
