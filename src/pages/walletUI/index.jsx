import React, {useEffect, useState} from "react";

import { useAuthContext } from '../../context/AuthContext';
import DashboardTable from "../../components/DashboardTable";
import WalletActions from "../../components/WalletActions";
import MainGreenHeader from "../../components/MainGreenHeader";
import WalletInsightCard from "../../components/WalletInsightCard";
import {currencyConverter} from '../../utils/helper';

import { FaSackDollar, FaUserPen } from "react-icons/fa6";
import { GiCrownCoin, GiMoneyStack, GiTakeMyMoney } from "react-icons/gi";
import AvatarImg from '../../assets/imgs/pngs/avatar.png'

import "./main.css";
import "../../assets/css/table.css";

// https://res.cloudinary.com/dy3bwvkeb/image/upload/v1700175346/jassir-jonis-QWa0TIUW638-unsplash_mupxsr.jpg


function index() {
	const { user, token, handleUser } = useAuthContext();
    const [activeModalTab, setActiveModalTab] = useState('deposit');
	const [isDataUpdated, setIsDataUpdated] = useState(false);

	function onUpdate(data) {
		setIsDataUpdated(data);
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
			<MainGreenHeader />
			<div className="dashboard__wallet section__container">

				<div className="wallet__top">
					<div className="wallet--profile">
						<span className="wallet--profile-image">
							<img src={user.image || AvatarImg} alt={user.image || AvatarImg} />
						</span>
						{/* <a href="https://tajify.com/profile" className="wallet--profile-btn"><FaUserPen style={{ fontSize: "1.6rem" }} /> My Profile</a> */}
						<a href="https://tajify.com/profile" className="wallet--profile-btn"> My Profile</a>
					</div>

					<div className="wallet--cards wallet">
                        <div className='admin__insight'>
							{console.log(user.nairaWalletBalance)}
                            <WalletInsightCard
							insightIcon={<GiMoneyStack />} insightTitle={'Naira Balance'}
							insightFigure={`₦${currencyConverter(user.nairaWalletBalance) || "0.00"}`}
							pendingInsightTitle={'pending balance'}
							pendingInsightFigure={'₦0.00'} />

                            <WalletInsightCard
							insightIcon={<GiCrownCoin />} insightTitle={'TAJI Balance'}
							insightFigure={`TAJI ${currencyConverter(user.tajiWalletBalance) || "0.00"}`}
							pendingInsightTitle={'pending balance'}
							pendingInsightFigure={'TAJI 0.00'}/>

                            <WalletInsightCard
							insightIcon={<FaSackDollar  />}
							insightTitle={'USDT Balance'}
							insightFigure={`$${currencyConverter(user.usdtWalletBallance) || "0.00"}`}
							pendingInsightTitle={'pending balance'}
							pendingInsightFigure={'$0.00'} />
                        </div>
                            
                        <WalletActions onUpdate={onUpdate} />
					</div>
				</div>

				<div className="wallet__bottom">
					<span>
						<h3 className="wallet--heading">Transactions History</h3>
						<div className="wallet--tabs">
							<span className={`wallet--tab ${activeModalTab === "deposit" && "tab--active"}`} onClick={() => { setActiveModalTab("deposit")}}>Deposit</span>

							<span className={`wallet--tab ${activeModalTab === "withdrawal" && "tab--active"}`} onClick={() => { setActiveModalTab("withdrawal")}}>Withdrawal</span>
						</div>
					</span>
					
					<DashboardTable activeModalTab={activeModalTab} isDataUpdated={isDataUpdated} />
				</div>
			</div>

		</>
	);
}

export default index;
