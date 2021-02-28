let addToy = false;


document.addEventListener("DOMContentLoaded", () => {
  fetchToys()
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyForm = document.querySelector('form')
  //we select the 'form' that submit everything
  //and includes everything that is used to submit
  //a toy from the html using the query selector
  //we then pass in another function just 
  //to be more organized.
  //the other way to do it is like the one on 
  //the bottom called addBtn.addEventListener('click', () => {})

  toyForm.addEventListener('submit', handlerSubmit)
//we created a submit event for the toyForm we 
//queryselected from the index.html
//we then passed in a function that handles that submit 

  addBtn.addEventListener("click", () => {

    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

//DATA
function fetchToys(){
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(toys => toys.forEach(toy => buildCard(toy))
  )}
//we fetch the data from the link w/ all the toys
//we turn it into json data
//we then get that data, iterate over it using .forEach 
//in order to get all the toys
//then we pass that toy into our buildcard function
//COMPLETED 'fetch andys toys'



function postToys(toy){
  fetch('http://localhost:3000/toys',{
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
    },
    body: JSON.stringify(toy)
  })
  .then(res => res.json())
  .then(toy => buildCard(toy))
}
//we need to send in a second parameter and identify
//the method we are sending this too 'POST'
//we then look at the read me and it shows what we need in 
//our POST, we need a heasders: && and :body
//we are just going to pass in a 'toy' that we passed in from 
//our handler submit
//we pass in our buildCard function and pass in 1 toy


function updateToy(toy){
  toy.likes++

  fetch(`http:/localhost:3000/toys/${toy.id}`,{
    method: `PATCH`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({likes: toy.likes})
  })
  .then(res => res.json())
  .then(toy => {
    let oldToy = document.getElementById(toy.id)
    let p = oldToy.querySelector('p')
    p.textContent = `${toy.likes} Likes`
  })
}
//we do toy.likes++ to automatically update as soon as its pressed
//inside our fetch we grab the toy id
//we change our method to PATCH 
//content headers are the same, we are sending json and exepecting json back 
//in our {likes}, we set the likes: to the likes that are updated above
//JSON.stringify creates a json object or value to a JSON string, it 
//then gets sent to database, then comes back.
//then we translaet it back to json "res.json"
//you take your old toy 
//we find our old toy by its (toy.id)
//we get the toys p element and set it to a variable 
//we then set that p context to the new toy likes. 



function deleteToy(id){
  fetch(`http://localhost:3000/toys/${id}`,{
    method:'DELETE'
  })
  .then(res => res.json())
  .then(() => {
    let oldToy = document.getElementById(id)
    oldToy.remove()
  })
}
//we fetched the toy by the id
//we set our method to DELETE
//we are not sending any body or headers so that was deleted
//we still keep the data -> json data
//we then find our old toy by using a getelementbyid(id)
//we dont need the old toy from our data base, this will just send a empty array
//and then we call the variable and add the ,remove() method

//DOM
function buildCard(toy){
  let div = document.createElement('div')
  let img = document.createElement('img')
  let h2 = document.createElement('h2')
  let p = document.createElement('p')
  let btn = document.createElement('button')
  let deleteBtn = document.createElement('button')
  let toyCollection = document.querySelector('#toy-collection')

  div.className = 'card'
  div.id = toy.id
  h2.textContent = toy.name
  img.src = toy.image
  img.className = 'toy-avatar'
  p.textContent = `${toy.likes} Likes`
  btn.className = 'like-btn'
  btn.textContent = 'like <3'
  deleteBtn.textContent = 'delete'


  btn.addEventListener('click', () => updateToy(toy))
  //took our button 
  //added our even listener to it 
  //we created a function called updateToy and passed it the toy
  deleteBtn.addEventListener('click',() => deleteToy(toy.id))
  //we did the same as top, made a new btn called deletebtn and set 
  //its text content to "delete" to give it a name 
  //we then added a event listener with a click function
  //and then called the deleteToy function from there and passed
  //in just the toy id instead of the whole toy.


  div.append(h2,img,p,btn, deleteBtn)//.apend to do multiple items
  toyCollection.appendChild(div)//.apendChild for one
}

  
  //in this function we are building this..
  // <div class="card">
//<h2>Woody</h2>
  //<img src=toy_image_url class="toy-avatar" />
  //<p>4 Likes </p>
  //<button class="like-btn">Like <3</button>
//</div>   

//first we create a div element 
//then a img element
//then we created a h2 element
//then we created a p tag
//since our div has a class name we used div.className = 'card'
//since our h2 has some content inside it 
//we used h2.textcontent = toy.name 
//we set our img src to the toy.image
//we set he context of our p tag to toy likes
//our btn has a class and context so we set that up
//we use the query selector to select with an id of toycolecction
//using the #, # are used for ID . are used for CLASSES

//we can use append and pass in multiple arguements
//task 1 completed. Built all the elements and appended 
//the toys information to each element.
//COMPLETED adding toy info to card 

//Handlers

function handlerSubmit(e){
  e.preventDefault() 
  let toy = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0
  }
  postToys(toy)
}
//e.preventDefault()
//this prevents it from refreshing everytime we submit 
//we do e.target to grab the entire form
//we the do e.target.name to grab the name and .value 
//to get the value of that 'name'
//same with image, we get the form, then the image, then the value of that image.
//we put 0 with likes because we assume they start at 0 
