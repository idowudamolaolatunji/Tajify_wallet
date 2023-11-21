import React, { useEffect, useState } from 'react';

import TableRow from './TableRow';

import { useAuthContext } from '../context/AuthContext';
import Spinner from './Spinner'
import { currencyConverter, dateConverter } from '../utils/helper';

function DashboardTable({ activeModalTab, isDataUpdated }) {
    const { token } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);

	const [depositTransactions, setDepositTransactions] = useState([]);
	const [withdrawalTransactions, setWithdrawalTransactions] = useState([]);

	useEffect(() => {
        async function fetchTransactions() {
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            };
            try {
                setIsLoading(true)
                const [depositRes, withdrawalRes] = await Promise.all([
                    fetch(`http://127.0.0.1:3005/api/wallets/transactions/deposits`, { headers }),
                    fetch(`http://127.0.0.1:3005/api/wallets/transactions/withdrawals`, { headers })
                ]);

                if (!depositRes.ok || !withdrawalRes.ok) {
                    setIsLoading(false)
                    return;
                }
                const depositData = await depositRes.json();
                const withdrawalData = await withdrawalRes.json();

				// GET THE DATA OBJ ([])
				const deposits = depositData.data.currentUserDepositsTransaxctions;
				const withdrawals = withdrawalData.data.currentUserWithdrawalsTransaxctions;
                setIsLoading(false)
                setDepositTransactions(deposits);
                setWithdrawalTransactions(withdrawals);
            } catch (err) {
                setIsLoading(false)
            }
        };
		
		fetchTransactions();
    }, [isDataUpdated]);


  return (
    <>
        { isLoading && <Spinner />}

        <table>
            <thead>
                <tr>
                    <th>Currency</th>
                    <th>Amount</th>
                    <th>Transaction Status</th>
                    <th>Reference</th>
                    <th>Date</th>
                </tr>
            </thead>

            { activeModalTab === 'deposit' && <tbody>
                {depositTransactions.length > 0 && depositTransactions.map((deposit) => {
                    return (
                        <TableRow key={deposit.reference} currency={deposit.currency} amount={`${deposit.currency === 'naira' ? '₦' : deposit.currency === 'taji' ? 'Taji ' : '$'} ${currencyConverter(deposit.amount)}`} status={deposit.status} reference={deposit.reference} date={dateConverter(deposit?.updatedAt || deposit.createAt)} />
                    )
                } )}
            </tbody> }

            { activeModalTab === 'withdrawal' && <tbody>
                {withdrawalTransactions.length > 0 && withdrawalTransactions.map((withdrawal) => {
                    return (
                        <TableRow key={withdrawal.reference} currency={withdrawal.currency} amount={`${withdrawal.currency === 'naira' ? '₦' : withdrawal.currency === 'taji' ? 'TAJI ' : '$'} ${currencyConverter(withdrawal.amount)}`} status={withdrawal.status} reference={withdrawal.reference} date={dateConverter(withdrawal?.updatedAt || withdrawal.createAt)} />
                    )
                } )}
            </tbody> }
        </table>
    </>
  )
}

export default DashboardTable;
