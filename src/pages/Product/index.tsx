import React, { useState, useEffect, useRef, useCallback } from 'react';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiEdit } from 'react-icons/fi';
import api from '../../services/api';

import Header from '../../components/Header';

import formatValue from '../../utils/formatValue';

import {
  Container,
  TableContainer,
  TableRow,
  TableHeader,
  TableCol,
  Button,
} from './styles';
import Modal from '../../components/Modal';
import Input from '../../components/Input';

interface Product {
  id: string;
  code: string;
  description: string;
  stock: number;
  price: number;
  cost: number;
  profit: number;
  formattedPrice: string;
  formattedCost: string;
}

const Products: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [show, setShow] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function updateSales(): Promise<void> {
      const { data: dataProducts } = await api.get('/products');

      const productsFormatted = dataProducts.map((product: Product) => {
        return {
          ...product,
          formattedPrice: formatValue(product.price),
          formattedCost: formatValue(product.cost),
        };
      });

      setProducts(productsFormatted);
    }

    updateSales();
  }, []);

  const handleEditProduct = useCallback(async product => {
    if (product) {
      formRef.current?.setData(product);
    }

    setShow(true);
  }, []);

  const handleSubmit = useCallback(async data => {
    console.log(data);
  }, []);

  return (
    <>
      <Header size="small" />
      <Container>
        <TableContainer>
          <TableHeader>
            <TableCol>Código</TableCol>
            <TableCol className="title">Descrição</TableCol>
            <TableCol>Estoque</TableCol>
            <TableCol>Preço</TableCol>
            <TableCol>Custo</TableCol>
            <TableCol>Lucro</TableCol>
            <TableCol className="action">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </TableCol>
          </TableHeader>

          {products.map(item => (
            <TableRow key={item.id}>
              <TableCol>{item.code}</TableCol>
              <TableCol className="title">{item.description}</TableCol>
              <TableCol>{item.stock}</TableCol>
              <TableCol>{item.formattedPrice}</TableCol>
              <TableCol>{item.formattedCost}</TableCol>
              <TableCol>{item.profit}</TableCol>
              <TableCol className="action">
                <FiEdit onClick={() => handleEditProduct(item)} />
              </TableCol>
            </TableRow>
          ))}
          <button type="button" onClick={handleEditProduct}>
            + Adicionar produto
          </button>
        </TableContainer>
      </Container>
      <Modal show={show} title="Produto" onClose={() => setShow(false)}>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="code" placeholder="Código" />
          <Input name="description" placeholder="Descrição" />
          <Input
            name="price"
            placeholder="Preço"
            type="number"
            min="0"
            step="0.01"
          />
          <Input
            name="cost"
            placeholder="Custo"
            type="number"
            min="0"
            step="0.01"
          />
          <Input
            name="stock"
            placeholder="Estoque"
            type="number"
            min="0"
            step="1"
          />
          <Button type="submit">Salvar</Button>
        </Form>
      </Modal>
    </>
  );
};

export default Products;
