import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import totalImg from '../../assets/total.svg'
import { useTransactions } from '../../hooks/useTransactions';
import { formatCurrency } from '../../utils/formatCurrency';

import { Container } from "./styles";

export function Summary() {
  const { transactions } = useTransactions()

  const summary = transactions.reduce((acc, transaction) => transaction.type === 'deposit'
    ? {
      deposits: acc.deposits + transaction.amount,
      withdraw: acc.withdraw,
      total: acc.total + transaction.amount
    }
    : {
      deposits: acc.deposits,
      withdraw: acc.withdraw + transaction.amount,
      total: acc.total - transaction.amount
    }, {
    deposits: 0,
    withdraw: 0,
    total: 0
  })

  return (
    <Container>
      <div>
        <header>
          <p>Incomes</p>
          <img src={incomeImg} alt="Incomes" />
        </header>

        <strong>{formatCurrency(summary.deposits)}</strong>
      </div>

      <div>
        <header>
          <p>Outcomes</p>
          <img src={outcomeImg} alt="Outcomes" />
        </header>

        <strong>- {formatCurrency(summary.withdraw)}</strong>
      </div>

      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>

        <strong>{formatCurrency(summary.total)}</strong>
      </div>
    </Container>
  )
}