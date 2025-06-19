document.addEventListener("DOMContentLoaded", () => {
    const vrRoomInput = document.getElementById("vrRoom")
    const roomPasswordInput = document.getElementById("roomPassword")

    [vrRoomInput, roomPasswordInput].forEach(input => {
        input.addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                event.preventDefault()
                handleVirtualRoomAccess()
            }
        })
    })
})

function handleVirtualRoomAccess() {
    const vrRoom = document.getElementById("vrRoom").value
    const roomPassword = document.getElementById("roomPassword").value

    console.log(`Sala: ${vrRoom} e Palavra-passe: ${roomPassword}`)

    if (vrRoom && roomPassword) {
        alert(`A entrar na sala ${vrRoom} com a palavra-passe ${roomPassword}`)
        window.location.href = `../../html/VR/VirtualRealityClassroom.html?sala=${vrRoom}&pass=${roomPassword}`
    } else {
        alert("Preencha a sala e a palavra-passe correctamente!")
    }
}
