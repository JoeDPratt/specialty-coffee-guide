// components/Skeleton/SkeletonBase.tsx

type SkeletonBaseProps = {
  className?: string;
  width?: string;
  height?: string;
  rounded?: string;
};

export default function SkeletonBase({
  className = "",
  width = "w-full",
  height = "h-4",
  rounded = "rounded-none",
}: SkeletonBaseProps) {
  return (
    <div
      className={`bg-pr-300 dark:bg-pr-400 animate-pulse ${width} ${height} ${rounded} ${className}`}
    />
  );
}
