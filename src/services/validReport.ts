import z from 'zod';
import { IReport } from "../protocols/protocols";


export function validCreateReport(data:IReport):void | string[]{

    try {
      const schema = z.object({
        lab_fantazyName: z.string()
        .min(5, { message: "O campo 'NOME FANTAZIA' deve ter no mínimo 5 caracteres." })
        .max(50, { message: "O campo 'NOME FANTAZIA' deve ter no máximo 50 caracteres." }),
        lab_cnpj: z.string()
        .min(5, { message: "O campo 'CNPJ' deve ter no mínimo 5 caracteres." })
        .max(20, { message: "O campo 'CNPJ' deve ter no máximo 20 caracteres." }),
        lab_state: z.string()
        .min(2, { message: "O campo 'ESTADO' deve ter no mínimo 2 caracteres." })
        .max(50, { message: "O campo 'ESTADO' deve ter no máximo 50 caracteres." }),
        lab_cep: z.string()
        .min(5, { message: "O campo 'CEP' deve ter no mínimo 5 caracteres." })
        .max(20, { message: "O campo 'CEP' deve ter no máximo 20 caracteres." }),
        lab_street: z.string()
        .min(5, { message: "O campo 'RUA' deve ter no mínimo 5 caracteres." })
        .max(80, { message: "O campo 'RUA' deve ter no máximo 80 caracteres." }),
        lab_numberStreet: z.string()
        .min(1, { message: "O campo 'NUMERO' deve ter no mínimo 1 caracteres." })
        .max(20, { message: "A campo 'NUMERO' deve ter no máximo 20 caracteres." }),
        lab_neighborhood: z.string()
        .min(5, { message: "O campo 'BAIRRO' deve ter no mínimo 5 caracteres." })
        .max(50, { message: "O campo 'BAIRRO' deve ter no máximo 50 caracteres." }),
        lab_additionalInfo: z.string()
        .max(100, { message: " O campo 'INFORMAÇOES ADICIONAIS' deve ter no máximo 100 caracteres." }),
        rt_lab_name: z.string()
        .min(5, { message: "A campo 'RESPONSAVEL TÉCNICO' deve ter no mínimo 5 caracteres." })
        .max(30, { message: "campo 'RESPONSAVEL TÉCNICO' deve ter no máximo 30 caracteres." }),
        rt_lab_council: z.string()
        .min(2, { message: "A campo 'CONSELHO DO LABORATÓRIO' deve ter no mínimo 2 caracteres." })
        .max(10, { message: "campo 'CONSELHO DO LABORATÓRIO' deve ter no máximo 10 caracteres." }),
        rt_lab_number_council: z.string()
        .min(4, { message: "A campo 'NÚMERO DO CONSELHO DO LABORATÓRIO' deve ter no mínimo 4 caracteres." })
        .max(20, { message: "campo 'NÚMERO DO CONSELHO DO LABORATÓRIO' deve ter no máximo 20 caracteres." }),
        signatory_counsil: z.string()
        .min(2, { message: "A campo 'CONSELHO DO ANALISTA DO LAUDO' deve ter no mínimo 2 caracteres." })
        .max(20, { message: "campo 'CONSELHO DO ANALISTA DO LAUDO' deve ter no máximo 20 caracteres." }),
        signatory_number_council: z.string()
        .min(4, { message: "A campo 'NÚMERO DO CONSELHO DO ANALISTA' deve ter no mínimo 4 caracteres." })
        .max(20, { message: "campo 'NÚMERO DO CONSELHO DO ANALISTA' deve ter no máximo 20 caracteres." }),
        signatory_name: z.string()
        .min(4, { message: "A campo 'NOME DO ANALISTA' deve ter no mínimo 4 caracteres." })
        .max(20, { message: "campo 'NOME DO ANALISTA' deve ter no máximo 20 caracteres." }),
        patient_name: z.string()
        .min(5, { message: "O campo 'NOME' deve ter no mínimo 5 caracteres." })
        .max(100, { message: "O campo 'NOME' deve ter no máximo 100 caracteres." }),
        patient_dateBirth: z.string()
        .length(10, { message: "O campo 'DATA DE NACIMENTO' deve ter exatamente 10 caracteres no formato dd/mm/aaaa" }),
        patient_gender: z.string()
        .refine(val => ["masculino", "feminino"].includes(val), {
        message: "O valor do campo 'SEXO' deve ser 'masculino' ou 'feminino'."}),
        medicalAgreement_fantazyName: z.string()
            .min(5, { message: "O campo 'NOME FANTAZIA' deve ter no mínimo 5 caracteres." })
            .max(50, { message: "O campo 'NOME FANTAZIA' deve ter no máximo 50 caracteres." }).nullable().optional(),
        medicalAgreement_cnpj: z.string()
            .min(5, { message: "O campo 'CNPJ' deve ter no mínimo 5 caracteres." })
            .max(20, { message: "O campo 'CNPJ' deve ter no máximo 20 caracteres." }).nullable().optional(),
        doctor_requesting_name: z.string()
            .min(5, { message: "O campo 'NOME' deve ter no mínimo 5 caracteres." })
            .max(100, { message: "O campo 'NOME' deve ter no máximo 100 caracteres." }).nullable().optional(),
        doctor_requesting_counsil: z.string()
            .min(2, { message: "O campo 'CONSELHO' deve ter no mínimo 2 caracteres." })
            .max(20, { message: "O campo 'CONSELHO' deve ter no máximo 20 caracteres." }).nullable().optional(),
        doctor_requesting_numCounsil: z.string()
            .min(3, { message: "O campo 'NUMERO CONSELHO' deve ter no mínimo 3 caracteres." })
            .max(20, { message: "O campo 'NUMERO CONSELHO' deve ter no máximo 20 caracteres." }).nullable().optional(),
    });
        
    schema.parse(data);       
    } catch (error) {
        const errorMessages = error.issues.map(issue => issue.message);
        throw new Error(errorMessages);
    }
    
}

export function validUpateReport(data:IReport):void | string[]{

  try {
    const schema = z.object({
      lab_fantazyName: z.string()
      .min(5, { message: "O campo 'NOME FANTAZIA' deve ter no mínimo 5 caracteres." })
      .max(50, { message: "O campo 'NOME FANTAZIA' deve ter no máximo 50 caracteres." }).nullable().optional(),
      lab_cnpj: z.string()
      .min(5, { message: "O campo 'CNPJ' deve ter no mínimo 5 caracteres." })
      .max(20, { message: "O campo 'CNPJ' deve ter no máximo 20 caracteres." }).nullable().optional(),
      lab_state: z.string()
      .min(2, { message: "O campo 'ESTADO' deve ter no mínimo 2 caracteres." })
      .max(50, { message: "O campo 'ESTADO' deve ter no máximo 50 caracteres." }).nullable().optional(),
      lab_cep: z.string()
      .min(5, { message: "O campo 'CEP' deve ter no mínimo 5 caracteres." })
      .max(20, { message: "O campo 'CEP' deve ter no máximo 20 caracteres." }).nullable().optional(),
      lab_street: z.string()
      .min(5, { message: "O campo 'RUA' deve ter no mínimo 5 caracteres." })
      .max(80, { message: "O campo 'RUA' deve ter no máximo 80 caracteres." }).nullable().optional(),
      lab_numberStreet: z.string()
      .min(1, { message: "O campo 'NUMERO' deve ter no mínimo 1 caracteres." })
      .max(20, { message: "A campo 'NUMERO' deve ter no máximo 20 caracteres." }).nullable().optional(),
      lab_neighborhood: z.string()
      .min(5, { message: "O campo 'BAIRRO' deve ter no mínimo 5 caracteres." })
      .max(50, { message: "O campo 'BAIRRO' deve ter no máximo 50 caracteres." }).nullable().optional(),
      lab_additionalInfo: z.string()
      .max(100, { message: " O campo 'INFORMAÇOES ADICIONAIS' deve ter no máximo 100 caracteres." }).nullable().optional(),
      rt_lab_name: z.string()
      .min(5, { message: "A campo 'RESPONSAVEL TÉCNICO' deve ter no mínimo 5 caracteres." })
      .max(30, { message: "campo 'RESPONSAVEL TÉCNICO' deve ter no máximo 30 caracteres." }).nullable().optional(),
      rt_lab_council: z.string()
      .min(2, { message: "A campo 'CONSELHO DO LABORATÓRIO' deve ter no mínimo 2 caracteres." })
      .max(10, { message: "campo 'CONSELHO DO LABORATÓRIO' deve ter no máximo 10 caracteres." }).nullable().optional(),
      rt_lab_number_council: z.string()
      .min(4, { message: "A campo 'NÚMERO DO CONSELHO DO LABORATÓRIO' deve ter no mínimo 4 caracteres." })
      .max(20, { message: "campo 'NÚMERO DO CONSELHO DO LABORATÓRIO' deve ter no máximo 20 caracteres." }).nullable().optional(),
      signatory_counsil: z.string()
      .min(2, { message: "A campo 'CONSELHO DO ANALISTA DO LAUDO' deve ter no mínimo 2 caracteres." })
      .max(20, { message: "campo 'CONSELHO DO ANALISTA DO LAUDO' deve ter no máximo 20 caracteres." }).nullable().optional(),
      signatory_number_council: z.string()
      .min(4, { message: "A campo 'NÚMERO DO CONSELHO DO ANALISTA' deve ter no mínimo 4 caracteres." })
      .max(20, { message: "campo 'NÚMERO DO CONSELHO DO ANALISTA' deve ter no máximo 20 caracteres." }).nullable().optional(),
      signatory_name: z.string()
      .min(4, { message: "A campo 'NOME DO ANALISTA' deve ter no mínimo 4 caracteres." })
      .max(20, { message: "campo 'NOME DO ANALISTA' deve ter no máximo 20 caracteres." }).nullable().optional(),
      patient_name: z.string()
      .min(5, { message: "O campo 'NOME' deve ter no mínimo 5 caracteres." })
      .max(100, { message: "O campo 'NOME' deve ter no máximo 100 caracteres." }).nullable().optional(),
      patient_dateBirth: z.string()
      .length(10, { message: "O campo 'DATA DE NACIMENTO' deve ter exatamente 10 caracteres no formato dd/mm/aaaa" }).nullable().optional(),
      patient_gender: z.string()
      .refine(val => ["masculino", "feminino"].includes(val), {
      message: "O valor do campo 'SEXO' deve ser 'masculino' ou 'feminino'."}).nullable().optional(),
      medicalAgreement_fantazyName: z.string()
      .min(5, { message: "O campo 'NOME FANTAZIA' deve ter no mínimo 5 caracteres." })
      .max(50, { message: "O campo 'NOME FANTAZIA' deve ter no máximo 50 caracteres." }).nullable().optional(),
      medicalAgreement_cnpj: z.string()
      .min(5, { message: "O campo 'CNPJ' deve ter no mínimo 5 caracteres." })
      .max(20, { message: "O campo 'CNPJ' deve ter no máximo 20 caracteres." }).nullable().optional(),
      doctor_requesting_name: z.string()
      .min(5, { message: "O campo 'NOME' deve ter no mínimo 5 caracteres." })
      .max(100, { message: "O campo 'NOME' deve ter no máximo 100 caracteres." }).nullable().optional(),
      doctor_requesting_counsil: z.string()
      .min(2, { message: "O campo 'CONSELHO' deve ter no mínimo 2 caracteres." })
      .max(20, { message: "O campo 'CONSELHO' deve ter no máximo 20 caracteres." }).nullable().optional(),
      doctor_requesting_numCounsil: z.string()
      .min(3, { message: "O campo 'NUMERO CONSELHO' deve ter no mínimo 3 caracteres." })
      .max(20, { message: "O campo 'NUMERO CONSELHO' deve ter no máximo 20 caracteres." }).nullable().optional(),
  });
      
  schema.parse(data);       
  } catch (error) {
      const errorMessages = error.issues.map(issue => issue.message);
      throw new Error(errorMessages);
  }
  
}
