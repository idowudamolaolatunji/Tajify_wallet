import React, { useState } from "react";

// import WalletTabModal from "./WalletTabModal";
{/* {modalDeposit && <WalletTabModal />} */}

import { RiLuggageDepositLine } from "react-icons/ri";
import { BiMoneyWithdraw } from "react-icons/bi";
import { MdOutlineCurrencyExchange } from "react-icons/md";
import { LuWorkflow } from "react-icons/lu";
// import { GrRisk } from "react-icons/gr";
// import { GiProfit } from "react-icons/gi";
import WalletDepositsModal from "./WalletDepositsModal";
import WalletWithdrawalsModal from "./WalletWithdrawalsModal";

function WalletActions({ onUpdate }) {
	const [modalDeposit, setModalDeposit] = useState(false);
	const [modalWithdrawal, setModalWithdrawal] = useState(false);
	
	function toggleDepositModal() {
		setModalDeposit(!modalDeposit);
	}
	function toggleWithdrawalModal() {
		setModalWithdrawal(!modalWithdrawal);
	}

	return (
		<>
			<div className="wallet--cards-actions">
				<div className="wallet--actions-item" onClick={toggleDepositModal}>
					<span>
						<RiLuggageDepositLine className="wallet--action-icon"/>
					</span>
					<span>Deposit</span>
				</div>

				<div className="wallet--actions-item" onClick={toggleWithdrawalModal}>
					<span>
						<BiMoneyWithdraw className="wallet--action-icon"/>
					</span>
					<span>Withdraw</span>
				</div>

				<div className="wallet--actions-item">
					<span>
						<MdOutlineCurrencyExchange className="wallet--action-icon"/>
					</span>
					<span>Convert</span>
				</div>

				<div className="wallet--actions-item">
					<span>
						<LuWorkflow className="wallet--action-icon"/>
					</span>
					<span>Stake</span>
				</div>
			</div>
			{modalDeposit && <WalletDepositsModal onUpdate={onUpdate} />}
			{modalWithdrawal && <WalletWithdrawalsModal onUpdate={onUpdate} />}

		</>
	);
}

export default WalletActions;
