
const SearchBar = () => {
  return (
    <div className="bg-white rounded-lg flex h-8 w-60 mx-auto mb-3">
        
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="size-6 my-auto mx-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>


        <input className="bg-white w-full rounded-lg" placeholder="Search"/>
    </div>
  )
}

export default SearchBar