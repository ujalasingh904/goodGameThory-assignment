export function Button({ children, className = '', ...props }) {
    return (
      <button
        className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ${className}`}
        {...props}
      >
        {children}
      </button>
    )
  }
  
  