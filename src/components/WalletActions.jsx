import React, { useState } from "react";

// import WalletTabModal from "./WalletTabModal";
{
	/* {modalDeposit && <WalletTabModal />} */
}

import { RiLuggageDepositLine } from "react-icons/ri";
import { BiMoneyWithdraw } from "react-icons/bi";
import { MdOutlineCurrencyExchange } from "react-icons/md";
import { LuWorkflow } from "react-icons/lu";
// import { GrRisk } from "react-icons/gr";
// import { GiProfit } from "react-icons/gi";
import WalletDepositsModal from "./WalletDepositsModal";
import WalletWithdrawalsModal from "./WalletWithdrawalsModal";
import WalletStakingModal from "./WalletStakingModal";

function WalletActions({ onUpdate, userSlots }) {
	const [modalDeposit, setModalDeposit] = useState(false);
	const [modalWithdrawal, setModalWithdrawal] = useState(false);
	const [modalConvert, setModalConvert] = useState(false);
	const [modalStaking, setModalStaking] = useState(false);

	// HANDLE TOGGLE/OPEN FUNTIONS
	function toggleDepositModal() {
		setModalDeposit(true);
	}
	function toggleWithdrawalModal() {
		setModalWithdrawal(true);
	}
	function toggleConvertModal() {
		setModalConvert(true);
	}
	function toggleStakingModal() {
		setModalStaking(true);
	}

	// HANDLE CLOSE FUNCTIONS
	function handleDepositModalClose() {
		setModalDeposit(false);
	}
	function handleWithdrawalModalClose() {
		setModalWithdrawal(false);
	}
	function handleStakingModalClose() {
		setModalStaking(false);
	}

	return (
		<>
			<div className="wallet--cards-actions">
				<div className="wallet--actions-item" onClick={toggleDepositModal}>
					<span>
						<RiLuggageDepositLine className="wallet--action-icon" />
					</span>
					<span>Deposit</span>
				</div>

				<div className="wallet--actions-item" onClick={toggleWithdrawalModal}>
					<span>
						<BiMoneyWithdraw className="wallet--action-icon" />
					</span>
					<span>Withdraw</span>
				</div>

				<div className="wallet--actions-item" onClick={toggleConvertModal}>
					<span>
						<MdOutlineCurrencyExchange className="wallet--action-icon" />
					</span>
					<span>Convert</span>
				</div>

				<div className="wallet--actions-item" onClick={toggleStakingModal}>
					<span>
						<LuWorkflow className="wallet--action-icon" />
					</span>
					<span>Stake</span>
				</div>
			</div>

			{modalDeposit && (
				<WalletDepositsModal
					key={"deposit"}
					onUpdate={onUpdate}
					handleClose={handleDepositModalClose}
				/>
			)}
			{modalWithdrawal && (
				<WalletWithdrawalsModal
					key={"withdrawal"}
					onUpdate={onUpdate}
					handleClose={handleWithdrawalModalClose}
				/>
			)}
			{/* {modalConvert && <WalletConvertModal onUpdate={onUpdate} handleClose={'-'} />} */}
			{modalStaking && (
				<WalletStakingModal
					key={"staking"}
					onUpdate={onUpdate}
					userSlots={userSlots}
					handleClose={handleStakingModalClose}
				/>
			)}
		</>
	);
}

export default WalletActions;
