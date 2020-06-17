const listMessage = document.querySelector(".list-group")
const form = document.querySelector("#form")
const inputMessage = document.querySelector("#inputMessage")
const inputPseudo = document.querySelector("#inputPseudo")


const addMessage = function (dist, message, classList) {
    const item = document.createElement("li")
    classList.forEach(element => {
        item.classList.add(element)
    });
    item.innerText = message
    dist.appendChild(item)
}

const socket = io.connect('http://localhost:8000')

socket.on("login", () => {
    addMessage(listMessage, "Someone just connected", ["list-group-item", "list-group-item-success"])
})

socket.on("logout", () => {
    addMessage(listMessage, "Someone just disconnected", ["list-group-item", "list-group-item-danger"])
})

socket.on("message", (data) => {
    addMessage(listMessage, data.name + " : " + data.content, ["list-group-item"])
})



form.addEventListener("submit", (e) => {
    e.preventDefault()
    const data = {
        name: inputPseudo.value != "" ? inputPseudo.value : "Unknown",
        content: inputMessage.value
    }

    socket.emit("message", data)
    addMessage(listMessage, data.name + " : " + data.content, ["list-group-item"])
    inputMessage.value = ""
})