import ahorcado1 from"./img/1.png"
import ahorcado2 from"./img/2.png"
import ahorcado3 from"./img/3.png"
import ahorcado4 from"./img/4.png"
import ahorcado5 from"./img/5.png"
import ahorcado6 from"./img/6.png"
import ahorcado7 from"./img/7.png"

const fotos = [ahorcado1, ahorcado2, ahorcado3, ahorcado4, ahorcado5, ahorcado6, ahorcado7]

export default function Monieco({fallos}){
    return(
        <img src={fotos[fallos]}></img>
    )
}