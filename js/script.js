// Loader Script
window.addEventListener('load', function () {
  const loader = document.querySelector('.loader');
  // รอ 5 วินาทีก่อนซ่อน Loader
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 5000);
});


// Menu Button Script
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.querySelector('.nav-links');
const menuIcon = document.getElementById('menuIcon');

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');

  // เปลี่ยนรูปภาพปุ่มเมนู
  if (navLinks.classList.contains('active')) {
    menuIcon.src = "https://i.ibb.co/9cC0MXD/x-menu.png"; // รูปปุ่มปิด
  } else {
    menuIcon.src = "https://i.ibb.co/rs8wZpF/btn.png"; // รูปปุ่มเปิด
  }
});
