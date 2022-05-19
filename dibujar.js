let tablero = document.querySelector("#tablero");
let pincel = tablero.getContext("2d");
let partesDelAhorcado = 0;


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


function dibujarAhorcado(){
  pincel.strokeStyle = "white";
  pincel.lineWidth = 5;
  //partesDelAhorcado = partesDelAhorcado + 1; esta es la primera linea correcta y NO la que esta debajo
  partesDelAhorcado = 1;
  if(partesDelAhorcado === 1 ){
    dibujarBaseParaElAhorcado();
  }
  partesDelAhorcado = 2;
  if(partesDelAhorcado === 2){
    dibujarCabezaDelAhorcado();
  }
  partesDelAhorcado = 3;
  if(partesDelAhorcado === 3){
    dibujarTroncoDelAhorcado();
  }
  partesDelAhorcado = 4;
  if(partesDelAhorcado === 4){
    dibujarBrazoIzquierdoDelAhorcado();
  }
  partesDelAhorcado = 5;
  if(partesDelAhorcado === 5){
    dibujarBrazoDerechoDelAhorcado();
  }
  partesDelAhorcado = 6;
  if(partesDelAhorcado === 6){
    dibujarPieIzquierdoDelAhorcado();
  }
  partesDelAhorcado = 7;
  if(partesDelAhorcado === 7){
    dibujarPieDerechoDelAhorcado();
  }
}

dibujarAhorcado();
