import React from "react";

function AlertPopup({ children, alertType }) {
	return (
		<div className={`alert alert--${alertType}`}>
			{/* <span className="alert--text">{children}</span> */}
            {children}
		</div>
	);
}

export default AlertPopup;
