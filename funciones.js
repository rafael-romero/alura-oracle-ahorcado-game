const palabrasDelJuego = ["DEVOPS", "ALURA", "ORACLE", "JAVASCRIP", "HTML", "CSS", "JAVA", "PHYTON", "MYSQL", "CSHARP", "MONGODB", "RUBY", "TECLADO", "MOUSE", "MONITOR", "PARLANTE", "CPU", "GPU", "MEMORIA", "MOTHER", "RAM", "COOLER"];

function crearPalabraSecreta(){
   let numeroElegido = Math.floor(Math.random() * palabrasDelJuego.length);
   return palabrasDelJuego[numeroElegido];
}

