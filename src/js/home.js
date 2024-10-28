document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-button');
    const modal = document.getElementById('modal');
    const cancelButton = document.getElementById('cancel-button');
    const noteForm = document.getElementById('note-form');
    const notesContainer = document.getElementById('notes-container');
    const emptyState = document.getElementById('empty-state');
    const mainContent = document.getElementById('main-content');

    let notes = [];

    function updateView() {
        if (notes.length === 0) {
            emptyState.style.display = 'block';
            notesContainer.style.display = 'none';
        } else {
            emptyState.style.display = 'none';
            notesContainer.style.display = 'grid';
            renderNotes();
        }
    }

    function renderNotes() {
        notesContainer.innerHTML = '';
        notes.forEach(note => {
            const noteElement = document.createElement('div');
            noteElement.classList.add('note');
            noteElement.innerHTML = `
                <h3>${note.title}</h3>
                <p><strong>Date:</strong> ${note.date}</p>
                <p><strong>History:</strong> ${note.history}</p>
                <p><strong>User:</strong> ${note.user}</p>
                <p>${note.body}</p>
            `;
            notesContainer.appendChild(noteElement);
        });
    }

    function showModal() {
        modal.style.display = 'block';
    }

    function hideModal() {
        modal.style.display = 'none';
        noteForm.reset();
    }

    addButton.addEventListener('click', showModal);
    cancelButton.addEventListener('click', hideModal);

    noteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newNote = {
            title: document.getElementById('title').value,
            date: document.getElementById('date').value,
            history: document.getElementById('history').value,
            user: document.getElementById('user').value,
            body: document.getElementById('body').value
        };
        notes.push(newNote);
        updateView();
        hideModal();
    });

    updateView();
});

const fecthNotas = async()=>{
    let config={
        method:'GET',
        headers:{
            'Content-Type': 'application/json',
            'x-version': '1.0.0'  
        }
    };

    let uri = `https://localhost:5000/notes`;
    let request = await fetch(uri, config);
    console.log(request)
    let response = await request.json();
    console.log(response);
    if(response.status=== 401) window.location.href='/users';
    return response.data;
}

await fecthNotas()



const main = document.querySelector('#main-content');
main.addEventListener( 'click', async e =>{
    console.log(e.target)
    if(e.target.classList.value === "note"){
        const fetchOneNote = async()=>{
            const uri = `https://localhost:5000/notes/${e.target.id}`;
            const config ={
                method:'GET',
                headers:{
                    'Content-Type': 'application/json',
                    'x-version': '1.0.0'  
                }
            };

            let req = await fetch( uri, config );
            let res = await req.json();
            console.log(res)
            console.log(res.data[0]);
            localStorage.setItem('note', JSON.stringify(res.data[0]));
            return res.data[0];
        }
        await fetchOneNote()
        window.location.href= `/detail` 
    }else if( e.target.classList === "delete-button" || e.target.tagName === 'IMG'){
        console.log('borrando');
        let config ={
            method:'DELETE',
            headers:{
                'Content-Type': 'application/json',
                'x-version': '1.0.0'  
            }
        };
        let uri = `${location.href}`
        console.log(uri)
    }

})
console.log(main);

const printNotes = async()=>{
    let plantilla = '';
    let data = await fecthNotas();

    const colores = ["#FFC0CB", "#B69CFF", "#FFF599", "#91F48F", "#FF9E9E", "#9EFFFF"];
    const obtenerElementoAleatorio =  (arr) =>{
    const indiceAleatorio = Math.floor(Math.random() * arr.length);
    return arr[indiceAleatorio];
    }
    const colorSeleccionado = obtenerElementoAleatorio(colores);
    
    data.forEach(element => {
        plantilla+= /*html*/ `<div class="note" id="${element._id}" style="background-color: ${ obtenerElementoAleatorio(colores)};">
        <p>${element.title}</p>
        <button id="${element._id}" class="delete-button"><img id="${element._id}" src="../storage/img/delete.svg"></button>
    </div>`;
    });
    
    main.innerHTML = plantilla;

}

await printNotes();

