const modal = document.getElementById('messageBackground')
const span = document.getElementById('close')
function closeNotification() {
    span.addEventListener('click', () => {modal.style.display = 'none'})
    window.addEventListener('click', event => {if (event.target === modal) {modal.style.display = 'none'}})
}
closeNotification()