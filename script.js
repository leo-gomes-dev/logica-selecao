const btn = document.getElementById('btnVerificar');
const coresUniformes = {
  amarelo: '#facc15',
  azul: '#2563eb',
  vermelho: '#dc2626',
  branco: '#f8fafc',
  preto: '#111827',
};

function aplicarCorCamisa(idCamisa, uniforme) {
  const camisa = document.getElementById(idCamisa);
  const desenho = camisa?.querySelector('path');

  if (desenho) {
    desenho.setAttribute('fill', coresUniformes[uniforme] || '#64748b');
  }
}

function atualizarPreviaUniformes() {
  const uniforme1 = document.getElementById('uniforme1')?.value || '';
  const uniforme2 = document.getElementById('uniforme2')?.value || '';
  const reserva2 = document.getElementById('reserva2')?.value || '';

  aplicarCorCamisa('camisa1', uniforme1);
  aplicarCorCamisa('camisa2', uniforme1 === uniforme2 ? reserva2 : uniforme2);
}

document
  .getElementById('uniforme1')
  ?.addEventListener('change', atualizarPreviaUniformes);
document
  .getElementById('uniforme2')
  ?.addEventListener('change', atualizarPreviaUniformes);
document
  .getElementById('reserva2')
  ?.addEventListener('change', atualizarPreviaUniformes);
atualizarPreviaUniformes();

if (btn) {
  btn.addEventListener('click', () => {
    // 1. PEGAR OS DADOS (input)
    const nome1 = document.getElementById('time1')?.value || 'Time 1';
    const nome2 = document.getElementById('time2')?.value || 'Time 2';
    const uniforme1 = document.getElementById('uniforme1')?.value || '';
    const uniforme2 = document.getElementById('uniforme2')?.value || '';
    const reserva1 = document.getElementById('reserva1')?.value || '';
    const reserva2 = document.getElementById('reserva2')?.value || '';

    const resultadoDiv = document.getElementById('resultado');
    const camisa1 = document.getElementById('camisa1');
    const camisa2 = document.getElementById('camisa2');

    if (!resultadoDiv || !camisa1 || !camisa2) {
      return;
    }

    let uniformeFinal1 = uniforme1;
    let uniformeFinal2 = uniforme2;
    let mensagem = '';

    // 2. CONDICIONAL PRINCIPAL - A REGRA DO JOGO
    // SE uniforme1 FOR IGUAL a uniforme2, ENTÃO visitante troca
    if (uniforme1 === uniforme2) {
      uniformeFinal2 = reserva2 || uniforme2;
      mensagem = `⚠️ CONFLITO! ${nome1} e ${nome2} são ${uniforme1}. ${nome2} vai jogar com o Uniforme 2: ${uniformeFinal2}.`;
      resultadoDiv.className = 'resultado conflito';
    } else {
      // SENÃO, pode jogar normal
      mensagem = `✅ SEM CONFLITO! ${nome1} de ${uniforme1} x ${nome2} de ${uniforme2}. Pode começar o jogo!`;
      resultadoDiv.className = 'resultado ok';
    }

    // 3. OPERADOR LÓGICO EXTRA - E se a reserva também for igual?
    // Exemplo para ensinar && e ||
    if (uniforme1 === uniforme2 && reserva2 === uniforme1) {
      mensagem += `<br>❌ ERRO! Até o uniforme reserva do ${nome2} é ${uniforme1}. Escolha outra reserva!`;
      resultadoDiv.className = 'resultado conflito';
    }

    // 4. MOSTRAR RESULTADO
    resultadoDiv.innerHTML = mensagem;
    aplicarCorCamisa('camisa1', uniformeFinal1);
    aplicarCorCamisa('camisa2', uniformeFinal2);

    // Dica para debug no console
    console.log({ nome1, uniformeFinal1, nome2, uniformeFinal2 });
  });
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { aplicarCorCamisa, atualizarPreviaUniformes };
}
