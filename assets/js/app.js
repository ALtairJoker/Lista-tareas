//variables

const agregar = document.querySelector('#input-submit');
const formulario = document.querySelector('#formulario');
let total = document.querySelector('#total');
let realizadas = document.querySelector('#realizadas');
const listaTareas = document.querySelector('#lista-tareas');
let tareas = [{
            id: Date.now(),
            descripcion: Correr,
            estado: true,
       },{
            id: Date.now(),
            descripcion: Caminar,
            estado: false,
       },{
            id: Date.now(),
            descripcion: Estudiar,
            estado: false,
       }];

//eventos

eventos ()

function eventos () {
    agregar.addEventListener('click', agregarTarea);

     // Contenido cargado
    document.addEventListener('DOMContentLoaded', () => {
        tareas = JSON.parse( localStorage.getItem('tareas') ) || []  ;
        crearHTML();
        muestraRealizadas();

    document.addEventListener('click', muestraRealizadas );
   });
}

//funciones

function agregarTarea(e) {
    e.preventDefault();
    const tareaText = document.querySelector('#input-tarea').value

    // validación
    if(tareaText === '') {
        mostrarError('Tarea no puede estar vacia')
        return
    }// Crear un objeto tarea
        const tareaObj = {
            id: Date.now(),
            descripcion: tareaText,
            estado: false
       }
    
       // Añadirlo a mis tareas
       tareas = [...tareas, tareaObj];
    
        // Una vez agregado, mandamos renderizar nuestro HTML
        crearHTML();

        formulario.reset ();
}

function mostrarError(error) {

    const mensajeError = document.createElement('p');
     
    mensajeError.textContent = error;
    mensajeError.classList.add('error');
    

    const errorId = document.querySelector('#error-id');
    errorId.appendChild(mensajeError)

        
    setTimeout(() => {
        mensajeError.remove();
   }, 2500);
}
    
function crearHTML() {
    limpiarHTML();
    let html = '';
    if(tareas.length > 0 ) {
        for(tarea of tareas){
            html += `<tr>
                        <td>${tarea.id} </td>
                        <td> ${tarea.descripcion} </td>`;
            if(tarea.estado == true){
                html += `<td><input type="checkbox" id="${tarea.id}" checked></td>`;
            }else {
                html += `<td><input type="checkbox" id="${tarea.id}"></td>`}
            html +=`
            <td><a href="#" onclick="eliminarTarea(${tarea.id});">X</a></td>
        </tr>`;
        document.querySelector('#lista-tareas').innerHTML = html;                                      
        }
        };
    total.innerHTML = `Total: ${tareas.length}`;
    sincronizarStorage();
}

function sincronizarStorage() {
    localStorage.setItem('tareas', JSON.stringify(tareas));
};

function  eliminarTarea(id) {
     tareas = tareas.filter( tarea => tarea.id != id  );
     crearHTML();   
}

function muestraRealizadas () {
    let tareaRealizadas = [];
    for (tarea of tareas) {
        if (document.getElementById(`${tarea.id}`).checked) {
            tarea.estado = true;
            
            tareaRealizadas = [...tareaRealizadas,tareas];
        }     
    }
    realizadas.innerHTML = `Realizadas: ${tareaRealizadas.length}`;
    sincronizarStorage()
}

function limpiarHTML() {
    while(listaTareas.firstChild) {
        listaTareas.removeChild(listaTareas.firstChild);
    }
} 

