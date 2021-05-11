//Selector
const form = document.getElementById("form")
      list = document.getElementById("list-add")
      templateAlert = document.getElementById("template-alert").content
      fragment = document.createDocumentFragment()
      input = document.getElementById("input")
let tareas = {}

document.addEventListener("DOMContentLoaded", ()=>{
    if(localStorage.getItem("tareas")){
        tareas = JSON.parse(localStorage.getItem("tareas"))
    }
    pintarTareas()
})

list.addEventListener("click", (e)=>{
    btnAccion(e)
})
//console.log(Date.now())

form.addEventListener("submit", (e)=>{
    e.preventDefault()
    setTarea(e)
})

const setTarea = (e)=>{
    if(input.value.trim() === ""){
        list.innerHTML = `
        <div class="alert alert-danger d-flex align-items-center justify-content-center w-75" role="alert">
        <i class="fas fa-exclamation-circle me-2"></i>
        <div>
         Ingrese una Tarea
         </div>
         </div>
        `
        return
    }
        //console.log(input.value)
        const tarea ={   
            id: Date.now(),
            texto: input.value, 
            estado: false
        }

        tareas[tarea.id] = tarea
        //console.log(tareas)
        list.innerHTML =""
        form.reset()
        input.focus()

        pintarTareas()

}

const pintarTareas = ()=>{

    localStorage.setItem("tareas", JSON.stringify(tareas))

    if(Object.values(tareas).length === 0){
        list.innerHTML = `
        <div class="alert alert-light w-75 text-center">
        No existen tareas 😊
        </div>
        `
        return
    }
    list.innerHTML = ""
    Object.values(tareas).forEach(tarea =>{
        const clone = templateAlert.cloneNode(true)
        clone.querySelector("p").textContent = tarea.texto

        if(tarea.estado === true){
            clone.querySelector(".alert").classList.replace("alert-warning","alert-primary")
            clone.querySelectorAll(".fas")[0].classList.replace("fa-check-circle", "fa-arrow-circle-left")
            clone.querySelectorAll(".fas")[0].classList.replace("text-success", "text-secondary")
            clone.querySelector("p").style.textDecoration = "line-through"
        }

        clone.querySelectorAll(".fas")[0].dataset.id = tarea.id
        clone.querySelectorAll(".fas")[1].dataset.id = tarea.id
        fragment.appendChild(clone)
    })
    list.appendChild(fragment)
}

const btnAccion = (e)=>{
    if(e.target.classList.contains("fa-check-circle")){
        tareas[e.target.dataset.id].estado = true
        pintarTareas()
    }
    if(e.target.classList.contains("fa-minus-circle")){
        delete tareas[e.target.dataset.id]
        pintarTareas()
    }
    if(e.target.classList.contains("fa-arrow-circle-left")){
        tareas[e.target.dataset.id].estado = false
        pintarTareas()
    }
    e.stopPropagation()
}
