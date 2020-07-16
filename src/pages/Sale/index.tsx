import React, { useRef, useCallback, useState, useEffect } from 'react';

import { FormHandles, Scope } from '@unform/core';
import { Form } from '@unform/web';

import { useHistory } from 'react-router-dom';
import { FiTrash } from 'react-icons/fi';
import debounce from 'debounce-promise';
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
import { useToast } from '../../hooks/toast';

interface SaleFormData {
  buyer: string;
  items: SaleItem[];
  payment: number;
}

interface Product {
  id: string;
  code: string;
  description: string;
  stock: number;
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
  const history = useHistory();
  const { addToast } = useToast();
  const [changeMoney, setChangeMoney] = useState(formatValue(0));
  const [totalData, setTotalData] = useState<TotalData>({} as TotalData);
  const [items, setItems] = useState<SaleItem[]>([]);

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

  const loadOptions = debounce(
    useCallback(async (inputValue, callback) => {
      try {
        const { data } = await api.get('/products', {
          params: { q: inputValue },
        });

        const selectProducts = data.map((product: Product) => ({
          ...product,
          label: `${product.code} - ${product.description}`,
          value: product.id,
        }));

        callback(selectProducts);
      } catch (err) {
        console.log(err);
      }
    }, []),
    300,
    { leading: true },
  );

  const handleAddItem = useCallback(() => {
    setItems(changeItems => [
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

  const handleRemoveItem = useCallback(index => {
    setItems(filterItems => filterItems.splice(index, 1));
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
      setItems(updatedItems =>
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

      if (item.product.stock < parseFloat(amount)) {
        addToast({
          type: 'error',
          title: 'Quantidade inválida',
          description: `Quantidade de items adicionado ao produto ${
            itemIndex + 1
          }. ${
            item.product.description
          } é maior do que a quantidade em estoque`,
        });
      }
      const total = amount * (item.price || 0);
      const updatedItem = {
        ...item,
        amount,
        total,
        formattedTotal: formatValue(total),
      };
      setItems(updatedItems =>
        updatedItems.map((changedItem, index) => {
          if (index === itemIndex) {
            return updatedItem;
          }
          return changedItem;
        }),
      );
      return amount;
    },
    [items, addToast],
  );

  const handlePayment = useCallback(
    newValue => {
      setChangeMoney(formatValue(newValue.target.value - totalData.total));
    },
    [totalData],
  );

  const handleSubmit = useCallback(
    async (data: SaleFormData) => {
      try {
        await api.post('sales/', data);

        history.push('/');
      } catch (err) {
        console.log(err);
        addToast({
          type: 'error',
          title: 'Erro ao salvar produto',
          description: 'Ocorreu um erro ao tentar salvar produto.',
        });
      }
    },
    [history, addToast],
  );

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
              <TableCol className="option" />
            </TableHeader>

            {items.map((item, index) => (
              <Scope path={`items[${index}]`}>
                <TableRow key={item.product_id}>
                  <TableCol className="item">{index + 1}.</TableCol>
                  <TableCol className="description">
                    <AsyncSelect
                      cacheOptions
                      defaultOptions
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
                  <TableCol className="option">
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(index)}
                    >
                      <FiTrash />
                    </button>
                  </TableCol>
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
