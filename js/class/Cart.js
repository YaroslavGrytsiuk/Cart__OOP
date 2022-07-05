class Cart {
    constructor(
        cartData,
        currency = ''
    ) {
        this.cartData = cartData
        this.currency = 'грн'
    }

    plusProduct(articul) {
        this.cartData[articul]['count']++
    }

    minusProduct(articul) {
        if (this.cartData[articul]['count'] - 1 == 0) {
            this.deleteProduct(articul)
        } else {
            this.cartData[articul]['count']--
        }
    }
    deleteProduct(articul) {
        delete this.cartData[articul]
    }
    getTotal() {
        let total = 0
        for (let key in this.cartData) {
            total += this.cartData[key].count * this.cartData[key].price
        }
        return total
    }

    renderCart() {
        const cart = document.getElementById('cart')
        const cartBody = document.createElement('div')
        cartBody.classList.add('cart__body')
        for (const key in this.cartData) {
            const cartRow = document.createElement('div')
            cartRow.classList.add('cart__row')
            let product = this.cartData[key]
            const btnDel = document.createElement('button')
            btnDel.classList.add('cart__del-btn')
            btnDel.textContent = 'x'
            btnDel.setAttribute('data-articul', key)
            const imgContainer = document.createElement('div')
            imgContainer.classList.add('cart__img')
            const img = document.createElement('img')
            img.setAttribute('src', product.img)
            img.setAttribute('alt', 'product-img')
            imgContainer.append(img)
            const titleRow = document.createElement('div')
            titleRow.classList.add('cart__title')
            titleRow.textContent = product.title
            const btnMinus = document.createElement('button')
            btnMinus.classList.add('cart__min-btn')
            btnMinus.textContent = '-'
            btnMinus.setAttribute('data-articul', key)
            const amount = document.createElement('div')
            amount.classList.add('cart__amount')
            amount.textContent = product.count
            const btnPlus = document.createElement('button')
            btnPlus.classList.add('cart__plus-btn')
            btnPlus.textContent = '+'
            btnPlus.setAttribute('data-articul', key)
            const rowPrice = document.createElement('div')
            rowPrice.classList.add('cart__price')
            rowPrice.textContent = `${product.count * product.price} ${this.currency}`
            const cartTotal = document.createElement('div')
            cartTotal.classList.add('cart__total')
            cartTotal.textContent = `Сума замовлення: ${this.getTotal()} ${this.currency}`
            cartRow.append(btnDel, imgContainer, titleRow, btnMinus, amount, btnPlus, rowPrice)
            cartBody.append(cartRow, cartTotal)
            cart.append(cartBody)
        }
    }
}