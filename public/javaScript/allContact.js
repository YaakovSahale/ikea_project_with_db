const tbody = document.getElementById("tbody");

axios
  .get(`/contacts`)
  .then((res) => {
    console.log(res.data);
    const allContacts = res.data;
    displayAllContacts(allContacts);
  })
  .catch((err) => {
    console.log(err);
  });

function displayAllContacts(contacts) {
  contacts.forEach((item) => {
    tbody.innerHTML += `<tr>
      <td>${item.userName}</td>
      <td>${item.email}</td>
      <td>${item.phoneNumber}</td>
      <td>${item.message}</td>
    </tr>`;
  });
}
