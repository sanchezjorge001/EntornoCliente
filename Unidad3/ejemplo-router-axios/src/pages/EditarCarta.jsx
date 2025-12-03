import React from 'react'
import { getCartaByID } from "../services/cartaService.js"

function ModificarCarta() {
  return (
        <>
            <form onSubmit={handleSubmit}>
                <label>Nombre: <input name="nombre" type="text" onChange={handleChange} /></label>
                <label>Direccion: <input name="direccion" type="text" onChange={handleChange} /></label>
                <label>Regalos (uno por linea): <textarea onChange={leerRegalos}></textarea></label>.
                <input type="submit" />
            </form>
        </>
    )
}

export default ModificarCarta
