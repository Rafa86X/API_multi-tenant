import { IController, IMedicalAgreement_ExamModel, Tables } from '../protocols/protocols';
import { NextFunction, Request, Response } from 'express';
import { Security } from '../security/segurity';
import {getLabByToken} from '../services/getLabByToken'
import { Agreement_ExamRepository } from '../repository/Agreement_ExamRepository';



export class Agreement_ExamController {


    async createSuper(req: Request, res: Response): Promise<Response> {
        const repository = new Agreement_ExamRepository();
        const segurity = new Security();
        try {
            const data: IMedicalAgreement_ExamModel = req.body;
            const operation = 'C'
            await segurity.tokenAuthenticatorByEndpoint(Tables.super,operation,req);
            const registered = await repository.create(data);            
            return res.status(200).json(registered.send);
        } catch (error) {
            return res.status(400).json({ message: "Erro ao criar novo profissional", error: error.message });
        }finally{
            repository.disconnect();
        }
    }


    async create(req: Request, res: Response): Promise<Response> {
        const repository = new Agreement_ExamRepository();
        const segurity = new Security();
        try {

            const dataIncomplett: IMedicalAgreement_ExamModel = req.body;  
            const operation = 'C'
            const dataComplet = getLabByToken(req,dataIncomplett);            
            await segurity.tokenAuthenticatorByEndpoint(Tables.exam_Model,operation,req);
            
            const registered = await repository.create(dataComplet as IMedicalAgreement_ExamModel); 
            return res.status(200).json(registered.send);
        } catch (error) {
            return res.status(400).json({ message: "Erro ao criar novo Modelo de Exame", error: error.message });
        }finally{
            repository.disconnect();
        }
    }

    async getAllExamsByAgrement(req: Request, res: Response): Promise<Response> {
        const repository = new Agreement_ExamRepository();
        const segurity = new Security();
        try {

            const operation = 'C'           
            await segurity.tokenAuthenticatorByEndpoint(Tables.exam_Model,operation,req);

            const finded = await repository.getExamCodesByAgrements(req);

            return res.status(200).json(finded);
        } catch (error) {
            return res.status(400).json({ message: "Erro ao criar novo Modelo de Exame", error: error.message });
        }finally{
            repository.disconnect();
        }
    }

    async getAllAgrementsByExam(req: Request, res: Response): Promise<Response> {
        const repository = new Agreement_ExamRepository();
        const segurity = new Security();
        try {
            const operation = 'C'           
            await segurity.tokenAuthenticatorByEndpoint(Tables.exam_Model,operation,req);

            const finded = await repository.getAllFantazyNamesByExamCode(req);

            return res.status(200).json(finded);
        } catch (error) {
            return res.status(400).json({ message: "Erro ao criar novo Modelo de Exame", error: error.message });
        }finally{
            repository.disconnect();
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {

        const repository = new Agreement_ExamRepository();
        const segurity = new Security();
        try {
            const operation = 'D'      
            await segurity.tokenAuthenticatorByEndpoint(Tables.exam_Model,operation,req)
            const one = await repository.delete(req);
            return res.status(200).json({ message: one.send});

        } catch (error) {
            return res.status(400).json({ message: 'Erro ao deletar Modelo de Exame', error: error.message });
        }finally{
            repository.disconnect();
        }
    }

}