
import { IController, IPatient, Tables } from '../protocols/protocols';
import { NextFunction, Request, Response } from 'express';
import { Security } from '../security/segurity';
import {getLabByToken} from '../services/getLabByToken'
import { PatientRepository } from '../repository/PatientRepository';
import { validCreatePatient, validUpatePatient } from '../services/validPatient';



export class PatientController implements IController {


    async createSuper(req: Request, res: Response): Promise<Response> {
        const repository = new PatientRepository();
        const segurity = new Security();
        try {
            const data: IPatient = req.body;
            const operation = 'C'
            await segurity.tokenAuthenticatorByEndpoint(Tables.super,operation,req);
            validCreatePatient(data)
            const registered = await repository.create(data);            
            return res.status(200).json(registered.send);
        } catch (error) {
            return res.status(400).json({ message: "Erro ao criar novo funcionário", error: error.message });
        }finally{
            repository.disconnect();
        }
    }



    async getAllSuper(req: Request, res: Response, next: NextFunction):Promise<Response> {
        
        const repository = new PatientRepository();
        const segurity = new Security();

        try {
            const operation = 'C'
            await segurity.tokenAuthenticatorByEndpoint(Tables.super,operation,req); 
            req.repository = repository; 
            next();


        } catch (error) {
            return res.status(400).json({ message: 'Erro ao buscar paciente', error: error.message });
        }finally{
            repository.disconnect();
        }
    }

    async create(req: Request, res: Response): Promise<Response> {
        const repository = new PatientRepository();
        const segurity = new Security();
        try {

            const dataIncomplett: IPatient = req.body;  
            const operation = 'C'
            const dataComplet = getLabByToken(req,dataIncomplett);            
            await segurity.tokenAuthenticatorByEndpoint(Tables.doctor,operation,req);
            const registered = await repository.create(dataComplet as IPatient);
            validCreatePatient(dataComplet as IPatient);
            return res.status(200).json(registered.send);
        } catch (error) {
            return res.status(400).json({ message: "Erro ao criar novo paciente", error: error.message });
        }finally{
            repository.disconnect();
        }
    }

    async getOne(req: Request, res: Response): Promise<Response>  {

        const repository = new PatientRepository();
        const segurity = new Security();
        try {
            const operation = 'R'
            await segurity.tokenAuthenticatorByEndpoint(Tables.doctor,operation,req)
            const one = await repository.getOneByLab(req);
            return res.status(200).json(one.send);
        } catch (error) {
            return res.status(400).json({ message: 'Erro ao buscar por paciente', error: error.message });
        }finally{
            repository.disconnect();
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction):Promise<Response> {
        
        const repository = new PatientRepository();
        const segurity = new Security();
        try {
            const operation = 'R'
            await segurity.tokenAuthenticatorByEndpoint(Tables.doctor,operation,req)
            req.repository = repository; 
            next();

        } catch (error) {
            return res.status(400).json({ message: 'Erro ao buscar paciente', error: error.message });
        }finally{
            repository.disconnect();
        }
    }

    async update(req: Request, res: Response): Promise<Response>{

        const repository = new PatientRepository();
        const segurity = new Security();
        try {
            let {lab , patient} = req.params;
            const data: IPatient = req.body;
            const operation = 'U';           
            await segurity.tokenAuthenticatorByEndpoint(Tables.doctor,operation, req);
            data.id_clientLaboratory = Number(lab);
            validUpatePatient(data);
            const updated = await repository.updateByLab(lab, patient, data);
            return res.status(200).json(updated.send);
        } catch (error) {
             return res.status(400).json({ message: 'Erro ao atualizar paciente', error: error.message });
            
        }finally{
            repository.disconnect();
        }
    }


    async delete(req: Request, res: Response): Promise<Response> {

        const repository = new PatientRepository();
        const segurity = new Security();
        try {
            const operation = 'D'      
            await segurity.tokenAuthenticatorByEndpoint(Tables.doctor,operation,req)
            const one = await repository.deleteByLab(req);
            return res.status(200).json({ message: one.send});

        } catch (error) {
            return res.status(400).json({ message: 'Erro ao deletar paciente', error: error.message });
        }finally{
            repository.disconnect();
        }
    }

}