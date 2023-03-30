function abrir_modal(nome_modal) {
  let modal = document.getElementById(nome_modal)
  modal.showModal()
  modal.addEventListener('click', event => {
    if (event.target.id.includes("modal_")) {
      modal.close()
    }
  })
}

function fechar_modal(nome_modal) {
  let modal = document.getElementById(nome_modal)
  modal.close()
}
