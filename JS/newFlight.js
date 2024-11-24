//Test

document.addEventListener("DOMContentLoaded", () => {

    const flightForm = document.getElementById("newFlightForm");
    const originSelect = document.getElementById("origin");
    const destinationSelect = document.getElementById("destination");
    const saveButton = document.getElementById("saveButton");
  

    flightForm.addEventListener("submit", (e) => {
      e.preventDefault(); // Prevent page refresh
  

      const flight_num = document.getElementById("flight_num").value;
      const origin = originSelect.value;
      const destination = destinationSelect.value;
      const boardingDate = document.getElementById("boardingDate").value;
      const boardingTime = document.getElementById("boardingTime").value;
      const arrivalDate = document.getElementById("arrivalDate").value;
      const arrivalTime = document.getElementById("arrivalTime").value;
      const seats = document.getElementById("seats").value;
  

      if (!flight_num || !origin || !destination || !boardingDate || !boardingTime || !arrivalDate || !arrivalTime || !seats) {
        alert("Please fill in all fields before saving!");
        return;
      }
  

      alert(`Flight ${flight_num} from ${origin} to ${destination} has been saved successfully!`);
  

      flightForm.reset();
    });
  

    const destinations = ["Tel Aviv", "Krakow", "Zurich", "New York", "London"];
    destinations.forEach((city) => {
      const option = document.createElement("option");
      option.value = city;
      option.textContent = city;
      destinationSelect.appendChild(option);
    });
  

    saveButton.addEventListener("click", () => {
      console.log("Save button clicked!");
    });
  });
  