import React, { useEffect, useState } from "react";

import TableRow from "./TableRow";

import { useAuthContext } from "../context/AuthContext";
import Spinner from "./Spinner";
import { currencyConverter, dateConverter } from "../utils/helper";

function DashboardTable({ activeModalTab, isDataUpdated, getSlots }) {
	const { token } = useAuthContext();
	const [isLoading, setIsLoading] = useState(false);

	const [depositTransactions, setDepositTransactions] = useState([]);
	const [withdrawalTransactions, setWithdrawalTransactions] = useState([]);
	const [statkingTransactions, setStatkingTransactions] = useState([]);

	const userStakeSlots = statkingTransactions.reduce((acc, slot) => acc + slot.slots, 0);

    getSlots(userStakeSlots);

	useEffect(() => {
		async function fetchTransactions() {
			const headers = {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			};
			try {
				setIsLoading(true);
				const [depositRes, withdrawalRes, stakingRes] = await Promise.all([
					fetch(`http://127.0.0.1:3005/api/transactions/deposits`, { headers }),
					fetch(`http://127.0.0.1:3005/api/transactions/withdrawals`, { headers }),
					fetch(`http://127.0.0.1:3005/api/transactions/stakings`, { headers }),
				]);

				if (!depositRes.ok || !withdrawalRes.ok) {
					setIsLoading(false);
					return;
				}
				const depositData = await depositRes.json();
				const withdrawalData = await withdrawalRes.json();
				const stakingData = await stakingRes.json();

				// GET THE DATA OBJ ([])
				const deposits = depositData.data.myTransactions;
				const withdrawals = withdrawalData.data.myTransactions;
				const stakings = stakingData.data.myTransactions;
				setIsLoading(false);
				setDepositTransactions(deposits);
				setWithdrawalTransactions(withdrawals);
				setStatkingTransactions(stakings);
			} catch (err) {
				setIsLoading(false);
			}
		}

		fetchTransactions();
	}, [isDataUpdated]);

	return (
		<>
			{isLoading && <Spinner />}

			<table>
				<thead>
					<tr>
						<th>{activeModalTab === "staking" ? "Trx Type" : "Currency"}</th>
						<th>{activeModalTab === "staking" ? "Paid TAJI" : "Amount"}</th>
						{activeModalTab === "staking" && <th>Slots Amount</th>}
						<th>Transaction Status</th>
						<th>Reference</th>
						<th>Date</th>
					</tr>
				</thead>

				{activeModalTab === "deposit" && (
					<tbody>
						{depositTransactions.length > 0 &&
							depositTransactions.map((deposit) => {
								return (
									<TableRow
										key={deposit.reference}
										currency={deposit.currency}
										amount={`${
											deposit.currency === "naira"
												? "₦"
												: deposit.currency === "taji"
												? "Taji "
												: "$"
										} ${currencyConverter(deposit.amount)}`}
										status={deposit.status}
										reference={deposit.reference}
										date={dateConverter(
											deposit?.updatedAt || deposit.createdAt,
										)}
									/>
								);
							})}
					</tbody>
				)}

				{activeModalTab === "withdrawal" && (
					<tbody>
						{withdrawalTransactions.length > 0 &&
							withdrawalTransactions.map((withdrawal) => {
								return (
									<TableRow
										key={withdrawal.reference}
										currency={withdrawal.currency}
										amount={`${
											withdrawal.currency === "naira"
												? "₦"
												: withdrawal.currency === "taji"
												? "TAJI "
												: "$"
										} ${currencyConverter(withdrawal.amount)}`}
										status={withdrawal.status}
										reference={withdrawal.reference}
										date={dateConverter(
											withdrawal?.updatedAt || withdrawal.createdAt,
										)}
									/>
								);
							})}
					</tbody>
				)}

				{activeModalTab === "staking" && (
					<tbody>
						{statkingTransactions.length > 0 &&
							statkingTransactions.map((stake, i) => {
								return (
									<TableRow
										key={stake.reference}
										currency={stake.type}
										amount={`TAJI ${currencyConverter(stake.amount)}`}
										slots={stake.slots}
										status={stake.status}
										reference={stake.reference}
										date={dateConverter(stake.createdAt)}
									/>
								);
							})}
					</tbody>
				)}
			</table>
		</>
	);
}

export default DashboardTable;
