import React, { useState } from "react";

import { RiLuggageDepositLine } from "react-icons/ri";
import { BiMoneyWithdraw } from "react-icons/bi";
import { MdOutlineCurrencyExchange } from "react-icons/md";
import { LuWorkflow } from "react-icons/lu";
import WalletDepositsModal from "./WalletDepositsModal";
import WalletWithdrawalsModal from "./WalletWithdrawalsModal";
import WalletStakingModal from "./WalletStakingModal";
import WalletConvertModal from "./WalletConvertModal";

function WalletActions({ onUpdate, userSlots }) {
	const [modalDeposit, setShowModalDeposit] = useState(false);
	const [modalWithdrawal, setShowModalWithdrawal] = useState(false);
	const [modalConvert, setShowModalConvert] = useState(false);
	const [modalStaking, setShowModalStaking] = useState(false);

	// HANDLE TOGGLE/OPEN FUNTIONS
	function toggleDepositModal() {
		setShowModalDeposit(true);
	}
	function toggleWithdrawalModal() {
		setShowModalWithdrawal(true);
	}
	function toggleConvertModal() {
		setShowModalConvert(true);
	}
	function toggleStakingModal() {
		setShowModalStaking(true);
	}

	// HANDLE CLOSE FUNCTIONS
	function handleDepositModalClose() {
		setShowModalDeposit(false);
	}
	function handleWithdrawalModalClose() {
		setShowModalWithdrawal(false);
	}
	function handleConvertModalClose() {
		setShowModalConvert(false);
	}
	function handleStakingModalClose() {
		setShowModalStaking(false);
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
					setShowModalDeposit={setShowModalDeposit}
				/>
			)}
			{modalWithdrawal && (
				<WalletWithdrawalsModal
					key={"withdrawal"}
					onUpdate={onUpdate}
					handleClose={handleWithdrawalModalClose}
					setShowModalWithdrawal={setShowModalWithdrawal}
				/>
			)}
			{modalConvert && (
				<WalletConvertModal
					key={"convert"}
					onUpdate={onUpdate}
					handleClose={handleConvertModalClose}
					setShowModalConvert={setShowModalConvert}
				/>
			)}
			{modalStaking && (
				<WalletStakingModal
					key={"staking"}
					onUpdate={onUpdate}
					userSlots={userSlots}
					handleClose={handleStakingModalClose}
					setShowModalStaking={setShowModalStaking}
				/>
			)}
		</>
	);
}

export default WalletActions;
