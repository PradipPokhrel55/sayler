import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

const SearchAppBar = ({ setSearchQuery }) => {
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="flex-grow md:w-50000">
      <div className="bg-customOrange">
        <div className="flex items-center p-4">
          <div className="relative flex-grow ml-0 sm:ml-3 mr-2 rounded bg-white bg-opacity-15 hover:bg-opacity-25 transition-all duration-300">
            <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
            </div>
            <input
              type="text"
              placeholder="Search in SAYLER..."
              className="w-full pl-10 py-2 bg-white placeholder-red focus:outline-none rounded"
              aria-label="search"
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchAppBar;
