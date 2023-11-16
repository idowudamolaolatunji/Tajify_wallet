import React, { useState } from "react";

import { AiOutlineClose } from "react-icons/ai";

function OverlayModal({ children, styleObject, isOpen, onClose, extraTabs }) {
    
	return (
		<>
			{isOpen && (
				<div className="overlay">
					<div className="modal" style={styleObject}>
                        <span className="modal--head">
							{extraTabs}
							<AiOutlineClose className="modal--icon" onClick={onClose} />
						</span>
						<div className="modal__content">{children}</div>
					</div>
				</div>
			)}
		</>
	);
}

export default OverlayModal;
