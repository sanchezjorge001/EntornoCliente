import { useState } from 'react'
import './App.css'


/*Crea un formulario controlado en react que lea los siguientes datos:

Nombre (longitud entre 3 y 50)
Edad (debe estar entre 0 y 120)
Email (validado con regex)
Contraseña (Debe tener una latera minuscula, una mayúscula y un número, longitud mínima 6 y máxima 20)
El formulario debe validar continuamente el estado de los inputs y mostrar un mensaje bajo cada input indicando lo que no es correcto

Cuando le doy al submit se debe mostrar por consola todos los datos introducidos */


function formularioControlado(){
  const[form, setForm] = useState({
    nombre: "",
    edad: "",
    email: "",
    contraseña: ""
  });

  const [errors, setErrors] = useState({
    nombre: "",
    edad: "",
    email: "",
    contraseña: ""
  });

  const validarNombre = (nombre) => {
    if(nombre.length == 0) return "";
    if(nombre.length < 3)
      return "El nombre no puede tener menos de 3 caracteres";
    if(nombre.length > 50) 
      return "El nombre no puede tener mas de 50 caracteres";

    return "";
  };

  const validarEdad = (edad) => {
    if(edad == "") 
      return "";
    const edadNum = parseInt(edad);
    if(isNaN(edadNum))
      return "Debe ser un numero valido";
    if(edadNum < 0)
      return "La edad no puede ser negativa";
    if(edadNum > 120)
      return "La edad no puede ser superior a 120";
    return "";
    };


    const validarContraseña = (contraseña) => {
    if (contraseña.length === 0) return "";
    const errores = [];
    
    if (contraseña.length < 6) {
      errores.push("mínimo 6 caracteres");
    }
    if (contraseña.length > 20) {
      errores.push("máximo 20 caracteres");
    }
    if (!/[a-z]/.test(contraseña)) {
      errores.push("una letra minúscula");
    }
    if (!/[A-Z]/.test(contraseña)) {
      errores.push("una letra mayúscula");
    }
    if (!/[0-9]/.test(contraseña)) {
      errores.push("un número");
    }

    if (errores.length > 0) {
      return `Debe contener: ${errores.join(", ")}`;
    }
    return "";
  };

  const validarEmail = (email) => {
    if (email.length === 0) return "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Email no válido";
    return "";
  };


  const handleChange = (e) => {
    const {name, value } = e.target;
    setForm({...form, [name]: value});

    let error = "";
    switch(name){
      case "nombre":
        error = validarNombre(value);
        break;
      case "edad":
        error = validarEdad(value);
        break;
      case "email":
        error = validarEmail(value);
        break;
      case "contraseña":
        error = validarContraseña(value);
        break;
      default:
        break;
      
    }

    setErrors({...errors, [name]: error});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nombreError = validarNombre(form.nombre);
    const edadError = validarNombre(form.edad);
    const emailError = validarNombre(form.email);
    const contraseñaError = validarNombre(form.contraseña);

    setErrors({
      nombre: nombreError,
      edad: edadError,
      email: emailError,
      contraseña: contraseñaError
    })

    if(!nombreError && !edadError && !emailError && !contraseñaError){
      console.log('Datos Enviados', form);

    } else {
      console.log('Formulario con errores. Corrige los errores para enviar el formulario');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Nombre: 
        </label>
        <input type='text' name='nombre' value={form.nombre} onChange={handleChange}/>
      </div>

      <div>
        <label>
          Edad: 
        </label>
        <input type='number' name='edad' value={form.edad} onChange={handleChange}/>
      </div>

      <div>
        <label>
          Contraseña: 
        </label>
        <input type='text' name='contraseña' value={form.contraseña} onChange={handleChange}/>
      </div>

      <div>
        <label>Email: </label>
        <input type='email' name='email' value={form.email} onChange={handleChange}/>
      </div>

      <div>
        <button type='submit'>Enviar</button>
      </div>
    </form>
  )
}

export default formularioControlado;

