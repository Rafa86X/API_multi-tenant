import z from 'zod';
import { IEmployee } from "../protocols/protocols";


export function validCreateEmployee(data:IEmployee):void | string[]{

    try {
      const schema = z.object({
        id_clientLaboratory: z.number().min(1, { message: "id_clientLaboratory não pode estar vazio." }),
        name: z.string()
            .min(5, { message: "O campo 'NOME' deve ter no mínimo 5 caracteres." })
            .max(100, { message: "O campo 'NOME' deve ter no máximo 100 caracteres." }),
        login: z.string()
            .min(5, { message: "O campo 'LOGIN' deve ter no mínimo 5 caracteres." })
            .max(20, { message: "O campo 'lOGIN' deve ter no máximo 20 caracteres." }),
        password: z.string()
            .min(5, { message: "O campo 'SENHA' deve ter no mínimo 5 caracteres." })
            .max(20, { message: "O campo 'SENHA' deve ter no máximo 20 caracteres." }),
        counsil: z.string()
            .min(2, { message: "A campo 'CONSELHO DO ANALISTA' deve ter no mínimo 2 caracteres." })
            .max(20, { message: "campo 'CONSELHO DO ANALISTA' deve ter no máximo 20 caracteres." }).nullable().optional(),
        number_council: z.string()
            .min(4, { message: "A campo 'NÚMERO DO CONSELHO' deve ter no mínimo 4 caracteres." })
            .max(20, { message: "campo 'NÚMERO DO CONSELHO' deve ter no máximo 20 caracteres." }).nullable().optional(),
        medical_specialty: z.string()
            .min(4, { message: "A campo 'NOME DA ESPECIALIDADE MÉDICA' deve ter no mínimo 4 caracteres." })
            .max(20, { message: "campo 'NOME DA ESPECIALIDADE MÉDICA' deve ter no máximo 20 caracteres." }).nullable().optional(),
        dateInative: z.string()
            .length(10, { message: "O campo 'DATA DE INATIVAÇÃO' deve ter exatamente 10 caracteres no formato dd/mm/aaaa" })
            .nullable().optional(),
        role_id: z.number()
            .int()
            .refine(val => [1, 2].includes(val), { message: "Selecione o Cargo" }),
        newPassWord: z.string().nullable().optional(),
    });
        
    schema.parse(data);       
    } catch (error) {
        const errorMessages = error.issues.map(issue => issue.message);
        throw new Error(errorMessages);
    }
    
}

export function validUpateEmployee(data:IEmployee):void | string[]{

  try {
    const schema = z.object({
        id_clientLaboratory: z.number().min(1, { message: "id_clientLaboratory não pode estar vazio." }),
        name: z.string()
            .min(5, { message: "O campo 'NOME' deve ter no mínimo 5 caracteres." })
            .max(100, { message: "O campo 'NOME' deve ter no máximo 100 caracteres." }).nullable().optional(),
        login: z.string()
            .min(5, { message: "O campo 'LOGIN' deve ter no mínimo 5 caracteres." })
            .max(20, { message: "O campo 'lOGIN' deve ter no máximo 20 caracteres." }).nullable().optional(),
        password: z.string()
            .min(5, { message: "O campo 'SENHA' deve ter no mínimo 5 caracteres." })
            .max(20, { message: "O campo 'SENHA' deve ter no máximo 20 caracteres." }).nullable().optional(),
        counsil: z.string()
            .min(2, { message: "A campo 'CONSELHO DO ANALISTA' deve ter no mínimo 2 caracteres." })
            .max(20, { message: "campo 'CONSELHO DO ANALISTA' deve ter no máximo 20 caracteres." }).nullable().optional(),
        number_council: z.string()
            .min(4, { message: "A campo 'NÚMERO DO CONSELHO' deve ter no mínimo 4 caracteres." })
            .max(20, { message: "campo 'NÚMERO DO CONSELHO' deve ter no máximo 20 caracteres." }).nullable().optional(),
        medical_specialty: z.string()
            .min(4, { message: "A campo 'NOME DA ESPECIALIDADE MÉDICA' deve ter no mínimo 4 caracteres." })
            .max(20, { message: "campo 'NOME DA ESPECIALIDADE MÉDICA' deve ter no máximo 20 caracteres." }).nullable().optional(),
        dateInative: z.string()
            .length(10, { message: "O campo 'DATA DE INATIVAÇÃO' deve ter exatamente 10 caracteres no formato dd/mm/aaaa" })
            .nullable().optional(),
        newPassWord: z.string().nullable().optional(),
        role_id: z.number()
            .int().refine(val => [1, 2].includes(val), { message: "Selecione o Cargo" }).nullable().optional(),
        active: z.boolean().nullable().optional(),
  });
      
  schema.parse(data);       
  } catch (error) {
      const errorMessages = error.issues.map(issue => issue.message);
      throw new Error(errorMessages);
  }
  
}
