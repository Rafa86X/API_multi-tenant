
import { IController, IClientLaboratory, Tables } from '../protocols/protocols';
import {  ClientLaboratory } from '../repository/ClientLaboratoryRepository';
import { NextFunction, Request, Response } from 'express';
import { Security } from '../security/segurity';
import { validCreateLaboratory, validUpateLaboratory } from '../services/validLaboratory';

export class ClientLaboratoryController implements IController {


    async create(req: Request, res: Response): Promise<Response> {
        const repository = new ClientLaboratory();
        const segurity = new Security();

        try {
            const data: IClientLaboratory = req.body;
            const operation = 'C'
            await segurity.tokenAuthenticatorByEndpoint(Tables.super,operation,req);        
            validCreateLaboratory(data);

            const registered = await repository.create(data);
            return res.status(200).json(registered.send);
        } catch (error) {
            return res.status(400).json({ message: "Erro ao criar novo laboratório.", error: error.message });
        }
    }


    async getAll(req: Request, res: Response, next:NextFunction):Promise<Response> {

        const repository = new ClientLaboratory();
        const segurity = new Security();
        
        try {
            const operation = 'R'
            await segurity.tokenAuthenticatorByEndpoint(Tables.super,operation,req);        
            req.repository = repository; 
            next();

        } catch (error) {
            return res.status(400).json({ message: 'Erro ao buscar laboratórios', error: error.message });
        }
    }

    async getOne(req: Request, res: Response): Promise<Response>  {
        const repository = new ClientLaboratory();
        const segurity = new Security();

        try {
            const operation = 'R'
            await segurity.tokenAuthenticatorByEndpoint(Tables.super,operation,req);   
            const one = await repository.getOne(req);
            return res.status(200).json(one.send);
        } catch (error) {
            return res.status(400).json({ message: 'Erro ao buscar pelo laboratório', error: error.message });
        }
    }

    async update(req: Request, res: Response): Promise<Response>{
        const repository = new ClientLaboratory();
        const segurity = new Security();
        
        try {
            const data: IClientLaboratory = req.body;
            const operation = 'U'
            await segurity.tokenAuthenticatorByEndpoint(Tables.super,operation,req);   
            const updated = await repository.update(req);
            validUpateLaboratory(data);
            return res.status(200).json(updated.send);

        } catch (error) {
             return res.status(400).json({ message: 'Erro ao atualizar laboratório', error: error.message  });
            
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        const repository = new ClientLaboratory();
        const segurity = new Security();
        
        try {

            const operation = 'D'
            await segurity.tokenAuthenticatorByEndpoint(Tables.super,operation,req);   
            const one = await repository.delete(req);
            return res.status(200).json(one.send);

        } catch (error) {
            return res.status(400).json({ message: 'Erro ao tentar inativar laboratório', error: error.message });
        }
    }

}