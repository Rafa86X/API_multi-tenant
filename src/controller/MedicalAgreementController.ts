import { IController, IMedicalAgreement, Tables } from '../protocols/protocols';
import { NextFunction, Request, Response } from 'express';
import { Security } from '../security/segurity';
import {getLabByToken} from '../services/getLabByToken'
import { MedicalAgreementRepository } from '../repository/MedicalAgreementRepository';
import { validCreateMedicalAgreement, validUpateMedicalAgreement } from '../services/validMedicalAgreement';



export class MedicalAgreementController implements IController {


    async createSuper(req: Request, res: Response): Promise<Response> {
        const repository = new MedicalAgreementRepository();
        const segurity = new Security();
        try {
            const data: IMedicalAgreement = req.body;
            const operation = 'C'
            await segurity.tokenAuthenticatorByEndpoint(Tables.super,operation,req);
            validCreateMedicalAgreement(data);
            const registered = await repository.create(data);            
            return res.status(200).json(registered.send);
        } catch (error) {
            return res.status(400).json({ message: "Erro ao criar novo convênio", error: error.message });
        }finally{
            repository.disconnect();
        }
    }



    async getAllSuper(req: Request, res: Response, next: NextFunction):Promise<Response> {
        
        const repository = new MedicalAgreementRepository();
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
        const repository = new MedicalAgreementRepository();
        const segurity = new Security();
        try {

            const dataIncomplett: IMedicalAgreement = req.body;  
            const operation = 'C'
            const dataComplet = getLabByToken(req,dataIncomplett);            
            await segurity.tokenAuthenticatorByEndpoint(Tables.medicalAgreement,operation,req);
            validCreateMedicalAgreement(dataComplet as IMedicalAgreement);
            const registered = await repository.create(dataComplet as IMedicalAgreement);
            return res.status(200).json(registered.send);
        } catch (error) {
            return res.status(400).json({ message: "Erro ao criar novo convênio", error: error.message });
        }finally{
            repository.disconnect();
        }
    }

    async getOne(req: Request, res: Response): Promise<Response>  {

        const repository = new MedicalAgreementRepository();
        const segurity = new Security();
        try {
            const operation = 'R'
            await segurity.tokenAuthenticatorByEndpoint(Tables.medicalAgreement,operation,req)
            const one = await repository.getOneByLab(req);
            return res.status(200).json(one.send);
        } catch (error) {
            return res.status(400).json({ message: 'Erro ao buscar por convênio', error: error.message });
        }finally{
            repository.disconnect();
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction):Promise<Response> {
        
        const repository = new MedicalAgreementRepository();
        const segurity = new Security();
        try {
            const operation = 'R'
            await segurity.tokenAuthenticatorByEndpoint(Tables.medicalAgreement,operation,req)
            req.repository = repository; 
            next();

        } catch (error) {
            return res.status(400).json({ message: 'Erro ao buscar convênio', error: error.message });
        }finally{
            repository.disconnect();
        }
    }

    async update(req: Request, res: Response): Promise<Response>{

        const repository = new MedicalAgreementRepository();
        const segurity = new Security();
        try {
            let {lab , ma} = req.params;
            const data: IMedicalAgreement = req.body;
            const operation = 'U';           
            await segurity.tokenAuthenticatorByEndpoint(Tables.medicalAgreement,operation, req);
            data.id_clientLaboratory = Number(lab);
            validUpateMedicalAgreement(data);
            const updated = await repository.updateByLab(lab, ma, data);
            return res.status(200).json(updated.send);
        } catch (error) {
             return res.status(400).json({ message: 'Erro ao atualizar convênio', error: error.message });
            
        }finally{
            repository.disconnect();
        }
    }


    async delete(req: Request, res: Response): Promise<Response> {

        const repository = new MedicalAgreementRepository();
        const segurity = new Security();
        try {
            const operation = 'D'      
            await segurity.tokenAuthenticatorByEndpoint(Tables.medicalAgreement,operation,req)
            const one = await repository.deleteByLab(req);
            return res.status(200).json({ message: one.send});

        } catch (error) {
            return res.status(400).json({ message: 'Erro ao deletar convênio', error: error.message });
        }finally{
            repository.disconnect();
        }
    }

}