import React, {useState } from 'react'

import CurrencyInput from 'react-currency-input-field';
import { useAuthContext } from '../context/AuthContext';

import { AiFillCheckCircle, AiFillExclamationCircle, AiOutlineClose } from "react-icons/ai";
import AlertPopup from "./AlertPopup";
import Spinner from './Spinner';

import { currencyConverter } from '../utils/helper';


const formStyle = {
	width: "50rem",
    height: '35rem',
};

const timeout = 3500;

function WalletWithdrawalsModal({ onUpdate, handleClose }) {
    const { token } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false)
    // const [isOpen, setIsOpen] = useState(true)
    const [activeModalTab, setActiveModalTab] = useState('naira');

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showFailedAlert, setShowFailedAlert] = useState(false);
    const [isSuccessful, setIsSuccessful] = useState(false);

    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState('');
    const [tajiAmount, setTajiAmount] = useState('');
    const [tajiAddress, setTajiAddress] = useState('');
    const [password, setPassword] = useState('');


    function handleCloseModal() {
        handleClose();
	}

    function handleActiveTab(tabName) {
        setActiveModalTab(tabName);
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

    async function handleNairaWithdrawal(e) {
        try {
            e.preventDefault();
            setIsLoading(true);

            const res = await fetch('http://127.0.0.1:3005/api/wallets/withdraw-naira', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ amount }),
            });
            if(!res.ok) {
                setIsLoading(false);
                setErrorMessage('Transaction Not Complete, Check Connection!');
                return handleFailure();
            }
            const data = await res.json();
            if(data?.status === 'success') {
                setIsLoading(false)
                setSuccessMessage(`Withdrawal request of ₦${amount} was just made!`);
                onUpdate(true)
                handleSuccess();
                return;
            }
            if(data.message) {
                throw new Error(data.message)
            }
        } catch(err) {
            setIsLoading(false);
            setErrorMessage(err.message || 'Transaction not completed!')
            handleFailure();
            console.log(err.message);
        }
    }

    async function handleTajiWithdrawal(e) {
        try {
            e.preventDefault();
            setIsLoading(true);

            const res = await fetch('http://127.0.0.1:3005/api/wallets/withdraw-taji', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ amount: tajiAmount, TAJIBEP20Address:tajiAddress }),
            });
            if(!res.ok) {
                setIsLoading(false);
                setErrorMessage('Transaction Not Complete, Check Connection!');
                return handleFailure();
            }
            const data = await res.json();
            console.log(data)
            if(data?.status === 'success') {
                setIsLoading(false)
                setSuccessMessage(`Withdrawal request of TAJI ${currencyConverter(tajiAmount)} was just made!`);
                onUpdate(true);
                handleSuccess();
                return;
            }
            if(data.message) {
                throw new Error(data.message)
            }
        } catch(err) {
            setIsLoading(false);
            setErrorMessage(err.message || 'Transaction not completed!')
            handleFailure();
            console.log(err.message);
        }
    }



    return (
        <>
            {!isSuccessful && (
                <div className="overlay">
                    <div className="modal" style={formStyle}>
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
                                <form className="payment--form" onSubmit={handleNairaWithdrawal}>
                                    <div className="form__item">
                                        <label className="form__label" htmlFor="name">
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
                                            Withdrawal Amount
                                        </label>
                                        <CurrencyInput
                                            id="amount"
                                            className="form__input"
                                            placeholder="Enter Your Desired Amount"
                                            defaultValue={amount}
                                            value={amount}
                                            decimalsLimit={2}
                                            required
                                            prefix='₦ '
                                            onValueChange={(value, _) => setAmount(value)}
                                        />
                                    </div>
                                    <div className="form__item">
                                        <label className="form__label" htmlFor="password">
                                            Password Confirmation
                                        </label>
                                        <input
                                            className="form__input"
                                            type="password"
                                            id="password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            value={password}
                                            required
                                            placeholder="Your Password for confirmation"
                                        />
                                    </div>

                                    <div className="form__item">
                                        <button className="form__submit">
                                            Withdrawal Request
                                        </button>
                                    </div>
                                </form>
                            )}

                            {activeModalTab === "taji" && (
                                <form className="payment--form" onSubmit={handleTajiWithdrawal}>
                                    <div className="form__item">
                                        <label className="form__label" htmlFor="taji-address">
                                            Taji Wallet Address
                                        </label>
                                        <input
                                            className="form__input"
                                            type="text"
                                            id="taji-address"
                                            onChange={(e) => setTajiAddress(e.target.value)}
                                            value={tajiAddress}
                                            required
                                            placeholder="Your Taji Wallet Address"
                                        />
                                    </div>

                                    <div className="form__item">
                                        <label className="form__label" htmlFor="taji-amount">
                                            TAJI Withdrawal Amount
                                        </label>
                                        <CurrencyInput
                                            id="taji-amount"
                                            required
                                            className="form__input"
                                            placeholder="Enter Your Desired Amount"
                                            defaultValue={tajiAmount}
                                            value={tajiAmount}
                                            decimalsLimit={2}
                                            prefix='TAJI  '
                                            onValueChange={(value, _) => setTajiAmount(value)}
                                        />
                                    </div>
                                    
                                    <div className="form__item">
                                    <label className="form__label" htmlFor="password">
                                            Password Confirmation
                                        </label>
                                        <input
                                            className="form__input"
                                            type="password"
                                            id="password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            value={password}
                                            required
                                            placeholder="Your Password for confirmation"
                                        />
                                    </div>
                                    
                                    <div className="form__item">
                                        <button className="form__submit" type="submit">
                                            Withdrawal Request
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

            {showSuccessAlert && (
                <AlertPopup alertType={"success"}>
                    <AiFillCheckCircle className="alert--icon" />
                    {onUpdate(false)}
                    <p>{successMessage}</p>
                </AlertPopup>
            )}

            {showFailedAlert && (
                <AlertPopup alertType={"error"}>
                    <AiFillExclamationCircle className="alert--icon" />
                    {onUpdate(false)}
                    <p>{errorMessage}</p>
                </AlertPopup>
            )}
        </>
	);
}

export default WalletWithdrawalsModal;
