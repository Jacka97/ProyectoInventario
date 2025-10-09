# 📦 GII – Gestión de Inventario e Incidencias

[![Status](https://img.shields.io/badge/status-in%20development-yellow)]()
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![Angular](https://img.shields.io/badge/angular-v17-DD0031?logo=angular&logoColor=white)]()
[![Bootstrap](https://img.shields.io/badge/bootstrap-5-7952B3?logo=bootstrap&logoColor=white)]()
[![PHP](https://img.shields.io/badge/php-8-777BB4?logo=php&logoColor=white)]()
[![MySQL](https://img.shields.io/badge/mysql-8-4479A1?logo=mysql&logoColor=white)]()

Collaborative web application developed in 3 weeks with my classmates. This project covers 3 subjects from our Advanced Degree (UI Development, Server-side Development and Client-side Development).
The topic of the project is **managing IT inventory and incidents** in school classrooms.  
It allows registering hardware, installed operating systems, classroom locations, brands, and users, with role-based access control.

---

## 📑 Table of Contents
- [🚧 Project Status](#-project-status)
- [👥 Development Team](#-development-team)
- [🧩 Technologies Used](#-technologies-used)
- [🗂️ Main Features](#️-main-features)
- [📦 Installation & Setup](#-installation--setup)
- [🛡️ User Roles](#️-user-roles)
- [🧭 Project Structure](#-project-structure)
- [📌 Roadmap](#-roadmap)
- [🖼️ Logo](#️-logo)
- [📄 License](#-license)
- [🙌 Acknowledgments](#-acknowledgments)

---

## 🚧 Project Status
🔧 Complete but not deployed.

---

## 👥 Development Team
Developed collaboratively by a team of **4 developers**.
Sandra Furet (@SFuret)
Anthony Abril (@AnthonyAbril)
Daniel Zaragoza (@Jacka97)
Salvador Gomez (@Desock)

---

## 🧩 Technologies Used
- **Frontend**: Angular v17 + Bootstrap  
- **Backend**: PHP (REST APIs)  
- **Database**: MySQL managed with phpMyAdmin  

---

## 🗂️ Main Features
- Register and query **IT components** (hardware and software).  
- Manage **classrooms and locations**.  
- Track **brands and models** of computers and peripherals.  
- **Role-based access control** for different user types.  
- Relational database with entities such as users, components, classrooms, and brands.  
- **Incident management module** to log and track issues.  

---

## 📦 Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Jacka97/ProyectoInventario.git
   
2. Install frontend dependencies:
    cd Inventario
    npm install
- Configure the backend on your local server (PHP + MySQL).
  On branch basededatos (/ProyectoInventario/BD) is located the sql file with the code of the db.
  
- Import the database from inventario.sql into phpMyAdmin.
  
- Run the frontend:
    ng serve

---

## 🛡️ User Roles
- Administrator → full access to all modules.
- Technician → manage components, classrooms, and incidents.
- User → read-only access.

---

## 🧭 Project Structure
ProyectoInventario/
├── Inventario/           # Angular v17 + Bootstrap  
├── apis/                 # PHP APIs  
├── BD/                   # SQL scripts and schema  
├── assets/               # Logo and graphic resources  
└── README.md

---

## 📌 Roadmap
- [x] User and role management
- [x] Component registration
- [x] Classroom association
- [x] Incident management module
- [x] Advanced filtering by OS and brand
- [x] Export inventory to Excel/PDF

---

## 🖼️ Logo
![GII Logo](Inventario/src/assets/images/logo.png)

---

## 📄 License
This project is licensed under the MIT License.

---

## 🙌 Acknowledgments
Thanks to the development team for their collaborative effort and to the teachers for technical support.
   
