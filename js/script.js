const container = document.getElementById('countries-list')
const containerDetails = document.querySelector('.country-details')

const modal = document.querySelector('.modal')
const overlay = document.querySelector('.overlay')

const button = document.querySelector('button')

button.addEventListener('click', () => {
	document.body.style.overflow = 'visible'
	modal.classList.add('hidden')
	overlay.classList.add('hidden')
})

fetchCountries()

function fetchCountries() {
	const endpoint = 'https://restcountries.com/v3/all'
	fetch(endpoint)
		.then((res) => res.json())
		.then((data) => {
			console.log(data)

			const countries = data
				.map((country) => ({
					name: country.name.common,
					capital: country.capital?.[0],
					population: country.population,
					carSide: country.car.side,
					flag: country.flags?.[0],
				}))
				.sort((a, b) => {
					if (a.name.toUpperCase() < b.name.toUpperCase()) return -1
					if (a.name.toUpperCase() > b.name.toUpperCase()) return 1

					return 0
				})

			countries.forEach(addCountryCard)
		})
		.catch(console.log)
}

function addCountryCard(country) {
	const card = document.createElement('li')
	card.classList.add('country')

	card.innerHTML = `
					<img src="${country.flag}" />
					<h2>${country.name}</h2>	
	`

	card.addEventListener('click', () => {
		document.body.style.overflow = 'hidden'
		modal.classList.remove('hidden')
		overlay.classList.remove('hidden')

		containerDetails.innerHTML = `
			<img src="${country.flag}" />
			<div>
				<h3>${country.name}</h3>	
				<p>Capital: ${country.capital}</p>
				<p>Población: ${country.population}</p>
				<p>Lado de conducción: ${country.carSide}</p>
			</div>
		`
	})

	container.appendChild(card)
}
