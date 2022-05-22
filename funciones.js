function ocultarElemento(elemento){
  elemento.classList.add("oculto");
}

function mostrarElemento(elemento){
  elemento.classList.remove("oculto");
}


function inicializarVacioLetrasEquivocadas(){
  const MAXIMO_DE_LETRAS_EQUIVOCADAS = 24;
  for(let i = 0; i < MAXIMO_DE_LETRAS_EQUIVOCADAS; i++){
    letrasEquivocadas.push(" ");
  }
}

function ponerEspaciosVaciosEnPalabraFormadaPorElUsuario(){
  for(let i = 0; i < palabraSecretaEnArray.length; i++){
    palabraFormadaPorElUsuario.push(" ");
  }
}

const palabrasDelJuego = ["DEVOPS", "ALURA", "ORACLE", "JAVASCRIPT", "HTML", "CSS", "JAVA", "PHYTON", "MYSQL", "CSHARP", "MONGODB", "RUBY", "TECLADO", "MOUSE", "MONITOR", "PARLANTE", "CPU", "GPU", "MEMORIA", "MOTHER", "RAM", "COOLER"];
function crearPalabraSecreta(){
   const numeroElegido = Math.floor(Math.random() * palabrasDelJuego.length);
   const palabraSecretaElegida = palabrasDelJuego[numeroElegido];
   palabrasDelJuego.splice(numeroElegido, 1); 
   return palabraSecretaElegida;
}

let palabraSecreta = "";
let palabraSecretaEnArray = [];
let palabraFormadaPorElUsuario =[];
const letrasEquivocadas = [];
const $btnAgregarNuevaPalabra = document.querySelector("#agregar-nueva-palabra");
const $btnIniciarJuego = document.querySelector("#iniciar-juego");
$btnIniciarJuego.onclick = function(event){
  event.preventDefault();
  palabraSecreta = crearPalabraSecreta();
  palabraSecretaEnArray = palabraSecreta.split("");
  dibujarGuionesPalabraSecreta(palabraSecreta);
  ponerEspaciosVaciosEnPalabraFormadaPorElUsuario();
  inicializarVacioLetrasEquivocadas();
  ocultarElemento($contenedorBotonesIniciarJuego);
  mostrarElemento($contenedorBotonesNuevoJuegoDesistir);
}

function verificarQueNoSeaLetraRepetida(letraPresionada){
  if((letrasEquivocadas.includes(letraPresionada)) || (palabraFormadaPorElUsuario.includes(letraPresionada))){
    alert("Esta letra esta repetida, eliga otra por favor!!!");
    return false;
  }
  return true;
}

function verificarSiLaLetraCoincide(letrapresionada){
  if(palabraSecreta.includes(`${letrapresionada}`)){
    dibujarLetraCorrecta(letrapresionada);  
  }else{
    dibujarLetraIncorrecta(letrapresionada);
    dibujarAhorcado();
  }  
}

const letrasAceptadasEnMayusculas = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "Ñ", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
document.addEventListener("keydown", function(event){
  const letraPresionada = event.key;
  if(letrasAceptadasEnMayusculas.includes(`${letraPresionada}`)){
    if(verificarQueNoSeaLetraRepetida(letraPresionada)){
      verificarSiLaLetraCoincide(letraPresionada);
      if(palabraFormadaPorElUsuario == palabraSecretaEnArray){
        alert("Felicitaciones Ganaste!!!")
      }
    }
  }else{
    alert("Unicamente se aceptan letras mayusculas");
  }
}, false);

