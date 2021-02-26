let addToy = false;

const urlToys = `http://localhost:3000/toys`  

document.addEventListener("DOMContentLoaded", () => {
  // const addBtn = document.querySelector("#new-toy-btn");
  // const toyFormContainer = document.querySelector(".container");
  // addBtn.addEventListener("click", () => {
  //   // hide & seek with the form
  //   addToy = !addToy;
  //   if (addToy) {
  //     toyFormContainer.style.display = "block";
  //   } else {
  //     toyFormContainer.style.display = "none";
  //   }
  // });
  function loadAllToys(){
    fetch(urlToys)
    .then(response => console.log(response.json()))
    .then(toys => console.log(toys))
    .catch(error => {
      console.error('Error:', error);
    });
    
  }
  loadAllToys()
});



