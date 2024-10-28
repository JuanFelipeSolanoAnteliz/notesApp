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