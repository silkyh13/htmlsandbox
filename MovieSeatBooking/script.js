const container = document.querySelector(".container");

const unoccupied = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movie = document.getElementById("movie");
populateUI();
let ticketPrice = +movie.value;

//update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected"); //returns a list of div that matches className listed

  //go through unoccupied seats and look for index of selected seats
  const seatsIndex = [...selectedSeats].map(seat =>
    [...unoccupied].indexOf(seat)
  );
  //save array of seats' index
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
  const len = selectedSeats.length;
  count.innerText = len;
  total.innerText = len * ticketPrice;
}

//get data from localstorage and populate ui
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    unoccupied.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  if (selectedMovieIndex !== null) {
    movie.selectedIndex = selectedMovieIndex;
  }
}
//click on unoccupied seats
container.addEventListener("click", e => {
  // classList gives me class of element of event ["seat", "occupied", value: "seat occupied"]
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    //toggle adds or take away className
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});
//save selected movie index
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
}

//change price of movie clicked
movie.addEventListener("change", e => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex);
  updateSelectedCount();
});

//initiate count set
updateSelectedCount();
