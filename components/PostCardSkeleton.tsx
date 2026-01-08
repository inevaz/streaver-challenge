import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function PostCardSkeleton() {
  return (
    <div className="relative flex items-center justify-center w-[320px] p-9 rounded-3xl overflow-hidden leading-relaxed border border-[#999999]">
      <div className="flex flex-col items-start gap-6 w-full">
        <div className="flex items-center justify-between w-full">
          <Skeleton width={80} height={40} />
          <Skeleton width={60} height={20} />
        </div>

        <Skeleton count={2} height={24} />

        <Skeleton count={3} height={18} />
      </div>
    </div>
  );
}
