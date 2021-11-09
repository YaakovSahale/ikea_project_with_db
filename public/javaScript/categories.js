
const myContainer = document.getElementById("container");
const btnShop = document.getElementsByClassName("btnShop");
const categoryText = document.getElementById("categoryText").innerText

let shopArray = [];

axios
  .get(`/products`)
  .then((response) => {
    console.log(response.data);

    displayCategories(categoryText, myContainer, response.data);
  })
  .catch((error) => {
    console.log(`got error`);
    console.log(error);
  });

function displayCategories(category, container, products) {
  for (let i = 0; i < products.length; i++) {
    if (category == products[i].category) {
      container.innerHTML += `<article class="articleTab">
          <div class ="imgCon"><img class="imgA" src="${products[i].img[0]}">
          <img class="imgA" src="${products[i].img[1]}">
          </div>
          <p class="pTab">
          <span class="bold">name:</span> ${products[i].name}<br>
          <span class="bold">price: </span>${products[i].price}<br>
          <span class="bold">description:</span>${products[i].description}<br><br>
          </p>
          <div class="btnContainer">
          <button class="btnShop">add to shop</button>
          <button class="btnShop" onclick="deleteFromDB('${products[i]._id}')">delete</button>
          </div>
          </article>`;
    }
  }
}

function deleteFromDB (id){
  console.log(id);
  axios
    .delete(`/products/${id}`)
    .then((res)=>{console.log(res)})
    .catch((err)=>{console.log(err)})

}

