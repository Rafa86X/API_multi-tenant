
import { IClientLaboratory, IController, IEmployee, Tables } from '../protocols/protocols';
import {  EmployeeRepository } from '../repository/EmployeeRepositoy';
import { NextFunction, Request, Response } from 'express';
import { Security } from '../security/segurity';
import {validCreateEmployee , validUpateEmployee} from '../services/validEmployee'
import {getLabByToken} from '../services/getLabByToken'
import { ClientLaboratory } from '../repository/ClientLaboratoryRepository';



export class EmployeeController implements IController {

      async login(req: Request, res: Response): Promise<Response> {
        const repositoryLabClient = new ClientLaboratory()
        const repositoryEmploye = new EmployeeRepository();
        const segurity = new Security();
        
        
        try {
            const data: IEmployee = req.body;

            const  login = (await repositoryEmploye.getOnePassWord(data.login)).send as IEmployee;

            if(login==null){
                throw new Error("Login ou senha Inválido");
            }

            const  labInfos = (await repositoryLabClient.getOneByLoging(login.id_clientLaboratory)).send 
                                
            const loginAproved = await segurity.checkPassword(data.password,login,labInfos as IClientLaboratory); 

            return res.status(200).json(loginAproved);

        } catch (error) { 
            console.log(error);
                      
            return res.status(400).json({ message: "Login Reprovado", error: error.message  });
        }finally{
            repositoryEmploye.disconnect();
            repositoryLabClient.disconnect();
        }
    }

    async createSuper(req: Request, res: Response): Promise<Response> {
        const repository = new EmployeeRepository();
        const segurity = new Security();
        try {
            const data: IEmployee = req.body;
            const operation = 'C'
            await segurity.tokenAuthenticatorByEndpoint(Tables.super,operation,req);        
            validCreateEmployee(data);
            const registered = await repository.create(data);            
            return res.status(200).json(registered.send);
        } catch (error) {
            return res.status(400).json({ message: "Erro ao criar novo funcionário", error: error.message });
        }finally{
            repository.disconnect();
        }
    }



    async getAllSuper(req: Request, res: Response, next):Promise<Response> {
        
        const repository = new EmployeeRepository();
        const segurity = new Security();

        try {
            const operation = 'C'
            await segurity.tokenAuthenticatorByEndpoint(Tables.super,operation,req); 
            req.repository = repository; 
            next();


        } catch (error) {
            return res.status(400).json({ message: 'Erro ao buscar funcionaios', error: error.message });
        }finally{
            repository.disconnect();
        }
    }




    async create(req: Request, res: Response): Promise<Response> {
        const repository = new EmployeeRepository();
        const segurity = new Security();
        try {
            const dataIncomplett: IEmployee = req.body;
            const operation = 'C'
            const dataComplet = getLabByToken(req,dataIncomplett);
            await segurity.tokenAuthenticatorByEndpoint(Tables.employe,operation,req);   
            validCreateEmployee(dataComplet  as IEmployee);
            const registered = await repository.create(dataComplet as IEmployee);            
            return res.status(200).json(registered.send);
        } catch (error) {
            return res.status(400).json({ message: "Erro ao criar novo funcionário", error: error.message });
        }finally{
            repository.disconnect();
        }
    }

    async getOne(req: Request, res: Response): Promise<Response>  {

        const repository = new EmployeeRepository();
        const segurity = new Security();
        try {
            const operation = 'R'
            await segurity.tokenAuthenticatorByEndpoint(Tables.employe,operation,req)
            const one = await repository.getOneByLab(req);
            return res.status(200).json(one.send);
        } catch (error) {
            return res.status(400).json({ message: 'Erro ao buscar por funcionário', error: error.message });
        }finally{
            repository.disconnect();
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction):Promise<Response> {
        
        const repository = new EmployeeRepository();
        const segurity = new Security();
        try {
            const operation = 'R'
            await segurity.tokenAuthenticatorByEndpoint(Tables.employe,operation,req)
            req.repository = repository; 
            next();

        } catch (error) {
            return res.status(400).json({ message: 'Erro ao buscar funcionaios', error: error.message });
        }finally{
            repository.disconnect();
        }
    }

    async update(req: Request, res: Response): Promise<Response>{

        const repository = new EmployeeRepository();
        const segurity = new Security();
        try {
            let {lab , employee} = req.params;
            const data: IEmployee = req.body;
            const operation = 'U'           
            await segurity.tokenAuthenticatorByEndpoint(Tables.employe,operation, req);
            data.id_clientLaboratory = Number(lab);
            validUpateEmployee(data);
            const updated = await repository.updateByLab(lab, employee, data);
            return res.status(200).json(updated.send);
        } catch (error) {
             return res.status(400).json({ message: 'Erro ao atualizar funcionario', error: error.message });
            
        }finally{
            repository.disconnect();
        }
    }

    async updatePassWord(req: Request, res: Response): Promise<Response>{

        const repository = new EmployeeRepository();
        const segurity = new Security();
        try {
            let {lab , employee} = req.params;
            const data: IEmployee = req.body;           
            const operation = 'NP'           
            await segurity.tokenAuthenticatorByEndpoint(Tables.employe,operation, req);
            data.id_clientLaboratory = Number(lab);
            validUpateEmployee(data);
            const updated = await repository.updatePassWord(lab, employee, data);
            return res.status(200).json(updated.send);
        } catch (error) {
             return res.status(400).json({ message: 'Erro ao atualizar senha', error: error.message });
            
        }finally{
            repository.disconnect();
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {

        const repository = new EmployeeRepository();
        const segurity = new Security();
        try {
            const operation = 'D'      
            await segurity.tokenAuthenticatorByEndpoint(Tables.employe,operation,req)
            const one = await repository.deleteByLab(req);
            return res.status(200).json({ message: one.send});

        } catch (error) {
            return res.status(400).json({ message: 'Erro ao deletar funcionário', error: error.message });
        }finally{
            repository.disconnect();
        }
    }

}