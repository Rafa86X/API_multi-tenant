import z from 'zod';
import { IPatient } from "../protocols/protocols";


export function validCreatePatient(data:IPatient):void | string[]{

    try {
      const schema = z.object({
        id_clientLaboratory: z.number().min(1, { message: "O campo 'id_clientLaboratory' não pode estar vazio." }),
        name: z.string()
            .max(100, { message: "O campo 'NOME' deve ter no máximo 100 caracteres." }),
        id_medicalAgreement:z.string().min(1, { message: "O campo 'ID CONVENIO' não pode estar vazio." }),
        dateBirth: z.string()
            .length(10, { message: "O campo 'DATA DE NACIMENTO' deve ter exatamente 10 caracteres no formato dd/mm/aaaa" }),
        gender: z.string()
            .refine(val => ["masculino", "feminino"].includes(val), {
          message: "O valor do campo 'SEXO' deve ser 'masculino' ou 'feminino'."}),
        cpf: z.string()
            .max(11, { message: "O campo 'CPF' deve ter no máximo 11 caracteres." }),
        email: z.string()
            .max(50, { message: "O campo 'EMAIL' deve ter no máximo 50 caracteres." }),
        phone:z.string()
        .max(20, { message: "O campo 'TELEFONE' deve ter no máximo 20 caracteres." }),
        socialName: z.string()
        .max(100, { message: "O campo 'NOME SOCIAL' deve ter no máximo 100 caracteres." }),
    });
        
    schema.parse(data);       
    } catch (error) {
        const errorMessages = error.issues.map(issue => issue.message);
        throw new Error(errorMessages);
    }
    
}

export function validUpatePatient(data:IPatient):void | string[]{

  try {
    const schema = z.object({
        name: z.string()
            .max(100, { message: "O campo 'NOME' deve ter no máximo 100 caracteres." }).nullable().optional(),
        id_medicalAgreement:z.string().min(1, { message: "O campo 'ID CONVENIO' não pode estar vazio." }).nullable().optional(),
        dateBirth: z.string()
            .length(10, { message: "O campo 'DATA DE NACIMENTO' deve ter exatamente 10 caracteres no formato dd/mm/aaaa" }).nullable().optional(),
        gender: z.string()
            .refine(val => ["masculino", "feminino"].includes(val), {message: "O valor do campo 'SEXO' deve ser 'masculino' ou 'feminino'."}).nullable().optional(),
        cpf: z.string()
            .max(11, { message: "O campo 'CPF' deve ter no máximo 11 caracteres." }).nullable().optional(),
        email: z.string()
            .max(50, { message: "O campo 'EMAIL' deve ter no máximo 50 caracteres." }).nullable().optional(),
        phone:z.string()
        .max(20, { message: "O campo 'TELEFONE' deve ter no máximo 20 caracteres." }).nullable().optional(),
        socialName: z.string()
        .max(100, { message: "O campo 'NOME SOCIAL' deve ter no máximo 100 caracteres." }).nullable().optional(),
    });
        
    schema.parse(data);       
    } catch (error) {
        const errorMessages = error.issues.map(issue => issue.message);
        throw new Error(errorMessages);
    }
 
}
