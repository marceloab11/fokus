document.querySelector('.app__card-button--curto').addEventListener('click', trocarCurto);
document.querySelector('.app__card-button--foco').addEventListener('click', trocarFoco);
document.querySelector('.app__card-button--longo').addEventListener('click', trocarLongo);

function trocarCurto() {
    document.querySelector('html').setAttribute('data-contexto', "descanso-curto");
    document.querySelector('.app__image').setAttribute('src', '/imagens/descanso-curto.png')
}

function trocarFoco() {
    document.querySelector('html').setAttribute('data-contexto', "foco");
}

function trocarLongo() {
    document.querySelector('html').setAttribute('data-contexto', "descanso-longo");
}