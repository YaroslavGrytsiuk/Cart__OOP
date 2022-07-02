(async function () {
    const response = await fetch(`json/smart_watches.json`)
    const productCards = await response.json()

    const catalogGards = document.querySelector('.catalog__cards')
    const cardsAmount = document.querySelector('.cards-amount')
    const showMoreButton = document.querySelector('.button-show-more')
    let countCard = 0

    for (let i = countCard; i < 8; i++) {
        card = productCards[i]
        const productCard = new Card(card)
        catalogGards.append(productCard.renderCard())
        countCard++
        renderCardsAmount()
    }

    function renderCardsAmount() {
        cardsAmount.textContent = productCards.length - countCard
        if (productCards.length - countCard == 0) {
            cardsAmount.textContent = ''
            document.querySelector('.but-text').textContent = 'Більше немає'
        }

    }

    function showMoreCards() {
        for (let i = countCard; i < productCards.length; i++) {
            card = productCards[i]
            const productCard = new Card(card)
            catalogGards.append(productCard.renderCard())
            countCard++
            renderCardsAmount()
        }
    }

    showMoreButton.addEventListener('click', showMoreCards)
})()
