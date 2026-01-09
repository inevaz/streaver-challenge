
## stack

- **Next.js 15+** with App Router
- **TypeScript** for type safety
- **SWR** for data fetching and caching
- **Tailwind CSS** for styling
- **react-loading-skeleton** for loading states

## setup

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

## Project Structure

```
app/
├── page.tsx          # Home page
├── posts/page.tsx    # Posts listing with filtering
components/
├── PostCards.tsx     # Post card component
└── PostCardSkeleton.tsx  # Loading skeleton
hooks/
├── usePosts.ts       # Custom SWR hook for fetching posts
└── useDebounce.ts    # Debouncing hook for search input
```


