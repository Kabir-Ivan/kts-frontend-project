import axios from 'axios';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'components/Button';
import ErrorMessage from 'components/ErrorMessage';
import Input from 'components/Input';
import Text from 'components/Text';
import config from 'config/config';
import RootStore from 'store/globals';
import styles from './Checkout.module.scss';

const formatName = (name: string) => {
  return name.toUpperCase();
};

const formatCreditCard = (cardNumber: string) => {
  const cleanCardNumber = cardNumber.replace(/\D/g, '').slice(0, 16);

  const groupSize = 4;

  const groups = [];
  let i = 0;
  while (i < cleanCardNumber.length) {
    groups.push(cleanCardNumber.slice(i, i + groupSize));
    i += groupSize;
  }

  const formattedCardNumber = groups.join(' ');

  return formattedCardNumber;
};

const formatDate = (input: string): string => {
  const cleanInput = input.replace(/\D/g, '');

  if (cleanInput.length <= 2) {
    return cleanInput;
  }

  const month = cleanInput.slice(0, 2);
  const year = cleanInput.slice(2, 4);
  const formattedMonth = Math.min(Number(month), 12).toString().padStart(2, '0');

  return `${formattedMonth}/${year}`;
};

const formatCVV = (value: string) => {
  return value.replace(/\D/g, '').slice(0, 3);
};

const Checkout = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [creditCard, setCreditCard] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCVV] = useState('');
  const [error, setError] = useState('');

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  const handleNameChange = useCallback((value: string) => {
    setName(value);
  }, []);

  const handleAddressChange = useCallback((value: string) => {
    setAddress(value);
  }, []);

  const handleCreditCardChange = useCallback((value: string) => {
    setCreditCard(formatCreditCard(value));
  }, []);

  const handleExpirationDateChange = useCallback((value: string) => {
    setExpirationDate(formatDate(value));
  }, []);

  const handleCVVChange = useCallback((value: string) => {
    setCVV(formatCVV(value));
  }, []);

  const validate = () => {
    const isCreditCardValid = /^[0-9]{16}$/.test(creditCard.replace(/\s/g, ''));
    const isExpirationDateValid = /^\d{2}\/\d{2}$/.test(expirationDate);
    const isCVVValid = /^[0-9]{3}$/.test(cvv);
    const isAddressValid = address.trim() !== '';
    const isNameValid = name.trim() !== '';

    return isCreditCardValid && isExpirationDateValid && isCVVValid && isAddressValid && isNameValid;
  };

  const handleSubmit = () => {
    if (validate()) {
      axios({
        method: 'post',
        url: config.API.ORDER_URL,
      })
        .then(() => {
          navigate(config.ENDPOINTS.SUCCESS);
        })
        .catch(() => {
          setError('An error occured. Try again later.');
        });
    } else {
      setError('Not all the fields are filled correctly.');
    }
  };

  const discount = RootStore.user.isLoggedIn ? RootStore.cart.totalPrice * 0.05 : 0;
  const bonusesToUse = RootStore.user.isLoggedIn
    ? Math.min(RootStore.cart.totalPrice * 0.5, RootStore.user.user?.bonuses || 0)
    : 0;

  return (
    <div className={styles['checkout-container']}>
      <Text view="title" weight="bold">
        Checkout
      </Text>
      <div className={styles['checkout__card']}>
        <Text view="subtitle" weight="bold">
          Adress
        </Text>
        <Input value={address} onChange={handleAddressChange} placeholder="Adress" />
      </div>
      <div className={styles['checkout__card']}>
        <Text view="subtitle" weight="bold">
          Credit Card
        </Text>
        <Input value={name} onChange={handleNameChange} placeholder="Name" formatter={formatName} />
        <Input
          value={creditCard}
          onChange={handleCreditCardChange}
          placeholder="Credit card number"
          formatter={formatCreditCard}
        />
        <Input
          value={expirationDate}
          onChange={handleExpirationDateChange}
          formatter={formatDate}
          placeholder="Expires (MM/YY)"
        />
        <Input type="number" value={cvv} onChange={handleCVVChange} formatter={formatCVV} placeholder="CVV" />
      </div>
      <div className={styles['checkout__card']}>
        <Text view="subtitle" weight="bold">
          Payment
        </Text>
        <Text view="p-20" weight="bold">
          Total products price: ${RootStore.cart.totalPrice}
        </Text>
        {RootStore.user.isLoggedIn && (
          <Text view="p-20" weight="bold">
            Membership discount: ${discount}
          </Text>
        )}
        {RootStore.user.isLoggedIn && (
          <Text view="p-20" weight="bold">
            Bonuses used: ${bonusesToUse}
          </Text>
        )}
        <Text view="p-20" weight="bold">
          Final price: ${RootStore.cart.totalPrice - discount - bonusesToUse}
        </Text>
      </div>
      <ErrorMessage message={error} />
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

export default observer(Checkout);
