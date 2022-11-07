console.log('loaded')
const rootElement = document.querySelector('#root')

const beerComponent = (name, price, rating) => `
  <div class="beer">
    <h2>${name}</h2>
    <h3>${price}</h3>
    <h4>${rating}</h4>
  </div>
`

fetch('/beers')
  .then(res => res.json())
  .then(beers => beers.map((beer) => rootElement.insertAdjacentHTML('beforeend', beerComponent(beer.name, beer.price, beer.rating))))