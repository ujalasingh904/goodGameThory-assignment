export function BeerCard({ beer }) {
    const rating = typeof beer.rating === 'object' ? beer.rating.average : beer.rating
    return (
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 animate-fadeIn">
        <div className="p-6">
          <div className="aspect-square relative mb-4 overflow-hidden rounded-lg">
            <img
              src={beer.image || '/placeholder.svg?height=300&width=300'}
              alt={"Loading"}
              className="object-cover w-full h-full transform hover:scale-110 transition duration-300"
               
            />
          </div>
          <h2 className="text-xl font-semibold mb-2 truncate">{beer.name}</h2>
          <p className="text-sm text-gray-600 mb-2">Price: {beer.price || 'N/A'}</p>
           
          <div className="mt-4 flex flex-wrap gap-2">
            {rating && (
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                Rating: {rating}
              </span>
            )}
          </div>
        </div>
      </div>
    )
  }
  
  