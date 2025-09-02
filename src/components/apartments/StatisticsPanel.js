'use client';

import { useState, useEffect } from 'react';

export default function StatisticsPanel() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overall');

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const response = await fetch('/api/statistics');
      const data = await response.json();
      
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch statistics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-2">
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-500">სტატისტიკის ჩატვირთვა ვერ მოხერხდა</p>
      </div>
    );
  }

  const StatCard = ({ title, value, subtitle, color = 'blue', icon }) => (
    <div className={`bg-${color}-50 rounded-lg p-4 border border-${color}-200`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-${color}-600 text-sm font-medium`}>{title}</p>
          <p className={`text-2xl font-bold text-${color}-900`}>{value}</p>
          {subtitle && (
            <p className={`text-${color}-700 text-sm`}>{subtitle}</p>
          )}
        </div>
        {icon && (
          <div className={`text-${color}-400 text-2xl`}>{icon}</div>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('overall')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'overall'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            ზოგადი სტატისტიკა
          </button>
          <button
            onClick={() => setActiveTab('blocks')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'blocks'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            ბლოკების მიხედვით
          </button>
          <button
            onClick={() => setActiveTab('types')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'types'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            ტიპების მიხედვით
          </button>
        </nav>
      </div>

      <div className="p-6">
        {/* Overall Statistics */}
        {activeTab === 'overall' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="სულ ბინები"
                value={stats.overall.total_apartments}
                color="blue"
                icon="🏠"
              />
              <StatCard
                title="თავისუფალი"
                value={stats.overall.available}
                subtitle={`${stats.summary.availabilityRate}%`}
                color="green"
                icon="✓"
              />
              <StatCard
                title="გაყიდული"
                value={stats.overall.sold}
                subtitle={`${stats.summary.occupancyRate}%`}
                color="red"
                icon="✗"
              />
              <StatCard
                title="დაჯავშნილი"
                value={stats.overall.reserved}
                color="yellow"
                icon="⏳"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard
                title="საშუალო ფართობი"
                value={`${stats.overall.avg_area} კვ.მ`}
                color="purple"
                icon="📐"
              />
              <StatCard
                title="მინიმალური ფართობი"
                value={`${stats.overall.min_area} კვ.მ`}
                color="gray"
              />
              <StatCard
                title="მაქსიმალური ფართობი"
                value={`${stats.overall.max_area} კვ.მ`}
                color="gray"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <StatCard
                title="სულ ბლოკები"
                value={stats.summary.totalBlocks}
                color="indigo"
                icon="🏗️"
              />
              <StatCard
                title="სულ სართულები"
                value={stats.summary.totalFloors}
                color="indigo"
                icon="🏢"
              />
            </div>
          </div>
        )}

        {/* Block Statistics */}
        {activeTab === 'blocks' && (
          <div className="space-y-4">
            {stats.byBlock.map(block => (
              <div key={block.block_code} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    ბლოკი {block.block_code}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {block.sold_percentage}% გაყიდული
                  </span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{block.total_apartments}</p>
                    <p className="text-sm text-gray-600">სულ ბინა</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{block.available}</p>
                    <p className="text-sm text-gray-600">თავისუფალი</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-red-600">{block.sold}</p>
                    <p className="text-sm text-gray-600">გაყიდული</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">{block.avg_area}</p>
                    <p className="text-sm text-gray-600">საშუალო კვ.მ</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Type Statistics */}
        {activeTab === 'types' && (
          <div className="space-y-4">
            {stats.byType.map(type => (
              <div key={type.apartment_type} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {type.apartment_type}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {type.min_area} - {type.max_area} კვ.მ
                  </span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{type.count}</p>
                    <p className="text-sm text-gray-600">სულ ბინა</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{type.available}</p>
                    <p className="text-sm text-gray-600">თავისუფალი</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-red-600">{type.sold}</p>
                    <p className="text-sm text-gray-600">გაყიდული</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">{type.avg_area}</p>
                    <p className="text-sm text-gray-600">საშუალო კვ.მ</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}