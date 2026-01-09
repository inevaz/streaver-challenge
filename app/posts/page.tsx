"use client";

import { useState } from "react";
import Link from "next/link";
import usePosts from "@/hooks/usePosts";
import PostCard from "@/components/PostCards";
import PostCardSkeleton from "@/components/PostCardSkeleton";
import { useDebounce } from "@/hooks/useDebounce";

export default function PostsPage() {
  const [searchInput, setSearchInput] = useState(""); //what the user types
  const [showSlowWarning, setShowSlowWarning] = useState(false); //if show slow connection warning
  const debouncedSearch = useDebounce(searchInput, 500); //input value debounced by 500ms of inactivity

  const userId = debouncedSearch ? Number(debouncedSearch) : undefined; //if input exists, convert to number, if not, undefined and show all posts
  const { posts, loading, error, isValidating } = usePosts(userId, () => { //using usePosts hook to fetch posts
    setShowSlowWarning(true);
  });

  if (!loading && !isValidating && showSlowWarning) { //hide slow connection warning when loading is done
    setShowSlowWarning(false);
  }

  return (
    //main container
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/"
            className="inline-block transition-all duration-200 ease-in relative overflow-hidden z-10 text-[#090909] px-4 py-2 cursor-pointer text-sm rounded-lg bg-[#e8e8e8] border border-[#e8e8e8] shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff] hover:text-white hover:border-blue-600 active:text-[#666] active:shadow-[inset_4px_4px_12px_#c5c5c5,inset_-4px_-4px_12px_#ffffff] before:content-[''] before:absolute before:left-1/2 before:-translate-x-1/2 before:scale-y-100 before:scale-x-125 before:top-full before:w-[140%] before:h-[180%] before:bg-black/5 before:rounded-[50%] before:block before:transition-all before:duration-500 before:delay-100 before:ease-[cubic-bezier(0.55,0,0.1,1)] before:-z-10 hover:before:top-[-35%] hover:before:bg-blue-600 hover:before:scale-y-130 hover:before:scale-x-80 after:content-[''] after:absolute after:left-[55%] after:-translate-x-1/2 after:scale-y-100 after:scale-x-145 after:top-[180%] after:w-[160%] after:h-[190%] after:bg-blue-600 after:rounded-[50%] after:block after:transition-all after:duration-500 after:delay-100 after:ease-[cubic-bezier(0.55,0,0.1,1)] after:-z-10 hover:after:top-[-45%] hover:after:bg-blue-600 hover:after:scale-y-130 hover:after:scale-x-80"
          >
            <span className="relative z-20">← Home</span>
          </Link>
          <h1 className="text-2xl font-bold text-black">Posts</h1>
          <div className="w-24"></div> 
        </div>

        {/* if showSlowWarning is true (after 5s) */}
        {showSlowWarning && (
          <div className="mb-4 mx-auto max-w-2xl p-4 bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800 rounded">
            <p className="font-semibold">Slow connection detected</p>
            <p className="text-sm">
              The request is taking longer than expected. Please wait...
            </p>
          </div>
        )}

        <div className="mb-8">
          <div className="max-w-md mx-auto">
            <label
              htmlFor="userId-search"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Filter by User ID
            </label>
            {/* input for searching by user ID */}
            <input
              id="userId-search"
              type="number"
              placeholder="Enter user ID (1-10)"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
              min="1"
              max="10"
            />
            {isValidating && !loading && searchInput && (
              <p className="mt-2 text-sm text-blue-600">Searching...</p>
            )}
          </div>
        </div>
        {/* skeletons while loading */}
        {loading && (
          <div className="flex flex-wrap gap-4 justify-center">
            {Array.from({ length: 9 }).map((_, index) => (
              <PostCardSkeleton key={index} />
            ))}
          </div>
        )}
        {/* banner for error */}
        {error && (
          <div className="max-w-md mx-auto bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <p className="text-red-800 font-semibold">Error loading posts</p>
            <p className="text-red-600 text-sm mt-1">
              Check your connection. Will retry automatically.
            </p>
          </div>
        )}
        {/* if not posts found for the id. If found, show postCards */}
        {!loading && !error && (
          <>
            <div className="flex flex-wrap gap-4 justify-center">
              {posts?.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            {posts && posts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  No posts found for this user ID.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
