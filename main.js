const categoryList = document.querySelector(".categories")
const productList = document.querySelector(".products")
const openBtn = document.getElementById("open-btn")
const closeBtn = document.getElementById("close-btn")
const modal = document.getElementById("modal-wrapper")

document.addEventListener("DOMContentLoaded", () => {
    fetchCatagories()
    fetchProducts()
})

function fetchCatagories() {

    fetch("https://api.escuelajs.co/api/v1/categories")
        .then(response => response.json())
        .then((data) =>
            data.slice(0, 4).forEach((category) => {
                const categoryDiv = document.createElement("div")

                categoryDiv.classList.add("category")

                categoryDiv.innerHTML = `
                <img src="${category.image}">
                <span>${category.name}</span>
            `
                categoryList.appendChild(categoryDiv)
            }))
        .catch(err => console.log(err))

}

function fetchProducts() {
    fetch("https://api.escuelajs.co/api/v1/products")
        .then((resp) => resp.json())
        .then((data) =>
            data.slice(0, 32).forEach((product) => {
                const productDiv = document.createElement("div")
                productDiv.classList.add("product")

                productDiv.innerHTML = `
                    <img src="${product.images[0]}">
                    <p class="product-title">${product.title}</p>
                    <p class="product-category">${product.category.name}</p>
                    <div class="product-action">
                        <p>${product.price} $</p>
                        <button onClick="sepeteEkle(id:'${product.id}',{name:'${product.title}', price:'${product.price}', image: '${product.images[0]}'}, amount:1)">Sepete Ekle</button>
                    </div>
                `
                productList.appendChild(productDiv)
            }))
        .catch()
}

openBtn.addEventListener("click", toogleModal)
closeBtn.addEventListener("click", toogleModal)

modal.addEventListener("click", (e) => {
    if (e.target.id !== 'modal') {
        modal.classList.remove("active")
    }
})

function toogleModal() {
    modal.classList.toggle('active');
}

const basket = []

function sepeteEkle(product) {
    const findItem = basket.find((i) => i.id === product.id)
    if (findItem) {
        basket.indexOf((item) => item.id === product.id)

        basket.splice(foundIndex, 1, { ...product, amount: findItem.amount + 1 })
    } else {
        basket.push(product)
        console.log(basket);
    }

}