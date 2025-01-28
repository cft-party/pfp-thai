// Loader Script
window.addEventListener('load', function () {
  const loader = document.querySelector('.loader');
  // ซ่อน Loader หลังจากโหลดหน้าเว็บเสร็จ
  loader.classList.add('hidden');
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
