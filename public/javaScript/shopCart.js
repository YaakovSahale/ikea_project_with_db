
let trItem = document.getElementsByClassName("trItem");
let btnRemove = document.getElementsByClassName("btnRemove");
let cartTable = document.getElementById("cartTable");
let inputAmount = document.getElementsByClassName("inputAmount");
let tdPrice = document.getElementsByClassName("tdPrice");
let tdSubTotal = document.getElementsByClassName("tdSubTotal");
let finalPrice = document.getElementById("finalPrice");
let finalPriceNum = 0;
let newCart;

function getNewCart() {
  axios
    .get(`/shopCart`)
    .then((response) => {
      newCart = response.data.products;
      displayCart(newCart);
    })
    .catch((error) => {
      console.log(`got error`);
      console.log(error);
    });
}

getNewCart();

function displayCart(myCart) {
  for (let i = 0; i < myCart.length; i++) {
    cartTable.innerHTML += `<tr class="trItem" id="card${i}">
    <td >${myCart[i].name}</td>
    <td><input class="inputAmount" size="1" value="1" min="1" max="999" type="number" style='width:25%'/></td>
    <td class="tdPrice" >${myCart[i].price}</td>
    <td class="tdSubTotal">${myCart[i].price}$</td>
    <td><img class="btnRemove" onclick="btnDelete('${myCart[i]._id}',"card${i}")" src="../images/trash_icon.png"></td>
    </tr>`;
  }
}

let strTh = `<tr>
<th>The product</th>
<th>Amount</th>
<th>Price</th>
<th>Subtotal price</th>
<th></th>
</tr>`;

// displayCart();

// function btnDelete(productId) {
//   for (let i = 0; i < newCart.length; i++) {
//     if (newCart[i].id == productId) {
//       newCart.splice(i, 1);
//       cartTable.innerHTML = strTh;
//       displayCart();
//       console.log(newCart);
//     }
//   }
//   displayTotalPrice();
// }

function btnDelete(productId) {
  axios
    .delete(`/cartProduct/${productId}`)
    .then((res) => {
      console.log(res.data);
      // cartTable.innerHTML = strTh;
      // getNewCart();
      // displayTotalPrice();
    })
    .catch((err) => {
      console.log(err);
    });
}

function displayTotalPrice() {
  finalPriceNum = 0;
  for (let i = 0; i < myCart.length; i++) {
    tdSubTotal[i].innerHTML = `${myCart[i].price * inputAmount[i].value}$`;
    finalPriceNum += myCart[i].price * inputAmount[i].value;
  }
  finalPrice.innerHTML = `final price:${finalPriceNum}$`;

  for (let i = 0; i < myCart.length; i++) {
    inputAmount[i].onchange = () => {
      finalPriceNum = 0;
      tdSubTotal[i].innerHTML = `${myCart[i].price * inputAmount[i].value}`;
      for (let i = 0; i < inputAmount.length; i++) {
        tdSubTotal[i].innerHTML = `${myCart[i].price * inputAmount[i].value}$`;
        finalPriceNum += myCart[i].price * inputAmount[i].value;
      }
      finalPrice.innerHTML = `final price:${finalPriceNum}$`;
    };
  }
}
