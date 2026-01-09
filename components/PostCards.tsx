import { Post } from "@/hooks/usePosts";

export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="relative flex items-center justify-center w-[320px] p-9 rounded-3xl overflow-hidden leading-relaxed border border-[#999999] transition-all duration-480 cubic-bezier-[0.23,1,0.32,1] hover:shadow-[0_6px_13px_rgba(0,0,0,0.1),0_24px_24px_rgba(0,0,0,0.09),0_55px_33px_rgba(0,0,0,0.05),0_97px_39px_rgba(0,0,0,0.01)] hover:border-[#0a3cff] hover:scale-105 group">
      <div className="absolute -right-20 -top-20 w-40 h-40 bg-[#0a3cff] rounded-full opacity-0 transition-all duration-480 cubic-bezier-[0.23,1,0.32,1] group-hover:scale-[7] group-hover:opacity-100 z-0" />

      <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-[#0a3cff] rounded-full opacity-0 transition-all duration-480 cubic-bezier-[0.23,1,0.32,1] group-hover:scale-[7] group-hover:opacity-100 z-0" />

      <div className="flex flex-col items-start gap-6 text-black transition-all duration-480 cubic-bezier-[0.23,1,0.32,1] z-10">
        <div className="flex items-center justify-between w-full">
          <p className="font-bold text-4xl leading-tight group-hover:text-white transition-all duration-480ms">
            #{post.id}
          </p>
          <span className="text-sm opacity-80 group-hover:text-white transition-all duration-480ms">
            User {post.userId}
          </span>
        </div>

        <h2 className="font-bold text-xl leading-tight group-hover:text-white transition-all duration-480ms line-clamp-2">
          {post.title}
        </h2>

        <p className="opacity-80 text-lg group-hover:text-white transition-all duration-480ms line-clamp-4">
          {post.body}
        </p>
      </div>
    </div>
  );
}
