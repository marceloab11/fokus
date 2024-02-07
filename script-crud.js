const btnAddTarefa = document.querySelector('.app__button--add-task');
const formAddTarefa = document.querySelector('.app__form-add-task');
const textArea = document.querySelector('.app__form-textarea');

const tarefas = []

btnAddTarefa.addEventListener('click', ()=> {
    formAddTarefa.classList.toggle('hidden');
})

formAddTarefa.addEventListener('submit', (event)=> {
    event.preventDefault();
    const tarefa = {
        descricao: textArea.value
    }
    tarefas.push(tarefa)
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
})