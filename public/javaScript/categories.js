const myContainer = document.getElementById("container");
const btnShop = document.getElementsByClassName("btnShop");
const categoryText = document.getElementById("categoryText").innerText;

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
          <button class="btnShop" onclick="btnAddToCart('${products[i]._id}','${products[i].name}','${products[i].price}','${products[i].category}','${products[i].img}','${products[i].description}')">add to cart</button>
          <button class="btnShop" onclick="btnDeleteProduct('${products[i]._id}')">delete</button>
          <form method="get" action="updateProduct.html"><button class="btnShop" type="submit" name="update" value="${products[i]._id}">update</button></form>
          </div>
          </article>`;
    }
  }
}

function btnDeleteProduct(id) {
  console.log(id);
  axios
    .delete(`/products/${id}`)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}



function btnAddToCart(id, name, price, category, img, description) {
  axios
    .patch(`/shopCart`, {id, name, price, category, img, description})
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}
