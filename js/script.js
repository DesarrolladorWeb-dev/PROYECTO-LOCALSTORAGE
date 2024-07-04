// Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

//Event Listeners
eventListeners();
// Funciones
function eventListeners(){
    // Cuando el usuario tiene un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);
    // Cuando el documento esta listo
    document.addEventListener("DOMContentLoaded", () =>{
        // si al trae el JSON es null,   usa el array vacio
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];

        //* porque null es false

        console.log(tweets)
        // al recargar agarra todos los tweets del localstorage y ingresalos 
        // en el HTML con esta funcion
        crearHTML();
    })
}

function agregarTweet(e){
    e.preventDefault();

    const tweet = document.querySelector('#tweet').value;

    // validacion
    if(tweet === ''){
        mostrarError('No puede ir vacia el campo');
        return;
    }

    const tweetObj = {
        id: Date.now(),
        tweet
    }
    // Añadir al arreglo de tweets
    tweets = [...tweets, tweetObj]
    // Una vez agregado vamos a crear el HTML   
    crearHTML();
    // reiniciar el formulario
    formulario.reset()
}
// mostrar mensaje de error
function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    // insertar contenido
    const contenido = document.querySelector('#contenido');+
    contenido.appendChild(mensajeError);

    // eliminar alerta despues de 3 segundo
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

function crearHTML(){
    limpiarHTML();

    if(tweets.length > 0){
        tweets.forEach( tweet =>{
            // Agregar un boton de eliminar 
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerHTML = 'X';
            // Añadir la funcion de eliminar 
            btnEliminar.onclick = () =>{
                borrarTweet(tweet.id);
            }

            // Crear el html
            const li = document.createElement('li');

            // añadir el texto
            li.innerText = tweet.tweet;

            // Asignar el boton 
            li.appendChild(btnEliminar);
            // insertarlo en el html
            listaTweets.appendChild(li);

        });
    }
    sincronizarStorage();
}

// Agregar tweets actuales al localStorage
function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets));
}
// Eliminar un Tweet
function borrarTweet(id){
   
// * filter te trae todos los demas excepto al cual le dimos clic
// borrarTweet(id){
// TODO: filter tweet.id !== id (porque use != (excepto este id) - porque 
// TODO: quiero crear un nuevo arreglo pero que no se encuentre el id al que le di click

 
    

    tweets = tweets.filter( tweet => tweet.id != id);
    console.log(tweets)
    crearHTML()
}


function limpiarHTML(){
    // mientras exista algo en listaTweets
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild)
    }
}