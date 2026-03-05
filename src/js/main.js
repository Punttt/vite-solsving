let lat;
let lng;


document.addEventListener("DOMContentLoaded", ()=>{
    const form = document.getElementById("locationForm");
    const input = document.getElementById("locationInput");

    form.addEventListener("submit",async (e)=>{
        e.preventDefault();

        const query = input.value;
        console.log(query);

        await searchLocation(query);
    })
})


/**
 * Hämtar koordinater från Google Geocoding API baserat på en söksträng.
 * @param {string} query - Platsen som användaren söker efter.
 */
async function searchLocation(query) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(query)}&key=AIzaSyC4Gx-KoIj3bIpmEd9Q9AkETl8ZJxRVzAI`;
    const data;

    try{

    }catch (error){
        console.error(error);
    }
}