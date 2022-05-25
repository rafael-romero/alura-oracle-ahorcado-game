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

function recargarPagina(){
  location.reload();
}

const palabrasDelJuego = ["DEVOPS", "ALURA", "ORACLE", "JAVASCRIPT", "HTML", "CSS", "JAVA", "PHYTON", "MYSQL", "CSHARP", "MONGODB", "RUBY", "TECLADO", "MOUSE", "MONITOR", "PARLANTE", "CPU", "GPU", "MEMORIA", "MOTHER", "RAM", "COOLER"];
function crearPalabraSecreta(){
  const numeroElegido = Math.floor(Math.random() * palabrasDelJuego.length);
  const palabraSecretaElegida = palabrasDelJuego[numeroElegido];
  if(palabrasDelJuego.length > 0){
    palabrasDelJuego.splice(numeroElegido, 1); 
  }else{
    const mensaje = "Ya no quedan palabras para adivinar!!!";
    mostrarMensaje(mensaje);
    setTimeout(recargarPagina, MEDIO_SEGUNDO_EN_MILISEGUNDOS * 5);
  }
  return palabraSecretaElegida;
}

const $tablero = document.querySelector("#tablero");

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
  mostrarElemento($tablero);
  dibujarGuionesPalabraSecreta(palabraSecreta);
  dibujarAhorcado();
  ponerEspaciosVaciosEnPalabraFormadaPorElUsuario();
  inicializarVacioLetrasEquivocadas();
  ocultarElemento($contenedorBotonesIniciarJuego);
  mostrarElemento($contenedorBotonesNuevoJuegoDesistir);
  habilitarTeclado();
}

const $sonidoSorpresa = document.querySelector("#sonido-sorpresa");
function verificarQueNoSeaLetraRepetida(letraPresionada){
  if((letrasEquivocadas.includes(letraPresionada)) || (palabraFormadaPorElUsuario.includes(letraPresionada))){
    const mensaje = "Esta letra esta repetida, eliga otra por favor!!!";
    mostrarMensaje(mensaje);
    $sonidoSorpresa.play();
    return false;
  }
  return true;
}

const $sonidoCorrecto = document.querySelector("#sonido-correcto");
const $sonidoIncorrecto = document.querySelector("#sonido-incorrecto");
function verificarSiLaLetraCoincide(letrapresionada){
  if(palabraSecreta.includes(`${letrapresionada}`)){
    dibujarLetraCorrecta(letrapresionada);  
    $sonidoCorrecto.play();
  }else{
    dibujarLetraIncorrecta(letrapresionada);
    dibujarAhorcado();
    $sonidoIncorrecto.play();
  }  
}

const $sonidoGanador = document.querySelector("#sonido-ganador");
const $sonidoTeclaPresionada = document.querySelector("#sonido-presionar-tecla");
const letrasAceptadasEnMayusculas = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "Ñ", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
const apretarTecla = function(e){
  const letraPresionada = e.key;
  $sonidoTeclaPresionada.play();
  if(letrasAceptadasEnMayusculas.includes(`${letraPresionada}`)){
    if(verificarQueNoSeaLetraRepetida(letraPresionada)){
      verificarSiLaLetraCoincide(letraPresionada);
      if(JSON.stringify(palabraFormadaPorElUsuario) === JSON.stringify(palabraSecretaEnArray)){
        dibujarMensajeGanaste();
        if(partesDelAhorcado >= 2){
          dibujarCaraAhorcadoGanador();
        }
        setTimeout(()=>{$sonidoGanador.play()}, MEDIO_SEGUNDO_EN_MILISEGUNDOS * 1.5);
        dibujarFinDelJuego();
        deshabilitarTeclado();
      }
    }
  }else{
    const mensaje = "Unicamente se aceptan letras mayusculas";
    mostrarMensaje(mensaje);
    $sonidoSorpresa.play();
  }
};

function habilitarTeclado(){
  document.addEventListener("keydown", apretarTecla);
}

function deshabilitarTeclado(){
  document.removeEventListener("keydown", apretarTecla);
}

function validarPalabra(palabra){
  const NUMERO_DE_LETRAS_NO_PERMITIDO = 9;
  if(palabra.length > NUMERO_DE_LETRAS_NO_PERMITIDO){
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
  if (!$modal.open) {
    $modal.showModal();
    deshabilitarTeclado();
  }
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
    $sonidoCorrecto.play();
    mostrarMensaje(mensaje);
    $inputPalabraSecretaAAgregar.textContent = "";
    ocultarElemento($contenedorBotonesAgregarPalabra);
    mostrarElemento($contenedorBotonesIniciarJuego);
  }
}

const $btnCerrarModal = document.querySelector("#btn-cerrar-modal");
const $modal = document.querySelector("#modal");
$modal.onclick = function ocultarModal(ev) {
  var rect = $modal.getBoundingClientRect();
  var { clientX: x, clientY: y } = ev;
  if ((x < rect.x) || (x > rect.x + rect.width) ||
      (y < rect.y) || (y > rect.y + rect.height)) {
    $modal.close();
    habilitarTeclado();
  }
}

$btnCerrarModal.onclick = function (ev) {
  ev.preventDefault();
  $modal.close();
  habilitarTeclado();
}
 
const $btnCancelarNuevaPalabra = document.querySelector("#cancelar-nueva-palabra");
$btnCancelarNuevaPalabra.onclick = function(event){
  event.preventDefault();
  eliminarError();
  const mensaje = "No agrego ninguna palabra!";
  mostrarMensaje(mensaje);
  $sonidoIncorrecto.play();
  $inputPalabraSecretaAAgregar.textContent = "";
  ocultarElemento($contenedorBotonesAgregarPalabra);
  mostrarElemento($contenedorBotonesIniciarJuego);
}

const $btnAgregarNuevaPalabra = document.querySelector("#agregar-nueva-palabra");
$btnAgregarNuevaPalabra.onclick = function(event){
  event.preventDefault();
  ocultarElemento($contenedorBotonesIniciarJuego);
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
  ocultarElemento($tablero);
  reiniciarJuego();
  deshabilitarTeclado();
  mostrarElemento($contenedorBotonesIniciarJuego);
  ocultarElemento($contenedorBotonesNuevoJuegoDesistir);
}

