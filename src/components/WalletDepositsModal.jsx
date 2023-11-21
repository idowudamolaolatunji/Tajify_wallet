import React, { useEffect, useState } from "react";

import CurrencyInput from 'react-currency-input-field';
import QRCode from "react-qr-code";

import { PaystackButton, PaystackConsumer } from "react-paystack";
import { AiFillCheckCircle, AiFillExclamationCircle, AiOutlineClose } from "react-icons/ai";
import { GiDialPadlock } from "react-icons/gi";
import { MdContentCopy } from "react-icons/md";

import AlertPopup from "./AlertPopup";
import "../assets/css/custom.css";


const timeout = 3500;
let charges;

const calcTotalAmount = function (amount) {
	const calcChargesAmount = (3 / 100) * amount;
	if (calcChargesAmount > 3000) {
		charges = 3000;
	} else {
		charges = calcChargesAmount;
	}
	console.log(charges, amount + charges);
	return amount + charges;
};

// import "@patternfly/react-core/dist/styles/base.css";
import Spinner from "./Spinner";
import { useAuthContext } from "../context/AuthContext";


function WalletPaymentModal({ onUpdate, handleClose }) {
    const { token } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false)
    
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showCopiedAlert, setShowCopiedAlert] = useState(false)
    const [showFailedAlert, setShowFailedAlert] = useState(false);
    const [isSuccessful, setIsSuccessful] = useState(false);

    const publicKey = "pk_test_8fa5be5a113286b23f7775fe7f34c94ffd338c8c"
    const [fullName , setFullName] = useState('')
    const [email , setEmail] = useState('')
    const [amount , setAmount] = useState('')
    const [hashKey, setHashKey] = useState('');
    const [tajiAmount, setTajiAmount] = useState('');
    
    // const [isOpen, setIsOpen] = useState(true)
    const [activeModalTab, setActiveModalTab] = useState('naira');

    const amountInKobo = calcTotalAmount(Number(amount)) * 100;
    const componentProps = {
        email,
        amount: amountInKobo,
        metadata: {
            name: fullName,
        },
        publicKey,
        text: "Deposit Now",
        onSuccess: ({ reference }) => handleNairaDeposit(reference),
        onClose: handleFailure,
    };

	function handleCloseModal() {
        handleClose();
	}

    function handleActiveTab(tabName) {
        setActiveModalTab(tabName);
    }

    function copyInput() {
        navigator.clipboard.writeText('1Lbcfr7sAHTD9CgdQo3HTMTkV8LK4ZnX71');
        setShowCopiedAlert(true);
        setTimeout(() => {
            setShowCopiedAlert(false);
        }, timeout);
    }

    function handleFailure() {
        setShowFailedAlert(true);
        setTimeout(() => {
            setShowFailedAlert(false);
        }, timeout);
        setIsSuccessful(false)
    }

    function handleSuccess() {
        setShowSuccessAlert(true);
        setTimeout(() => {
            setShowSuccessAlert(false);
        }, timeout);
        setIsSuccessful(true)
    }

    async function handleNairaDeposit(reference) {
        try {
            setIsLoading(true)
            const res = await fetch(`http://127.0.0.1:3005/api/wallets/payment-verification/${reference}/${charges}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });
            if(!res.ok) {
                setIsLoading(false)
                return handleFailure();
            }
            const data = await res.json();
            console.log(data)

            if(data.status === 'success') {
                setIsLoading(false);
                onUpdate(true);
                handleSuccess();
            }
            setIsSuccessful(true);
        } catch(err) {
            setIsLoading(false);
            handleFailure();
        }
    }

    async function handleTajiDeposit(e) {
        try {
            e.preventDefault();
            setIsLoading(true);

            // const res = await fetch('https://api.tajify.com/api/wallets/deposit-taji', {
            const res = await fetch('http://127.0.0.1:3005/api/wallets/deposit-taji', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ amount: tajiAmount, transactionHash: hashKey }),
            });
            if(!res.ok) {
                setIsLoading(false);
                return handleFailure();
            }
            const data = await res.json();
            console.log(data)

            if(data.status === 'success') {
                setIsLoading(false);
                onUpdate(true);
                handleSuccess();
            }
            setIsSuccessful(true);
        } catch(err) {
            setIsLoading(false);
            handleFailure();
        }
    }
    

	return (
        <>
            {isSuccessful === false && (
                <div className="overlay">
                    <div className="modal">
                        <span className="modal--head">
                            <div className="wallet--tabs tabs--modal">
                                <span className={`wallet--tab ${activeModalTab === "naira" && "tab--active"}`}
                                    onClick={() => { handleActiveTab("naira")}}> NAIRA </span>
                                <span className={`wallet--tab ${activeModalTab === "taji" && "tab--active"}`}
                                    onClick={() => { handleActiveTab("taji") }}> TAJI </span>
                                <span className={`wallet--tab ${activeModalTab === "usdt" && "tab--active"}`}
                                    onClick={() => { handleActiveTab("usdt") }}> USDT </span>
                            </div>

                            <AiOutlineClose className="modal--icon" onClick={handleCloseModal} />
                        </span>
                        <div className="modal__content">

                            { isLoading && <Spinner /> }

                            {activeModalTab === "naira" && (
                                <form className="payment--form" onSubmit={(e) => e.preventDefault()}>
                                    <div className="form__item">
                                        <label className="form__label" htmlFor="name">
                                            FullName
                                        </label>
                                        <input
                                            className="form__input"
                                            type="name"
                                            id="name"
                                            onChange={(e) => setFullName(e.target.value)}
                                            value={fullName}
                                            required
                                            placeholder="Your FullName"
                                        />
                                    </div>
                                    <div className="form__item">
                                        <label className="form__label" htmlFor="email">
                                            Email Address
                                        </label>
                                        <input
                                            className="form__input"
                                            type="email"
                                            id="email"
                                            onChange={(e) => setEmail(e.target.value)}
                                            value={email}
                                            required
                                            placeholder="Your Email Address"
                                        />
                                    </div>
                                    <div className="form__item">
                                        <label className="form__label" htmlFor="amount">
                                            Amount
                                        </label>
                                        <CurrencyInput
                                            id="amount"
                                            className="form__input"
                                            placeholder="Enter Deposit Amount"
                                            defaultValue={amount}
                                            value={amount}
                                            decimalsLimit={2}
                                            required
                                            prefix='₦ '
                                            onValueChange={(value, _) => setAmount(value)}
                                        />

                                    </div>
                                    {fullName.trim() !== '' && email.trim() !== '' && amount.trim() !== '' ?

                                        <div className="form__item">
                                            <PaystackButton className="form__submit" {...componentProps} />
                                        </div> : 

                                        <div className="form__item">
                                            <button className="form__submit">
                                                Deposit Now
                                            </button>
                                        </div>
                                    }
                                </form>
                            )}

                            {activeModalTab === "taji" && (
                                <form className="payment--form" onSubmit={handleTajiDeposit}>
                                    <div className="form__item">
                                        <label className="form__label" htmlFor="name">
                                            Taji Wallet Address / QR Code
                                        </label>
                                        <span className="copy-input-box" >
                                            <input className="form__input" value={'1Lbcfr7sAHTD9CgdQo3HTMTkV8LK4ZnX71'} style={{ backgroundColor: '#eee'}} readOnly />

                                            <MdContentCopy className="copy-input-icon" onClick={copyInput} />
                                        </span>
                                    </div>


                                    <div className="form__item form__qr">
                                        <QRCode
                                        value={'1Lbcfr7sAHTD9CgdQo3HTMTkV8LK4ZnX71'}
                                        />
                                    </div>

                                    <div className="form__item">
                                        <label className="form__label" htmlFor="taji-amount">
                                            TAJI amount
                                        </label>
                                        <CurrencyInput
                                            id="taji-amount"
                                            required
                                            className="form__input"
                                            placeholder="Enter Taji Amount"
                                            defaultValue={tajiAmount}
                                            value={tajiAmount}
                                            decimalsLimit={2}
                                            prefix='TAJI  '
                                            onValueChange={(value, _) => setTajiAmount(value)}
                                        />
                                    </div>
                                    
                                    <div className="form__item">
                                        <label className="form__label" htmlFor="hash">Transaction HASH</label>
                                        <input className="form__input" required type="text" value={hashKey} onChange={(e) => setHashKey(e.target.value)} placeholder="Enter Transaction Hash" />
                                    </div>

                                    
                                    <div className="form__item">
                                        <button className="form__submit" type="submit">
                                            Submit Proof
                                        </button>
                                    </div>
                                </form>
                            )}

                            {activeModalTab === "usdt" && (
                                <p>Coming Soon..</p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {showCopiedAlert && (
                <AlertPopup alertType={"success"}>
                    <AiFillCheckCircle className="alert--icon" />
                    <p>Copied Successfully!</p>
                </AlertPopup>
            )}

            {showSuccessAlert && (
                <AlertPopup alertType={"success"}>
                    <AiFillCheckCircle className="alert--icon" />
                    <p>
                        {onUpdate(false)}
                        {activeModalTab === 'naira' ? `Deposit of ₦${amount} Successful!` : activeModalTab === 'taji' ? `Deposit of TAJI ${tajiAmount} Successful, Await Confirmation!` : `Deposit of $${'0'} Successful!`}
                    </p>
                </AlertPopup>
            )}

            {showFailedAlert && (
                <AlertPopup alertType={"error"}>
                    <AiFillExclamationCircle className="alert--icon" />
                    <p>
                        {onUpdate(false)}
                        Transaction Not Completed{activeModalTab === 'taji' ? ', Enter Correct Hash' : ''}!
                    </p>
                </AlertPopup>
            )}
        </>
	);
}

export default WalletPaymentModal;
