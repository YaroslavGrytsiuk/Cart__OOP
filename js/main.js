(async function () {
    const response = await fetch(`json/smart_watches.json`)
    const productCards = await response.json()

    // -----------card-----------
    const catalogGards = document.querySelector('.catalog__cards')
    const cardsAmount = document.querySelector('.cards-amount')
    const showMoreButton = document.querySelector('.button-show-more')
    let toCartData = {}
    let countCard = 0
    let step = countCard + 4
    let cardsKeys = Object.keys(productCards)

    renderCards()
    showMoreButton.addEventListener('click', renderCards)

    function renderCards() {
        step = countCard + 4
        for (let i = countCard; i < step && i < cardsKeys.length; i++) {
            const productCard = new Card(productCards[cardsKeys[i]])
            catalogGards.append(productCard.renderCard())
            countCard++
            renderCardsAmount()
        }
    }

    function renderCardsAmount() {
        cardsAmount.textContent = `(${cardsKeys.length - countCard})`
        if (cardsKeys.length - countCard == 0) {
            cardsAmount.textContent = ''
            document.querySelector('.but-text').textContent = 'Більше немає'
        }
    }

    catalogGards.addEventListener('click', e => {
        if (e.target.classList.contains('to-cart')) {
            let articul = e.target.dataset['productId']
            if (toCartData[articul] !== undefined) {
                toCartData[articul]['count']++;
            }
            else {
                toCartData[articul] = productCards[articul]
                toCartData[articul]['count'] = 1
            }
            console.log('tocard' + toCartData)
            localStorage.setItem('cartData', JSON.stringify(toCartData))
        }
    })

    // ---------Cart-------
    console.log('cartdata' + localStorage.getItem('cartData'))

    let cartData = JSON.parse(localStorage.getItem('cartData'))
    let shopCart = new Cart(cartData)
    const cartDomEl = document.getElementById('cart')
    cartDomEl.innerHTML = ''
    cartDomEl.append(shopCart.renderCart())
    // cartDomEl.addEventListener('click', e => {
    //     const target = e.target
    //     if (target.classList.contains('cart__del-btn')) {
    //         shopCart.deleteProduct(target.dataset['articul'])
    //         cartDomEl.innerHTML = ''
    //         cartDomEl.append(shopCart.renderCart())
    //         localStorage.setItem('cartData', JSON.stringify(shopCart.cartData))
    //     }
    //     else if (target.classList.contains('cart__min-btn')) {
    //         shopCart.minusProduct(target.dataset['articul'])
    //         cartDomEl.innerHTML = ''
    //         cartDomEl.append(shopCart.renderCart())
    //         //localStorage.setItem('cartData', JSON.stringify(shopCart.cartData))
    //     }
    //     else if (target.classList.contains('cart__plus-btn')) {
    //         shopCart.plusProduct(target.dataset['articul'])
    //         cartDomEl.innerHTML = ''
    //         cartDomEl.append(shopCart.renderCart())
    //         //localStorage.setItem('cartData', JSON.stringify(shopCart.cartData))
    //     }
    // })

})()