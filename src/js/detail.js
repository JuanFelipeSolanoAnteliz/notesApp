const content = document.querySelector('.content');
const titel = document.querySelector('h1');


const data = JSON.parse(localStorage.getItem('usuario')); 
const printNote = async(data) =>{
    console.log(data);
}

await printNote()