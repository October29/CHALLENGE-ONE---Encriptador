let mensajes = []; //mensajes a encriptar
let mensajescodificados = []; //mensajes a desencriptar

const guardados = document.querySelector('#guadados-container');    //Declaracion - contenedor lateral para mensajes encriptados
const botonEncriptar = document.querySelector('#boton-encriptar');  //Declaracion - boton de encriptado
const botonDesencriptar = document.querySelector('#boton-desencriptar');//Declaacion - boton desencriptar

//Boton para ENCRIPTAR mensajes ingresados en el campo de texto
botonEncriptar.onclick = function validar(event){
    event.preventDefault();
    let mensaje = document.querySelector('#mensajeParaEncriptar').value;
    let mensajeEncriptado = Array.from(mensaje);
    for (i = 0 ; i < mensajeEncriptado.length ; i++) {
        if (mensajeEncriptado[i] === 'a') {
            mensajeEncriptado.splice([i], 1, 'ai');
        }else if (mensajeEncriptado[i] === 'e') {
            mensajeEncriptado.splice([i], 1, 'enter');
        }else if (mensajeEncriptado[i] === 'i') {
            mensajeEncriptado.splice([i], 1, 'imes');
        }else if (mensajeEncriptado[i] === 'o') {
            mensajeEncriptado.splice([i], 1, 'ober');
        }else if (mensajeEncriptado[i] === 'u') {
            mensajeEncriptado.splice([i], 1, 'ufat');
        }
    }
    if (mensajes.includes(mensajeEncriptado)) {
        alertText('#alert', 'el nombre ya se encuentra');
        } else {
            mensajes.push(mensajeEncriptado);
            guardar();
            alertText('#alert', '');
        };
    console.log(mensajeEncriptado);
    return
};

//Funcion para emitir textos desencriptados en la parte superior de la barra lateral
function alertText(id, text) {
    let elementHtml = document.querySelector(id);
    elementHtml.innerHTML = text;
//Si no hay textos para mostrar desabilitar el area de texts desencriptados
    if (text == false){
        elementHtml.className = 'disable';
    } else {
        elementHtml.className = 'mensajeAlerta';
    }
    return
};

//funcion limpiar campo de texto
function limpiarTexto() {
    document.querySelector('#mensajeParaEncriptar').value = '';
}

//Guarda las entradas en la barra lateral
function guardar() {
    let nuevaEntradaContenedor = document.createElement('div');
    let nuevaEntradaMensaje = document.createElement('h2');
    let ultimaEntrada = mensajes[mensajes.length -1]; 
    if (ultimaEntrada == '') {
        alertasTemporales('Ingresa un mensaje');
        return
    } else if (/[A-Z]/.test(ultimaEntrada)) {
        limpiarTexto();
        alertasTemporales('Solo letras minusculas');
        return
    } else if (/[áéíóú]/.test(ultimaEntrada)) {
        alertasTemporales('Solo letras sin acento');
        limpiarTexto();
        return
    }  else if (/[0-9]/.test(ultimaEntrada)) {
        alertasTemporales('Entrada invalida');
        limpiarTexto();
        return
    } else {
//Contenedor para la nueva entrada con mensaje y boton eliminar/copiar
        nuevaEntradaContenedor.className = 'nuevaEntradaContenedor';
        guardados.appendChild(nuevaEntradaContenedor);
        limpiarTexto();
//Mensaje de nueva entrada
        nuevaEntradaMensaje.className ='nuevaEntradaMensaje';
        nuevaEntradaMensaje.id = 'nuevaEntradaMensaje';
        nuevaEntradaMensaje.textContent = mensajes[mensajes.length -1].join('');
        nuevaEntradaContenedor.appendChild(nuevaEntradaMensaje);
    }
//Boton para eliminar las entradas de la barra lateral
    let eliminar = document.createElement('button');
    eliminar.className ='botonEliminar';
    eliminar.id = 'eliminar';
    eliminar.textContent = 'Eliminar';
    nuevaEntradaContenedor.appendChild(eliminar);
    eliminar.onclick = function eliminarEntrada (){
        nuevaEntradaContenedor.remove();
        alertText('#alert', '');
        mensajes.pop();
    }

//Boton para copiar las entradas de la barra lateral
    let copiarB = document.createElement('button');
    copiarB.className ='botonDeCopiar';
    copiarB.id = 'copiarB';
    copiarB.textContent = 'Copiar';
    nuevaEntradaContenedor.appendChild(copiarB);
    copiarB.onclick = function procesoDecodificar (){
        navigator.clipboard.writeText(nuevaEntradaMensaje.textContent); 
    }
    return
};

//Boton para desencriptar mensajes ingresados en el campo de texto
botonDesencriptar.onclick = function desencriptarEntrada(event){
    event.preventDefault();
    let entradaCodificada = document.querySelector('#mensajeParaEncriptar').value;
    let mensajecodificado = Array.from(entradaCodificada);

    if (entradaCodificada == '') {
        alertasTemporales('Ingresa un mensaje');
        return
    } else if (/[A-Z]/.test(entradaCodificada)) {
        alertasTemporales('Solo letras minusculas');
        limpiarTexto();
        return
    } else if (/[áéíóú]/.test(entradaCodificada)) {
        alertasTemporales('Solo letras sin acento');
        limpiarTexto();
        return
    } else if (/[0-9]/.test(entradaCodificada)) {
        alertasTemporales('Entrada invalida');
        limpiarTexto();
        return
    }else {
        for (i = 0 ; i < mensajecodificado.length ; i++) {
            if (mensajecodificado[i] === 'a' && mensajecodificado[i+1] === 'i' ) {
                mensajecodificado.splice([i+1], 1);
            } else if (mensajecodificado[i] === 'e' && mensajecodificado[i+1] === 'n' && mensajecodificado[i+2] === 't' && mensajecodificado[i+3] === 'e' && mensajecodificado[i+4] === 'r' ){
                mensajecodificado.splice([i+1], 4);
            } else if (mensajecodificado[i] === 'i' && mensajecodificado[i+1] === 'm' && mensajecodificado[i+2] === 'e' && mensajecodificado[i+3] === 's'){
                mensajecodificado.splice([i+1], 3);
            } else if (mensajecodificado[i] === 'o' && mensajecodificado[i+1] === 'b' && mensajecodificado[i+2] === 'e' && mensajecodificado[i+3] === 'r'){
                mensajecodificado.splice([i+1],3);
            } else if (mensajecodificado[i] === 'u' && mensajecodificado[i+1] === 'f' && mensajecodificado[i+2] === 'a' && mensajecodificado[i+3] === 't') {
                mensajecodificado.splice([i+1],3);
            }
        }
    }
    alertText('#alert', mensajecodificado.join(''));
    return
}

function alertasTemporales(mensaje){
    let contenedorTexto = document.createElement('div');
    contenedorTexto.className = 'contenedorDeAlertas';
    document.body.appendChild(contenedorTexto);

    let textoAlerta = document.createElement('p');
    textoAlerta.className = 'textoDeAlertas';
    textoAlerta.textContent = mensaje;
    contenedorTexto.appendChild(textoAlerta);

    setTimeout(() => {
        contenedorTexto.remove();
    }, 1500);
}