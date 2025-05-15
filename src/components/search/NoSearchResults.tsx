import Image from "next/image"

export default function NoSearchResults() {
    return (
        <div className="flex flex-1 flex-col items-center justify-center" >
            <h3 className="text-center mb-0">0 coffees found</h3>
            <span className="text-lg text-center">Try changing your filters to discover more beans.</span>
        </div>
    )
}