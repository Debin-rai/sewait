# SewaIT - Digital Utility Platform
**Founded by Debin Rai**

SewaIT is a modern digital utility platform founded by Debin Rai, designed to simplify the lives of Nepalese citizens by bringing government services, financial data, and essential tools into one unified interface.

## 🚀 Features

-   **Government Services**: Easy access to guides and links for Passport, License, PAN, and more.
-   **Financial Data**: Real-time NEPSE (Stock Market) data, Gold/Silver rates, and Currency Exchange rates.
-   **Utilities**: Nepali Calendar (Bikram Sambat), Kalimati Vegetable Prices, and Weather updates.
-   **Modern Tech Stack**: Built with Next.js 16, TailwindCSS, and Prisma for a fast, responsive experience.

## 🛠️ Tech Stack

-   **Framework**: [Next.js](https://nextjs.org) (App Router)
-   **Styling**: [TailwindCSS](https://tailwindcss.com)
-   **Database**: PostgreSQL (via [Railway](https://railway.app))
-   **ORM**: [Prisma](https://www.prisma.io)
-   **Auth**: Custom JWT Authentication

## 📦 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Debin-rai/sewait.git
    cd sewait
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file in the root directory and add:
    ```env
    DATABASE_URL="postgresql://user:password@localhost:5432/sewait"
    JWT_SECRET="your-secret-key"
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) to see the app.

## 🚀 Deployment

This project is optimized for deployment on **Railway** or **Vercel**.

1.  **Build Command**: `prisma generate && next build`
2.  **Environment Variables**: Ensure `DATABASE_URL` is set in your deployment settings.

## 📄 License

This project is licensed under the MIT License.

---
**SewaIT** - *Simplifying Digital Nepal*
