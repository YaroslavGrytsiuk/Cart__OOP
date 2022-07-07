class Cart {
    constructor(
        goods,
        currency = ''
    ) {
        this.goods = goods
        this.currency = 'грн'
    }

    plusProduct(articul) {
        this.goods[articul]['count']++
    }

    minusProduct(articul) {
        if (this.goods[articul]['count'] - 1 == 0) {
            this.deleteProduct(articul)
        } else {
            this.goods[articul]['count']--
        }
    }
    deleteProduct(articul) {
        delete this.goods[articul]
    }
    getTotal() {
        let total = 0
        for (let key in this.goods) {
            total += this.goods[key].count * this.goods[key].price
        }
        return total
    }

    renderCart() {
        const cartBody = document.createElement('div')
        cartBody.classList.add('cart__body')
        for (const key in this.goods) {
            const cartRow = document.createElement('div')
            cartRow.classList.add('cart__row')
            let product = this.goods[key]
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
            cartRow.append(btnDel, imgContainer, titleRow, btnMinus, amount, btnPlus, rowPrice)
            cartBody.append(cartRow)
        }
        const cartTotal = document.createElement('div')
        cartTotal.classList.add('cart__total')
        cartTotal.textContent = `Сума замовлення: ${this.getTotal()} ${this.currency}`
        if (this.getTotal() === 0) {
            cartTotal.innerHTML = `<img class="cart-img" src="https://www.moyo.ua/new/img/shopping-cart.svg" alt="
            Ваш кошик порожній">`
        }
        cartBody.append(cartTotal)
        return cartBody
    }
}