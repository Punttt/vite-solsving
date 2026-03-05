

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