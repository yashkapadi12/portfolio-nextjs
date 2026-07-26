# Yash Kapadi — Portfolio (Next.js)

Animated portfolio built with Next.js (App Router) and Framer Motion.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Add your photo

1. Put your image at `public/profile.jpg`
2. Open `components/Portfolio.jsx`, find the comment block `PROFILE PHOTO SLOT`
3. Replace `<div className="avatar">YK</div>` with:
   ```jsx
   <div className="avatar">
     <img src="/profile.jpg" alt="Yash Kapadi" />
   </div>
   ```

## Get a live link

The easiest path is Vercel (made by the Next.js team, free tier):

1. Push this folder to a GitHub repo
2. Go to https://vercel.com/new, import the repo
3. Leave all settings as default and click Deploy
4. You'll get a live URL like `yash-kapadi-portfolio.vercel.app`

Alternative: `npm run build && npm run start` runs a production build locally,
or deploy the `.next` output to any Node.js host.

## What's animated

- Terminal intro types itself out on page load (`whoami`, `cat role.txt`)
- Hero name, photo, tagline, and contact pills fade/slide in on load, staggered
- Every experience stage, stack card, and the education/contact blocks fade up
  as you scroll to them (Framer Motion `whileInView`)
- Cards lift slightly on hover
