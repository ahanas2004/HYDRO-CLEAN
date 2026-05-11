# SEO Management & Setup Guide

This guide is split into two parts:
1. **For the Client**: How to manage SEO daily (Non-Technical).
2. **For the Developer**: Final technical steps to "turn on" the connection.

---

# Part 1: Client Guide (How to Manage Your SEO)

Welcome! You can now manage all the SEO for your website directly from your **WordPress Dashboard**. You do **not** need to touch any code.

### 1. How to Change SEO for a Page
To change the title or description that appears on Google for any page (like About Us or Services):

1.  **Log in** to your WordPress Dashboard.
2.  Go to **Pages** in the left menu.
3.  Click **Edit** on the page you want to change.
4.  Scroll down to the bottom of the editor until you see the **Yoast SEO** section.
5.  **SEO Title**: Type your new title here. Google likes titles under 60 characters.
6.  **Meta Description**: Type a summary of the page. This is what people read on Google.
7.  **Click "Update"** at the top right of the screen.

**That's it!** Within a few minutes, your main website will automatically show these changes to Google.

### 2. Changing the Image for WhatsApp/Social Media
When you share your link on WhatsApp, Facebook, or LinkedIn, you can choose which image shows up:

1.  In the same **Yoast SEO** section at the bottom of the page, click the **Social** tab.
2.  Click **Facebook image** or **Twitter image**.
3.  Upload the image you want people to see (recommended size: 1200x630 pixels).
4.  **Click "Update"** at the top of the page.

### 3. Managing Redirects (If you have Yoast Premium)
If you delete a page and want it to go somewhere else:
1.  Go to **Yoast SEO** -> **Redirects**.
2.  Type the "Old URL" and the "New URL".
3.  Click **Add Redirect**. The website will handle the rest instantly.

---

# Part 2: Developer's "Next Steps" (Final Technical Setup)

To make the "Client Guide" above actually work, you need to finish these **4 technical steps**:

### Step 1: Install the "Bridge" Plugins
Log into the WordPress site and install these 3 plugins:
1.  **WPGraphQL**: This lets the website talk to WordPress.
2.  **Yoast SEO**: The main tool for the client.
3.  **WPGraphQL for Yoast SEO**: [Download here](https://github.com/ashhitch/wp-graphql-yoast-seo/releases). This is the most important one—it sends the SEO data to your Next.js site.

### Step 2: Set your Secret "Password"
1.  In your code, open the `.env.local` file.
2.  Find `REVALIDATE_SECRET` and set it to a long random password.
3.  In WordPress, you will need to add a small piece of code (provided in the `wordpress_connection_guide.md`) to your theme's `functions.php` using this same password. This allows WordPress to tell Next.js: "Hey, I just saved a page, please update!"

### Step 3: Match the Page Names
Ensure the "Slug" in WordPress matches your Next.js folders:
- WordPress Page slug `about` matches `app/about/`
- WordPress Page slug `services` matches `app/services/`
If the names don't match, the SEO data won't find the right page.

### Step 4: Update the Code
On every page in your Next.js project (e.g., `app/about/page.tsx`), you must replace the old static metadata with the dynamic fetcher:

```tsx
// Remove this:
// export const metadata = { title: "..." }

// Add this:
import { fetchPageMeta } from '@/lib/seo'

export async function generateMetadata() {
  return fetchPageMeta('/about') // Use the correct path for each page
}
```

---

### Important Note on Hosting
- **Next.js Website**: Stays where it is (Vercel/Netlify/etc).
- **WordPress**: Needs its own hosting (Hostinger, Bluehost, etc.). It should be on a subdomain like `cms.yourdomain.com`.
- **Connection**: Next.js will "pull" the data from the WordPress URL you put in your `.env.local` file.
