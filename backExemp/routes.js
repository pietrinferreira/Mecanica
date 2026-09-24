import express from "express";
import sql from "./database.js";

const routes = express.Router();

routes.post("/login", async (req, res) => {
  try {
    const { user, password } = req.body;
    const resposta = await sql`select * from clientes where nome = ${user}`;

    if (resposta.length === 0 || password != resposta[0].senha) {
      return res.status(401).json("erro ao logar");
    }

    return res.status(200).json(resposta[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Erro interno ao logar" });
  }
});

routes.get("/usuarios", async (req, res) => {
  try {
    const resposta = await sql`select * from clientes`;
    return res.status(200).json(resposta);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Erro ao buscar usuários" });
  }
});

routes.get("/usuario/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const resposta = await sql`select * from clientes where id_cliente = ${id}`;
    return res.status(200).json(resposta[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Erro ao buscar usuário" });
  }
});

routes.post("/cadastro", async (req, res) => {
  try {
    const { user, password, cpf, telefone, endereco } = req.body;
    await sql`INSERT INTO clientes(nome, senha, cpf, telefone, endereco) 
    VALUES (${user}, ${password}, ${cpf}, ${telefone}, ${endereco})`;
    return res.status(201).json("Cadastrado com sucesso");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Erro interno ao cadastrar usuário" });
  }
});

routes.delete("/deletar/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await sql`delete from clientes where id_cliente = ${id}`;
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
    const resposta = await sql`UPDATE clientes SET nome=${nome_p} WHERE id_cliente=${id} RETURNING *;`;
    return res.status(200).json(resposta[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao editar usuário" });
  }
});

routes.get("/manutencao", async (req, res) => {
  try {
    const resposta = await sql`select * from manutencao`;
    return res.status(200).json(resposta);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao buscar manutenção" });
  }
});

routes.get("/manutencao/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const resposta = await sql`select * from manutencao where id_manutencao=${id}`;
    return res.status(200).json(resposta[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao buscar manutenção" });
  }
});

routes.get("/veiculos", async (req, res) => {
  try {
    const resposta = await sql`select * from veiculos`;
    return res.status(200).json(resposta);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao buscar veículos" });
  }
});

routes.post("/Veiculo", async (req, res) => {
  try {
    const { marca, modelo, cor, placa, ano, id_cliente } = req.body;
    const resposta = await sql`INSERT INTO veiculos(marca, modelo, cor, placa, ano, id_cliente) VALUES (${marca}, ${modelo}, ${cor}, ${placa}, ${ano}, ${id_cliente}) RETURNING *`;
    return res.status(201).json(resposta[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Erro interno ao cadastrar veiculo" });
  }
});

export default routes;