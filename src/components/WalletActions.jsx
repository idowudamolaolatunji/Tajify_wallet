import React, { useState } from "react";

// import WalletTabModal from "./WalletTabModal";

import { RiLuggageDepositLine } from "react-icons/ri";
import { BiMoneyWithdraw } from "react-icons/bi";
import { MdOutlineCurrencyExchange } from "react-icons/md";
import { LuWorkflow } from "react-icons/lu";
// import { GrRisk } from "react-icons/gr";
// import { GiProfit } from "react-icons/gi";
import WalletPaymentModal from "./WalletPaymentModal";

function WalletActions({ onUpdate, updateUser }) {
	const [modalDeposit, setModalDeposit] = useState(false);
	
	function toggleDepositModal() {
		setModalDeposit(!modalDeposit);
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
				<div className="wallet--actions-item">
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
			{modalDeposit && <WalletPaymentModal onUpdate={onUpdate} />}
			{/* {modalDeposit && <WalletTabModal />} */}
		</>
	);
}

export default WalletActions;
