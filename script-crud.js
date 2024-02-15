const btnAddTarefa = document.querySelector('.app__button--add-task');
const formAddTarefa = document.querySelector('.app__form-add-task');
const textArea = document.querySelector('.app__form-textarea');
const ulTerefas = document.querySelector('.app__section-task-list')
const btnCancelar = document.querySelector('.app__form-footer__button--cancel')
const paragrafoDescricaoTarefa = document.querySelector('.app__section-active-task-description')

const btnRemoverConcluidas = document.querySelector('#btn-remover-concluidas')

let tarefas =  JSON.parse(localStorage.getItem('tarefas')) || [];
let tarefaSelecionada = null;
let liTarefaSelecionada  = null

function  atualizarTarefas () {
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
}

function criarElementoTarefa(tarefa) {
    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item')

    const svg = document.createElement('svg')
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    `
    const paragrafoTarefa = document.createElement('p')
    paragrafoTarefa.textContent = tarefa.descricao
    paragrafoTarefa.classList.add('app__section-task-list-item-description')

    const button = document.createElement('button')
    button.classList.add('app_button-edit')

    button.onclick = () => {
        const novaDescrição = prompt('Pra qual tarefa você quer alterar?')
        if(novaDescrição) {
            paragrafoTarefa.textContent = novaDescrição
            tarefa.descricao = novaDescrição
            atualizarTarefas()
        }
    }

    const img = document.createElement('img')
    img.setAttribute('src', "imagens/edit.png")

    button.append(img)
    li.append(svg)
    li.append(paragrafoTarefa)
    li.append(button)

    if(tarefa.completa) {
        li.classList.add('app__section-task-list-item-complete')
        button.setAttribute('disabled', 'disabled') 
    } else {
        li.onclick = () => {
            document.querySelectorAll('.app__section-task-list-item-active')
            .forEach(el=>{
                el.classList.remove('app__section-task-list-item-active')
            })
    
            if(tarefaSelecionada == tarefa) {
                paragrafoDescricaoTarefa.textContent = ''
                tarefaSelecionada = null
                liTarefaSelecionada = null
                return
            }
            tarefaSelecionada = tarefa
            liTarefaSelecionada = li
            paragrafoDescricaoTarefa.textContent = tarefa.descricao
            
            li.classList.add('app__section-task-list-item-active')
        }
    }

    return li
}

btnAddTarefa.addEventListener('click', ()=> {
    formAddTarefa.classList.toggle('hidden');
})

formAddTarefa.addEventListener('submit', (event)=> {
    event.preventDefault();
    const tarefa = {
        descricao: textArea.value
    }
    tarefas.push(tarefa)
    const elementoTarefa = criarElementoTarefa(tarefa)
    ulTerefas.append(elementoTarefa)
    atualizarTarefas()
    textArea.value = ""
    formAddTarefa.classList.add('hidden')
})

tarefas.forEach(tarefa => {
    const elementoTarefa = criarElementoTarefa(tarefa)
    ulTerefas.append(elementoTarefa)
})

btnCancelar.addEventListener('click', ()=> {
    textArea.value = ""
    formAddTarefa.classList.add('hidden')

})

document.addEventListener('FocoFinalizado', () => {
    if(tarefaSelecionada && liTarefaSelecionada) {
        liTarefaSelecionada.classList.remove('app__section-task-list-item-active')
        liTarefaSelecionada.classList.add('app__section-task-list-item-complete')
        liTarefaSelecionada.querySelector('button').setAttribute('disabled', 'disabled')
        tarefaSelecionada.completa = true
        atualizarTarefas()
    }
})

btnRemoverConcluidas.onclick = () => {
    const seletor = '.app__section-task-list-item-complete'
    document.querySelectorAll(seletor).forEach(elemento => {
        elemento.remove()
    })
    tarefas = tarefas.filter(tarefa => !tarefa.completa)
    atualizarTarefas();
}
