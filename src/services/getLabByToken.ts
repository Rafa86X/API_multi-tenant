import { IDoctor, IEmployee, IMedicalAgreement, IPatient, IReport } from '../protocols/protocols';
import { Security } from '../security/segurity';

export function getLabByToken(req, data: any):any {
    const segurity = new Security();
    const token = req.headers.authorization;
    const {lab_id} = segurity.decoderToken(token)
    data.id_clientLaboratory = lab_id
    return data
}