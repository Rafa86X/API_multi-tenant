
import { IController, IDoctor, Tables } from '../protocols/protocols';
import { NextFunction, Request, Response } from 'express';
import { Security } from '../security/segurity';
import {getLabByToken} from '../services/getLabByToken'
import { DoctorRepository } from '../repository/DoctorRepository';
import { validCreateDoctor, validUpateDoctor } from '../services/validDoctor';



export class DoctorController implements IController {


    async createSuper(req: Request, res: Response): Promise<Response> {
        const repository = new DoctorRepository();
        const segurity = new Security();
        try {
            const data: IDoctor = req.body;
            const operation = 'C'
            validCreateDoctor(data);        
            await segurity.tokenAuthenticatorByEndpoint(Tables.super,operation,req);
            const registered = await repository.create(data);            
            return res.status(200).json(registered.send);
        } catch (error) {
            return res.status(400).json({ message: "Erro ao criar novo profissional", error: error.message });
        }finally{
            repository.disconnect();
        }
    }



    async getAllSuper(req: Request, res: Response, next):Promise<Response> {
        
        const repository = new DoctorRepository();
        const segurity = new Security();

        try {
            const operation = 'C'
            await segurity.tokenAuthenticatorByEndpoint(Tables.super,operation,req); 
            req.repository = repository; 
            next();


        } catch (error) {
            return res.status(400).json({ message: 'Erro ao buscar profissional', error: error.message });
        }finally{
            repository.disconnect();
        }
    }




    async create(req: Request, res: Response): Promise<Response> {
        const repository = new DoctorRepository();
        const segurity = new Security();
        try {

            const dataIncomplett: IDoctor = req.body;  
            const operation = 'C'
            const dataComplet = getLabByToken(req,dataIncomplett);            
            await segurity.tokenAuthenticatorByEndpoint(Tables.doctor,operation,req);
            validCreateDoctor(dataComplet as IDoctor);    
            const registered = await repository.create(dataComplet as IDoctor);
            return res.status(200).json(registered.send);
        } catch (error) {
            return res.status(400).json({ message: "Erro ao criar novo profissional", error: error.message });
        }finally{
            repository.disconnect();
        }
    }

    async getOne(req: Request, res: Response): Promise<Response>  {

        const repository = new DoctorRepository();
        const segurity = new Security();
        try {
            const operation = 'R'
            await segurity.tokenAuthenticatorByEndpoint(Tables.doctor,operation,req)
            const one = await repository.getOneByLab(req);
            return res.status(200).json(one.send);
        } catch (error) {
            return res.status(400).json({ message: 'Erro ao buscar por profissional', error: error.message });
        }finally{
            repository.disconnect();
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction):Promise<Response> {
        
        const repository = new DoctorRepository();
        const segurity = new Security();
        try {
            const operation = 'R'
            await segurity.tokenAuthenticatorByEndpoint(Tables.doctor,operation,req)
            req.repository = repository; 
            next();

        } catch (error) {
            return res.status(400).json({ message: 'Erro ao buscar profissional', error: error.message });
        }finally{
            repository.disconnect();
        }
    }

    async update(req: Request, res: Response): Promise<Response>{

        const repository = new DoctorRepository();
        const segurity = new Security();
        try {
            let {lab , doctor} = req.params;
            const data: IDoctor = req.body;
            const operation = 'U';           
            await segurity.tokenAuthenticatorByEndpoint(Tables.doctor,operation, req);
            data.id_clientLaboratory = Number(lab);
            validUpateDoctor(data);
            const updated = await repository.updateByLab(lab, doctor, data);
            return res.status(200).json(updated.send);
        } catch (error) {
             return res.status(400).json({ message: 'Erro ao atualizar profissional', error: error.message });
            
        }finally{
            repository.disconnect();
        }
    }


    async delete(req: Request, res: Response): Promise<Response> {

        const repository = new DoctorRepository();
        const segurity = new Security();
        try {
            const operation = 'D'      
            await segurity.tokenAuthenticatorByEndpoint(Tables.doctor,operation,req)
            const one = await repository.deleteByLab(req);
            return res.status(200).json({ message: one.send});

        } catch (error) {
            return res.status(400).json({ message: 'Erro ao deletar profissional', error: error.message });
        }finally{
            repository.disconnect();
        }
    }

}