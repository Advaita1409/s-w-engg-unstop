import { Component } from '@angular/core';

@Component({
  selector: 'app-seat-reservation',
  templateUrl: './seat-reservation.component.html',
  styleUrls: ['./seat-reservation.component.css']
})
export class SeatReservationComponent {
  seats = Array.from({ length: 80 }, (_, i) => ({
    seatNumber: i + 1,
    isBooked: false
  }));

  // Example of already booked seats
  constructor() {
    this.seats[10].isBooked = true; // Seat 11
    this.seats[15].isBooked = true; // Seat 16
    this.seats[20].isBooked = true; // Seat 21
  }

  bookSeats(requestedSeats: number) {
    if (requestedSeats < 1 || requestedSeats > 7) {
      alert('You can book between 1 to 7 seats only.');
      return;
    }

    let bookedSeats = [];
    let rowSeats = this.seats.filter(seat => !seat.isBooked);

    for (let i = 0; i < rowSeats.length; i++) {
      if (rowSeats[i].seatNumber % 7 !== 0 && bookedSeats.length < requestedSeats) {
        bookedSeats.push(rowSeats[i]);
        rowSeats[i].isBooked = true; // Mark as booked
      }
      if (bookedSeats.length === requestedSeats) break;
    }

    if (bookedSeats.length < requestedSeats) {
      alert('Not enough seats available in one row, booking nearby seats.');
      // Logic to book nearby seats can be added here
    }

    alert(`Booked Seats: ${bookedSeats.map(seat => seat.seatNumber).join(', ')}`);
  }
}