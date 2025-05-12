import React from 'react';
import { ShoppingCart, User } from 'lucide-react';




interface CustomerHeaderProps {
  userName: string;
  cartCount?: number;
}

const CustomerHeader: React.FC<CustomerHeaderProps> = ({cartCount = 0 }) => {

    const name = localStorage.getItem("name")

    
  return (
    <header className="sticky top-0 z-3 bg-white shadow-md py-4 px-6 flex items-center justify-between rounded-b-2xl">
      <div className="text-xl font-bold text-gray-800">
        <span className="text-blue-600">Group 162</span> Dashboard
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <User className="h-6 w-6 text-gray-600" />
          <span className="text-gray-700 font-medium">Hello, {name}</span>
        </div>

        <button className="relative group">
          <ShoppingCart className="h-6 w-6 text-gray-700" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 rounded-full group-hover:scale-110 transition">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default CustomerHeader;
