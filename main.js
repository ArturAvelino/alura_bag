const form = document.getElementById("novoItem")
const list = document.getElementById("list")
const items = JSON.parse(localStorage.getItem("items")) || []

items.forEach( (element) => {
    newElement(element)
})

form.addEventListener("submit", (event) => {
    event.preventDefault()

    const nome = event.target.elements['nome']
    const quantidade = event.target.elements['quantidade']
    const exist = items.find( element => element.nome === nome.value)

    const itemCurrently = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if (exist) {
        itemCurrently.id = exist.id

        refreshElement(itemCurrently)

        items[exist.id] = itemCurrently
    } else {
        itemCurrently.id = items.length

        newElement(itemCurrently)

        items.push(itemCurrently)
    }

    localStorage.setItem("items", JSON.stringify(items))


    nome.value = ""
    quantidade.value = ""
})

function newElement(item) {
    const newItem = document.createElement('li')
    newItem.classList.add("item")

    const numberItem = document.createElement('strong')
    numberItem.dataset.id = item.id 
    numberItem.innerHTML = item.quantidade

    newItem.appendChild(numberItem)
    newItem.innerHTML += item.nome

    newItem.appendChild(bottonDelete(item.id))

    list.appendChild(newItem)
}

function refreshElement(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

function bottonDelete(id) {
    const elementBotton = document.createElement("button")
    elementBotton.innerText = "X"

    elementBotton.addEventListener("click", function() {
        deleteElement(this.parentNode, id)
    })

    return elementBotton
}

function deleteElement(tag, id) {
    tag.remove()

    items.splice(items.findIndex(element => element.id === id), 1)

    localStorage.setItem("items", JSON.stringify(items))

}