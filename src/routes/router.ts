import express from "express";
import wellCome from "./wellCome";
import employee from "./employeeRoutes";
import lab from "./labRoutes";
import login from "./loginRoute";
import auth from "./authRoutes";
import doctor from "./doctorRoutes";
import patient from "./patientRoutes";
import medicalAgreement from "./MedicalAgreementRoutes";
import exam_model from "./Exam_ModelRoutes";
import agreement_exam from "./Agreement_ExamRoutes";
import report from "./reportRoutes";

const app = express();

app.use(
  wellCome,
  login,
  auth,
  employee,
  lab,
  doctor,
  patient,
  medicalAgreement,
  exam_model,
  agreement_exam,
  report
);

export default app;
