import { IController, IExam_Model, Tables } from '../protocols/protocols';
import { NextFunction, Request, Response } from 'express';
import { Security } from '../security/segurity';
import {getLabByToken} from '../services/getLabByToken'
import { Exam_ModelRepository } from '../repository/Exam_ModelRepository';
import { validCreateExam_Model, validUpateExam_Model } from '../services/validExam_Model';



export class Exam_ModelController implements IController {


    async createSuper(req: Request, res: Response): Promise<Response> {
        const repository = new Exam_ModelRepository();
        const segurity = new Security();
        try {
            const data: IExam_Model = req.body;
            const operation = 'C'
            await segurity.tokenAuthenticatorByEndpoint(Tables.super,operation,req);
            validCreateExam_Model(data);

            const registered = await repository.create(data);            
            return res.status(200).json(registered.send);
        } catch (error) {
            return res.status(400).json({ message: "Erro ao criar novo Modelo de Exame", error: error.message });
        }finally{
            repository.disconnect();
        }
    }



    async getAllSuper(req: Request, res: Response, next: NextFunction):Promise<Response> {
        
        const repository = new Exam_ModelRepository();
        const segurity = new Security();

        try {
            const operation = 'C'
            await segurity.tokenAuthenticatorByEndpoint(Tables.super,operation,req); 
            req.repository = repository; 
            next();


        } catch (error) {
            return res.status(400).json({ message: 'Erro ao buscar Modelo de Exame', error: error.message });
        }finally{
            repository.disconnect();
        }
    }

    async create(req: Request, res: Response): Promise<Response> {
        const repository = new Exam_ModelRepository();
        const segurity = new Security();
        try {

            const dataIncomplett: IExam_Model = req.body;  
            const operation = 'C'
            const dataComplet = getLabByToken(req,dataIncomplett);            
            await segurity.tokenAuthenticatorByEndpoint(Tables.exam_Model,operation,req);
            validCreateExam_Model(dataComplet);
            const registered = await repository.create(dataComplet as IExam_Model);
            return res.status(200).json(registered.send);
        } catch (error) {
            return res.status(400).json({ message: "Erro ao criar novo Modelo de Exame", error: error.message });
        }finally{
            repository.disconnect();
        }
    }

    async getOne(req: Request, res: Response): Promise<Response>  {

        const repository = new Exam_ModelRepository();
        const segurity = new Security();
        try {
            const operation = 'R'
            await segurity.tokenAuthenticatorByEndpoint(Tables.exam_Model,operation,req)
            const one = await repository.getOneByLab(req);
            return res.status(200).json(one.send);
        } catch (error) {
            return res.status(400).json({ message: 'Erro ao buscar por Modelo de Exame', error: error.message });
        }finally{
            repository.disconnect();
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction):Promise<Response> {
        
        const repository = new Exam_ModelRepository();
        const segurity = new Security();
        try {
            const operation = 'R'
            await segurity.tokenAuthenticatorByEndpoint(Tables.exam_Model,operation,req)
            req.repository = repository; 
            next();

        } catch (error) {
            return res.status(400).json({ message: 'Erro ao buscar Modelo de Exame', error: error.message });
        }finally{
            repository.disconnect();
        }
    }

    async update(req: Request, res: Response): Promise<Response>{

        const repository = new Exam_ModelRepository();
        const segurity = new Security();
        try {
            let {lab , em} = req.params;
            const data: IExam_Model = req.body;
            const operation = 'U';           
            await segurity.tokenAuthenticatorByEndpoint(Tables.exam_Model,operation, req);
            data.id_clientLaboratory = Number(lab);
            validUpateExam_Model(data);

            const updated = await repository.updateByLab(lab, em, data);
            return res.status(200).json(updated.send);
        } catch (error) {
             return res.status(400).json({ message: 'Erro ao atualizar Modelo de Exame', error: error.message });
            
        }finally{
            repository.disconnect();
        }
    }


    async delete(req: Request, res: Response): Promise<Response> {

        const repository = new Exam_ModelRepository();
        const segurity = new Security();
        try {
            const operation = 'D'      
            await segurity.tokenAuthenticatorByEndpoint(Tables.exam_Model,operation,req)
            const one = await repository.deleteByLab(req);
            return res.status(200).json({ message: one.send});

        } catch (error) {
            return res.status(400).json({ message: 'Erro ao deletar Modelo de Exame', error: error.message });
        }finally{
            repository.disconnect();
        }
    }

}