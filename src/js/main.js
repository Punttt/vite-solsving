

/**
 * Inväntar DOM att bli färdigladdat
 */
document.addEventListener("DOMContentLoaded", ()=>{
    const form = document.getElementById("locationForm");
    const input = document.getElementById("locationInput");

    form.addEventListener("submit",async (e)=>{
        e.preventDefault();

        const query = input.value;
        console.log(query);

        // Anropar funktion för att hämta koordinater för plats placerar i coords.lat / coords.lng
        const coords = await searchLocation(query);
        console.table(coords);

        // Anropar funktion för att få uppgifter för väderprognosen
        const forecast = await searchWeather(coords.lat, coords.lng);

        // Render weather
        renderWeather(forecast);

        // Anropar funktion för att få uppgifter om golfbanor
        await searchGolfClubs(coords.lat, coords.lng);    

        
    })
})


/**
 * Hämtar koordinater från Google Geocoding API baserat på en söksträng.
 * 
 * @async
 * @param {string} query - Platsen som användaren söker efter.
 * @returns {Promise<{lat: number, lng: number} | null>}
 * Returnerar ett objekt med latitud och longitud, eller null om platsen inte hittas
 */
async function searchLocation(query) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(query)}&key=AIzaSyC4Gx-KoIj3bIpmEd9Q9AkETl8ZJxRVzAI`;
    let data;

    try{
        const response = await fetch(url);
        data = await response.json();

        if(data.status != "OK"){
            console.error(data.error_message);
            return null;
        }

        const lat = data.results[0].geometry.location.lat;
        const lng = data.results[0].geometry.location.lng;

        return {lat , lng};

    }catch (error){
        console.error(error);
        return null;
    }
}


// funktionen för att hämta vädret
// behöver noteras
async function searchWeather(lat, lng) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`;
    let data;

    try{
        const response = await fetch(url);
        data = await response.json();

        const daily = data.daily;

        // konvertera - datumstamp till dagnamn
        daily.time = daily.time.map(dateString =>{
            const date = new Date(dateString);
            return date.toLocaleDateString("sv-SE", { weekday: "long" });
        })

        // konvertera - weathercode till kod för ikon
        daily.weathercode = daily.weathercode.map(code =>{
            if( code === 0 ) return `<i class="fa-solid fa-sun"></i>`; // Soligt
            if( code === 1 || code === 2 || code === 3 ) return `<i class="fa-solid fa-cloud-sun"></i>`; // molnigt / soligt
            if( code === 45 || code === 48 ) return `<i class="fa-solid fa-cloud"></i>`; // Molnigt
            if( 
                code === 51 || code === 53 || code === 55 || code === 56 || code === 57 ||
                code === 61 || code === 63 || code === 65 || code === 66 || code === 67 ||
                code === 80 || code === 81 || code === 82
            ) return `<i class="fa-solid fa-cloud-showers-heavy"></i>`; // regnigt
            if( 
                code === 71 || code === 73 || code === 75 || code === 77 || code === 85 ||
                code === 86
            ) return `<i class="fa-solid fa-snowflake"></i>`; // Snö
            if( code === 95 || code === 96 || code === 99 ) return `<i class="fa-solid fa-bolt-lightning"></i>`; // Blixtar

        })

        return data.daily;

    }catch (error){
        console.error(error);
        return null;
    }
}

// funktion för att söka golfklubbar
async function searchGolfClubs(lat, lng) {
    const apiKey = "4df938918ee847b3a2727c8763b763ba";
    const url = `https://api.geoapify.com/v2/places?categories=sport.golf&filter=circle:${lng},${lat},10000&apiKey=${apiKey}`

    const response = await fetch(url);
    const data = await response.json();

    console.table(data.features);
}


// renderar weather

/**
    <div class="day-card">
        <h3>torsdag</h3>
        <i class="fa-solid fa-sun"></i>
        <p><span class="deg-max">20&deg;</span> <span class="deg-min">-2&deg;</span></p>
    </div>
 */
function renderWeather(forecast) {
    const forecastEl = document.getElementById("forecast");
    forecastEl.innerHTML = "";
    
    console.table(forecast);
    console.log(forecast.time[0]);

    for(let i = 0; i < 7; i++){

        
        forecastEl.innerHTML += `
           <div class="day-card">
                <h3>${forecast.time[i]}</h3>
                ${forecast.weathercode[i]}
                <p><span class="deg-max">${forecast.temperature_2m_max[i]}&deg;</span> <span class="deg-min">${forecast.temperature_2m_min[i]}&deg;</span></p>
            </div>     
        `;
    }
    
}