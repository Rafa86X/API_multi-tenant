import { IController, IReport, Tables } from '../protocols/protocols';
import { NextFunction, Request, Response } from 'express';
import { Security } from '../security/segurity';
import {getLabByToken} from '../services/getLabByToken'

import { ReportRepository } from '../repository/ReportRepository';
import { validCreateReport, validUpateReport } from '../services/validReport';



export class ReportController implements IController {


    async createSuper(req: Request, res: Response): Promise<Response> {
        const repository = new ReportRepository();
        const segurity = new Security();
        try {
            const data: IReport = req.body;
            const operation = 'C'
            await segurity.tokenAuthenticatorByEndpoint(Tables.super,operation,req);
            validCreateReport(data);
            const registered = await repository.create(data);            
            return res.status(200).json(registered.send);
        } catch (error) {
            return res.status(400).json({ message: "Erro ao criar novo convênio", error: error.message });
        }finally{
            repository.disconnect();
        }
    }



    async getAllSuper(req: Request, res: Response, next: NextFunction):Promise<Response> {
        
        const repository = new ReportRepository();
        const segurity = new Security();

        try {
            const operation = 'C'
            await segurity.tokenAuthenticatorByEndpoint(Tables.super,operation,req); 
            req.repository = repository; 
            next();


        } catch (error) {
            return res.status(400).json({ message: 'Erro ao buscar convênio', error: error.message });
        }finally{
            repository.disconnect();
        }
    }

    async create(req: Request, res: Response): Promise<Response> {
        const repository = new ReportRepository();
        const segurity = new Security();
        try {

            const dataIncomplett: IReport = req.body;  
            const operation = 'C'
            const dataComplet = getLabByToken(req,dataIncomplett);            
            await segurity.tokenAuthenticatorByEndpoint(Tables.report,operation,req);
            validCreateReport(dataComplet);
            const registered = await repository.create(dataComplet as IReport);
            return res.status(200).json(registered.send);
        } catch (error) {
            return res.status(400).json({ message: "Erro ao criar novo convênio", error: error.message });
        }finally{
            repository.disconnect();
        }
    }

    async getOne(req: Request, res: Response): Promise<Response>  {

        const repository = new ReportRepository();
        const segurity = new Security();
        try {
            const operation = 'R'
            await segurity.tokenAuthenticatorByEndpoint(Tables.report,operation,req)
            const one = await repository.getOneByLab(req);

            return res.status(200).json(one.send);
        } catch (error) {
            return res.status(400).json({ message: 'Erro ao buscar por convênio', error: error.message });
        }finally{
            repository.disconnect();
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction):Promise<Response> {
        
        const repository = new ReportRepository();
        const segurity = new Security();
        try {
            const operation = 'R'
            await segurity.tokenAuthenticatorByEndpoint(Tables.report,operation,req)
            req.repository = repository; 
            next();

        } catch (error) {
            return res.status(400).json({ message: 'Erro ao buscar convênio', error: error.message });
        }finally{
            repository.disconnect();
        }
    }

    async update(req: Request, res: Response): Promise<Response>{

        const repository = new ReportRepository();
        const segurity = new Security();
        try {
            let {lab , report} = req.params;
            const data: IReport = req.body;
            const operation = 'U';           
            await segurity.tokenAuthenticatorByEndpoint(Tables.report,operation, req);
            data.id_clientLaboratory = Number(lab);
            validUpateReport(data)
            const updated = await repository.updateByLab(lab, report, data);
            return res.status(200).json(updated.send);
        } catch (error) {
             return res.status(400).json({ message: 'Erro ao atualizar convênio', error: error.message });
            
        }finally{
            repository.disconnect();
        }
    }


    async delete(req: Request, res: Response): Promise<Response> {

        const repository = new ReportRepository();
        const segurity = new Security();
        try {
            const operation = 'D'      
            await segurity.tokenAuthenticatorByEndpoint(Tables.report,operation,req)
            const one = await repository.deleteByLab(req);
            
            return res.status(200).json({ message: one.send});

        } catch (error) {
            return res.status(400).json({ message: 'Erro ao deletar convênio', error: error.message});
        }finally{
            repository.disconnect();
        }
    }

}