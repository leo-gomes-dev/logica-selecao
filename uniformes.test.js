/**
 * @jest-environment jsdom
 */

describe('Controle de Uniformes de Futebol', () => {
  beforeEach(() => {
    // 1. Limpa o cache do módulo para que os event listeners sejam registrados a cada teste
    jest.resetModules();

    // 2. Monta a estrutura HTML esperada pelo script
    document.body.innerHTML = `
      <input id="time1" value="Flamengo" />
      <select id="uniforme1">
        <option value="vermelho" selected>Vermelho</option>
        <option value="azul">Azul</option>
        <option value="amarelo">Amarelo</option>
        <option value="branco">Branco</option>
        <option value="preto">Preto</option>
      </select>
      <select id="reserva1">
        <option value="branco" selected>Branco</option>
      </select>

      <input id="time2" value="Vasco" />
      <select id="uniforme2">
        <option value="preto" selected>Preto</option>
        <option value="vermelho">Vermelho</option>
        <option value="azul">Azul</option>
        <option value="branco">Branco</option>
      </select>
      <select id="reserva2">
        <option value="branco" selected>Branco</option>
        <option value="vermelho">Vermelho</option>
      </select>

      <button id="btnVerificar">Verificar</button>
      <div id="resultado"></div>

      <svg id="camisa1"><path fill=""></path></svg>
      <svg id="camisa2"><path fill=""></path></svg>
    `;

    // 3. Carrega o arquivo da sua aplicação (ajuste o caminho se necessário)
    require('./script');
  });

  test('deve permitir o jogo normalmente quando os uniformes são diferentes', () => {
    const btn = document.getElementById('btnVerificar');
    const resultado = document.getElementById('resultado');
    const pathCamisa1 = document.querySelector('#camisa1 path');
    const pathCamisa2 = document.querySelector('#camisa2 path');

    btn.click();

    expect(resultado.innerHTML).toContain(
      '✅ SEM CONFLITO! Flamengo de vermelho x Vasco de preto.',
    );
    expect(resultado.className).toBe('resultado ok');
    expect(pathCamisa1.getAttribute('fill')).toBe('#dc2626'); // vermelho
    expect(pathCamisa2.getAttribute('fill')).toBe('#111827'); // preto
  });

  test('deve trocar para o uniforme reserva do visitante quando houver conflito', () => {
    document.getElementById('uniforme1').value = 'vermelho';
    document.getElementById('uniforme2').value = 'vermelho';
    document.getElementById('reserva2').value = 'branco';

    const btn = document.getElementById('btnVerificar');
    const resultado = document.getElementById('resultado');
    const pathCamisa2 = document.querySelector('#camisa2 path');

    btn.click();

    expect(resultado.innerHTML).toContain(
      '⚠️ CONFLITO! Flamengo e Vasco são vermelho. Vasco vai jogar com o Uniforme 2: branco.',
    );
    expect(resultado.className).toBe('resultado conflito');
    expect(pathCamisa2.getAttribute('fill')).toBe('#f8fafc'); // branco
  });

  test('deve exibir erro extra quando o uniforme reserva do visitante também for igual', () => {
    document.getElementById('uniforme1').value = 'vermelho';
    document.getElementById('uniforme2').value = 'vermelho';
    document.getElementById('reserva2').value = 'vermelho';

    const btn = document.getElementById('btnVerificar');
    const resultado = document.getElementById('resultado');

    btn.click();

    expect(resultado.innerHTML).toContain(
      '❌ ERRO! Até o uniforme reserva do Vasco é vermelho.',
    );
    expect(resultado.className).toBe('resultado conflito');
  });

  test('deve atualizar a prévia da cor da camisa automaticamente ao alterar o select', () => {
    const selectUniforme1 = document.getElementById('uniforme1');
    const pathCamisa1 = document.querySelector('#camisa1 path');

    selectUniforme1.value = 'azul';
    selectUniforme1.dispatchEvent(new Event('change'));

    expect(pathCamisa1.getAttribute('fill')).toBe('#2563eb'); // azul
  });
});
