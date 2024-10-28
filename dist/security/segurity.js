"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Security = void 0;
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const SingletonPrisma_1 = __importDefault(require("../ASingletonPrismaClient/SingletonPrisma"));
class Security {
    encript(p) {
        return __awaiter(this, void 0, void 0, function* () {
            const passwordCrypto = yield (0, bcrypt_1.hash)(p, 8);
            return passwordCrypto;
        });
    }
    checkPassword(p_test, loginTested, labInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const mensage = "Login ou senha Inválido";
            if (!loginTested) {
                throw new Error(mensage);
            }
            const match = yield (0, bcrypt_1.compare)(p_test, loginTested.password);
            if (!match) {
                throw new Error(mensage);
            }
            const token = this.tokenGenerator(loginTested, labInfo[0]);
            const responseOK = {
                message: "Login Aprovado",
                token: token,
            };
            return responseOK;
        });
    }
    tokenGenerator(user, labInfo) {
        const acssesToken = (0, jsonwebtoken_1.sign)({
            user_name: user.name,
            user_active: user.active,
            user_newPassword: user.newPassWord,
            user_role: user.role_id,
            lab_id: user.id_clientLaboratory,
            lab_name: labInfo.fantazyName
        }, process.env.TOKEN_SECRETE, { expiresIn: 36000 });
        return acssesToken;
    }
    tokenREVALID(req) {
        const tokenForRevalid = req.headers.authorization;
        const [, acssesToken] = tokenForRevalid.split(' ');
        const { user_name, user_active, user_newPassword, user_role, lab_id, lab_name } = (0, jsonwebtoken_1.decode)(acssesToken);
        const newToken = (0, jsonwebtoken_1.sign)({
            user_name,
            user_active,
            user_newPassword,
            user_role,
            lab_id,
            lab_name
        }, process.env.TOKEN_SECRETE, { expiresIn: 36000 });
        return newToken;
    }
    tokenValidity(req, res, next) {
        try {
            const token = req.headers.authorization;
            if (!token) {
                throw new Error();
            }
            const [, acssesToken] = token.split(' ');
            (0, jsonwebtoken_1.verify)(acssesToken, process.env.TOKEN_SECRETE);
            return next();
        }
        catch (error) {
            res.status(401).json({ message: 'Token invalido, ou ausência de token.' });
        }
    }
    tokenAuthenticatorByEndpoint(table, operation, req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization; // extrai o token para analise
                const lab = req.params.lab; // extrai o parametro usado na URL da solicitação
                const { user_role, user_name, lab_id } = this.decoderToken(token); // abre os dados que estão no tokem
                if (user_role == 0) { // se for role=0 => é super admin, ele nao verifica mais nada
                    return; // isso pq o super admin pode fazer quais quer requisições e solitações
                }
                if (Number(lab) != Number(lab_id)) { // se o numero informado na URL(lab_id) para acesso ao recurso for diferente do numero
                    // do lab informado no token, significa q o usuario de um laboratório esta tentando 
                    // acessar recurso de outro, e isso NAO É PERMITIDO, por isso gera um erro e a solicitação
                    // é invalidada instantaneamente
                    throw new Error(`O usuario ${user_name} não tem autorização realizar essa operção. Seu ID de Laboratório ${lab_id}`);
                }
                const auth = yield SingletonPrisma_1.default.role.findUnique({ where: { id: Number(user_role) } }); // pega o numero de user_role que esta no token enviado
                // esse numero identifica o cargo, no caso em questão o user_role é "1" - Analista Clinico
                // Aogora ele vai ao banco de dados e pega as informaçoes de autorizacões do id_role "1" e coloca em auth
                // auth recebe => '1, 'analista_clinico', 'employee(C R U D NP), doctor(C R U D), patient(C R U D), medicalAgreement(C R U D), 
                // exam_model(C R U D), medicalAgreement_examModel(C R U D), report(C R U D)');'
                const roleAuth = auth.access; // pega somente o acssess           
                const regex = new RegExp(`${table}\\(([^)]*)\\)`, 'g'); // procura pela tabela recebida como parametro de função
                const result = roleAuth.match(regex); // filtra todo resto aqui deve vir: employee(C R U D NP)
                if (!result) { // se não vir employee(C R U D NP), significa q esse use não deve acessar esse recurso
                    throw new Error(`O usuario ${user_name} não tem autorização realizar essa operção`);
                }
                const [, authx] = result[0].match(/(\w+)\(([^)]*)\)/).slice(1); // aqui filtrasse oque estiver em "(" ")" resultado: (C R U D NP)
                if (!authx.includes(operation)) { // aqui testasse se a operação recebida "C" esta contida nas autorizações possuidas (C R U D NP)
                    // se sim como é o caso encerra-se a função e nada acontece, o que significa que
                    // o usuario possuia autorização para executar a função.
                    // se não significa que o usuario nao tem autorização para executar a operação e é gerado um erro;
                    throw new Error(`O usuario ${user_name} não tem autorização realizar essa operção.`);
                }
            }
            catch (error) {
                throw new Error(error.message);
            }
            finally {
                yield SingletonPrisma_1.default.$disconnect();
            }
        });
    }
    decoderToken(token) {
        const [, acssesToken] = token.split(' ');
        (0, jsonwebtoken_1.verify)(acssesToken, process.env.TOKEN_SECRETE);
        const { user_name, user_active, user_newPassword, user_role, lab_id, lab_name } = (0, jsonwebtoken_1.decode)(acssesToken);
        return { user_name, user_active, user_newPassword, user_role, lab_id, lab_name };
    }
}
exports.Security = Security;
