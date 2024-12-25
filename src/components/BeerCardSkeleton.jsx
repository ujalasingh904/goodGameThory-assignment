export function BeerCardSkeleton() {
    return (
      <div className="bg-white rounded-lg overflow-hidden shadow-md animate-pulse">
        <div className="p-6">
          <div className="aspect-square bg-gray-200 rounded-lg mb-4" />
          <div className="h-6 bg-gray-200 rounded mb-2" />
          <div className="h-4 bg-gray-200 rounded mb-2 w-1/2" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
          <div className="mt-4">
            <div className="h-6 bg-gray-200 rounded-full w-1/4 inline-block" />
          </div>
        </div>
      </div>
    )
  }
  
  