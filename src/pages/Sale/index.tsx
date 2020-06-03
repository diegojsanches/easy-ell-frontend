import React, { useRef, useCallback, useState, useEffect } from 'react';

import { FormHandles, Scope } from '@unform/core';
import { Form } from '@unform/web';

import Header from '../../components/Header';

import {
  Container,
  CardContainer,
  Card,
  TableContainer,
  TableHeader,
  TableRow,
  TableCol,
} from './styles';
import Input from '../../components/Input';
import AsyncSelect from '../../components/AsyncSelect';
import api from '../../services/api';
import formatValue from '../../utils/formatValue';

interface SaleFormData {
  buyer: string;
  items: SaleItem[];
  payment: number;
}

interface Product {
  id: string;
  code: string;
  description: string;
  price: string;
  label: string;
  value: string;
}

interface SaleItem {
  product: Product;
  product_id: string;
  amount: number;
  price: number;
  total: number;
  formattedPrice: string;
  formattedTotal: string;
}

interface TotalData {
  total: number;
  formattedTotal: string;
}

const Sale: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [changeMoney, setChangeMoney] = useState(formatValue(0));
  const [totalData, setTotalData] = useState<TotalData>({} as TotalData);
  const [items, setitems] = useState<SaleItem[]>([]);

  useEffect(() => {
    const updatedTotal = items.reduce<number>(
      (amount, { total }) => amount + total,
      0,
    );
    formRef.current?.setFieldValue('payment', updatedTotal);
    setTotalData({
      total: updatedTotal,
      formattedTotal: formatValue(updatedTotal),
    });
    setChangeMoney(formatValue(0));
  }, [items]);

  const loadOptions = useCallback(async (inputValue, callback) => {
    const { data } = await api.get('/products', { params: { q: inputValue } });

    const selectProducts = data.map((product: Product) => ({
      label: `${product.code} - ${product.description}`,
      value: product.id,
      ...product,
    }));

    callback(selectProducts);
  }, []);

  const handleAddItem = useCallback(() => {
    setitems(changeItems => [
      ...changeItems,
      {
        product: {} as Product,
        // eslint-disable-next-line @typescript-eslint/camelcase
        product_id: '',
        amount: 0,
        price: 0,
        total: 0,
        formattedPrice: formatValue(0),
        formattedTotal: formatValue(0),
      },
    ]);
  }, []);

  const handleSelectProduct = useCallback(
    (itemIndex, newValue) => {
      const item = items[itemIndex];
      const amount = item.amount || 0;
      const total = amount * newValue.price;
      const updatedItem = {
        product: newValue,
        // eslint-disable-next-line @typescript-eslint/camelcase
        product_id: newValue.id,
        amount,
        price: newValue.price,
        total,
        formattedPrice: formatValue(newValue.price),
        formattedTotal: formatValue(total),
      };
      setitems(updatedItems =>
        updatedItems.map((changedItem, index) => {
          if (index === itemIndex) {
            return updatedItem;
          }
          return changedItem;
        }),
      );
      return newValue;
    },
    [items],
  );

  const handleAmount = useCallback(
    (itemIndex, newValue) => {
      const item = items[itemIndex];
      const amount = newValue.target.value;
      const total = amount * (item.price || 0);
      const updatedItem = {
        ...item,
        amount,
        total,
        formattedTotal: formatValue(total),
      };
      setitems(updatedItems =>
        updatedItems.map((changedItem, index) => {
          if (index === itemIndex) {
            return updatedItem;
          }
          return changedItem;
        }),
      );
      return amount;
    },
    [items],
  );

  const handlePayment = useCallback(
    newValue => {
      setChangeMoney(formatValue(newValue.target.value - totalData.total));
    },
    [totalData],
  );

  const handleSubmit = useCallback(async (data: SaleFormData) => {
    console.log(data);
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <header>
            <Input
              type="text"
              name="buyer"
              placeholder="Nome do comprador"
              cleanInput
            />
            <button type="submit">Concluir venda</button>
          </header>
          <TableContainer>
            <TableHeader>
              <TableCol className="item">Item</TableCol>
              <TableCol>Produto</TableCol>
              <TableCol className="amount">Qtde</TableCol>
              <TableCol className="price">$ Unitario</TableCol>
              <TableCol className="total">$ Total</TableCol>
            </TableHeader>

            {items.map((item, index) => (
              <Scope path={`items[${index}]`}>
                <TableRow key={item.product_id}>
                  <TableCol className="item">{index + 1}.</TableCol>
                  <TableCol className="description">
                    <AsyncSelect
                      defaultValue={item.product}
                      loadOptions={loadOptions}
                      name="product_id"
                      onChange={newValue => {
                        return handleSelectProduct(index, newValue);
                      }}
                    />
                  </TableCol>
                  <TableCol className="amount">
                    <Input
                      name="amount"
                      defaultValue={item.amount}
                      onChange={newValue => handleAmount(index, newValue)}
                      cleanInput
                    />
                  </TableCol>
                  <TableCol className="price">{item.formattedPrice}</TableCol>
                  <TableCol className="total">{item.formattedTotal}</TableCol>
                </TableRow>
              </Scope>
            ))}
            <button type="button" onClick={handleAddItem}>
              + Adicionar item
            </button>
          </TableContainer>

          <CardContainer>
            <Card>
              <header>
                <p>Valor recebido</p>
              </header>
              <h1 data-testid="balance-income">
                <span>R$</span>
                <Input
                  type="number"
                  name="payment"
                  onChange={handlePayment}
                  cleanInput
                />
              </h1>
            </Card>
            <Card>
              <header>
                <p>Troco</p>
              </header>
              <h1 data-testid="balance-outcome">{changeMoney}</h1>
            </Card>
            <Card total>
              <header>
                <p>Total venda</p>
              </header>
              <h1 data-testid="balance-total">{totalData.formattedTotal}</h1>
            </Card>
          </CardContainer>
        </Form>
      </Container>
    </>
  );
};

export default Sale;
