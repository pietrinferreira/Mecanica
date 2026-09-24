import express from "express";
import sql from "./database.js";

const routes = express.Router();

routes.post("/login", async (req, res) => {
  try {
    const { user, password } = req.body;
    const resposta = await sql`select * from usuario where nome = ${user}`;
    if (resposta.length > 0 && password == resposta[0].senha) {
      return res.status(200).json(resposta[0]);
    }
    return res.status(401).json("erro ao logar");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Erro interno" });
  }
});

routes.get("/usuarios", async (req, res) => {
  try {
    const resposta = await sql`select * from usuario`;
    return res.status(200).json(resposta);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Erro ao buscar usuários" });
  }
});

routes.get("/usuario/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const resposta = await sql`select * from usuario where id_user = ${id}`;
    return res.status(200).json(resposta[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Erro ao buscar usuário" });
  }
});

routes.post("/cadastro", async (req, res) => {
  try {
    const { user, password, cpf, telefone, endereco } = req.body;
    await sql`INSERT INTO usuario(nome, senha, cpf, telefone, endereco) VALUES (${user},${password},${cpf},${telefone},${endereco})`;
    return res.status(201).json("Cadastrado com sucesso");
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Erro interno ao cadastrar usuário",
    });
  }
});

routes.delete("/deletar/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await sql`delete from usuario where id_user = ${id}`;
    return res.status(200).json("Deletado");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Erro ao deletar usuário" });
  }
});

routes.put("/editarUser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nome_p } = req.body;
    const resposta = await sql`UPDATE usuario SET nome=${nome_p} WHERE id_user=${id} RETURNING *;`;
    return res.status(200).json(resposta[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao editar usuário" });
  }
});

export default routes;