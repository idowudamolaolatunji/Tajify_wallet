import React, {useEffect, useState} from "react";

import { useAuthContext } from '../../context/AuthContext';
import DashboardTable from "../../components/DashboardTable";
import WalletActions from "../../components/WalletActions";
import MainHeader from "../../components/MainHeader";
import WalletInsightCard from "../../components/WalletInsightCard";
import {currencyConverter} from '../../utils/helper';

import { FaSackDollar, FaUserPen } from "react-icons/fa6";
import { GiCrownCoin, GiMoneyStack, GiTakeMyMoney } from "react-icons/gi";
import AvatarImg from '../../assets/imgs/pngs/avatar.png'

import "./main.css";

function index() {
	const { user, token, handleUser } = useAuthContext();
    const [activeModalTab, setActiveModalTab] = useState('deposit');
	const [isDataUpdated, setIsDataUpdated] = useState(false);
	const [userSlots, setUserSlots] = useState([])

	function onUpdate(data) {
		setIsDataUpdated(data);
	}

	function getSlots(slots) {
		setUserSlots(slots);
	}

	useEffect(() => {
		async function updateUser() {
			try {
				const res = await fetch('http://127.0.0.1:3005/api/users/getMyObj', {
					headers: {
						"Content-Type": "application/json",
                		Authorization: `Bearer ${token}`
					}
				});

				const data = await res.json();
				handleUser(data.data.user);
			} catch(err) {
				console.log(err);
			}
		} 
		updateUser()
	}, [isDataUpdated]);

	return (
		<>
			<MainHeader />
			<div className="dashboard__wallet section__container">

				<div className="wallet__top">
					<div className="wallet--profile">
						<span className="wallet--profile-image">
							<img src={user?.image} alt={user.image} />
						</span>
						{/* <a href="https://tajify.com/profile" className="wallet--profile-btn"><FaUserPen style={{ fontSize: "1.6rem" }} /> My Profile</a> */}
						<a href="https://tajify.com/profile" className="wallet--profile-btn"> My Profile</a>
					</div>

					<div className="wallet--cards wallet">
                        <div className='admin__insight'>
							{console.log(user.nairaWalletBalance)}
                            <WalletInsightCard
							insightIcon={<GiMoneyStack />} insightTitle={'Naira Balance'}
							insightFigure={`₦${currencyConverter(user?.nairaWalletBalance)}`}
							pendingInsightTitle={'Pending Naira'}
							pendingInsightFigure={`₦${currencyConverter(user?.pendingNairaBalance)}`} />

                            <WalletInsightCard
							insightIcon={<GiCrownCoin />} insightTitle={'TAJI Balance'}
							insightFigure={`TAJI ${currencyConverter(user?.tajiWalletBalance)}`}
							pendingInsightTitle={'Pending Taji'}
							pendingInsightFigure={`TAJI ${currencyConverter(user?.pendingTajiBalance)}`}/>

                            <WalletInsightCard
							insightIcon={<FaSackDollar  />}
							insightTitle={'USDT Balance'}
							insightFigure={`$${currencyConverter(user?.usdtWalletBalance)}`}
							pendingInsightTitle={'Pending usdt'}
							pendingInsightFigure={`$${currencyConverter(user?.pendingUsdtBalance)}`} />
                        </div>
                            
                        <WalletActions onUpdate={onUpdate} userSlots={userSlots} />
					</div>
				</div>

				<div className="wallet__bottom">
					<span>
						<h3 className="wallet--heading">Transactions History</h3>

						<div className="wallet--tabs">
							<span className={`wallet--tab ${activeModalTab === "deposit" && "tab--active"}`} onClick={() => { setActiveModalTab("deposit")}}>Deposit</span>

							<span className={`wallet--tab ${activeModalTab === "withdrawal" && "tab--active"}`} onClick={() => { setActiveModalTab("withdrawal")}}>Withdrawal</span>
							
							<span className={`wallet--tab ${activeModalTab === "staking" && "tab--active"}`} onClick={() => { setActiveModalTab("staking")}}>Staking</span>
						</div>

					</span>
					
					<DashboardTable getSlots={getSlots} activeModalTab={activeModalTab} isDataUpdated={isDataUpdated} />
				</div>
			</div>

		</>
	);
}

export default index;
