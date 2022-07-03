(async function () {
    const response = await fetch(`json/smart_watches.json`)
    const productCards = await response.json()

    const catalogGards = document.querySelector('.catalog__cards')
    const cardsAmount = document.querySelector('.cards-amount')
    const showMoreButton = document.querySelector('.button-show-more')
    let cartData = {}
    let countCard = 0
    let cardsKeys = Object.keys(productCards)

    renderCards()

    function renderCards() {
        for (key in productCards) {
            const productCard = new Card(productCards[key])
            catalogGards.append(productCard.renderCard())
            countCard++
            renderCardsAmount()
            if (countCard > 7) return
        }
    }

    function renderCardsAmount() {
        cardsAmount.textContent = `(${cardsKeys.length - countCard})`
        if (cardsKeys.length - countCard == 0) {
            cardsAmount.textContent = ''
            document.querySelector('.but-text').textContent = 'Більше немає'
        }

    }

    function showMoreCards() {
        let step = countCard + 4
        for (let i = countCard; i < step; i++) {
            const productCard = new Card(productCards[cardsKeys[i]])
            catalogGards.append(productCard.renderCard())
            countCard++
            renderCardsAmount()
        }
    }

    showMoreButton.addEventListener('click', showMoreCards)
    catalogGards.addEventListener('click', e => {
        if (e.target.classList.contains('to-cart')) {
            let productId = e.target.dataset['productId']
            for (item of productCards) {
                console.log(cartData[productId])
                if (cartData[productId] !== undefined) {
                    cartData[productId]['count']++
                    return
                } else {
                    cartData[productId] = item
                    cartData[productId]['count'] = 1
                }
            }
        }
        console.log(cartData)
    })

})()
// if (data[articul] !== undefined) {
//     data[articul]['count']++;
// }
// else {
//     data[articul] = cart[articul];
//     data[articul]['count'] = 1;
// }