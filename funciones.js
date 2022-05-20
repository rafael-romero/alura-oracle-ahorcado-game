function dibujarGuionesPalabraSecreta(palabrasecreta){
  const longitudDePalabraSecreta = palabrasecreta.length;
  let guionesPalabraSecreta = ""; 

  pincel.font = "30px Arial";
  pincel.fillStyle = "white";
  pincel.textAlign = "center";
  for(let i = 0; i < palabrasecreta.length; i++){
    guionesPalabraSecreta += "_ ";
  }
  pincel.fillText(guionesPalabraSecreta, tablero.width/2, 385);
}


const palabrasDelJuego = ["DEVOPS", "ALURA", "ORACLE", "JAVASCRIP", "HTML", "CSS", "JAVA", "PHYTON", "MYSQL", "CSHARP", "MONGODB", "RUBY", "TECLADO", "MOUSE", "MONITOR", "PARLANTE", "CPU", "GPU", "MEMORIA", "MOTHER", "RAM", "COOLER"];

function crearPalabraSecreta(){
   let numeroElegido = Math.floor(Math.random() * palabrasDelJuego.length);
   return palabrasDelJuego[numeroElegido];
}

