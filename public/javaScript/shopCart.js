let trItem = document.getElementsByClassName("trItem");
let btnRemove = document.getElementsByClassName("btnRemove");
let cartTable = document.getElementById("cartTable");
let inputAmount = document.getElementsByClassName("inputAmount");
let tdPrice = document.getElementsByClassName("tdPrice");
let tdSubTotal = document.getElementsByClassName("tdSubTotal");
let finalPrice = document.getElementById("finalPrice");
let finalPriceNum = 0;

let myCart = [
  {
    id: 1,
    name: "amd560",
    price: "100",
    category: "graphics cards",
    img: ["../productsImages/amd560_1.jfif", "../productsImages/amd560_2.jfif"],
    description:
      "Lorem ipsum dolor sit.Pariatur eaque expedita dicta!Delectus omnis dolorum neque!Sed aperiam quos quo!",
  },
  {
    id: 2,
    name: "amd570",
    price: "200",
    category: "graphics cards",
    img: ["../productsImages/amd570_1.jfif", "../productsImages/amd570_2.jfif"],
    description:
      "Lorem ipsum dolor sit.Pariatur eaque expedita dicta!Delectus omnis dolorum neque!Sed aperiam quos quo!",
  },
  {
    id: 3,
    name: "amd5500",
    price: "300",
    category: "graphics cards",
    img: [
      "../productsImages/amd5500_1.jfif",
      "../productsImages/amd5500_2.jfif",
    ],
    description:
      "Lorem ipsum dolor sit.Pariatur eaque expedita dicta!Delectus omnis dolorum neque!Sed aperiam quos quo!",
  },
  {
    id: 4,
    name: "amd5700",
    price: "400",
    category: "graphics cards",
    img: [
      "../productsImages/amd5700_1.jfif",
      "../productsImages/amd5700_2.jfif",
    ],
    description:
      "Lorem ipsum dolor sit.Pariatur eaque expedita dicta!Delectus omnis dolorum neque!Sed aperiam quos quo!",
  },
];


function displayCart() {
  for (let i = 0; i < myCart.length; i++) {
    cartTable.innerHTML += `<tr class="trItem">
    <td >${myCart[i].name}</td>
    <td><input class="inputAmount" size="1" value="1" min="1" max="999" type="number" style='width:25%'/></td>
    <td class="tdPrice" >${myCart[i].price}</td>
    <td class="tdSubTotal">${myCart[i].price}$</td>
    <td><img class="btnRemove" onclick="btnDelete(${myCart[i].id})" src="../images/trash_icon.png"></td>
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

displayCart();
console.log(myCart);

function btnDelete(productId) {
  for (let i = 0; i < myCart.length; i++) {
    if (myCart[i].id == productId) {
      myCart.splice(i, 1);
      cartTable.innerHTML = strTh;
      displayCart();
      console.log(myCart);
    }
  }
  displayTotalPrice();
}

function displayTotalPrice() {
  finalPriceNum = 0
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

displayTotalPrice();

