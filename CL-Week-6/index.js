let express = require('express');
let app = express();

let countryData = [
    {
        "country": "Canada",
        "capital": "Ottawa",
        "population": 38000000,
        "continent": "North America",
        "currency": "Canadian Dollar",
        "official_language": "English, French"
    },
    {
        "country": "Germany",
        "capital": "Berlin",
        "population": 83100000,
        "continent": "Europe",
        "currency": "Euro",
        "official_language": "German"
    },
    {
        "country": "Japan",
        "capital": "Tokyo",
        "population": 125800000,
        "continent": "Asia",
        "currency": "Yen",
        "official_language": "Japanese"
    },
    {
        "country": "Australia",
        "capital": "Canberra",
        "population": 25690000,
        "continent": "Oceania",
        "currency": "Australian Dollar",
        "official_language": "English"
    },
    {
        "country": "Brazil",
        "capital": "Brasilia",
        "population": 213000000,
        "continent": "South America",
        "currency": "Brazilian Real",
        "official_language": "Portuguese"
    },
    {
        "country": "India",
        "capital": "New Delhi",
        "population": 1393409038,
        "continent": "Asia",
        "currency": "Indian Rupee",
        "official_language": "Hindi, English"
    },
    {
        "country": "Nigeria",
        "capital": "Abuja",
        "population": 206100000,
        "continent": "Africa",
        "currency": "Naira",
        "official_language": "English"
    },
    {
        "country": "United Kingdom",
        "capital": "London",
        "population": 67220000,
        "continent": "Europe",
        "currency": "British Pound",
        "official_language": "English"
    },
    {
        "country": "Mexico",
        "capital": "Mexico City",
        "population": 126000000,
        "continent": "North America",
        "currency": "Mexican Peso",
        "official_language": "Spanish"
    },
    {
        "country": "South Africa",
        "capital": "Pretoria (executive), Bloemfontein (judicial), Cape Town (legislative)",
        "population": 59310000,
        "continent": "Africa",
        "currency": "South African Rand",
        "official_language": "11 official languages including English, Zulu, Xhosa, and Afrikaans"
    }
];

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Main route
app.get('/', (request, response) => {
    response.sendFile(__dirname + '/public/index.html');  // Serve the index.html file
});

// Data route to return all countries or filter by query parameters
app.get('/data', (request, response) => {
    let continent = request.query.continent;
    let filteredData = countryData;

    if (continent) {
        filteredData = countryData.filter(c => c.continent.toLowerCase() === continent.toLowerCase());
    }

    response.json(filteredData);
});

// Data route to return a specific country by name or filter by query parameters
app.get('/data/:country', (request, response) => {
    let country = request.params.country;
    let populationGreaterThan = request.query.populationGreaterThan;

    let countryInfo = countryData.find(c => c.country.toLowerCase() === country.toLowerCase());

    if (countryInfo) {
        if (populationGreaterThan) {
            if (countryInfo.population > parseInt(populationGreaterThan)) {
                response.json(countryInfo);
            } else {
                response.status(404).send({ error: "Country's population is not greater than the specified amount." });
            }
        } else {
            response.json(countryInfo);
        }
    } else {
        response.status(404).send({ error: "Country not found" });
    }
});

// Start the server
app.listen(3000, () => {
    console.log("app is listening at http://localhost:3000");
});
