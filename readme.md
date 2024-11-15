
# RBAC: Role-Based Access Control System

A lightweight, extensible, and efficient **Role-Based Access Control (RBAC)** system implemented in Node.js, designed to manage user roles and permissions effectively. 

## 🚀 Features
- Define and manage **roles** and their associated **permissions**.
- Easily assign roles to **users**.
- Perform **authorization checks** to control access to resources.
- Support for **hierarchical roles**.
- Lightweight and simple to integrate into any Node.js project.

---

## 📚 Table of Contents
1. [Getting Started](#getting-started)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Examples](#examples)
5. [Contributing](#contributing)
6. [License](#license)

---

## 🛠️ Getting Started

### Prerequisites
Before using this RBAC system, ensure you have:
- Node.js (v14 or later)
- npm or yarn

### Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/EslamYasser-Dev/RBAC.git
   ```
2. Navigate to the project directory:
   ```bash
   cd RBAC
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

---

## 🔧 Usage

### Setting Up Roles and Permissions
Define roles and their permissions in the `roles.json` file or any database you prefer.

Example `roles.json`:
```json
{
  "admin": ["create_user", "delete_user", "update_user"],
  "editor": ["update_content", "delete_content"],
  "viewer": ["read_content"]
}
```

### Integrating RBAC in Your App
1. Import and initialize the RBAC system:
   ```javascript
   const RBAC = require('./rbac');

   const roles = require('./roles.json'); // Load roles from JSON or database
   const rbac = new RBAC(roles);
   ```

2. Assign roles to users:
   ```javascript
   const userRoles = {
       user1: ['admin'],
       user2: ['editor'],
   };
   ```

3. Perform access checks:
   ```javascript
   const hasAccess = rbac.can('user1', 'delete_user');
   console.log(`Access granted: ${hasAccess}`);
   ```

---

## 🧑‍💻 Examples

### Checking Permissions
```javascript
rbac.can('user2', 'delete_user')
  .then((access) => {
    if (access) {
      console.log('Access granted!');
    } else {
      console.log('Access denied.');
    }
  })
  .catch(err => console.error(err));
```

### Adding a New Role
You can dynamically add new roles and permissions using:
```javascript
rbac.addRole('new_role', ['new_permission']);
```

---

## 🤝 Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request.

---

## 📄 License
This project is licensed under the [MIT License](LICENSE).

---

## 🛡️ Security
If you discover any security vulnerabilities, please contact [EslamYasser-Dev](https://github.com/EslamYasser-Dev) directly.

---

## 🌟 Acknowledgments
Special thanks to the open-source community for their support and contributions.
