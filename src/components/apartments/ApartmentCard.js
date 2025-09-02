'use client';

import { useState } from 'react';

export default function ApartmentCard({ apartment, onSelect }) {
  const [imageError, setImageError] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'თავისუფალია':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'გაყიდული':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'დაჯავშნილია':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'ნოშიკოს ჯავშანზეა':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'თავისუფალია':
        return '✓';
      case 'გაყიდული':
        return '✗';
      case 'დაჯავშნილია':
        return '⏳';
      case 'ნოშიკოს ჯავშანზეა':
        return '📋';
      default:
        return '?';
    }
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-200"
      onClick={() => onSelect?.(apartment)}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-lg text-gray-900">
              ბინა #{apartment.apartment_number}
            </h3>
            <p className="text-sm text-gray-600">
              {apartment.block_name} • {apartment.floor} სართული
            </p>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(apartment.status)}`}>
            {getStatusIcon(apartment.status)} {apartment.status}
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <span className="text-sm text-gray-500">ტიპი:</span>
            <p className="font-medium text-gray-900">{apartment.apartment_type}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">ფართობი:</span>
            <p className="font-medium text-gray-900">{apartment.total_area} კვ.მ</p>
          </div>
        </div>

        {apartment.view_type && (
          <div className="mb-4">
            <span className="text-sm text-gray-500">ხედი:</span>
            <p className="font-medium text-gray-900">{apartment.view_type}</p>
          </div>
        )}

        {/* Areas breakdown */}
        <div className="space-y-2 text-sm">
          {apartment.living_area && (
            <div className="flex justify-between">
              <span className="text-gray-600">საცხოვრებელი:</span>
              <span className="font-medium">{apartment.living_area} კვ.მ</span>
            </div>
          )}
          {apartment.summer_area && (
            <div className="flex justify-between">
              <span className="text-gray-600">ზაფხულის ოთახი:</span>
              <span className="font-medium">{apartment.summer_area} კვ.მ</span>
            </div>
          )}
          {apartment.terrace_area && (
            <div className="flex justify-between">
              <span className="text-gray-600">ტერასა:</span>
              <span className="font-medium">{apartment.terrace_area} კვ.მ</span>
            </div>
          )}
        </div>

        {/* VR Tour Link */}
        {apartment.vr_tour_link && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <button 
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
              onClick={(e) => {
                e.stopPropagation();
                window.open(apartment.vr_tour_link, '_blank');
              }}
            >
              🏠 VR ტური
            </button>
          </div>
        )}
      </div>
    </div>
  );
}