const content = document.querySelector('.content');
console.log(content);

const back = document.querySelector('#goBack');
const modal = document.getElementById('discardModal');
const discardButton = document.getElementById('discardButton');
const keepButton = document.getElementById('keepButton');

back.addEventListener('click', showModal);

function showModal(e) {
    e.preventDefault();
    modal.style.display = 'block';
}

discardButton.addEventListener('click', async () => {
    localStorage.removeItem('note');
    

});

keepButton.addEventListener('click', async() => {
    modal.style.display = 'none';
    const bodyText = document.querySelector('.noteBody')
    const title = document.querySelector('.noteTitle');
    let note=  JSON.parse(localStorage.getItem('note'));
    let noteId= note._id
    let body = {
        title:title.textContent,
        content:bodyText.textContent
    };
    console.log(body)
    try{
        let config = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-version': '1.0.0'
            },
            body: JSON.stringify(body)
        };

        let uri = `https://localhost:5000/notes/${noteId}`;
        let request = await fetch(uri, config);
        let response = await request.json();
        window.location.href = '/'
        return response;
    }catch(error){

    }
});

// Close the modal if clicked outside
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


const data = JSON.parse(localStorage.getItem('note'));
console.log(data._id) 
const printNote = async(id) =>{
    const fetchOneNote = async(id)=>{
        const uri = `https://localhost:5000/notes/${id}`;
        const config ={
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
                'x-version': '1.0.0'  
            }
        };

        let req = await fetch( uri, config );
        let res = await req.json();
        console.log(res.data[0]);
        return res.data[0];
    }
    let details = await fetchOneNote(id);
    const note = document.querySelector('.note');
    console.log(note)
    return note.innerHTML = /*html*/`
        <h1 contenteditable="true" spellcheck="false" class="noteTitle">${details.title}</h1>
        <div  contenteditable="true" spellcheck="false" class="content">
            <p class="noteBody">${details.content}</p>
        </div>
    `;
}

await printNote(data._id)


