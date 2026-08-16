
const locationBtn = document.getElementById('get-location-btn');
const locationDisplay = document.getElementById('location-display');

locationBtn.addEventListener('click', () => {
  if (navigator.geolocation) {
    locationDisplay.textContent = "Locating...";

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        
        try {
          // Fetch address details from OpenStreetMap
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          
          // Display readable address
          locationDisplay.textContent = `Location: ${data.display_name}`;
        } catch (err) {
          locationDisplay.textContent = `Coordinates: ${latitude}, ${longitude} (Failed to get address name)`;
        }
      },
      (error) => {
        locationDisplay.textContent = `Unable to retrieve location: ${error.message}`;
      }
    );
  } else {
    locationDisplay.textContent = "Geolocation is not supported by your browser.";
  }
});