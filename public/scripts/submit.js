function customerCheck(id){
  event.preventDefault();

  Swal.fire({
  title: 'Apagar o cliente?',
  text: "As ordens de serviço vinculadas a este cliente também serão apagadas!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3cdc8c',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Sim, apagar!',
  cancelButtonText: 'Cancelar'
}).then((result) => {
  if (result.isConfirmed){
      window.location.href = "/customers/delete/" + id;
  }
})
}