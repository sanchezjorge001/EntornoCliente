import { useState } from "react";

function App(){
  const[mensaje, setMensaje] = useState("Pulsa el gatillo para comenzar");
  const[bala, setBala] = useState(Math.floor(Math.random() * 6) + 1);
  const[intento,setIntento] = useState(1);

  const[gameover, setGameOver] = useState(false);

  const[disparar] = () => {
    if(gameover) return;

    if (intento == bala){
      setMensaje ("💀HAS MUERTO💀");
      setGameOver(true);
    } else {

      
    }
  }
}




