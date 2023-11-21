import React from 'react';

import { LuHome } from 'react-icons/lu';
import { PiNotePencilFill } from 'react-icons/pi';
import { MdConnectedTv } from 'react-icons/md';
import { BiNetworkChart } from 'react-icons/bi';
import { GiShoppingBag } from 'react-icons/gi';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsFillGridFill, BsFillBellFill, BsChevronDown } from 'react-icons/bs';
// import LogoImg from '../assets/imgs/pngs/TAJIFY-LOGO.png';
import LogoImg from '../assets/imgs/pngs/logo-complete.png';
import AvatarImg from '../assets/imgs/pngs/avatar.png';

import { useAuthContext } from '../context/AuthContext';


function MainGreenHeader() {
    const { user } = useAuthContext();

  return (
    <header className='main-header'>
        <span className='logo__box'>
            <img src={LogoImg} alt={LogoImg} />
        </span>


        <span className='header__input'>
            <input type='search' placeholder='Search...' />
            <AiOutlineSearch className='header__input-icon'/>
        </span>

        <nav className='main-navbar'>
            <ul className='navbar__list'>
                <li className='navbar__item'>
                    <LuHome className='navbar--icon' />
                    Home
                </li>
                <li className='navbar__item'>
                    <PiNotePencilFill className='navbar--icon' />
                    Blogs
                </li>
                <li className='navbar__item'>
                    <MdConnectedTv className='navbar--icon' />
                    Channels
                </li>
                <li className='navbar__item'>
                    <BiNetworkChart className='navbar--icon' />
                    DigiWorks
                </li>
                <li className='navbar__item'>
                    <GiShoppingBag className='navbar--icon' />
                    Market
                </li>
                <li className='navbar__item'>
                    <BsFillGridFill className='navbar--icon' />
                    More
                </li>
            </ul>

            <div className='navbar--others'>
                {!user ? (
                    <a href="https://tajify.com/signup" className="nav__button" style={{ color: '#ff0066', fontWeight: "500" }}>Get Started</a>
                ):
                    <>
                        <BsFillBellFill className='navbar--others-icon' />
                        <span className='navbar--profile'>
                            <img className='navbar--profile-img' src={user?.image || AvatarImg} alt={user?.image || AvatarImg } />
                            <p>{user?.fullName || user?.username}</p>
                            <BsChevronDown />
                        </span>
                    </>
                }
            </div>
        </nav>
    </header>
  )
}

export default MainGreenHeader;
