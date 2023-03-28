const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '3f268270demsh3846928d915618cp1e3395jsn58bcd396bfe2',
		'X-RapidAPI-Host': 'quotient.p.rapidapi.com'
	}
};

fetch('https://quotient.p.rapidapi.com/indexes/daily?symbol=%5EGSPC&from=2018-04-01&to=2020-04-21&adjust=false', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));