document.querySelectorAll('.heart-icon').forEach(icon => {
    icon.addEventListener('click', () => {
    icon.classList.toggle('fa-solid')
    icon.classList.toggle('fa-regular')
    icon.classList.toggle('clicked')
    })
})