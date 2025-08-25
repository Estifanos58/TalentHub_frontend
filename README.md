# TalentHub Frontend

This is the **TalentHub Frontend**, a **Next.js 14+** application for a job application platform.  
It serves as the user-facing interface for the **TalentHub Backend API** and is designed to provide a seamless experience for **applicants, employers, and admins**.  

---

## 🚀 Features

- **Dark Mode / Light Mode** support with `next-themes`
- **State Management** with [Zustand](https://github.com/pmndrs/zustand)
- **UI Components** built with [ShadCN](https://shadcn.dev/)  
- **Charts & Analytics** with [Recharts](https://recharts.org/)  
- **Toast Notifications** with [React-Toastify](https://fkhadra.github.io/react-toastify/)  
- **Input Validation** with [Zod](https://github.com/colinhacks/zod)  
- **CSS** powered by Tailwind CSS v4  
- **Icons** with [Heroicons](https://heroicons.com/)  
- **Responsive Design** and mobile-friendly UI  

---

## 📄 Pages & Routing

### Public Pages
- **`/`** → Home
- **`/about`** → About Us
- **`/login`** → Login
- **`/register`** → User Registration
- **`/jobs`** → List of all jobs with pagination and filters
- **`/jobs/[id]`** → Job detail page

### Protected Pages
- **Applications**
  - `/applications` → List of user applications
  - `/applications/[id]` → Application detail
- **Employer**
  - `/employer/jobs` → Employer’s created jobs
  - `/employer/jobs/[id]/applications` → Applications List For A Specific Job for employer
  - `/jobs/create` → Create a new job *(Employer/Admin only)*
- **Admin**
  - `/admin` → Admin dashboard with analytics charts  

---

## 🛠 Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/talenthub-frontend.git
   cd talenthub-frontend
    ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a .env file in the root directory:
   ```bash
   ITEMS_PER_PAGE=10
   NEXT_PUBLIC_CLOUDINARY_NAME=cloudinary_name
   NEXT_PUBLIC_CLOUDINARY_PRESET=cloudinary_preset
   ```
4. Run the development server:
   ```bash
     npm run dev
   ```
