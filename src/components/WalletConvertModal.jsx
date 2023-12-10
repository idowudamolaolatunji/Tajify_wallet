import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const formStyle = {
	width: "50rem",
	height: "15rem",
};

function WalletConvertModal({ onUpdate, handleClose, }) {

    function handleCloseModal() {
		handleClose();
	}

	return (
		<div>
			<div className="overlay">
				<div className="modal" style={formStyle}>
					<span className="modal--head">
						<p className="payment--heading">Convert Currency.</p>
						<AiOutlineClose className="modal--icon" onClick={handleCloseModal} />
					</span>

					<div className="modal__content">
                        <p>Feature Coming Soon!</p>
                    </div>
				</div>
			</div>
		</div>
	);
}

export default WalletConvertModal;
