import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div>
            <Skeleton className="m-5 p-3 rounded-lg shadow-md h-20 bg-[#e78284]" />
            <Skeleton className="m-5 p-3 rounded-lg shadow-md h-20 bg-[#e78284]" />
            <Skeleton className="m-5 p-3 rounded-lg shadow-md h-20 bg-[#e78284]" />
        </div>
    );
}
