import React from 'react';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-lg flex flex-col p-6 min-h-screen">
      <nav className="mb-8">
        <ul className="space-y-4">
          <li><a href="#" className="block font-semibold text-lg text-gray-800 hover:text-blue-600">Home</a></li>
          <li><a href="#" className="block font-semibold text-lg text-gray-800 hover:text-blue-600">Profile</a></li>
        </ul>
      </nav>
      <div>
        <h2 className="text-md font-bold mb-2 text-gray-700">Management</h2>
        <ul className="space-y-2">
          <li className="text-gray-600">Elon Musk</li>
          <li className="text-gray-600">Zach Kirkhorn</li>
          <li className="text-gray-600">Drew Baglino</li>
        </ul>
      </div>
    </aside>
  );
} 