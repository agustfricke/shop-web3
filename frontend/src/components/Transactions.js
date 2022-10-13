import React, { useContext } from "react";
import { Table, Button } from 'react-bootstrap'

import { TransactionContext } from "../context/TransactionContext";

import { shortenAddress } from "../utils/shortenAddress";

const Transactions = ({ addressTo, addressFrom, timestamp, message, keyword, amount, url }) => {

    const { transactions, currentAccount } = useContext(TransactionContext);

  return (


<Table >
    <thead>
        <tr>
            <th>From</th>
            <th>To</th>
            <th>Amount ETH</th>
            <th>Date</th>
        </tr>
    </thead>
    <tbody>
        {transactions.map((transaction, i) => (
          
        <tr key={i} >
            <td>
            <a href={`https://goerli.etherscan.io/address/${transaction.addressFrom}`} target="_blank" rel="noreferrer"> 
                {shortenAddress(transaction.addressFrom)}
                </a>
                </td>
            
                <td>
            <a href={`https://goerli.etherscan.io/address/${transaction.addressTo}`} target="_blank" rel="noreferrer"> 
                {shortenAddress(transaction.addressTo)}
                </a>
                </td>

            <td>{transaction.amount}</td>
            <td>{transaction.timestamp}</td>   
        </tr>
        ))}
    </tbody>
</Table>


  );
};


export default Transactions;
