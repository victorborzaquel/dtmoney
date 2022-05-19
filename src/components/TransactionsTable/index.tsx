import { ITransaction, useTransactions } from "../../hooks/useTransactions";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";
import { Container } from "./styles";

export function TransactionsTable() {
  const { transactions } = useTransactions()

  function TransactionItem({ title, type, amount, category, createdAt }: ITransaction) {
    const createdAtFormatted = formatDate(createdAt)
    const amountFormatted = formatCurrency(amount)

    return (
      <tr>
        <td>{title}</td>
        <td className={type}>{amountFormatted}</td>
        <td>{category}</td>
        <td>{createdAtFormatted}</td>
      </tr>
    )
  }


  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Value</th>
            <th>Category</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map(transaction => <TransactionItem key={transaction.id} {...transaction} />)}
        </tbody>
      </table>
    </Container>
  )
}