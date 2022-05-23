let tablero = document.querySelector("#tablero");
let pincel = tablero.getContext("2d");
let partesDelAhorcado = 0;

function dibujarCaraAhorcado(){
  pincel.lineWidth = 2;
  pincel.beginPath();
  //OJO IZQUIERDO
  pincel.moveTo(185, 140);
  pincel.lineTo(195, 150);
  pincel.moveTo(185, 150);
  pincel.lineTo(195, 140);
  //OJO DERECHO
  pincel.moveTo(205, 140);
  pincel.lineTo(215, 150);
  pincel.moveTo(205, 150);
  pincel.lineTo(215, 140);
  //BOCA TRISTE
  pincel.lineWidth = 3;
  pincel.moveTo(190, 170);
  pincel.bezierCurveTo(190, 160, 210, 160, 210, 170);
  pincel.stroke();
}

function dibujarFinDelJuego(){
  pincel.font = "45px Helvetica";
  pincel.fillStyle = "red";
  pincel.textAlign = "center";
  pincel.fillText("Fin Del Juego!!!", (tablero.width/2)+50, 300);
}

function dibujarMensajePerdiste(){
  pincel.font = "45px Helvetica";
  pincel.fillStyle = "red";
  pincel.textAlign = "center";
  pincel.fillText("Perdiste!!!", (tablero.width/2)+50, 125);
}

function dibujarMensajeGanaste(){
  pincel.font = "45px Helvetica";
  pincel.fillStyle = "green";
  pincel.textAlign = "center";
  pincel.fillText("Ganaste, Felicidades!!!", (tablero.width/2)+50, 125);
}

function dibujarLetraIncorrecta(letrapresionada){
  const NUMERO_PARA_CORTAR_ITERACION = 100;
  for(let i = 0; i < letrasEquivocadas.length; i++){
    if(letrasEquivocadas[i] === " "){
      letrasEquivocadas[i] = letrapresionada;
      i = NUMERO_PARA_CORTAR_ITERACION;
    }
  }
  let palabraAImprimir = letrasEquivocadas.join("");
  pincel.font = "30px Lucida Console";
  pincel.fillStyle = "coral";
  pincel.textAlign = "center";
  pincel.fillText(palabraAImprimir, tablero.width/2, 70);
  pincel.font = "30px Lucida Console";
  pincel.fillStyle = "white";
  pincel.textAlign = "center";
  pincel.fillText("Letras Equivocadas", tablero.width/2, 40);
}

function dibujarLetraCorrecta(letrapresionada){
  for(let i = 0; i < palabraSecretaEnArray.length; i++){
    if(letrapresionada === palabraSecretaEnArray[i]){
      palabraFormadaPorElUsuario[i] = letrapresionada;
    }   
  }
  let palabraAImprimir = palabraFormadaPorElUsuario.join(" ");
  pincel.font = "30px Lucida Console";
  pincel.fillStyle = "white";
  pincel.textAlign = "center";
  pincel.fillText(palabraAImprimir, ((tablero.width-20)/2), 375);
}


function dibujarGuionesPalabraSecreta(palabrasecreta){
  let guionesPalabraSecreta = ""; 
  pincel.font = "30px Lucida Console";
  pincel.fillStyle = "white";
  pincel.textAlign = "center";
  for(let i = 0; i < palabrasecreta.length; i++){
    guionesPalabraSecreta += "_ ";
  }
  pincel.fillText(guionesPalabraSecreta, tablero.width/2, 385);
}

function dibujarPieDerechoDelAhorcado(){
  pincel.beginPath();
  pincel.moveTo(200, 249);
  pincel.lineTo(220, 285);
  pincel.moveTo(219, 285);
  pincel.lineTo(235, 285);
  pincel.stroke();
}

function dibujarPieIzquierdoDelAhorcado(){
  pincel.beginPath();
  pincel.moveTo(200, 249);
  pincel.lineTo(180, 285);
  pincel.moveTo(181, 285);
  pincel.lineTo(165, 285);
  pincel.stroke();
}

function dibujarBrazoDerechoDelAhorcado(){
  pincel.beginPath();
  pincel.moveTo(200, 185);
  pincel.lineTo(220, 220);
  pincel.stroke();
}

function dibujarBrazoIzquierdoDelAhorcado(){
  pincel.beginPath();
  pincel.moveTo(200, 185);
  pincel.lineTo(180, 220);
  pincel.stroke();
}

function dibujarTroncoDelAhorcado(){
  pincel.beginPath();
  pincel.moveTo(200, 180);
  pincel.lineTo(200, 250);
  pincel.stroke();
}

function dibujarCabezaDelAhorcado(){
  pincel.beginPath();
  pincel.arc(200, 155, 25, 0, 2 * Math.PI);
  pincel.stroke();
}

function dibujarBaseParaElAhorcado(){
  pincel.beginPath();
  pincel.moveTo(30, 320);
  pincel.lineTo(280, 320);
  pincel.moveTo(70, 320);
  pincel.lineTo(72, 80);
  pincel.moveTo(70, 80);
  pincel.lineTo(200, 82);
  pincel.moveTo(200, 80);
  pincel.lineTo(200, 130);
  pincel.moveTo(70, 120);
  pincel.lineTo(110, 80);
  pincel.stroke();
}

const $sonidoPerdedor = document.querySelector("#sonido-derrota");
function dibujarAhorcado(){
  const MEDIO_SEGUNDO_EN_MILISEGUNDOS = 500;
  pincel.strokeStyle = "white";
  pincel.lineWidth = 5;
  partesDelAhorcado = partesDelAhorcado + 1;
  if(partesDelAhorcado === 1){
    dibujarBaseParaElAhorcado();
  }
  if(partesDelAhorcado === 2){
    dibujarCabezaDelAhorcado();
  }
  if(partesDelAhorcado === 3){
    dibujarTroncoDelAhorcado();
  }
  if(partesDelAhorcado === 4){
    dibujarBrazoIzquierdoDelAhorcado();
  }
  if(partesDelAhorcado === 5){
    dibujarBrazoDerechoDelAhorcado();
  }
  if(partesDelAhorcado === 6){
    dibujarPieIzquierdoDelAhorcado();
  }
  if(partesDelAhorcado === 7){
    dibujarPieDerechoDelAhorcado();
    dibujarCaraAhorcado();
    $sonidoPerdedor.play();
    setTimeout(dibujarFinDelJuego(), MEDIO_SEGUNDO_EN_MILISEGUNDOS);
    dibujarMensajePerdiste();
  }
}

