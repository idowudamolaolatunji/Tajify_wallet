import React, { useEffect, useState } from "react";

import CurrencyInput from "react-currency-input-field";

import { AiFillCheckCircle, AiFillExclamationCircle, AiOutlineClose } from "react-icons/ai";
import { GiCrownCoin } from "react-icons/gi";
import { FaCubesStacked } from "react-icons/fa6";

import AlertPopup from "./AlertPopup";

import Spinner from "./Spinner";
import { useAuthContext } from "../context/AuthContext";
import { currencyConverter, numberConverter } from "../utils/helper";

const formStyle = {
	width: "50rem",
	height: "auto",
};

const timeout = 3000;
const timeoutError = 2500;

const slotPrice = 20000;

function WalletStakingModal({ onUpdate, handleClose, userSlots, setShowModalStaking }) {
	const { user, token } = useAuthContext();
	const [isLoading, setIsLoading] = useState(false);

	const [showSuccessAlert, setShowSuccessAlert] = useState(false);
	const [showFailedAlert, setShowFailedAlert] = useState(false);
	const [errorBorder, setErrorBorder] = useState(false);
	const [isInsufficient, setIsInsufficient] = useState(false);
	const [isNegative, setIsNegative] = useState(false);

	const [slotAmount, setSlotAmount] = useState("");
	const totalAmount = Number(slotAmount * slotPrice);
	const transactionFee = Number(totalAmount * 0.005);
	const finalTotal = totalAmount + transactionFee;
	const userCurrentBalance = user.tajiWalletBalance;
	//////////////////////////////////////////////////

	function handleCloseModal() {
		handleClose();
	}
	function handleFailure() {
		setShowFailedAlert(true);
		setTimeout(() => {
			setShowFailedAlert(false);
			setIsInsufficient(false);
			setIsNegative(false);
		}, timeoutError);
		setShowModalStaking(true);
	}
	function handleSuccess() {
		setShowSuccessAlert(true);
		setTimeout(() => {
			setShowSuccessAlert(false);
		}, timeout);
		setShowModalStaking(false);
	}

	function handleErrorBorder() {
		setErrorBorder(true);
		setTimeout(() => {
			setErrorBorder(false);
		}, timeout);
	}

	async function handleStaking(e) {
		try {
			e.preventDefault();
			setIsLoading(false);
			if (slotAmount < 1) {
				handleFailure();
				setIsLoading(false);
				setIsNegative(true);
				return;
			}
			if (userCurrentBalance < finalTotal) {
				handleFailure();
				handleErrorBorder();
				setIsLoading(false);
				setIsInsufficient(true);
				return;
			}
			setIsLoading(true);

			const res = await fetch("http://127.0.0.1:3005/api/stakings/stakeholder-staking", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					stakeHolderUsername: user.username,
					slotAmount,
				}),
			});

			if (!res.ok) {
				setIsLoading(false);
				handleFailure();
				return;
			}
			const data = await res.json();
			if (data?.status === "success") {
				setIsInsufficient(false);
				setIsLoading(false);
				onUpdate(true);
				handleSuccess();
				return;
			}
		} catch (err) {
			setIsLoading(false);
			handleFailure();
			return;
		}
	}

	return (
		<div>
			<>
				<div className="overlay">
					<div className="modal" style={{ formStyle }}>
						<span className="modal--head">
							<p className="payment--heading">Liquidity Pool Staking</p>
							<AiOutlineClose className="modal--icon" onClick={handleCloseModal} />
						</span>

						<div className="modal__content">
							{isLoading && <Spinner />}

							<form className="payment--form" onSubmit={handleStaking}>
								<div className="form--insights">
									<span
										className={`form--insight ${
											errorBorder ? "invalid-task" : ""
										}`}
									>
										<span className="form--insight-icon">
											<GiCrownCoin className="form-icon" />
										</span>

										<span className="form--insight-content">
											<p>Current TAJI Balance</p>
											<p>TAJI {numberConverter(user.tajiWalletBalance)}</p>
										</span>
									</span>

									<span className="form--insight">
										<span className="form--insight-icon">
											<FaCubesStacked className="form-icon" />
										</span>

										<span className="form--insight-content">
											<p>Already Bought Slots</p>
											<p>{userSlots} Slots</p>
										</span>
									</span>
								</div>

								<div className="form__item">
									<label className="form__label" htmlFor="amount">
										Slots Amount
									</label>

									<CurrencyInput
										id="amount"
										className="form__input"
										placeholder="Amount of Slots"
										defaultValue={slotAmount}
										value={slotAmount}
										required
										suffix=" Slots"
										onValueChange={(value, _) => setSlotAmount(value)}
									/>

									<span className="form--total">
										Price:<p>TAJI {numberConverter(totalAmount || 0)}</p>
									</span>
								</div>

								<div className="form__item">
									<span className="form--dotted">
										<p className="dotted--title">Gas Fee.</p>
										<p className="dotted--detail">
											TAJI {numberConverter(transactionFee || 0)}
										</p>
									</span>
								</div>

								<div className="form__item">
									<button className="form__submit">Stake Now</button>
								</div>
							</form>
						</div>
					</div>
				</div>

				{showSuccessAlert && (
					<AlertPopup key={"success"} alertType={"success"}>
						<AiFillCheckCircle className="alert--icon" />
						<p>
							{onUpdate(false)}
							You successfully bought {numberConverter(slotAmount)} Slots!
						</p>
					</AlertPopup>
				)}

				{showFailedAlert && (
					<AlertPopup key={"error"} alertType={"error"}>
						<AiFillExclamationCircle className="alert--icon" />
						<p>
							{onUpdate(false)}
							{isNegative
								? "You cannot buy slots of a negative value!"
								: isInsufficient
								? `You don't have enough TAJI to buy ${numberConverter(
										slotAmount,
								  )} slots!`
								: "Staking Failed!"}
						</p>
					</AlertPopup>
				)}
			</>
		</div>
	);
}

export default WalletStakingModal;
