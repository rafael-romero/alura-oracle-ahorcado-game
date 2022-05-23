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
let letrasEquivocadas = [];
const $contenedorBotonesIniciarJuego = document.querySelector("#contenedor-iniciar-juego");
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
    const mensaje = "Esta letra esta repetida, eliga otra por favor!!!";
    mostrarMensaje(mensaje);
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
      if(JSON.stringify(palabraFormadaPorElUsuario) === JSON.stringify(palabraSecretaEnArray)){
        dibujarMensajeGanaste();
        finalizarJuego();
      }
    }
  }else{
    const mensaje = "Unicamente se aceptan letras mayusculas";
    mostrarMensaje(mensaje);
  }
}, false);



function validarPalabra(palabra){
  if(palabra.length > 9){
    return "La palabra ingresada tiene mas de 8 letras";
  }
  if(!(/^[A-Z]+$/).test(palabra)){
    return "Solo se admiten palabras en mayusculas, sin numeros, acentos, ni caracteres especiales!!!"
  }
  return "";
}

const $mensajesAlUsuario = document.querySelector("#mensajes-al-usuario");

function eliminarError(){
  $mensajesAlUsuario.textContent = "";
  $mensajesAlUsuario.classList.remove("error");
  ocultarElemento($mensajesAlUsuario);
}

function mostrarError(error){
  $mensajesAlUsuario.textContent = error;
  $mensajesAlUsuario.classList.add("error");
  mostrarElemento($mensajesAlUsuario);
}

function mostrarMensaje(mensaje){
  document.querySelector("#mensaje-de-modal").textContent = mensaje;
  $modal.showModal();
}

const $contenedorBotonesAgregarPalabra = document.querySelector("#contenedor-agregar-palabra");
const $inputPalabraSecretaAAgregar = document.querySelector("#palabra-secreta-a-agregar");
const $btnGuardarYEmpezar = document.querySelector("#guardar-y-empezar")
$btnGuardarYEmpezar.onclick = function(event){
  event.preventDefault();
  const error = validarPalabra($inputPalabraSecretaAAgregar.value);
  if(error.length > 0){
    mostrarError(error);
  }else{
    eliminarError();
    palabrasDelJuego.push($inputPalabraSecretaAAgregar.value);
    const mensaje = "Su palabra a sido agregada!";
    mostrarMensaje(mensaje);
    ocultarElemento($contenedorBotonesAgregarPalabra);
  }
}

const $btnCerrarModal = document.querySelector("#btn-cerrar-modal");
const $modal = document.querySelector("#modal");
$btnCerrarModal.addEventListener("click",() => {
  $modal.close();
});
 

const $btnCancelarNuevaPalabra = document.querySelector("#cancelar-nueva-palabra");
$btnCancelarNuevaPalabra.onclick = function(event){
  event.preventDefault();
  const mensaje = "No agrego ninguna palabra!";
  mostrarMensaje(mensaje);
  ocultarElemento($contenedorBotonesAgregarPalabra);
}

const $btnAgregarNuevaPalabra = document.querySelector("#agregar-nueva-palabra");
$btnAgregarNuevaPalabra.onclick = function(event){
  event.preventDefault();
  mostrarElemento($contenedorBotonesAgregarPalabra);
}

function reiniciarJuego(){
  tablero.width = tablero.width;
  palabraSecreta = "";
  palabraSecretaEnArray = [];
  palabraFormadaPorElUsuario =[];
  letrasEquivocadas = [];
  partesDelAhorcado = 0;
}

const $btnNuevoJuego = document.querySelector("#nuevo-juego");
$btnNuevoJuego.onclick = function(event){
  event.preventDefault();
  reiniciarJuego();
  $btnIniciarJuego.click();
}


const $contenedorBotonesNuevoJuegoDesistir = document.querySelector("#contenedor-nuevo-juego-desistir");
const $btnDesistir = document.querySelector("#desistir");
$btnDesistir.onclick = function(event){
  event.preventDefault();
  reiniciarJuego();
  mostrarElemento($contenedorBotonesIniciarJuego);
  ocultarElemento($contenedorBotonesNuevoJuegoDesistir);
}

