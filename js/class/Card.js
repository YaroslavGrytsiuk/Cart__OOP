class Card {
    constructor(option) {
        this.id = option.id
        this.img = option.img
        this.title = option.title
        this.price = option.price
    }
    renderCard() {
        const card = document.createElement('div')
        card.classList.add('catalog__card', 'card')
        const productId = document.createElement('div')
        productId.classList.add('card__product-id')
        productId.innerText = this.id
        const imageContainer = document.createElement('div')
        imageContainer.classList.add('card__img')
        const img = document.createElement('img')
        img.setAttribute('src', this.img)
        img.setAttribute('alt', 'product-img')
        imageContainer.append(img)
        const title = document.createElement('div')
        title.classList.add('card__title')
        title.innerText = this.title
        const price = document.createElement('div')
        price.classList.add('card__price')
        price.innerHTML = `Ціна:<span> ${this.price + ' грн'}</span>`
        const buttton = document.createElement('button')
        buttton.classList.add('card__button', 'to-cart', 'btn-primary', 'btn')
        buttton.setAttribute('data-product-id', this.id)
        buttton.setAttribute('data-bs-toggle', "modal")
        buttton.setAttribute('data-bs-target', "#exampleModal")
        buttton.innerText = 'Купити'
        card.append(productId, imageContainer, title, price, buttton)
        return card
    }
}