// Lấy danh sách người dùng từ localStorage
let userList = JSON.parse(localStorage.getItem('userList')) || [];

// Xử lý sự kiện đăng nhập
document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  // Kiểm tra thông tin đăng nhập
  const user = userList.find(user => user.email === email && user.password === password);
  if (user) {
    // Lưu thông tin người dùng hiện tại vào localStorage
    localStorage.setItem('currentUser', JSON.stringify(user));

    // Chuyển hướng dựa trên vai trò
    if (user.role === 'Quản trị viên') {
      window.location.href = 'admin.html';
    } else {
      alert(`Đăng nhập thành công! Chào mừng ${user.name}`);
      window.location.href = 'user.html'; // Trang dành cho người dùng
    }
  } else {
    alert('Email hoặc mật khẩu không đúng. Vui lòng thử lại.');
  }
});
