const saveButton = document.querySelector('.save');
const modal = document.getElementById('saveModal');
const discardButton = document.getElementById('discardButton');
const confirmSaveButton = document.getElementById('saveButton');

saveButton.addEventListener('click', showModal);

function showModal() {
    modal.style.display = 'block';
}

discardButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

confirmSaveButton.addEventListener('click', async () => {
    let title = document.querySelector('.noteTitle');
    let body = document.querySelector('.noteBody');
    let newNote = {
        title: title.value,
        body: body.value
    }
    console.log(newNote);
    try {
        let config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-version': '1.0.0'
            },
            body: JSON.stringify(newNote)
        };

        let uri = `https://localhost:5000/notes`;
        let request = await fetch(uri, config);
        let response = await request.json();
        window.location.href = '/'
        return response;
    } catch (error) {
        console.log(error)
        return error
    } finally {
        modal.style.display = 'none';
    }
});

// Cerrar el modal si se hace clic fuera de él
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}