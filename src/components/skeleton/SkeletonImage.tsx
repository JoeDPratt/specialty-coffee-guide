// components/Skeleton/SkeletonImage.tsx
import SkeletonBase from './SkeletonBase';

export default function SkeletonImage({ aspect = 'aspect-[1/1]' }: { aspect?: string }) {
    return (
        <div className={`w-full bg-pr-200 ${aspect} overflow-hidden`}>
            <SkeletonBase className="w-full h-full" />
        </div>
    );
}
