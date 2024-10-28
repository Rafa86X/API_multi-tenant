-- AlterSequence
ALTER SEQUENCE "ClientLaboratory_id_seq" MAXVALUE 9223372036854775807;

INSERT INTO "Role" ("id", "role", "access") VALUES (0, 'superadmin', 'super');
INSERT INTO "Role" ("id", "role", "access") VALUES (1, 'analista_clinico', 'employee(C R U D NP), doctor(C R U D), patient(C R U D), medicalAgreement(C R U D), exam_model(C R U D), medicalAgreement_examModel(C R U D), report(C R U D)');
INSERT INTO "Role" ("id", "role", "access") VALUES (2, 'secretaria', 'employee(R NP), doctor(C R U D), patient(C R U D), medicalAgreement(C R U D), exam_model(R), medicalAgreement_examModel(C R U), report(C R U)');
