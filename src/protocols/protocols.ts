import { Request, Response , NextFunction  } from "express";
import { number } from "zod";

export interface HttpResponse<T> {
  statusCode: Number;
  send: T;
}


export interface HttpRequest<B> {
  params?: unknown;
  headers?: unknown;
  body?: B;
}

export interface ISecurity {
  encript(p:string): Promise<string>
  checkPassword(p_test:string,loginTested:IEmployee,labInfo: IClientLaboratory):Promise<ILoginResponse | string>;
  tokenGenerator(user: IEmployee,labInfo: IClientLaboratory):string;
  tokenValidity(req: Request, res: Response, next:NextFunction ):Promise<string | void>;
  tokenAuthenticatorByEndpoint(table:string, operation:string, req: Request):void;
}

export interface IController {
  getAll(req: Request, res: Response, next: NextFunction): Promise<HttpResponse<unknown>>;
  getOne(req: Request, res: Response): Promise<HttpResponse<unknown>>;
  create(req: Request, res: Response): Promise<HttpResponse<unknown>>;
  update(req: Request, res: Response): Promise<HttpResponse<unknown>>;
  delete(req: Request, res: Response): Promise<HttpResponse<unknown>>;
}

export interface IRepositoy {
  getAll(limit?:number, page?:number): Promise<HttpResponse<unknown>>;
  getOne(httpRequest?: HttpRequest<unknown>): Promise<HttpResponse<unknown>>;
  create?(data?: unknown): Promise<HttpResponse<unknown>>;
  update(httpRequest?: HttpRequest<unknown>): Promise<HttpResponse<unknown>>;
  delete(httpRequest?: HttpRequest<unknown>): Promise<HttpResponse<unknown>>;
}

export interface IEmployee {
  id_clientLaboratory?: number;
  id?: string;
  login?: string;
  password?: string;
  name?: string;
  active?: boolean;
  dateInative?: string;
  counsil?: string;
  number_council?: string;
  medical_specialty?: string;
  signatory?: string;
  role_id?: number;
  newPassWord?: boolean;
}

export interface IClientLaboratory {
  id?: number;
  fantazyName?: string;
  socialReason?: string;
  councilLab?: string;
  numberCouncilLab?: string;
  cnpj?: string;
  state?: string;
  cep?: string;
  street?: string;
  number?: string;
  neighborhood?: string;
  additionalInfo?: string;
  nameTechnicalManager?: string;
  council_Tec_Manager?: string;
  number_Council_Tec_Manager?: string;
  nameFinancialManager?: string;
  email?: string;
  phone?: string;
  paymentBlock?: boolean;
  adminBlock?: boolean;
  active?: boolean;
}

export interface IDoctor{
  id_clientLaboratory: number;
  id?: string;
  name?:string;
  typeDoctor?: string;
  council?: string;
  numberCouncil?: string;
  active?: boolean;
  dateInative?: string;
}


export interface IPatient{
  id_clientLaboratory: number;
  id?: string;
  name?:string;
  id_medicalAgreement?: string;
  dateBirth?: string;
  gender?: string;
  cpf?: string;
  email?: string;
  phone?: string;
  socialName?: string;
}

export interface IMedicalAgreement {
  id_clientLaboratory: number;
  id?: string;
  fantazyName?: string;
  socialReason?: string;
  cnpj?: string;
  state?: string;
  cep?: string;
  street?: string;
  number?: string;
  neighborhood?: string;
  additionalInfo?: string;
  technicalManager?: string;
  financialManager?: string;
  email?: string;
  phone?: string;
}

export interface IMedicalAgreement_ExamModel {
  id_clientLaboratory: number;
  id_MedicalAgreement: string;
  id_exam_model: string;
  id?: string;
}


export interface IExam_Model {
  id_clientLaboratory?: number;
  id?:                  string;
  exam_code?:           string;
  name?:                string;
  deadline_days?:       string;
  price?:               string;
  exam_body?:           string;
  internet_delivery?:   boolean;
}


export interface IReport {
    id?:                       string;
    id_clientLaboratory?:      number;
    lab_fantazyName:          string;
    lab_cnpj:                 string;
    lab_numberCouncilLab:     string;
    lab_state:                string;
    lab_cep:                  string;
    lab_street:               string;
    lab_numberStreet:         string;
    lab_neighborhood:         string;
    lab_additionalInfo:       string;
    rt_lab_name:              string;
    rt_lab_council:           string;
    rt_lab_number_council:    string;
    signatory_counsil:        string;
    signatory_number_council: string;
    signatory_name:           string;
    patient_name:             string;
    patient_dateBirth:        string;
    patient_gender:           string;
    medicalAgreement_cnpj:        string;
    medicalAgreement_fantazyName: string;
    doctor_requesting_name:       string;
    doctor_requesting_counsil:    string;
    doctor_requesting_numCounsil: string;
    exam_body:                string;
    exam_name:                string;
    exam_date:                string;
    report_date:              string;
    report_state:             string;
    price:                    string;
    paid?:                    boolean;
    ative?:                   boolean;
}


export interface ILoginResponse{
    user_name?: string,
    user_active?: string,
    user_newPassword?: string,
    user_role?: string, 
    lab_id?: string,
    lab_name?: string
    message?: string
    token?: string  
}

export enum Tables{
  super = 'super',
  employe = 'employee',
  laboratory = 'laboratoy',
  doctor = 'doctor',
  patient = 'patient',
  medicalAgreement = 'medicalAgreement',
  exam_Model = 'exam_model',
  medicalAgreement_examModel = 'medicalAgreement_examModel',
  report = 'report'
}

declare module 'express-serve-static-core' {
  interface Request {
    repository?: unknown;
  }
}