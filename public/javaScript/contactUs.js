const postForm = document.getElementById("postForm");


postForm.addEventListener("submit", contactUs);

function contactUs(e) {
  e.preventDefault();

  const userName = document.getElementById("userName").value;
  const email = document.getElementById("email").value;
  const phoneNumber = document.getElementById("phoneNumber").value;
  const message = document.getElementById("message").value;
  

  axios
    .post(`/contact`, {
      userName,
      email,
      phoneNumber,
      message,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}
