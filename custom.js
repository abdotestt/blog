// style du header
const mainHeading = document.getElementById('titre');
const titles = ['Blog Dynamique', 'Explorez', 'Interagissez', 'Apprenez'];

let index = 0;
setInterval(() => {
  mainHeading.textContent = titles[index];
  index = (index + 1) % titles.length;
}, 5000);
// fin de style de header