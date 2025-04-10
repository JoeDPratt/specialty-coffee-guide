// components/Skeleton/SkeletonText.tsx
import SkeletonBase from "./SkeletonBase";

export default function SkeletonText({
  width = "w-full",
  height = "h-4",
}: {
  width?: string;
  height?: string;
}) {
  return <SkeletonBase width={width} height={height} />;
}
