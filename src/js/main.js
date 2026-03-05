let lat;
let lng;


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

        // Anropar funktion för att hämta koordinater för plats
        await searchLocation(query);
    })
})


/**
 * Hämtar koordinater från Google Geocoding API baserat på en söksträng.
 * 
 * @async
 * @param {string} query - Platsen som användaren söker efter.
 * @returns {Promise<void>}
 */
async function searchLocation(query) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(query)}&key=AIzaSyC4Gx-KoIj3bIpmEd9Q9AkETl8ZJxRVzAI`;
    let data;

    try{
        const response = await fetch(url);
        data = await response.json();

        if(data.status != "OK"){
            console.error(data.error_message);
            return;
        }

        lat = data.results[0].geometry.location.lat;
        lng = data.results[0].geometry.location.lng;

        // Skriver ut för test
        console.log(`Lat: ${lat}`);
        console.log(`Lng: ${lng}`);

    }catch (error){
        console.error(error);
    }
}