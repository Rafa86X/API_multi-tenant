import z from 'zod';
import { IDoctor } from "../protocols/protocols";


export function validCreateDoctor(data:IDoctor):void | string[]{

    try {
      const schema = z.object({
        id_clientLaboratory: z.number().min(1, { message: "id_clientLaboratory não pode estar vazio." }),
        name: z.string()
            .min(5, { message: "O campo 'NOME' deve ter no mínimo 5 caracteres." })
            .max(100, { message: "O campo 'NOME' deve ter no máximo 100 caracteres." }),
        typeDoctor: z.string()
            .min(5, { message: "O campo 'TIPO DE PROFISSIONAL' deve ter no mínimo 5 caracteres." })
            .max(20, { message: "O campo 'TIPO DE PROFISSIONAL' deve ter no máximo 20 caracteres." }),
        council: z.string()
            .min(2, { message: "O campo 'CONSELHO' deve ter no mínimo 2 caracteres." })
            .max(20, { message: "O campo 'CONSELHO' deve ter no máximo 20 caracteres." }),
        numberCouncil: z.string()
            .min(3, { message: "O campo 'NUMERO CONSELHO' deve ter no mínimo 3 caracteres." })
            .max(20, { message: "O campo 'NUMERO CONSELHO' deve ter no máximo 20 caracteres." }),
        dateInative: z.string()
            .max(8, { message: "O campo 'DATA DE INATIVAÇÃO' data de inativação deve ter no máximo 8 caracteres." }).nullable().optional(),
    });
        
    schema.parse(data);       
    } catch (error) {
        const errorMessages = error.issues.map(issue => issue.message);
        throw new Error(errorMessages);
    }
    
}

export function validUpateDoctor(data:IDoctor):void | string[]{

  try {
    const schema = z.object({
        id_clientLaboratory: z.number().min(1, { message: "id_clientLaboratory não pode estar vazio." }).nullable().optional(),
        name: z.string()
            .min(5, { message: "O campo 'NOME' deve ter no mínimo 5 caracteres." })
            .max(100, { message: "O campo 'NOME' deve ter no máximo 100 caracteres." }).nullable().optional(),
        typeDoctor: z.string()
            .min(5, { message: "O campo 'TIPO DE PROFISSIONAL' deve ter no mínimo 5 caracteres." })
            .max(20, { message: "O campo 'TIPO DE PROFISSIONAL' deve ter no máximo 20 caracteres." }).nullable().optional(),
        council: z.string()
            .min(2, { message: "O campo 'CONSELHO' deve ter no mínimo 2 caracteres." })
            .max(20, { message: "O campo 'CONSELHO' deve ter no máximo 20 caracteres." }).nullable().optional(),
        numberCouncil: z.string()
            .min(3, { message: "O campo 'NUMERO CONSELHO' deve ter no mínimo 3 caracteres." })
            .max(20, { message: "O campo 'NUMERO CONSELHO' deve ter no máximo 20 caracteres." }).nullable().optional(),
        dateInative: z.string()
            .length(10, { message: "O campo 'dateInative' deve ter exatamente 10 caracteres no formato dd/mm/aaaa" })
            .nullable().optional(),
    });
        
    schema.parse(data);       
    } catch (error) {
        const errorMessages = error.issues.map(issue => issue.message);
        throw new Error(errorMessages);
    }
 
}
