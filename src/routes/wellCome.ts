import express from "express";

const app = express();

const route = app.get("/", (req, res) => {
  return res.send({
    Mensage: "෴❤️ Bem Vindo ao Sistema - Desenvolvido do por RafaDevWeb ❤️෴",
  });
});

export default route;
