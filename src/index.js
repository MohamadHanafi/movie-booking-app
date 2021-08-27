import "./styles.css";

//DOM objects
const container = document.querySelector(".container");
const movie = document.getElementById("movie");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
let total = document.getElementById("total");

//helper functions

let tiketPrice = +movie.value;

const updateTotalCount = () => {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const seatsCount = selectedSeats.length;

  count.innerText = seatsCount;
  total.innerText = seatsCount * tiketPrice;
};

const setMovieData = (movieIndex, price) => {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", price);
};

const populateUi = () => {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  const selectedMoviePrice = localStorage.getItem("selectedMoviePrice");

  if (selectedMovieIndex !== null) {
    movie.selectedIndex = selectedMovieIndex;
    tiketPrice = +selectedMoviePrice;
    updateTotalCount();
  }
};

populateUi();

//event listeners
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateTotalCount();
  }
});

movie.addEventListener("change", (e) => {
  tiketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateTotalCount();
});
