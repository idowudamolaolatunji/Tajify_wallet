import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { VscLibrary } from "react-icons/vsc";
import { BsBarChart } from "react-icons/bs";
import { CiWallet } from "react-icons/ci";
import { MdOutlineLogout } from "react-icons/md";
import { useAuthContext } from "../context/AuthContext";

function DropdownMenu({}) {
	const { logout } = useAuthContext();

  	function handleLogout () {
		logout();

		setTimeout(() => {
      		window.location.href="https://tajify.com"
		}, 1000)
	}

	return (
		// <div className="outsidemodal"></div>
		<div className="dropdown-menu shadow-2xl">
			<ul className="dropdown-list dropdown-list--top">
				<a href="https://tajify.com/profile">
					<li className="dropdown-item">
						<AiOutlineUser />
						<p>Profile</p>
					</li>
				</a>

				<a href="https://tajify.com/coming-soon">
					<li className="dropdown-item">
						<VscLibrary />
						<p>Library</p>
					</li>
				</a>

				<a href="https://tajify.com/coming-soon">
					<li className="dropdown-item">
						<BsBarChart />
						<p>Stats</p>
					</li>
				</a>

				<a href="https://tajify.com/#">
					<li className="dropdown-item" style={{ color: '#ff0066' }}>
						<CiWallet />
						<p>Wallet</p>
					</li>
				</a>

				<li className="dropdown-item" onClick={handleLogout}>
					<MdOutlineLogout  />

					<p>Logout</p>
				</li>
			</ul>

			<ul className="dropdown-list dropdown-list--bottom">
				<a href="https://tajify.com/settings">
					<li className="dropdown-item">
						<p>Settings</p>
					</li>
				</a>

				<a href="https://tajify.com/coming-soon">
					<li className="dropdown-item">
						<p>Recommendation</p>
					</li>
				</a>

				<a href="https://tajify.com/coming-soon">
					<li className="dropdown-item">
						<p>Publication</p>
					</li>
				</a>

				<a href="https://tajify.com/coming-soon">
					<li className="dropdown-item">
						<p>Help Center</p>
					</li>
				</a>

				<a href="https://tajify.com/coming-soon">
					<li className="dropdown-item">
						<p>Upgrade</p>
					</li>
				</a>
			</ul>
		</div>
	);
}

export default DropdownMenu;
