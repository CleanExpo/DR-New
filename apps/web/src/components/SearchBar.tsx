'use client';

import React, { useState } from 'react';

export default function SearchBar() {
  const [query, setQuery] = useState('');

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search services..."
        className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
