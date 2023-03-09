let myRecipe = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const tabBtn = document.getElementById("tab-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");

// Get the leads from the localStorage - PS: JSON.parse()
const recipeFromLocalStorage = JSON.parse(localStorage.getItem("myRecipe"));

// Check if leadsFromLocalStorage is truthy
if (recipeFromLocalStorage) {
  myRecipe = recipeFromLocalStorage;
  render(myRecipe);
}

//Save Tab button
tabBtn.addEventListener("click", function () {
  // Grab the URL of the current tab!
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myRecipe.push(tabs[0].url);
    localStorage.setItem("myRecipe", JSON.stringify(myRecipe));
    render(myRecipe);
  });
})

//puts the saved recipes into a list
function render(recipes) {
  let listItems = "";
  for (let i = 0; i < recipes.length; i++) {
    //listItems += "<li><a target='_blank' href='" + myRecipe[i] + "'>" + myRecipe[i] + "</a></li>";
    listItems += `
      <li>
        <a target='_blank' href='${recipes[i]}'>
          ${recipes[i]}
        </a>
      </li>
    `
  }
  ulEl.innerHTML = listItems;
}

// Listen for double clicks on the delete button
// When clicked, clear localStorage, myLeads, and the DO
deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myRecipe = [];
  render(myRecipe);
})

//Input button, adds event when clicked
inputBtn.addEventListener("click", function () {
  myRecipe.push(inputEl.value);
  inputEl.value = "";
  //save the myRecipe array to localStorage
  localStorage.setItem("myRecipe", JSON.stringify(myRecipe));
  render(myRecipe);
})

