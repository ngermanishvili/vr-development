'use client';

import { useState, useEffect } from 'react';

export default function ApartmentFilter({ onFilterChange, blocks }) {
  const [filters, setFilters] = useState({
    block_code: '',
    floor: '',
    status: '',
    apartment_type: '',
    min_area: '',
    max_area: ''
  });

  const statuses = [
    'თავისუფალია',
    'გაყიდული', 
    'დაჯავშნილია',
    'ნოშიკოს ჯავშანზეა'
  ];

  const apartmentTypes = [
    'სტუდიო',
    '1 საძინ',
    '2 საძინ',
    '3 საძინ',
    '4 საძინ',
    '5 საძინ'
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // Remove empty filters
    const cleanFilters = Object.fromEntries(
      Object.entries(newFilters).filter(([_, v]) => v !== '')
    );
    
    onFilterChange(cleanFilters);
  };

  const clearFilters = () => {
    const emptyFilters = {
      block_code: '',
      floor: '',
      status: '',
      apartment_type: '',
      min_area: '',
      max_area: ''
    };
    setFilters(emptyFilters);
    onFilterChange({});
  };

  const activeFiltersCount = Object.values(filters).filter(v => v !== '').length;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          ფილტრები
        </h3>
        {activeFiltersCount > 0 && (
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            გასუფთავება ({activeFiltersCount})
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Block */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ბლოკი
          </label>
          <select
            value={filters.block_code}
            onChange={(e) => handleFilterChange('block_code', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">ყველა ბლოკი</option>
            {blocks?.map(block => (
              <option key={block.block_code} value={block.block_code}>
                {block.block_code} - {block.block_name}
              </option>
            ))}
          </select>
        </div>

        {/* Floor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            სართული
          </label>
          <input
            type="number"
            min="1"
            max="12"
            value={filters.floor}
            onChange={(e) => handleFilterChange('floor', e.target.value)}
            placeholder="სართული"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            სტატუსი
          </label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">ყველა სტატუსი</option>
            {statuses.map(status => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Apartment Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ტიპი
          </label>
          <select
            value={filters.apartment_type}
            onChange={(e) => handleFilterChange('apartment_type', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">ყველა ტიპი</option>
            {apartmentTypes.map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Min Area */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            მინ. ფართობი
          </label>
          <input
            type="number"
            min="0"
            value={filters.min_area}
            onChange={(e) => handleFilterChange('min_area', e.target.value)}
            placeholder="კვ.მ"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Max Area */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            მაქს. ფართობი
          </label>
          <input
            type="number"
            min="0"
            value={filters.max_area}
            onChange={(e) => handleFilterChange('max_area', e.target.value)}
            placeholder="კვ.მ"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
}