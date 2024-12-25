import { useState, useEffect } from 'react'
import { Search, SortAsc, SortDesc } from 'lucide-react'
import { useDebounce } from './hooks/use-debounce'
import { BeerCardSkeleton } from './components/BeerCardSkeleton'
import { BeerCard } from './components/BeerCard' 
import { Button } from './components/Button.jsx'

const ITEMS_PER_PAGE = 9

export default function BeerCatalog() {
  const [beers, setBeers] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [sortOrder, setSortOrder] = useState('asc')
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE)
  const debouncedSearch = useDebounce(search, 300)

  useEffect(() => {
    const fetchBeers = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch('https://api.sampleapis.com/beers/ale')
        if (!response.ok) {
          throw new Error('Failed to fetch beers. Please try again later.')
        }
        const data = await response.json()
        if (Array.isArray(data)) {
          setBeers(data)
        } else {
          throw new Error('Unexpected API response format')
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchBeers()
  }, [])

  const filteredBeers = Array.isArray(beers)
    ? beers
      .filter(beer =>
        beer.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
      .sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.name.localeCompare(b.name)
        } else {
          return b.name.localeCompare(a.name)
        }
      })
    : []

  const visibleBeers = filteredBeers.slice(0, visibleItems)

  const loadMore = () => {
    setVisibleItems(prevItems => prevItems + ITEMS_PER_PAGE)
  }

  const toggleSortOrder = () => {
    setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'))
  }

  return (
    <div className="min-h-screen bg-gray-50">
    
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder="Search beers..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button onClick={toggleSortOrder} className="flex items-center space-x-2">
            <span>Sort {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}</span>
            {sortOrder === 'asc' ? <SortAsc size={16} /> : <SortDesc size={16} />}
          </Button>
        </div>

        {error && (
          <div className="text-center p-6 bg-red-50 text-red-600 rounded-lg shadow-md animate-fadeIn">
            <h2 className="text-xl font-semibold mb-2">Oops! Something went wrong</h2>
            <p>{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <BeerCardSkeleton key={i} />)
            : visibleBeers.map(beer => <BeerCard key={beer.id} beer={beer} />)
          }
        </div>

        {!loading && filteredBeers.length === 0 && (
          <div className="text-center p-6 bg-yellow-50 text-yellow-700 rounded-lg shadow-md animate-fadeIn">
            <h2 className="text-xl font-semibold mb-2">No beers found</h2>
            <p>Try adjusting your search or check back later for new additions!</p>
          </div>
        )}

        {visibleItems < filteredBeers.length && (
          <div className="text-center mt-8">
            <Button onClick={loadMore}>Load More</Button>
          </div>
        )}
      </div>
    </div>
  )
}

