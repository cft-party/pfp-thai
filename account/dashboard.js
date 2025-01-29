document.addEventListener("DOMContentLoaded", function () {
    // ดึงข้อมูลสมาชิกจาก localStorage (หรือ API หากต้องการ)
    const memberId = localStorage.getItem("memberId") || "Guest";
    const userId = localStorage.getItem("id") || "Unknown";
    
    document.getElementById("memberId").textContent = memberId;
    document.getElementById("id").textContent = userId;

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
        const isValid = validCredentials.some(cred => cred.memberId === memberId && cred.password === password);

        if (isValid) {
            // Save the memberId if "Remember me" is checked
            if (rememberMe) {
                localStorage.setItem('memberId', memberId);
            } else {
                localStorage.removeItem('memberId');
            }
            
            // Redirect to dashboard.html
            window.location.href = 'dashboard.html';
        } else {
            alert('รหัสประจำตัวสมาชิกพรรคหรือรหัสผ่านไม่ถูกต้อง');
        }
    });

    // Optional: Load saved memberId if available
    window.addEventListener('load', function() {
        const savedMemberId = localStorage.getItem('memberId');
        if (savedMemberId) {
            document.getElementById('memberId').value = savedMemberId;
            document.getElementById('rememberMe').checked = true;
        }
    });
}
