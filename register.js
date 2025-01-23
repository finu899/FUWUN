// Lấy danh sách người dùng từ localStorage (nếu có)
let userList = JSON.parse(localStorage.getItem('userList')) || [];

// Xử lý sự kiện đăng ký
document.getElementById('registerForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const password = document.getElementById('password').value;

  // Kiểm tra email đã tồn tại chưa
  const existingUser = userList.find(user => user.email === email);
  if (existingUser) {
    alert('Email đã tồn tại. Vui lòng sử dụng email khác.');
    return;
  }

  // Tạo đối tượng người dùng mới với quyền hạn mặc định
  const newUser = {
    id: Date.now(),
    name,
    email,
    phone,
    password,
    role: "Người dùng" // Quyền hạn mặc định
  };

  // Thêm vào danh sách và lưu vào localStorage
  userList.push(newUser);
  localStorage.setItem('userList', JSON.stringify(userList));

  alert('Đăng ký thành công!');
  window.location.href = 'login.html';
});
