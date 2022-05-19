import Modal from 'react-modal'
import { Container, RadioBox, TransactionTypeContainer } from './styles';
import closeImage from '../../assets/close.svg'
import incomeImage from '../../assets/income.svg'
import outcomeImage from '../../assets/outcome.svg'
import { FormEvent, useState } from 'react';
import { useTransactions } from '../../hooks/useTransactions';

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose(): void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
  const { createTransaction } = useTransactions()

  const [type, setType] = useState('withdraw')
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState(0)
  const [category, setCategory] = useState('')

  async function handleSubmitForm(event: FormEvent) {
    event.preventDefault()

    await createTransaction({ title, amount, category, type })

    setAmount(0)
    setCategory('')
    setTitle('')
    setType('withdraw')

    onRequestClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName='react-modal-overlay'
      className='react-modal-content'
    >
      <button
        type='button'
        onClick={onRequestClose}
        className='react-modal-close'
      >
        <img src={closeImage} alt="Close modal" />
      </button>

      <Container
        onSubmit={handleSubmitForm}
      >
        <h2>Register transaction</h2>

        <input
          type="text"
          placeholder='Title'
          value={title}
          onChange={event => setTitle(event.target.value)}
        />

        <input
          type="number"
          placeholder='Value'
          value={amount}
          onChange={event => setAmount(Number(event.target.value))}
        />

        <TransactionTypeContainer>
          <RadioBox
            type='button'
            onClick={() => setType('deposit')}
            isActive={type === 'deposit'}
            activeColor="green"
          >
            <img src={incomeImage} alt="Income" />
            <span>Income</span>
          </RadioBox>

          <RadioBox
            type='button'
            onClick={() => setType('withdraw')}
            isActive={type === 'withdraw'}
            activeColor="red"
          >
            <img src={outcomeImage} alt="Outcome" />
            <span>Outcome</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          type="text"
          placeholder='Category'
          value={category}
          onChange={event => setCategory(event.target.value)}
        />

        <button type="submit">
          Register
        </button>
      </Container>
    </Modal>
  )
}