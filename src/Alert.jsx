import React, { useEffect } from 'react';

const Alert = ({ type, message, showAlert, list }) => {
	useEffect(() => {
		const removeAlert = setTimeout(() => {
			showAlert();
		}, 3000);

		return () => {
			clearTimeout(removeAlert);
		};
	}, [list]);

	return <p className={`alert alert-${type}`}>{message}</p>;
};

export default Alert;
