"use strict";

const image = document.querySelector(".image");
const fullName = document.querySelector(".name");
const birthdate = document.querySelector(".birthdate");
const descriptionpanel = document.querySelector(".studentInfo");
const btnPrev = document.querySelector(".previous");
const btnNext = document.querySelector(".next");
let allStudents = [];
class Person {
  constructor(id, firstName, lastName, birthDate, description) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthDate = birthDate;
    this.description = description;
    this._image();
  }
  _image() {
    this.image = `images/person-${this.id}.jpg`;
  }
}

const student1 = new Person(
  1,
  "Alex",
  "Jackson",
  "03/10/2000",
  `Meet Alex, a basketball aficionado whose heart beats to the rhythm of the game. From the squeak of sneakers on the court to the exhilarating cheers of the crowd, basketball is where Alex feels most alive. As a team sport, it teaches him the value of cooperation and communication, while also honing his individual skills and reflexes. Whether he's shooting hoops with friends or watching a professional game, basketball is more than just a sport to Alex—it's a way of life that brings him joy, fulfillment, and a sense of belonging.`
);

allStudents.push(student1);

const student2 = new Person(
  2,
  "Sarah",
  "Ivanovic",
  "12/05/2001",
  `Sarah is an avid soccer enthusiast, her eyes light up whenever the conversation veers towards her favorite sport. With a ball always at her feet, she thrives on the camaraderie and teamwork that soccer fosters. From the adrenaline rush of scoring a goal to the strategic maneuvers on the field, soccer is not just a game for Sarah—it's a passion that fuels her competitive spirit and drives her to push her limits.`
);
allStudents.push(student2);

const student3 = new Person(
  3,
  "James",
  "Jordan",
  "20/12/2000",
  `James, on the other hand, finds solace and joy in the serene rhythm of swimming. For him, there's nothing quite like the sensation of gliding through the water, each stroke propelling him closer to his personal best. Swimming offers him not only a physical workout but also a mental escape from the hustle and bustle of daily life. Whether he's swimming laps in the pool or diving into the open sea, James finds peace and tranquility in the water, making swimming his cherished pastime.`
);
allStudents.push(student3);

const changeCredentials = function (person) {
  image.src = person.image;
  fullName.textContent = `${person.firstName} ${person.lastName}`;
  birthdate.textContent = person.birthDate;
  descriptionpanel.textContent = person.description;
};

changeCredentials(student1);
const maxSlides = allStudents.length;
let currentSlide = 1;
let nextStudent;
const nextSlide = function () {
  if (currentSlide === maxSlides) {
    currentSlide = 1;
    changeCredentials(student1);
  } else {
    nextStudent = allStudents.find((obj) => obj.id === currentSlide + 1);
    currentSlide = currentSlide + 1;
    changeCredentials(nextStudent);
  }
};
const prevSlide = function () {
  if (currentSlide > 1) {
    nextStudent = allStudents.find((obj) => obj.id === currentSlide - 1);
    currentSlide = currentSlide - 1;
    changeCredentials(nextStudent);
  } else {
    currentSlide = 3;
    changeCredentials(student3);
  }
};
btnNext.addEventListener("click", nextSlide);
btnPrev.addEventListener("click", prevSlide);
