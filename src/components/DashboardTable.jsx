import React, { useEffect, useState } from "react";

// import TableRow from "./TableRow";

import { useAuthContext } from "../context/AuthContext";
import DataTable from "react-data-table-component";
import { currencyConverter, dateConverter } from "../utils/helper";
import Spinner from "./Spinner";
import { BiSolidSortAlt } from "react-icons/bi";

const sortIcon = <BiSolidSortAlt />;
const customStyles = {
    rows: {
        style: {
            minHeight: '58px',
        },
    },
}

function DashboardTable({ activeModalTab, isDataUpdated, getSlots }) {
	const { token } = useAuthContext();
	const [isLoading, setIsLoading] = useState(false);

	const [depositTransactions, setDepositTransactions] = useState([]);
	const [withdrawalTransactions, setWithdrawalTransactions] = useState([]);
	const [statkingTransactions, setStatkingTransactions] = useState([]);

	const columns = [
		{
			name: `${activeModalTab === "staking" ? "Trx Type" : "Currency Paid"}`,
			selector: (row) => (activeModalTab === "staking" ? row.type : row.currency),
			sortable: activeModalTab === "staking" ? false : true,
		},
		{
			name: `${activeModalTab === "staking" ? "Paid TAJI" : "Amount"}`,
			selector: (row) => (
				`${
					row.type === "staking"
						? "TAJI "
						: row.currency === "naira"
						? "₦"
						: row.currency === "taji"
						? "TAJI "
						: "$"
				}${currencyConverter(row.amount)}`
			),
			sortable: true,
		},
		...(activeModalTab === "staking"
			? [
					{
						name: "Slots Bought",
						selector: (row) => row.slots,
					},
			  ]
			: []),

		{
			name: "Transaction Status",
			// selector: (row) => row.status,
			selector: (row) => (
				<span className={`status status--${row.status === "pending" ? "pending" : "success"}`}>
					<p>{row.status}</p>
				</span>
			),
			sortable: true,
		},
		{
			name: "Reference",
			selector: (row) => row.reference,
		},
		{
			name: "Date",
			selector: (row) => dateConverter(row.createdAt),
			sortable: true,
		},
	];

	const userStakeSlots = statkingTransactions.reduce((acc, slot) => acc + slot.slots, 0);
	getSlots(userStakeSlots);
	console.log(`token: ${token}`)

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

				if (!depositRes.ok || !withdrawalRes.ok || !stakingRes.ok) {
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

			{activeModalTab === "deposit" && (
				<DataTable
					columns={columns}
					data={depositTransactions}
					sortIcon={sortIcon}
					pagination
					selectableRows
					customStyles={customStyles}
				/>
			)}
			{activeModalTab === "withdrawal" && (
				<DataTable
					columns={columns}
					data={withdrawalTransactions}
					sortIcon={sortIcon}
					pagination
					selectableRows
					customStyles={customStyles}
				/>
			)}
			{activeModalTab === "staking" && (
				<DataTable
					columns={columns}
					data={statkingTransactions}
					sortIcon={sortIcon}
					pagination
					selectableRows
					customStyles={customStyles}
				/>
			)}

			{/* <table>
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
			</table> */}
		</>
	);
}

export default DashboardTable;
