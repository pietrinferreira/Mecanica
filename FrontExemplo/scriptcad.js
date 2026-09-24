document.getElementById('enviar').addEventListener('click', async () => {
  const nome = document.getElementById('nome').value;
  const cpf = document.getElementById('cpf').value;
  const telefone = document.getElementById('telefone').value;
  const endereco = document.getElementById('endereco').value;
  const senha = document.getElementById('senha').value;

  try {
    const resposta = await fetch('http://localhost:3000/cadastro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user: nome,
        password: senha,
        cpf: cpf,
        telefone: telefone,
        endereco: endereco
      })
    });

    if (resposta.ok) {
      alert('Cadastrado com sucesso!');
      window.location.href = './index.html';
    } else {
      alert('Erro ao cadastrar. Verifique o terminal do VS Code.');
    }
  } catch (erro) {
    alert('Erro de conexão com o servidor.');
  }
});