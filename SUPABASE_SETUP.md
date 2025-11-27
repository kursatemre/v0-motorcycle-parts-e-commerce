# Supabase Configuration Guide

## 📧 Email Confirmation Setup

### Step 1: Update Site URL
Go to **Supabase Dashboard** → **Authentication** → **URL Configuration**

```
Site URL: https://motorcycle-parts-e-commerce.vercel.app
```

### Step 2: Add Redirect URLs
In the same page, add these to **Redirect URLs**:

```
https://motorcycle-parts-e-commerce.vercel.app/**
https://motorcycle-parts-e-commerce.vercel.app/auth/callback
https://motorcycle-parts-e-commerce.vercel.app/auth/confirm
https://motorcycle-parts-e-commerce.vercel.app/giris
```

### Step 3: Verify Email Templates
Go to **Authentication** → **Email Templates** → **Confirm signup**

Make sure the template uses `{{ .ConfirmationURL }}` which will automatically use your Site URL:

```html
<h2>Confirm your signup</h2>
<p>Follow this link to confirm your email:</p>
<p><a href="{{ .ConfirmationURL }}">Confirm your mail</a></p>
```

## 🗄️ Database Setup

### Step 1: Run SQL Scripts
In **SQL Editor**, run these scripts in order:

1. `scripts/001_create_tables.sql` - Creates all tables
2. `scripts/002_enable_rls.sql` - Enables Row Level Security
3. `scripts/003_admin_policies.sql` - Sets up admin policies
4. `scripts/004_profile_trigger.sql` - Auto-creates user profiles
5. `scripts/005_seed_data.sql` - Seeds initial data

### Step 2: Create Admin User
After running the scripts:

1. Sign up normally on the website
2. Run `scripts/create_admin_user.sql` (update the email first)
3. Log in to access admin panel at `/admin`

## 🔐 Environment Variables

Make sure these are set in **Vercel Dashboard** → **Settings** → **Environment Variables**:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Get these values from:
**Supabase Dashboard** → **Project Settings** → **API**

## ✅ Verification Checklist

- [ ] Site URL set to production URL
- [ ] Redirect URLs added
- [ ] All SQL scripts executed
- [ ] Admin user created
- [ ] Environment variables set in Vercel
- [ ] Email confirmation tested
- [ ] Admin login tested

## 🔍 Troubleshooting

### Email Links Go to Localhost
**Problem:** Email confirmation links redirect to localhost instead of production

**Solution:**
1. Update Site URL in Supabase Authentication settings
2. Redeploy your Vercel project
3. Test with a new user registration

### Cannot Access Admin Panel
**Problem:** User cannot access `/admin` pages

**Solution:**
1. Check `profiles` table, make sure `role = 'admin'`
2. Log out and log back in
3. Clear browser cache

### Email Not Sending
**Problem:** Confirmation emails not received

**Solution:**
1. Check spam folder
2. Verify email settings in Supabase Authentication
3. For production, consider using a custom SMTP provider (Supabase Settings → Auth → SMTP)

## 📚 Additional Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Next.js Supabase Guide](https://supabase.com/docs/guides/auth/server-side/nextjs)
- [Vercel Deployment Guide](https://vercel.com/docs)
