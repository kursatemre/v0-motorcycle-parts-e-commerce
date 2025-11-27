# 🏍️ MotoParça - Motorcycle Parts E-Commerce

Modern, full-stack e-commerce platform for motorcycle spare parts built with Next.js 16, Supabase, and TypeScript.

[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge)](https://motorcycle-parts-e-commerce.vercel.app)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js%2016-000000?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![Powered by Supabase](https://img.shields.io/badge/Powered%20by-Supabase-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com)

## 🌟 Features

### For Customers
- 🔍 **Advanced Search** - Search by vehicle brand, model, year, and part number
- 🛒 **Shopping Cart** - Real-time cart management with persistent storage
- 📦 **Order Tracking** - Track your orders from confirmation to delivery
- 💳 **Multiple Payment Methods** - Credit card, bank transfer, and cash on delivery
- 📱 **Responsive Design** - Optimized for all devices
- ⭐ **Favorites** - Save products for later
- 🔐 **Secure Authentication** - Email confirmation and password reset

### For Businesses (B2B)
- 💼 **Dealer Portal** - Special pricing and bulk ordering
- 💰 **Credit Management** - Track credit limits and payment terms
- 📊 **Purchase History** - Detailed order history and analytics

### Admin Panel
- 📊 **Dashboard** - Real-time statistics and analytics
- 📦 **Product Management** - CRUD operations for products with images
- 🏷️ **Category Management** - Hierarchical category structure
- 🚗 **Vehicle Compatibility** - Manage product compatibility with vehicles
- 📋 **Order Management** - Process and track orders
- 👥 **Customer Management** - View and manage customers
- 🎫 **Coupon System** - Create and manage discount coupons
- 📝 **Blog Management** - Create and publish blog posts
- 🚚 **Shipping Settings** - Configure shipping methods and costs
- ⚙️ **Site Settings** - Manage site-wide configurations

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router, Server Components)
- **Language:** TypeScript
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Styling:** Tailwind CSS v4
- **UI Components:** Radix UI
- **State Management:** React Context API
- **Form Handling:** React Hook Form + Zod
- **Icons:** Lucide React
- **Charts:** Recharts
- **Deployment:** Vercel
- **Analytics:** Vercel Analytics

## 📋 Prerequisites

- Node.js 18+ and pnpm
- Supabase account and project
- Vercel account (for deployment)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/kursatemre/v0-motorcycle-parts-e-commerce.git
cd v0-motorcycle-parts-e-commerce
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Get these from:
- Supabase Dashboard → Project Settings → API

### 4. Database Setup

Run the SQL scripts in order in your Supabase SQL Editor:

```bash
1. scripts/001_create_tables.sql      # Create all tables
2. scripts/002_enable_rls.sql         # Enable Row Level Security
3. scripts/003_admin_policies.sql     # Set up admin policies
4. scripts/004_profile_trigger.sql    # Auto-create user profiles
5. scripts/005_seed_data.sql          # Seed initial data
```

### 5. Supabase Authentication Configuration

**Important:** Configure authentication URLs to avoid localhost redirect issues.

Go to **Supabase Dashboard** → **Authentication** → **URL Configuration**:

```
Site URL: https://your-domain.vercel.app

Redirect URLs:
https://your-domain.vercel.app/**
https://your-domain.vercel.app/auth/callback
https://your-domain.vercel.app/auth/confirm
```

📖 See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for detailed setup instructions.

### 6. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 👤 Creating Admin User

### Step 1: Register Normal User
Visit `/kayit` and create a normal user account.

### Step 2: Update Role to Admin
Run in Supabase SQL Editor:

```sql
UPDATE profiles
SET role = 'admin'
WHERE email = 'your-email@example.com';
```

Or use the provided script:
```bash
scripts/create_admin_user.sql
```

### Step 3: Access Admin Panel
Login and visit: `/admin`

📖 See [ADMIN_SETUP.md](./ADMIN_SETUP.md) for detailed instructions.

## 📁 Project Structure

```
v0-motorcycle-parts-e-commerce/
├── app/                          # Next.js App Router pages
│   ├── admin/                    # Admin panel pages
│   ├── auth/                     # Authentication pages
│   ├── kategori/                 # Category pages
│   ├── urun/                     # Product pages
│   └── ...
├── components/                   # React components
│   ├── admin/                    # Admin components
│   ├── auth/                     # Auth components
│   ├── layout/                   # Layout components
│   ├── product/                  # Product components
│   └── ui/                       # UI components (shadcn/ui)
├── lib/                          # Utility functions
│   ├── supabase/                 # Supabase client configs
│   ├── types.ts                  # TypeScript types
│   └── utils.ts                  # Helper functions
├── scripts/                      # Database scripts
│   ├── 001_create_tables.sql
│   ├── 002_enable_rls.sql
│   └── ...
├── public/                       # Static assets
└── styles/                       # Global styles
```

## 🔑 Key Features Implementation

### Authentication Flow
- Email confirmation with custom callback
- Password reset functionality
- Protected routes with middleware
- Role-based access control (Customer, Dealer, Admin)

### Product Management
- Multi-image upload support
- Vehicle compatibility tracking
- Stock management with movement history
- SKU and OEM code tracking

### Order Processing
- Real-time order status updates
- Email notifications
- Invoice generation
- Shipping integration ready

### B2B Features
- Custom pricing per dealer
- Credit limit management
- Bulk ordering
- Payment term tracking

## 🌐 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/kursatemre/v0-motorcycle-parts-e-commerce)

1. Click the button above or connect your repository to Vercel
2. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Deploy!

### Post-Deployment

1. Update Supabase Auth URLs (see [SUPABASE_SETUP.md](./SUPABASE_SETUP.md))
2. Run database migrations
3. Create admin user
4. Configure site settings in admin panel

## 🛡️ Security Notes

- Row Level Security (RLS) enabled on all tables
- Admin routes currently accessible without authentication (⚠️ Security improvement needed)
- Email confirmation required for new users
- Password reset with secure tokens
- SQL injection prevention through Supabase client
- XSS protection via React's built-in escaping

### ⚠️ Important Security TODO
Admin layout needs authentication middleware. Currently, anyone can access `/admin` URL.

## 🧪 Testing

```bash
# Run type checking
pnpm tsc --noEmit

# Run linting
pnpm lint

# Build for production
pnpm build
```

## 📝 Environment Variables

Required environment variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=         # Your Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=    # Your Supabase anon/public key

# Optional - Vercel Analytics (auto-configured on Vercel)
# No additional variables needed
```

## 🐛 Troubleshooting

### Email Confirmation Links Go to Localhost
- Update Site URL in Supabase Authentication settings
- Add production URLs to Redirect URLs list
- Redeploy your application

### Cannot Access Admin Panel
- Check `profiles` table, ensure `role = 'admin'`
- Log out and log back in
- Clear browser cache

### Build Errors
- Ensure all environment variables are set
- Run `pnpm install` to update dependencies
- Check TypeScript errors with `pnpm tsc --noEmit`

See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for more troubleshooting tips.

## 📚 Documentation

- [Supabase Setup Guide](./SUPABASE_SETUP.md) - Complete Supabase configuration
- [Admin Setup Guide](./ADMIN_SETUP.md) - Admin user creation and management
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Database and Auth by [Supabase](https://supabase.com/)
- UI Components from [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)
- Hosted on [Vercel](https://vercel.com/)

## 📞 Support

For support, please open an issue in the GitHub repository or contact the development team.

---

**Live Demo:** [https://motorcycle-parts-e-commerce.vercel.app](https://motorcycle-parts-e-commerce.vercel.app)

Made with ❤️ for the motorcycle community
