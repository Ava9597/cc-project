document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggleNav");
  const sidebar = document.getElementById("sidebar");

  if (toggleBtn && sidebar) {
    toggleBtn.onclick = () => {
      const isOpen = sidebar.style.left === "0px";
      sidebar.style.left = isOpen ? "-250px" : "0px";
      toggleBtn.classList.toggle("hidden", !isOpen);
    };
  }
});