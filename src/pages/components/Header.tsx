import React from 'react';

type HeaderProps = {
  companyName: string;
};

export default function Header({ companyName }: HeaderProps) {
  return (
    <header className="mb-2">
      <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight p-4">{companyName}</h1>
    </header>
  );
} 