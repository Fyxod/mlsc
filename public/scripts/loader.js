document.addEventListener("DOMContentLoaded", function () {
  const isInitialLoad = sessionStorage.getItem("isInitialLoad");

  if (!isInitialLoad) {
    sessionStorage.setItem("isInitialLoad", "true");

    var loader = document.querySelector("#loader");
    setTimeout(function () {
      loader.style.top = "-100%";
    }, 4000);
  } else {
    var loader = document.querySelector("#loader");
    loader.style.display = "none";
  }

  const urlParams = new URLSearchParams(window.location.search);
  const flashMessage = urlParams.get("flash");
  console.log(flashMessage);

  if (flashMessage) {
    const flashMessageDiv = document.querySelector(".flash");
    flashMessageDiv.textContent = flashMessage;

    document.getElementById("forms").scrollIntoView({ behavior: "smooth" });

    setTimeout(function () {
      history.replaceState({}, document.title, "/");
    }, 1100);
  }
});
