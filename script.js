var dashboard_link = document.getElementById("dashboard-button");
var movement_link = document.getElementById("movement-button");
var dataItem = document.getElementById("data-item");
var newQuantity = document.getElementById("quantity");
var popup = document.getElementById("popup");
var closeButton = document.getElementById("buttonClose");
var addButton = document.getElementById("add-button");
var select = document.getElementById("xv1");

var nameItem = document.getElementById("nameItem");
var amountItem = document.getElementById("amountItem");
var type = document.getElementById("type");
var category = document.getElementById("category");
var price = document.getElementById("price");

async function show() {
  var response = await fetch("http://127.0.0.1:8000/show");
  if (dataItem) {
    var data = await response.json();
    data.forEach((item) => {
      var data = document.createElement("div");
      data.classList.add("data-row");
      data.innerHTML = `
      <span>${item[0]}</span>
      <span>${item[1]}</span>
      <span>${item[2]}</span>
      <span>${item[3]}</span>
      <span>$${item[5]}</span>
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/></svg>`;

      dataItem.appendChild(data);
    });
  }
}


function add() {
  if (nameItem && amountItem && type && category && price) {
    var response = fetch(
      `http://127.0.0.1:8000/ADD?name=${nameItem.value}&amount=${amountItem.value}&type=${type.value}&category=${category.value}&price=${price.value}`,
    );
    return response;
  }
}

show();

if (newQuantity && closeButton) {
  newQuantity.addEventListener("click", () => {
    popup.style.display = "flex";
  });
  closeButton.addEventListener("click", () => {
    popup.style.display = "none";
  });
}
if (addButton) {
  addButton.addEventListener("click", async () => {
    await add();
    location.reload();
  });
}
dashboard_link.addEventListener("click", () => {
  window.location.href = "dashboard.html";
});
movement_link.addEventListener("click", () => {
  window.location.href = "movement.html";
});
