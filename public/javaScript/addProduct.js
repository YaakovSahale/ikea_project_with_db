const postForm = document.getElementById("postForm");

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
    .post(`/products`, {
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
