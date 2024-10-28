import z from 'zod';
import { IExam_Model} from "../protocols/protocols";


export function validCreateExam_Model(data:IExam_Model):void | string[]{

    try {
      const schema = z.object({
        id_clientLaboratory: z.number().min(1, { message: "id_clientLaboratory não pode estar vazio." }),
        name: z.string()
            .min(5, { message: "O campo 'NOME' deve ter no mínimo 5 caracteres." })
            .max(100, { message: "O campo 'NOME' deve ter no máximo 100 caracteres." }),
        exam_code: z.string()
            .min(2, { message: "O campo 'CÓDIGO DO EXAME' deve ter no mínimo 2 caracteres." })
            .max(20, { message: "O campo 'CÓDIGO DO EXAME' deve ter no máximo 20 caracteres." }),
        deadline_days: z.string()
            .min(2, { message: "O campo 'PRAZO EM DIAS' deve ter no mínimo 2 caracteres." })
            .max(20, { message: "O campo 'PRAZO EM DIAS' deve ter no máximo 20 caracteres." }),
        price: z.string()
            .min(3, { message: "O campo 'PREÇO' deve ter no mínimo 3 caracteres." })
            .max(20, { message: "O campo 'PREÇO' deve ter no máximo 20 caracteres." }),
    });
        
    schema.parse(data);       
    } catch (error) {
        const errorMessages = error.issues.map(issue => issue.message);
        throw new Error(errorMessages);
    }
    
}

export function validUpateExam_Model(data:IExam_Model):void | string[]{

  try {
    const schema = z.object({
        id_clientLaboratory: z.number().min(1, { message: "id_clientLaboratory não pode estar vazio." }).nullable().optional(),
        name: z.string()
            .min(5, { message: "O campo 'NOME' deve ter no mínimo 5 caracteres." })
            .max(100, { message: "O campo 'NOME' deve ter no máximo 100 caracteres." }).nullable().optional(),
        exam_code: z.string()
            .min(5, { message: "O campo 'CÓDIGO DO EXAME' deve ter no mínimo 5 caracteres." })
            .max(20, { message: "O campo 'CÓDIGO DO EXAME' deve ter no máximo 20 caracteres." }).nullable().optional(),
        deadline_days: z.string()
            .min(2, { message: "O campo 'PRAZO EM DIAS' deve ter no mínimo 2 caracteres." })
            .max(20, { message: "O campo 'PRAZO EM DIAS' deve ter no máximo 20 caracteres." }).nullable().optional(),
        price: z.string()
            .min(3, { message: "O campo 'PREÇO' deve ter no mínimo 3 caracteres." })
            .max(20, { message: "O campo 'PREÇO' deve ter no máximo 20 caracteres." }).nullable().optional(),
        internet_delivery: z.boolean().nullable().optional(),
    });
        
    schema.parse(data);       
    } catch (error) {
        const errorMessages = error.issues.map(issue => issue.message);
        throw new Error(errorMessages);
    }
 
}
