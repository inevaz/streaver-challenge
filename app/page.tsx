import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-blue-50 to-indigo-100">
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Streaver Challenge
          </h1>
          <Link 
            href="/posts"
            className="relative inline-block cursor-pointer border-0 align-middle no-underline bg-transparent p-0 w-48 h-auto group"
          >
            <span className="transition-all duration-450 ease-[cubic-bezier(0.65,0,0.076,1)] relative block m-0 w-12 h-12 bg-blue-600 rounded-[1.625rem] group-hover:w-full">
              <span className="transition-all duration-450 ease-[cubic-bezier(0.65,0,0.076,1)] absolute top-0 bottom-0 my-auto left-2.5 w-4.5 h-0.5 bg-transparent before:absolute before:content-[''] before:top-[-0.29rem] before:right-0.0625rem before:w-2.5 before:h-2.5 before:border-t-2 before:border-r-2 before:border-white before:rotate-45 group-hover:bg-white group-hover:translate-x-4" />
            </span>
            <span className="transition-all duration-450 ease-[cubic-bezier(0.65,0,0.076,1)] absolute top-0 left-0 right-0 bottom-0 py-3 px-0 ml-[1.85rem] text-blue-600 font-bold leading-[1.6] text-center uppercase group-hover:text-white">
              View Posts
            </span>
          </Link>
        </div>
      </div>
      
      <footer className="py-6 px-6 text-right">
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkgdYTt96GYdMW78NoeDGNOPLWXvRZcKps6Q&s"
          alt="Company logo"
          width={40}
          height={40}
          className="rounded-lg ml-auto"
        />
      </footer>
    </div>
  )
}
