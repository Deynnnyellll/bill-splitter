import { navLinkContent } from '../constants';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='fixed bottom-0 left-0 right-0 w-full px-3 py-2'>
      <div className='w-full py-4 px-6 rounded-[52px] bg-darkTwo '>
        <ul className='flex justify-between items-center text-[24px] text-primaryThree'>
          {navLinkContent.map((nav) => (
            <li key={nav.id}>
              <NavLink to={nav.path}>
                {({ isActive }) => (
                  isActive ? (
                    <div className='flex items-center bg-darkOne py-2 px-4 gap-1 rounded-[52px] text-[24px]  text-lightOne'>
                      <nav.logo />
                      <p className='text-[12px]'>{nav.title}</p>
                    </div>
                  ) : <nav.logo />
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar