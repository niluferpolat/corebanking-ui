# 💳 MiniBank Frontend (React + Zustand)

### Deployed URL
https://bright-hamster-e9605d.netlify.app

Username and password:
**test_rockerfeller**
***Password.123***

Second User is:
**niluferr**
**Password!123**

MiniBank Frontend is a simple and modern banking UI built with React, Zustand, and PrimeReact.
The application allows users to:

- View accounts
- Create, update and delete accounts
- Transfer money between accounts
- View transaction history

  The project is fully typed with **TypeScript** and styled using **TailwindCSS v4.**

# 🚀 Tech Stack

- React 19
- Vite 7
- Typescript
- Zustand 5
- React Hook form + Yup
- PrimeReact 10
- TailwindCSS 4
- Axios

#### Utilities
- Prettier (Formatting)
- ESLint (linting)
- Moment.js (Date formatting)

# 📦 Installation

## 1️⃣ Cone the repository

```bash
git clone https://github.com/niluferpolat/corebanking-ui.git
cd corebanking-ui.git
```

## 2️⃣ Install dependencies

npm install
or
yarn install

## 3️⃣ Configure API URL

Update the backend URL inside:
src/config/axios.ts

Example:
export const baseURL = "http://localhost:8080/api";

# ▶️ Start the App

npm run dev

The app will be available at:
http://localhost:5173/

# 🖥 Features
### 🏦 Accounts
- View list of accounts
- View account details
- Create / update / delete accounts

### 💰 Transfers
- Transfer funds between accounts
- Validation with React Hook Form
- Toast notifications

### 📜 Transaction History
- Paginated DataTable
- Custom templates (date + status)
- Styled status indicators

# 📝 Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| npm run dev     | Start development server |
| npm run build   | Build for production     |
| npm run preview | Preview build            |
| npm run lint    | Run ESLint               |
| npm run format  | Format with Prettier     |


