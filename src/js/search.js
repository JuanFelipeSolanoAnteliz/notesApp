const main = document.querySelector('#main-content');

main.addEventListener( 'click', async e =>{
    // -------------------------- delete ------------------------------- 
        const deleteNote = async( )=>{
            console.log('borrando');
            let config ={
                method:'DELETE',
                headers:{
                    'Content-Type': 'application/json',
                    'x-version': '1.0.0'  
                }
            };
            let uri = `http://localhost:5000/notes/${e.target.id}`
            console.log(uri)
            let req = await fetch(uri, config);
            let res = await req.json();
            return res;
        }
    // -------------------------- delete ------------------------------- 
    
    
    // ----------------------- fetch one Note --------------------------
        const fetchOneNote = async()=>{
        const uri = `http://localhost:5000/notes/${e.target.id}`;
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
    // ----------------------------- fetch one Note ----------------------------------
    
        if(e.target.classList.value === "note"){
            await fetchOneNote();
            window.location.href= `/detail` 
        }else if( e.target.classList.value === "delete-button" || e.target.tagName === 'IMG'){
            await deleteNote();
            await printNotes();
        }
    
    })

const fecthNotas = async(search)=>{
    try{
        let config={
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
                'x-version': '1.0.0'  
            }
        };

        let uri = `http://localhost:5000/notes/search?searchTerm=${search}`;
        let request = await fetch(uri, config);
        let response = await request.json();
        if(response.status=== 401) window.location.href='/users';
        if(response.status === 404) main.innerHTML =/*html*/ `
                <div id="empty-state" class="empty-state">
                    <div class="illustration">
                        <img src="../storage/img/Group 3.svg" alt="">
                    </div>
                </div>
                <div id="notes-container" class="notes-container"></div>`;
        console.log(response.data);
        return response.data;
    }catch(error){
        console.log(error)
        return error
    }
}


const printNotes = async(data)=>{
    try{
        console.log('hola')
    let plantilla = '';
    if (!data[0]){ 
        main.innerHTML =/*html*/ `
        <div id="empty-state" class="empty-state">
            <div class="illustration">
                <img src="../storage/img/Group 3.svg" alt="">
            </div>
        </div>
        <div id="notes-container" class="notes-container"></div>`;
    }else{
        const colores = ["#FFC0CB", "#B69CFF", "#FFF599", "#91F48F", "#FF9E9E", "#9EFFFF"];
        const obtenerElementoAleatorio =  (arr) =>{
        const indiceAleatorio = Math.floor(Math.random() * arr.length);
        return arr[indiceAleatorio];
        }
        
        data.forEach(element => {
            plantilla+= /*html*/ `<div class="note" id="${element._id}" style="background-color: ${ obtenerElementoAleatorio(colores)};">
            <p>${element.title}</p>
            <button id="${element._id}" class="delete-button"><img id="${element._id}" src="../storage/img/delete.svg"></button>
        </div>`;
        });
        
        main.innerHTML = plantilla;
    
    }
    }catch(error){
        console.log(error)
        return error
    }
    
}

const searchBar = document.querySelector('.searchBar');
console.log(searchBar)
searchBar.addEventListener('input', async e =>{
    console.log('si')
    let data = await fecthNotas(e.target.value);
    await printNotes(data);
})
