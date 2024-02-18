"use-strict";
fetch("https://opentdb.com/api.php?amount=10")
  .then((res) => res.json())
  .then((resp) => console.log(resp));
