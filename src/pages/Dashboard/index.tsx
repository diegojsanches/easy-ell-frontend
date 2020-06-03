import React, { useState, useEffect } from 'react';

import { FiEdit } from 'react-icons/fi';
import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import api from '../../services/api';

import Header from '../../components/Header';

import formatValue from '../../utils/formatValue';

import {
  Container,
  CardContainer,
  Card,
  TableContainer,
  TableRow,
  TableHeader,
} from './styles';
import Drawer from '../../components/Drawer';
import Modal from '../../components/Modal';

interface Sale {
  id: string;
  buyer: string;
  total: number;
  created_at: Date;
  formattedTotal: string;
  formattedDate: string;
}

const Dashboard: React.FC = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    async function updateSales(): Promise<void> {
      const { data: dataSales } = await api.get('/sales');

      const salesFormatted = dataSales.map((sale: Sale) => {
        const createdAt = new Date(sale.created_at);
        return {
          ...sale,
          formattedTotal: formatValue(sale.total),
          formattedDate: `${createdAt.toLocaleDateString(
            'pt-BR',
          )} ${createdAt.toLocaleTimeString('pt-BR')}`,
        };
      });

      setSales(salesFormatted);
    }

    updateSales();
  }, []);

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
            <h1 data-testid="balance-income">R$ 150,00</h1>
          </Card>
          <Card>
            <header>
              <p>Custo</p>
              <img src={outcome} alt="Outcome" />
            </header>
            <h1 data-testid="balance-outcome">R$ 150,00</h1>
          </Card>
          <Card total>
            <header>
              <p>Lucro</p>
              <img src={total} alt="Total" />
            </header>
            <h1 data-testid="balance-total">R$ 150,00</h1>
          </Card>
        </CardContainer>

        <TableContainer>
          <TableHeader>
            <span>Comprador</span>
            <span>Valor total</span>
            <span>Data</span>
          </TableHeader>

          {sales.map(item => (
            <TableRow key={item.id}>
              <span className="title">{item.buyer}</span>
              <span>{item.formattedTotal}</span>
              <span>{item.formattedDate}</span>
            </TableRow>
          ))}
        </TableContainer>
      </Container>
      <Drawer show={show} />
      {/* <Modal show={show} /> */}
    </>
  );
};

export default Dashboard;
