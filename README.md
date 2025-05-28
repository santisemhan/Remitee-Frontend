<div align="center" id="top">
  <img src="https://github.com/user-attachments/assets/e07b0b03-6b80-4497-8398-b025f1388ce4" width="300" alt="App Logo" />
</div>
<br/>

<div align="center" id="top">
  <img src="https://github.com/user-attachments/assets/aa802bb9-5aae-401f-b2db-4aa93b3274b6" width="900" alt="App Screenshot" />
  <img src="https://github.com/user-attachments/assets/cf0b0976-07f8-4e70-9631-0d052349f14a" width="900" alt="App Screenshot Light" />
</div>

## :dart: About ##
This repository contains the frontend application for the Remitee technical challenge, built with Next.js. The application consumes the Remitee Backend API (a REST API built with .NET).

## :checkered_flag: Get Started ##

### 🧰 Prerequisites

- [Node.js](https://nodejs.org/) (v22+ recommended)
- The [Remitee Backend](https://github.com/santisemhan/Remitee-Backend) running locally

## :computer: Development Technologies Used ##

- [Next.js 15](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://zustand-demo.pmnd.rs/) for state management
- [React Query](https://tanstack.com/query/latest) for data fetching
- [React Hook Form](https://react-hook-form.com/) with Zod validation
- [Hero UI](https://www.heroui.com/) for UI components

### ⚙️ Environment Configuration

1. Create a new `.env` file in the project root
2. Add the following configuration:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
```

### 🚀 Running the Project

```bash
# Clone this project
git clone https://github.com/santisemhan/Remitee-Frontend

# Navigate into the folder
cd Remitee-Frontend

# Install dependencies
npm install

# Run the development server
npm run dev
```