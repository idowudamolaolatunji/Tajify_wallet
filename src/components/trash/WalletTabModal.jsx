import React, { useState } from 'react';

import { PaystackButton, PaystackConsumer } from 'react-paystack';

import OverlayModal from '../OverlayModal';
import AlertPopup from '../AlertPopup';

import { AiFillCheckCircle, AiFillExclamationCircle } from 'react-icons/ai';
import { GiDialPadlock } from 'react-icons/gi';
import '../assets/css/custom.css'

const formStyle = {
    width: '50rem',
}
const timeout = 2000;

const calcTotalAmount = function(amount) {
    let charges;
    const calcChargesAmount = 3 / 100 * amount
    if(calcChargesAmount > 3000) {
        charges = 3000
    } else {
        charges = calcChargesAmount;
    }
    console.log(charges, amount + charges)
    return amount + charges;
}

function WalletTabModal() {
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showFailedAlert, setShowFailedAlert] = useState(false);
    const [isSuccessful, setIsSuccessful] = useState(false);

    const publicKey = "pk_test_8fa5be5a113286b23f7775fe7f34c94ffd338c8c"
    const [fullName , setFullName] = useState('')
    const [email , setEmail] = useState('')
    const [amount , setAmount] = useState('')
    const [isOpen, setIsOpen] = useState(true)

    const [activeModalTab, setActiveModalTab] = useState('naira');
    const [imageProof, setImageProof] = useState('');
    const [tajiAmount, setTajiAmount] = useState('');

    console.log(tajiAmount, imageProof)

	function handleCloseModal() {
		setIsOpen(false);
	}
    
    async function handleSuccess(reference) {
        const res = await fetch(`https://api.tajify.com/api/wallets/payment-verification/${reference}`);
        if(!res.ok) {
            setShowFailedAlert(true);
            setTimeout(() => {
                setShowFailedAlert(true);
            }, timeout);
        }

        console.log(res)

        setShowSuccessAlert(true);
        setTimeout(() => {
            setShowSuccessAlert(false);
        }, timeout);
        setIsSuccessful(true);
    }

    function handleFailure() {
        setShowFailedAlert(true);
        setTimeout(() => {
            setShowFailedAlert(false);
        }, timeout);
        setIsSuccessful(false)
    }

    const amountInKobo = calcTotalAmount(Number(amount)) * 100;
    const componentProps = {
        email,
        amount: amountInKobo,
        metadata: {
          name: fullName,
        },
        publicKey,
        text: "Pay Now",
        onSuccess: ({reference}) => handleSuccess(reference),
        onClose: () => handleFailure(),
    }

    function handleActiveTab(tabName) {
        setActiveModalTab(tabName);
    }

    async function handleTajiDeposit(e) {
        e.preventDefault();

        const res = await fetch('https://api.tajify.com/api/wallets/post-pending-taji', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: { amount: tajiAmount, imageProof }
        });
        const data = res.json();
        console.log(data);
        
    }
    

  return (
    <>
        {isSuccessful === false && <OverlayModal styleObject={formStyle} isOpen={isOpen} onClose={handleCloseModal}  extraTabs={
            <div className="wallet--tabs tabs--modal">
                <span className={`wallet--tab ${activeModalTab === 'naira' && 'tab--active'  }`} onClick={() => {handleActiveTab('naira')}}>Naira</span>
                <span className={`wallet--tab ${activeModalTab === 'taji' && 'tab--active'  }`} onClick={() => {handleActiveTab('taji')}}>Taji</span>
                <span className={`wallet--tab ${activeModalTab === 'usd' && 'tab--active'  }`} onClick={() => {handleActiveTab('usd')}}>Dollar</span>
            </div>
        }>
            
            {activeModalTab === 'naira' && <form className='payment--form' onSubmit={(e) => e.preventDefault()}>
                <div className='form__item'>
                    <label className='form__label' htmlFor='name'>FullName</label>
                    <input className='form__input' type='name' id='name' onChange={(e) => setFullName(e.target.value)} value={fullName} placeholder='Your FullName' />
                </div>
                <div className='form__item'>
                    <label className='form__label' htmlFor='email'>Email Address</label>
                    <input className='form__input' type='email' id='email' onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Your Email Address' />
                </div>
                <div className='form__item'>
                    <label className='form__label' htmlFor='amount'>Amount</label>
                    <input className='form__input' type='number' id='amount' onChange={(e) => setAmount(e.target.value)} value={amount} placeholder='Enter Deposit Amount' />
                </div>
                <div className='form__item'>
                    <PaystackButton className='form__submit' {...componentProps} />
                </div>
            </form>}


            { activeModalTab === 'taji' && <form className='payment--form' onSubmit={handleTajiDeposit}>
                <div className='form__item'>
                    <label className='form__label' htmlFor='name'>Taji Wallet Address</label>
                    <input className='form__input' readOnly value='TTE67Y3E8U8UDH83D808HDUWHNCBRF08EU9E' />
                </div>
                <div className='form__item'>
                    <label className='form__label' htmlFor='taji-amount'>TAJI amount</label>
                    <input className='form__input' required type='number' id='taji-amount' onChange={(e) => setTajiAmount(e.target.value)} value={tajiAmount} placeholder='Amount' />
                </div>
                <div className="form__item">
                    <label htmlFor="attachments" className="form__label">Attachments</label>
                    <div className="custom-file-input">
                        <div className="custom-file-icon">
                            <span className="custom-text upload-text"> Attach your files here <br /> or </span>
                            <span className="custom-link upload-link">Browse files</span>
                        </div>
                        <input onChange={(e) => setImageProof(e.target.files[0])} type="file" id="attachments" className="custom-hidden-input upload-input" name="attachments" />
                    </div>

                    <div className="custom-info info--text">
                        <span>Accepted file: .png, .jpg, .pdf & .doc only</span>
                        <span className="custom-lock-icon">
                            <GiDialPadlock className="custom-lock" /> secure
                        </span>
                    </div>
                </div>
                <div className="form__item">
                    <button className="form__submit" type='submit'>Submit Proof</button>
                </div>
            </form>}
        </OverlayModal>}


        {showSuccessAlert && <AlertPopup alertType={'success'}>
            <AiFillCheckCircle className='alert--icon'/>
            <p>Deposit of ₦{amount} Successful!</p>
        </AlertPopup>}

        {showFailedAlert && 
        <AlertPopup alertType={'error'}>
            <AiFillExclamationCircle className='alert--icon' />
            <p>Transaction Not Completed!</p>
        </AlertPopup>}
    </>
  )
}

export default WalletTabModal;
