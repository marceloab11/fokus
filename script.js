const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const comecarPausarBt = document.querySelector('#start-pause span');
const musicaFocoInput = document.querySelector('#alternar-musica');
const imgPausar = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.querySelector('#timer');
const musica = new Audio('./sons/luna-rise-part-one.mp3');
const musicaPlay = new Audio('./sons/play.wav');
const musicaPause = new Audio('./sons/pause.mp3');
const musicaFinish = new Audio('./sons/beep.mp3');

let tempoDecorridoEmSegundos = 1500;
let intervalId = null;

musica.loop = true;

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
   alteraContexto('foco');
   focoBt.classList.add('active');
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alteraContexto('descanso-curto');
    curtoBt.classList.add('active');
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alteraContexto('descanso-longo');
    longoBt.classList.add('active');
})


function alteraContexto(contexto) {
    mostrarTempo();
    botoes.forEach(function (contexto){
        contexto.classList.remove('active');
    });
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `./imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta.</strong>
            `
            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar a superfice <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
            default:
                break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0) {
        musicaFinish.play();
        alert('Tempo finalizado!')
        const focoAtivo = html.getAttribute('data-contexto') == 'foco'
        if(focoAtivo) {
            const evento = new CustomEvent('FocoFinalizado')
            document.dispatchEvent(evento)
        }
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
}

startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if(intervalId){
    musicaPause.play()
    zerar();
    return
}
imgPausar.setAttribute('src', './imagens/pause.png')
comecarPausarBt.textContent = 'pausar';

musicaPlay.play()
    intervalId = setInterval(contagemRegressiva, 1000)
}

function zerar() {
    imgPausar.setAttribute('src', './imagens/play_arrow.png')
    comecarPausarBt.textContent = 'começar';
    clearInterval(intervalId);
    intervalId = null
}

function mostrarTempo() {
   const tempo = new Date(tempoDecorridoEmSegundos * 1000)
   const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
  tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()



