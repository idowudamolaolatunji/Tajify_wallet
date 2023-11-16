

import React from 'react'

function TableRow({ currency, amount, status, reference, date }) {
    return (
        <tr>
            <td>{currency}</td>
            <td>{amount}</td>
            <td className={`status status--${status === 'pending' ? 'pending' : 'success'}`}><p>{status}</p></td>
            <td>{reference}</td>
            <td>{date}</td>
        </tr>
    );
}

export default TableRow
