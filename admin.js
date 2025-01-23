// Lấy danh sách người dùng và người dùng hiện tại
let userList = JSON.parse(localStorage.getItem('userList')) || [];
const currentUser = JSON.parse(localStorage.getItem('currentUser'));

// Kiểm tra quyền hạn
if (!currentUser || currentUser.role !== 'Quản trị viên') {
        alert('Bạn không có quyền truy cập!');
        window.location.href = 'login.html';
}

// Hiển thị danh sách người dùng
const userTable = document.querySelector('#userTable tbody');

function renderUserTable() {
        userTable.innerHTML = '';
        userList.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.phone}</td>
      <td>
        <select class="roleSelect" data-id="${user.id}">
          <option value="Người dùng" ${user.role === 'Người dùng' ? 'selected' : ''}>Người dùng</option>
          <option value="Quản trị viên" ${user.role === 'Quản trị viên' ? 'selected' : ''}>Quản trị viên</option>
        </select>
      </td>
      <td><button class="deleteUser" data-id="${user.id}">Xóa</button></td>
    `;
                userTable.appendChild(row);
        });
}
renderUserTable();

// Cập nhật quyền hạn
userTable.addEventListener('change', function(e) {
        if (e.target.classList.contains('roleSelect')) {
                const userId = e.target.dataset.id;
                const newRole = e.target.value;
                const user = userList.find(user => user.id == userId);
                if (user) {
                        user.role = newRole;
                        localStorage.setItem('userList', JSON.stringify(userList));
                        alert('Quyền hạn đã được cập nhật.');
                }
        }
});

// Xóa người dùng
userTable.addEventListener('click', function(e) {
        if (e.target.classList.contains('deleteUser')) {
                const userId = e.target.dataset.id;
                userList = userList.filter(user => user.id != userId);
                localStorage.setItem('userList', JSON.stringify(userList));
                renderUserTable();
                alert('Người dùng đã bị xóa.');
        }
});

// Đăng xuất
document.getElementById('logout').addEventListener('click', function() {
        localStorage.removeItem('currentUser');
        alert('Đã đăng xuất!');
        window.location.href = 'login.html';
});