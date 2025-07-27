# Shopify Product Scraper Dashboard

<img width="1380" height="946" alt="image" src="https://github.com/user-attachments/assets/645017f0-7fdd-4ba6-942f-c26d3414d419" />


A sleek and functional web application built with React, Vite, and Shadcn UI, designed to easily fetch product data from Shopify stores and export it to CSV. The dashboard features secure access via Firebase authentication and offers a modern user experience with dark mode enabled by default.

## ✨ Features

* **Shopify Product Fetching:** Input any Shopify store URL (`your-store.myshopify.com`) to retrieve product data.
* **Product Limit Control:** Customize the number of products fetched per request using a user-friendly dropdown.
* **CSV Export:** Export the fetched product data directly to a CSV file for easy analysis or migration.
* **Secure Authentication:** User login/signup powered by Firebase Authentication (Google Sign-in implemented).
* **Protected Routes:** Dashboard content is only accessible to authenticated users. Unauthenticated users are redirected to the login page.
* **Intuitive UI:** Built with Shadcn UI and Tailwind CSS for a modern, responsive, and accessible interface.
* **Dark Mode by Default:** The application loads in dark mode, providing a comfortable viewing experience.
* **Notifications:** Uses `sonner` for elegant toast notifications for user feedback (success, error, warning).
* **Client-side Routing:** Seamless navigation using `react-router-dom`.

## 🛠️ Technologies Used

* **Frontend:**
    * [React.js](https://react.dev/)
    * [Vite](https://vitejs.dev/) (Build Tool)
    * [Shadcn UI](https://ui.shadcn.com/) (Components Library)
    * [Tailwind CSS](https://tailwindcss.com/) (Styling)
    * [Lucide React](https://lucide.dev/icons/) (Icons)
    * [Sonner](https://sonner.emilkowalski.com/) (Toast Notifications)
    * [React Router DOM](https://reactrouter.com/web/guides/quick-start) (Client-side Routing)
* **Backend / Services:**
    * [Firebase Authentication](https://firebase.google.com/docs/auth) (User Management)

## 🚀 Setup & Installation

Follow these steps to get your development environment up and running.

### Prerequisites

* Node.js (v18.x or higher recommended)
* npm or Yarn

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd shopify-scraper
````

### 2\. Install dependencies

```bash
npm install
# or
yarn install
```

### 3\. Firebase Configuration

You need a Firebase project set up with Authentication enabled (specifically Google Sign-in).

  * Create a `.env` file in the root of your project.
  * Add your Firebase configuration variables from your Firebase project settings.

<!-- end list -->

```dotenv
# .env
VITE_FIREBASE_API_KEY="YOUR_API_KEY"
VITE_FIREBASE_AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
VITE_FIREBASE_PROJECT_ID="YOUR_PROJECT_ID"
VITE_FIREBASE_STORAGE_BUCKET="YOUR_STORAGE_BUCKET"
VITE_FIREBASE_MESSAGING_SENDER_ID="YOUR_MESSAGING_SENDER_ID"
VITE_FIREBASE_APP_ID="YOUR_APP_ID"
VITE_FIREBASE_MEASUREMENT_ID="YOUR_MEASUREMENT_ID" # Optional, if using Analytics
```

Make sure `auth.domain` is whitelisted in Firebase console -\> Authentication -\> Sign-in method -\> Google. Your `localhost` (e.g., `http://localhost:5173`) should be added there.

### 4\. Run the development server

```bash
npm run dev
# or
yarn dev
```

The application will typically open in your browser at `http://localhost:5173` (or another available port).

### 5\. Add Shadcn UI Components

If you decide to add more Shadcn UI components later, use the CLI:

```bash
npx shadcn@latest add <component-name>
```

For example, if you add the `sonner` component, it would be `npx shadcn@latest add sonner`.

## 💡 Usage

1.  **Login/Signup:** Upon launching, you'll be directed to the authentication page. Sign in using your Google account.
2.  **Dashboard Access:** After successful login, you'll be redirected to the dashboard.
3.  **Enter Shopify URL:** In the search form, input the base URL of a Shopify store (e.g., `your-store.myshopify.com`).
4.  **Set Product Limit:** Choose the desired number of products to fetch per page using the dropdown.
5.  **Fetch Products:** Click the "Fetch" button to retrieve and display products in the table.
6.  **Paginate:** Use the "Next" and "Previous" buttons to navigate through product pages.
7.  **Export Data:** Click the "Export to CSV" button to download the currently displayed product data.
8.  **Sign Out:** Log out from the application using the sign-out option in your sidebar or header (if implemented).

## 📂 Project Structure

```
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ui/             # Shadcn UI auto-generated components (button, input, select, etc.)
│   │   ├── ProductTable.jsx
│   │   ├── SearchForm.jsx
│   │   ├── ProductLimit.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── login-form.jsx  # Your LoginForm component
│   ├── context/
│   │   ├── ProductLimitContext.jsx
│   │   └── AuthContext.jsx
│   ├── config/
│   │   └── config.js       # Firebase initialization
│   ├── pages/
│   │   └── SignUp.jsx      # Your main login/signup page
│   ├── App.jsx             # Main application component, handles routing and context providers
│   ├── Dashboard.jsx       # The main dashboard component
│   ├── main.jsx            # Entry point
│   ├── index.css           # Tailwind CSS directives
│   └── globals.css         # Global styles
├── .env                    # Environment variables
├── index.html              # HTML entry point
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
├── README.md               # This file
```

## 🤝 Contributing

Contributions are welcome\! If you have suggestions or find issues, please open an issue or submit a pull request.

## 📄 License

This project is open-source and available under the [MIT License](https://www.google.com/search?q=LICENSE).

```
```
