import {
  IClientLaboratory,
  IEmployee,
  ILoginResponse,
  ISecurity,
} from "../protocols/protocols";
import { compare, hash } from "bcrypt";
import { sign, verify, decode } from "jsonwebtoken";
import prisma from "../ASingletonPrismaClient/SingletonPrisma";

export class Security implements ISecurity {
  async encript(p: string): Promise<string> {
    const passwordCrypto = await hash(p, 8);

    return passwordCrypto;
  }
  async checkPassword(
    p_test: string,
    loginTested: IEmployee,
    labInfo: IClientLaboratory
  ): Promise<ILoginResponse | string> {
    const mensage: string = "Login ou senha Inválido";

    if (!loginTested) {
      throw new Error(mensage);
    }

    const match = await compare(p_test, loginTested.password);

    if (!match) {
      throw new Error(mensage);
    }

    const token = this.tokenGenerator(loginTested, labInfo[0]);

    const responseOK: ILoginResponse = {
      message: "Login Aprovado",
      token: token,
    };

    return responseOK;
  }

  tokenGenerator(user: IEmployee, labInfo: IClientLaboratory): string {
    const acssesToken = sign(
      {
        user_name: user.name,
        user_active: user.active,
        user_newPassword: user.newPassWord,
        user_role: user.role_id,
        lab_id: user.id_clientLaboratory,
        lab_name: labInfo.fantazyName,
      },
      process.env.TOKEN_SECRETE,
      { expiresIn: 36000 }
    );
    return acssesToken;
  }

  tokenREVALID(req): string {
    const tokenForRevalid = req.headers.authorization;
    const [, acssesToken] = tokenForRevalid.split(" ");

    const {
      user_name,
      user_active,
      user_newPassword,
      user_role,
      lab_id,
      lab_name,
    } = decode(acssesToken);

    const newToken = sign(
      {
        user_name,
        user_active,
        user_newPassword,
        user_role,
        lab_id,
        lab_name,
      },
      process.env.TOKEN_SECRETE,
      { expiresIn: 36000 }
    );
    return newToken;
  }

  tokenValidity(req, res, next): Promise<string | void> {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new Error();
      }
      const [, acssesToken] = token.split(" ");

      verify(acssesToken, process.env.TOKEN_SECRETE);

      return next();
    } catch (error) {
      res
        .status(401)
        .json({ message: "Token invalido, ou ausência de token." });
    }
  }

  async tokenAuthenticatorByEndpoint(
    table: string,
    operation: string,
    req
  ): Promise<void | string> {
    try {
      const token = req.headers.authorization; // extrai o token para analise
      const lab = req.params.lab; // extrai o parametro usado na URL da solicitação
      const { user_role, user_name, lab_id } = this.decoderToken(token); // abre os dados que estão no tokem

      if (user_role == 0) {
        // se for role=0 => é super admin, ele nao verifica mais nada
        return; // isso pq o super admin pode fazer quais quer requisições e solitações
      }

      if (Number(lab) != Number(lab_id)) {
        // se o numero informado na URL(lab_id) para acesso ao recurso for diferente do numero
        // do lab informado no token, significa q o usuario de um laboratório esta tentando
        // acessar recurso de outro, e isso NAO É PERMITIDO, por isso gera um erro e a solicitação
        // é invalidada instantaneamente
        throw new Error(
          `O usuario ${user_name} não tem autorização realizar essa operção. Seu ID de Laboratório ${lab_id}`
        );
      }

      const auth = await prisma.role.findUnique({
        where: { id: Number(user_role) },
      }); // pega o numero de user_role que esta no token enviado
      // esse numero identifica o cargo, no caso em questão o user_role é "1" - Analista Clinico
      // Aogora ele vai ao banco de dados e pega as informaçoes de autorizacões do id_role "1" e coloca em auth
      // auth recebe => '1, 'analista_clinico', 'employee(C R U D NP), doctor(C R U D), patient(C R U D), medicalAgreement(C R U D),
      // exam_model(C R U D), medicalAgreement_examModel(C R U D), report(C R U D)');'

      const roleAuth = auth.access; // pega somente o acssess
      const regex = new RegExp(`${table}\\(([^)]*)\\)`, "g"); // procura pela tabela recebida como parametro de função
      const result = roleAuth.match(regex); // filtra todo resto aqui deve vir: employee(C R U D NP)

      if (!result) {
        // se não vir employee(C R U D NP), significa q esse use não deve acessar esse recurso
        throw new Error(
          `O usuario ${user_name} não tem autorização realizar essa operção`
        );
      }

      const [, authx] = result[0].match(/(\w+)\(([^)]*)\)/).slice(1); // aqui filtrasse oque estiver em "(" ")" resultado: (C R U D NP)

      if (!authx.includes(operation)) {
        // aqui testasse se a operação recebida "C" esta contida nas autorizações possuidas (C R U D NP)
        // se sim como é o caso encerra-se a função e nada acontece, o que significa que
        // o usuario possuia autorização para executar a função.
        // se não significa que o usuario nao tem autorização para executar a operação e é gerado um erro;

        throw new Error(
          `O usuario ${user_name} não tem autorização realizar essa operção.`
        );
      }
    } catch (error) {
      throw new Error(error.message);
    } finally {
      await prisma.$disconnect();
    }
  }

  decoderToken(token: string) {
    const [, acssesToken] = token.split(" ");
    verify(acssesToken, process.env.TOKEN_SECRETE);
    const {
      user_name,
      user_active,
      user_newPassword,
      user_role,
      lab_id,
      lab_name,
    } = decode(acssesToken);
    return {
      user_name,
      user_active,
      user_newPassword,
      user_role,
      lab_id,
      lab_name,
    };
  }
}
