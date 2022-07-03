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
    showMoreButton.addEventListener('click', showMoreCards)

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

    catalogGards.addEventListener('click', e => {
        if (e.target.classList.contains('to-cart')) {
            let articul = e.target.dataset['productId'];
            if (cartData[articul] !== undefined) {
                cartData[articul]['count']++;
            }
            else {
                cartData[articul] = productCards[articul];
                cartData[articul]['count'] = 1;
            }
            localStorage.setItem('cartData', JSON.stringify(cartData));
        }
    })

})()