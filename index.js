let myRecipe = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");

// Get the leads from the localStorage - PS: JSON.parse()
const recipeFromLocalStorage = JSON.parse(localStorage.getItem("myRecipe"));

// 1. Check if leadsFromLocalStorage is truthy
// 2. If so, set myLeads to its value and call renderLeads()
if (recipeFromLocalStorage) {
  myRecipe = recipeFromLocalStorage;
  renderRecipe();
}

// Listen for double clicks on the delete button
// When clicked, clear localStorage, myLeads, and the DO
deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myRecipe = [];
  renderRecipe();
})

//Input button, adds event when clicked
inputBtn.addEventListener("click", function () {
  myRecipe.push(inputEl.value);
  inputEl.value = "";
  //save the myRecipe array to localStorage
  localStorage.setItem("myRecipe", JSON.stringify(myRecipe));
  renderRecipe();
})

//puts the saved recipes into a list
function renderRecipe() {
  let listItems = "";
  for (let i = 0; i < myRecipe.length; i++) {
    //listItems += "<li><a target='_blank' href='" + myRecipe[i] + "'>" + myRecipe[i] + "</a></li>";
    listItems += `
      <li>
        <a target='_blank' href='${myRecipe[i]}'>
          ${myRecipe[i]}
        </a>
      </li>
    `
  }
  ulEl.innerHTML = listItems;
}