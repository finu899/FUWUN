document.addEventListener('DOMContentLoaded', function() {
    // Lấy dữ liệu người dùng từ localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Đăng ký người dùng
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = this[0].value;
            const password = this[1].value;
            const phone = this[2].value; // Thêm trường số điện thoại
            const email = this[3].value; // Thêm trường email

            // Kiểm tra xem tên đăng nhập đã tồn tại chưa
            if (users.some(user => user.username === username)) {
                alert('Tên đăng nhập đã tồn tại!');
                return;
            }

            // Thêm người dùng mới vào danh sách với vai trò mặc định là "user"
            users.push({ username, password, phone, email, role: 'user' });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Đăng ký thành công!');

            // Chuyển đến trang đăng nhập
            window.location.href = 'listview.html'; // Chuyển về trang đăng nhập
        });
    }

    // Đăng nhập người dùng
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = this[0].value;
            const password = this[1].value;

            const user = users.find(user => user.username === username && user.password === password);
            if (user) {
                // Kiểm tra vai trò của người dùng
                if (user.role === 'admin') {
                    window.location.href = 'listview.html'; // Chuyển đến trang danh sách cho admin
                } else if (user.role === 'user') {
                    window.location.href = 'trangchu.html'; // Chuyển đến trang chủ người dùng
                } else if (user.role === 'staff') {
                    window.location.href = 'trangchuNV.html'; // Chuyển đến trang cho nhân viên
                } else {
                    alert('Vai trò không xác định. Vui lòng liên hệ với quản trị viên.');
                }
            } else {
                alert('Tên đăng nhập hoặc mật khẩu không đúng. Vui lòng thử lại!');
            }
        });
    }

    // Hiển thị danh sách người dùng
    if (document.getElementById('userList')) {
        const tbody = document.getElementById('userList').getElementsByTagName('tbody')[0];
        users.forEach((user, index) => {
            const row = tbody.insertRow();
            row.insertCell(0).textContent = index + 1; // ID
            row.insertCell(1).textContent = user.username;
            row.insertCell(2).textContent = user.password;
            row.insertCell(3).textContent = user.phone; // Hiển thị số điện thoại
            row.insertCell(4).textContent = user.email; // Hiển thị email
            row.insertCell(5).textContent = user.role; // Hiển thị vai trò

            // Thêm cột hành động
            const actionCell = row.insertCell(6);
            createActionButtons(actionCell, user.username, user.role);
        });
    }

    // Tạo các nút hành động
    function createActionButtons(cell, username, role) {
        const editButton = document.createElement('button');
        editButton.textContent = 'Chỉnh sửa';
        editButton.className = 'edit'; // Thêm lớp cho nút chỉnh sửa
        editButton.onclick = () => editUser (username);
        cell.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Xóa'; // Sửa từ 'text Content' thành 'textContent'
        deleteButton.className = 'delete'; // Thêm lớp cho nút xóa
        deleteButton.onclick = () => deleteUser (username);
        cell.appendChild(deleteButton);

        const toggleRoleButton = document.createElement('button');
        toggleRoleButton.textContent = role === 'admin' ? ' Vai trò người dùng ' : role === 'staff' ? 'Vai trò ADMIN ' : ' Vai trò nhân viên ';
        toggleRoleButton.onclick = () => toggleRole(username);
        cell.appendChild(toggleRoleButton);
    }

    // Chỉnh sửa người dùng
    function editUser (username) {
        const user = users.find(user => user.username === username);
        if (user) {
            const newUsername = prompt('Nhập tên đăng nhập mới:', user.username);
            const newPassword = prompt('Nhập mật khẩu mới:', user.password);
            const newPhone = prompt('Nhập số điện thoại mới:', user.phone);
            const newEmail = prompt('Nhập email mới:', user.email);

            // Cập nhật thông tin người dùng
            if (newUsername && newPassword && newPhone && newEmail) {
                user.username = newUsername;
                user.password = newPassword;
                user.phone = newPhone;
                user.email = newEmail;

                localStorage.setItem('users', JSON.stringify(users));
                alert('Cập nhật thành công!');
                window.location.reload(); // Làm mới trang để cập nhật danh sách
            }
        }
    }

    // Xóa người dùng
    function deleteUser (username) {
        const confirmDelete = confirm('Bạn có chắc chắn muốn xóa người dùng này?');
        if (confirmDelete) {
            const index = users.findIndex(user => user.username === username);
            if (index !== -1) {
                users.splice(index, 1);
                localStorage.setItem('users', JSON.stringify(users));
                alert('Xóa người dùng thành công!');
                window.location.reload(); // Làm mới trang để cập nhật danh sách
            }
        }
    }

    // Chuyển đổi vai trò người dùng
    function toggleRole(username) {
        const user = users.find(user => user.username === username);
        if (user) {
            if (user.role === 'admin') {
                user.role = 'user'; // Chuyển từ admin sang user
            } else if (user.role === 'user') {
                user.role = 'staff'; // Chuyển từ user sang staff
            } else {
                user.role = 'admin'; // Chuyển từ staff sang admin
            }
            localStorage.setItem('users', JSON.stringify(users));
            alert(`Đã chuyển đổi vai trò thành ${user.role}!`);
            window.location.reload(); // Làm mới trang để cập nhật danh sách
        }
    }

    document.getElementById('togglePassword')?.addEventListener('click', function() {
        const passwordInput = document.getElementById('password');
        const passwordType = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', passwordType);
        this.textContent = passwordType === 'password' ? '🙉' : '🙈'; // Thay đổi biểu tượng
    });

    // Đổi nền đen
    let darkmode = localStorage.getItem('darkmode');
    const themeSwitch = document.getElementById('theme-switch');

    const enableDarkmode = () => {
        document.body.classList.add('darkmode');
        localStorage.setItem('darkmode', 'active');
    };

    const disableDarkmode = () => {
        document.body.classList.remove('darkmode');
        localStorage.setItem('darkmode', null);
    };

    if (darkmode === "active") enableDarkmode();

    themeSwitch.addEventListener("click", () => {
        darkmode = localStorage.getItem('darkmode');
        darkmode !== "active" ? enableDarkmode() : disableDarkmode();
    });
});
