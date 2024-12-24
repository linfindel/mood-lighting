document.getElementById("colour").oninput = () => {
  document.body.style.backgroundColor = document.getElementById("colour").innerText;

  localStorage.setItem("saved-colour", document.getElementById("colour").innerText);
}

if (localStorage.getItem("saved-colour")) {
  document.body.style.backgroundColor = localStorage.getItem("saved-colour");
  document.getElementById("colour").innerText = localStorage.getItem("saved-colour");
}