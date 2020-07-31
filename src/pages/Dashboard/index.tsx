import React, { useState, useEffect, useRef, useCallback } from 'react';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { format, startOfMonth, lastDayOfMonth } from 'date-fns';
import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import api from '../../services/api';

import Header from '../../components/Header';

import {
  Container,
  CardContainer,
  Card,
  DateRange,
  TableContainer,
  TableRow,
  TableHeader,
} from './styles';
import Input from '../../components/Input';
import formatCurrency from '../../utils/formatCurrency';
import formatValue from '../../utils/formatValue';

interface Sale {
  id: string;
  buyer: string;
  cost: number;
  total: number;
  created_at: Date;
  formattedCost: string;
  formattedTotal: string;
  formattedDate: string;
}

interface ListSales {
  formattedIncome: string;
  formattedOutcome: string;
  formattedProfit: string;
}

const Dashboard: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [sales, setSales] = useState<Sale[]>([]);
  const [listSales, setListSales] = useState<ListSales>({
    formattedIncome: '0',
    formattedOutcome: '0',
    formattedProfit: '0',
  });
  const [dateRange, setDateRange] = useState({
    fromDate: format(startOfMonth(new Date()), 'yyyy-MM-dd'),
    toDate: format(lastDayOfMonth(new Date()), 'yyyy-MM-dd'),
  });

  const updateSales = useCallback(async () => {
    const {
      data: {
        income: incomeValue,
        outcome: outcomeValue,
        profit: profitValue,
        sales: dataSales,
      },
    } = await api.get('/sales', { params: dateRange });

    setListSales({
      formattedIncome: formatCurrency(incomeValue),
      formattedOutcome: formatCurrency(outcomeValue),
      formattedProfit: formatCurrency(profitValue),
    });

    const salesFormatted = dataSales.map((sale: Sale) => {
      const createdAt = new Date(sale.created_at);
      return {
        ...sale,
        formattedCost: formatValue(sale.cost),
        formattedTotal: formatValue(sale.total),
        formattedDate: `${createdAt.toLocaleDateString(
          'pt-BR',
        )} ${createdAt.toLocaleTimeString('pt-BR')}`,
      };
    });

    setSales(salesFormatted);
  }, [dateRange]);

  useEffect(() => {
    updateSales();
  }, [updateSales]);

  return (
    <>
      <Header />
      <Container>
        <CardContainer>
          <Card>
            <header>
              <p>Vendas</p>
              <img src={income} alt="Income" />
            </header>
            <h1 data-testid="balance-income">{listSales.formattedIncome}</h1>
          </Card>
          <Card>
            <header>
              <p>Custo</p>
              <img src={outcome} alt="Outcome" />
            </header>
            <h1 data-testid="balance-outcome">{listSales.formattedOutcome}</h1>
          </Card>
          <Card total>
            <header>
              <p>Lucro</p>
              <img src={total} alt="Profit" />
            </header>
            <h1 data-testid="balance-total">{listSales.formattedProfit}</h1>
          </Card>
        </CardContainer>

        <Form ref={formRef} onSubmit={setDateRange} initialData={dateRange}>
          <DateRange>
            <Input
              type="date"
              name="fromDate"
              id="fromDate"
              onChange={formRef.current?.submitForm}
            />
            <strong>To</strong>
            <Input
              type="date"
              name="toDate"
              id="toDate"
              onChange={formRef.current?.submitForm}
            />
          </DateRange>
        </Form>

        <TableContainer>
          <TableHeader>
            <span className="hidden-sm">Comprador</span>
            <span>$ total</span>
            <span>$ custo</span>
            <span>Data</span>
          </TableHeader>

          {sales.map(item => (
            <TableRow key={item.id}>
              <span className="hidden-sm">{item.buyer}</span>
              <span>{item.formattedTotal}</span>
              <span>{item.formattedCost}</span>
              <span>{item.formattedDate}</span>
            </TableRow>
          ))}
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;
