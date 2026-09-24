const marca = document.querySelector('#marca');
const modelo = document.querySelector('#modelo');
const cor = document.querySelector('#cor');
const placa = document.querySelector('#placa');
const ano = document.querySelector('#ano');
const id = document.querySelector('#id');
const formulario = document.querySelector('form');

formulario.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id_cliente = id.value;

    const dados = {
        marca: marca.value,
        modelo: modelo.value,
        cor: cor.value,
        placa: placa.value,
        ano: ano.value,
        id_cliente: id_cliente
    };

    const resposta = await fetch("http://localhost:3000/cadVeiculo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    });

    const resultado = await resposta.json();
    console.log(resultado);
});