// variables
const listaTweets = document.getElementById('lista-tweets');




// event listeners
eventListeners();

function eventListeners(){
    //cuando se envia el formulario
    document.querySelector('#formulario').addEventListener('submit',agregarTweet);

    //Borrar tweets
    listaTweets.addEventListener('click',borrarTweet);

    //contenido cargado
    document.addEventListener('DOMContentLoaded', localStorageListo);

}


//funciones

function agregarTweet(e){
    e.preventDefault();
   // leer el valor del text area
   const tweet =document.querySelector('#tweet').value;
    // crear boton borrar
    const botonBorrar = document.createElement('a');
    botonBorrar.classList="borrar-tweet";
    botonBorrar.innerText='X';



    //crear elemento y añadir el contenido a la lista
    const li= document.createElement('li');
    li.innerText= tweet;
    //añade el boton de borrar al tweet
    li.appendChild(botonBorrar);
    //añade tweet a la lista
    listaTweets.appendChild(li);

    //agregar a local Storage
    agregarTweetLocalStorage(tweet);
}

//borrar tweet
function borrarTweet(e){
    e.preventDefault();
    if(e.target.className==='borrar-tweet'){
        e.target.parentElement.remove();
        borrarTweetLocalStorage(e.target.parentElement.innerText);
    }
}

//agregar a local Storage
function agregarTweetLocalStorage(tweet){
    let tweets;

    //recuperamos los tweets guardados
    tweets=obtenerTweetsLocalStorage();

    //guardamos tweet en array
    tweets.push(tweet);

    //convertimos de string a storage
    localStorage.setItem('tweets', JSON.stringify(tweets));



}

//comprobar que hay elementos en localstorage
function obtenerTweetsLocalStorage(){
    let tweets;

    if(localStorage.getItem('tweets')===null){
        tweets=[];
    }else{
        tweets=JSON.parse(localStorage.getItem('tweets'));
    }
    return tweets;
}

function localStorageListo(){
    let tweets;

    tweets=obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet) {
         // crear boton borrar
        const botonBorrar = document.createElement('a');
        botonBorrar.classList="borrar-tweet";
        botonBorrar.innerText='X';
        //crear elemento y añadir el contenido a la lista
        const li= document.createElement('li');
        li.innerText= tweet;
        //añade el boton de borrar al tweet
        li.appendChild(botonBorrar);
        //añade tweet a la lista
        listaTweets.appendChild(li);
        
    });
}

//eliminar tweet de localstorage

function borrarTweetLocalStorage(tweet){
    let tweets, tweetBorrar;
    //elimina la x del tweet
    tweetBorrar= tweet.substring(0,tweet.length-1);

    tweets= obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet,index){
        if (tweet===tweetBorrar){
            tweets.splice(index,1)
        }
    });
    localStorage.setItem('tweets', JSON.stringify(tweets));
}