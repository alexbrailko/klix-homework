import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { homeRoute, transactionsRoute } from '../utils/routes';

export const Header: React.FC = () => {
  return (
    <header className="fixed w-full bg-white shadow-md  z-10">
      <nav className="flex container p-4 justify-between items-center ">
        <h1 className="text-sm lg:text-xl font-bold">
          <Link to={homeRoute}>Transaction App</Link>
        </h1>
        <div className="space-x-4">
          <NavLink
            to={homeRoute}
            className={({ isActive }) =>
              isActive ? 'text-blue-600 font-semibold' : 'text-gray-700'
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to={transactionsRoute}
            className={({ isActive }) =>
              isActive ? 'text-blue-600 font-semibold' : 'text-gray-700'
            }
          >
            Transactions
          </NavLink>
        </div>
      </nav>
    </header>
  );
};
