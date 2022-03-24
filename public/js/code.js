const addModal = new bootstrap.Modal(document.getElementById('addModal'))
const editModal = new bootstrap.Modal(document.getElementById('editModal'))

const on = (element, event, selector, handler) => {
  element.addEventListener(event, e => {
    if(e.target.closest(selector)){
      handler(e)
    }
  })
}

//Función abrir modal Agregar
on(document, 'click', '.btnAdd', e=>{
  e.preventDefault()
  addModal.show()
})

