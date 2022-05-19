import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

export interface ITransaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

type TransactionInputProps = Omit<ITransaction, 'id' | 'createdAt'>
// type TransactionInputProps = Pick<ITransaction, 'id' | 'createdAt'>

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: ITransaction[];
  createTransaction(transaction: TransactionInputProps): Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<ITransaction[]>([])

  async function createTransaction(transactionInput: TransactionInputProps) {
    const newTransaction = { ...transactionInput, createdAt: new Date() }

    const response = await api.post('/transactions', newTransaction)
    const { transaction } = response.data

    setTransactions([...transactions, transaction])
  }

  useEffect(() => {
    api.get('transactions')
      .then(response => setTransactions(response.data.transactions))
  }, [])

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export const useTransactions = () => useContext(TransactionsContext)