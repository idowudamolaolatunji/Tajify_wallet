import React, { useState } from "react";

import { LuHome } from "react-icons/lu";
import { PiNotePencilFill } from "react-icons/pi";
import { MdConnectedTv } from "react-icons/md";
import { BiNetworkChart } from "react-icons/bi";
import { GiHamburgerMenu, GiShoppingBag } from "react-icons/gi";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFillGridFill, BsFillBellFill, BsChevronDown, BsChevronUp } from "react-icons/bs";

import DropdownMenu from "./DropdownMenu";
import LogoImg from "../assets/imgs/pngs/logo-complete.png";

import { useAuthContext } from "../context/AuthContext";

function MainHeader() {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [isShowMobileMenu, setIsShowMobileMenu] = useState(false)
	const { user } = useAuthContext();

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};
	const toggleMobileMenu = () => {
		setIsShowMobileMenu(!isShowMobileMenu);
	};

	return (
		<>
			<header className="main-header main">
				<a href="https://tajify.com/">
					<span className="logo__box">
						<img src={LogoImg} alt={LogoImg} />
					</span>
				</a>

				<span className="header__input">
					<input type="search" placeholder="Search..." readOnly />
					<AiOutlineSearch className="header__input-icon" />
				</span>

				<nav className="main-navbar">
					<ul className="navbar__list">
						<a href="https://tajify.com/">
							<li className="navbar__item">
								<LuHome className="navbar--icon" />
								Home
							</li>
						</a>

						<a href="https://tajify.com/writer">
							<li className="navbar__item">
								<PiNotePencilFill className="navbar--icon" />
								Blogs
							</li>
						</a>

						<a href="https://tajify.com/coming-soon">
							<li className="navbar__item">
								<MdConnectedTv className="navbar--icon" />
								Channels
							</li>
						</a>

						<a href="https://tajify.com/coming-soon">
							<li className="navbar__item">
								<BiNetworkChart className="navbar--icon" />
								DigiWorks
							</li>
						</a>

						<a href="https://tajify.com/market">
							<li className="navbar__item">
								<GiShoppingBag className="navbar--icon" />
								Market
							</li>
						</a>

						<a href="https://tajify.com/coming-soon">
							<li className="navbar__item">
								<BsFillGridFill className="navbar--icon" />
								More
							</li>
						</a>
					</ul>

					<div className="navbar--others">
						{!user ? (
							<a
								href="https://tajify.com/signup"
								className="nav__button"
								style={{ color: "#ff0066", fontWeight: "500" }}
							>
								Get Started
							</a>
						) : (
							<>
								<BsFillBellFill className="navbar--others-icon" />
								<span className="navbar--profile">
									<img
										className="navbar--profile-img"
										src={user?.image}
										alt={user?.image}
									/>
									<a href="https://tajify.com/profile">
										<p className="profile-user">{user?.fullName || user?.username}</p>
									</a>
									

									{isDropdownOpen ?  <BsChevronUp style={{color: "#ff0066"}} onClick={toggleDropdown} /> : <BsChevronDown onClick={toggleDropdown} />}
									{isDropdownOpen && (
									<DropdownMenu toggleDropdown={toggleDropdown} />
									)}
								</span>
							</>
						)}
					</div>
				</nav>
			</header>


			{/* MOBILE HEADER */}

			<header className="main-header main-mobile">
				<a href="https://tajify.com/">
					<span className="logo__box">
						<img src={LogoImg} alt={LogoImg} />
					</span>
				</a>


				<nav className="navbar--others">
					{!user ? (
						<a
							href="https://tajify.com/signup"
							className="nav__button"
							style={{ color: "#ff0066", fontWeight: "500" }}
						>
							Get Started
						</a>
					) : (
						<>
							<BsFillBellFill className="navbar--others-icon" />
							<span className="navbar--profile">
								<img
									className="navbar--profile-img"
									src={user?.image}
									alt={user?.image}
								/>
								<p className="profile-user">{user?.fullName || user?.username}</p>
								

								{isDropdownOpen ?  <BsChevronUp style={{color: "#ff0066"}} onClick={toggleDropdown} /> : <BsChevronDown onClick={toggleDropdown} />}
								{isDropdownOpen && (
								<DropdownMenu toggleDropdown={toggleDropdown} />
								)}
							</span>
						</>
					)}
					
					<GiHamburgerMenu className="navbar--others-icon" style={isShowMobileMenu ? { color: "#ff0066" } : ''} onClick={toggleMobileMenu} />
					{isShowMobileMenu && <ul className="mobile-navbar__list">
						<a href="https://tajify.com/">
							<li className="navbar__item">
								<LuHome className="navbar--icon" />
								Home
							</li>
						</a>

						<a href="https://tajify.com/writer">
							<li className="navbar__item">
								<PiNotePencilFill className="navbar--icon" />
								Blogs
							</li>
						</a>

						<a href="https://tajify.com/coming-soon">
							<li className="navbar__item">
								<MdConnectedTv className="navbar--icon" />
								Channels
							</li>
						</a>

						<a href="https://tajify.com/coming-soon">
							<li className="navbar__item">
								<BiNetworkChart className="navbar--icon" />
								DigiWorks
							</li>
						</a>

						<a href="https://tajify.com/market">
							<li className="navbar__item">
								<GiShoppingBag className="navbar--icon" />
								Market
							</li>
						</a>

						<a href="https://tajify.com/coming-soon">
							<li className="navbar__item nav-active">
								<BsFillGridFill className="navbar--icon" />
								More
							</li>
						</a>
					</ul>}
				</nav>
			</header>
		</>
	);
}

export default MainHeader;

/* 

*/