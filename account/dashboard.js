document.addEventListener("DOMContentLoaded", function () {
    // ดึงข้อมูลสมาชิกจาก localStorage (หรือ API หากต้องการ)
    const memberId = localStorage.getItem("memberId") || "Guest";
    
    // ดึงข้อมูล id จาก API
    fetch("https://script.google.com/macros/s/AKfycbzcqz4fhq6GnCcFYvtRRJpLSkbX1tt3cavmd1KTv9aanc_sDx7jV-TrhLgbgaxYa6n9Fg/exec")
        .then(response => response.json())
        .then(data => {
            const user = data.find(user => user.memberId === memberId);
            if (user) {
                localStorage.setItem("id", user.id);
                document.getElementById("id").textContent = user.id;
            } else {
                document.getElementById("id").textContent = "Unknown";
            }
        })
        .catch(error => console.error("Error fetching user ID:", error));
    
    document.getElementById("memberId").textContent = memberId;

    // ดึงข้อมูลจังหวัดและจำนวนสมาชิกพรรค
    fetch("https://script.google.com/macros/s/AKfycby_qth7GKre5EbZpZvNje_sOo_HR5tvJDU3USJCXIqbC_27U0Vh7Lejg5m0bTjDQdJXSA/exec")
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById("provinceTable").getElementsByTagName("tbody")[0];
            tableBody.innerHTML = "";
            data.forEach(province => {
                const row = tableBody.insertRow();
                row.insertCell(0).textContent = province.province;
                row.insertCell(1).textContent = province.members;
            });
        })
        .catch(error => console.error("Error fetching province data:", error));

    // ปุ่ม Logout
    document.getElementById("logoutBtn").addEventListener("click", function () {
        localStorage.removeItem("memberId");
        localStorage.removeItem("id");
        window.location.href = "index.html"; // เปลี่ยนเส้นทางไปหน้า Login
    });
});

// หน้า Login Script
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting the default way
        
        const memberId = document.getElementById('memberId').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('rememberMe').checked;
        
        if (!memberId || !password) {
            alert('กรุณากรอกข้อมูลให้ครบถ้วน');
            return;
        }

        // Validate the credentials
        fetch("https://script.google.com/macros/s/AKfycbzcqz4fhq6GnCcFYvtRRJpLSkbX1tt3cavmd1KTv9aanc_sDx7jV-TrhLgbgaxYa6n9Fg/exec")
            .then(response => response.json())
            .then(data => {
                const user = data.find(user => user.memberId === memberId && user.password === password);
                if (user) {
                    localStorage.setItem("memberId", user.memberId);
                    localStorage.setItem("id", user.id);
                    
                    if (rememberMe) {
                        localStorage.setItem("rememberedMemberId", user.memberId);
                    } else {
                        localStorage.removeItem("rememberedMemberId");
                    }
                    
                    // Redirect to dashboard.html
                    window.location.href = 'dashboard.html';
                } else {
                    alert('รหัสประจำตัวสมาชิกพรรคหรือรหัสผ่านไม่ถูกต้อง');
                }
            })
            .catch(error => console.error("Error validating user:", error));
    });

    // Optional: Load saved memberId if available
    window.addEventListener('load', function() {
        const savedMemberId = localStorage.getItem('rememberedMemberId');
        if (savedMemberId) {
            document.getElementById('memberId').value = savedMemberId;
            document.getElementById('rememberMe').checked = true;
        }
    });
}

    // ฟังก์ชันสำหรับค้นหาจังหวัด

    document.getElementById('search').addEventListener('input', searchProvinces);

    function searchProvinces() {
        const searchTerm = document.getElementById('search').value.trim().toLowerCase();
        const tableRows = document.querySelectorAll("#provinceTableBody tr");

        tableRows.forEach(row => {
            const provinceName = row.cells[0].textContent.toLowerCase(); // เอาชื่อจังหวัดจาก column แรก
            if (provinceName.includes(searchTerm)) {
                row.style.display = ""; // แสดงแถวที่ตรงกับคำค้นหา
            } else {
                row.style.display = "none"; // ซ่อนแถวที่ไม่ตรงกับคำค้นหา
            }
        });
    }
