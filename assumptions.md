# Assumptions

## General Assumptions

- The challenge requires using SWR, so the solution is client-side focused.
- The API (jsonplaceholder) is stable, public, and doesn't require authentication.
- The number of posts is small, so fetching all at once doesn't affect performance.
- The most important part of the challenge is handling loading states, errors, and slow connections.

## Usage of SWR

Although the challenge already required it, the practical reasons are:

- Handles caching automatically
- Refetches data when the tab regains focus
- Retries on error
- Detects slow connections
- Provides separate states: `isLoading`, `isValidating`, `error`

In other words, it solves many things that would require manual implementation with `useEffect`.
It also keeps the code cleaner because I don't have to worry about the fetch lifecycle.

## UI Components (UIverse web)

I used UIverse for the cards and some buttons because:

- They look clean
- They have nice animations
- They save time on layout work (which I understand is not necessarily the matter of the challenge)

I didn't modify the internal structure of the components because it doesn't add value to the challenge objective, but I did adjust styles to keep everything consistent.

## Skeletons

I added `react-loading-skeleton` to show placeholders while posts are loading.

It's better than a spinner because:

- It gives an idea of the structure
- Prevents the screen from "jumping" when data arrives
- Makes the app feel faster, even if it isn't

## Prettier

I used Prettier to maintain consistent formatting.

## Next.js Organization

I used Next.js App Router, where each folder inside `app/` acts as a route:

- `/` → home page
- `/posts` → shows posts with filtering

I didn't use Server Components because the challenge requires SWR (client-side).
So I marked the pages with `"use client"`.

## Filter by userId

I implemented a simple filter by userId using a custom `useDebounce` hook.

Debouncing prevents each keystroke from triggering a new request.
So the user can type normally, and the search only happens after 500ms (0.5 seconds) of inactivity.

## Vercel Analytics

I integrated Vercel Analytics to track user visits and interactions.

- Allows monitoring of page views, user behavior, and performance metrics
- Installed via `@vercel/analytics` package
- Added `<Analytics />` component to the root layout

## Real Time Connection Indicator

I implemented a connection quality indicator that shows the actual latency of API requests.
- Complements the "slow connection" warning (Step 5)
- Gives users context about why requests are taking time
- Shows real-time metrics from actual API calls

## How It Works (Summary)

- The app fetches posts from the API using SWR.
- If the user enters a userId, a filtered search is performed.
- If the connection is slow, a warning is displayed.
- While loading, skeletons are shown.
- If there's an error, SWR retries automatically.
- Results are displayed in animated cards.
