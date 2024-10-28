const content = document.querySelector('.content');
const title = document.querySelector('h1');
console.log(title)

const back = document.querySelector('#goBack');
back.addEventListener('click', async e =>{
    localStorage.removeItem('note');
    window.location.href = '/'
})

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
    note.innerHTML = /*html*/`
        <h1>${details.title}</h1>
        <div class="content">
            <p>${details.body}</p>
        </div>
    `;
}

await printNote(data._id)