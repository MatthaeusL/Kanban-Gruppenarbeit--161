let users = [];

function addUser() {
    users.push('John);
        backend.setItem('users', JSON.stringify(users));
    }
    async function addUser() {
        users.push('John);
            await backend.setItem('users', JSON.stringify(users));
        }
        async function init() {
            await downloadFromServer();
            users = JSON.parse(backend.getItem('users')) || [];
        }

        function deleteUser(name) {
            backend.deleteItem('users');
        }