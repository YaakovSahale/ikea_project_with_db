const postForm = document.getElementById("postForm");

var url_string = window.location.href; 
var url = new URL(url_string);
var updateId = url.searchParams.get("update");



postForm.addEventListener("submit", addProduct);

function addProduct(e) {
  e.preventDefault();

  const name = document.getElementById("inputName").value;
  const price = document.getElementById("inputPrice").value;
  const category = document.getElementById("inputCategory").value;
  const img = [
    document.getElementById("inputImg1").value,
    document.getElementById("inputImg2").value,
  ];
  const description = document.getElementById("inputDescription").value;
  
  console.log(price);

  axios
    .patch(`/products/${updateId}`, {
      name,
      price,
      category,
      img,
      description,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}
