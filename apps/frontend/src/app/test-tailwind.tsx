import React from 'react';

export default function TestTailwind() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">
        Tailwind CSS Test
      </h1>
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <p className="text-gray-800">
          This component tests if Tailwind CSS is working correctly.
        </p>
        <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded">
          Test Button
        </button>
      </div>
    </div>
  );
}
