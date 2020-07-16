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
import { useToast } from '../../hooks/toast';

interface Product {
  id: string;
  code: string;
  description: string;
  stock: number;
  price: number;
  cost: number;
  formattedProfit: string;
  formattedPrice: string;
  formattedCost: string;
}

const Products: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const [show, setShow] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  const productFormatted = useCallback((dataProduct: Product) => {
    return {
      ...dataProduct,
      formattedProfit: formatValue(dataProduct.price - dataProduct.cost),
      formattedPrice: formatValue(dataProduct.price),
      formattedCost: formatValue(dataProduct.cost),
    };
  }, []);

  useEffect(() => {
    async function updateSales(): Promise<void> {
      const { data: dataProducts } = await api.get('/products');

      const productsFormatted = dataProducts.map(productFormatted);

      setProducts(productsFormatted);
    }

    updateSales();
  }, [productFormatted]);

  const handleEditProduct = useCallback(async dataProduct => {
    formRef.current?.reset();
    if (dataProduct) {
      setProduct(dataProduct);
      formRef.current?.setData(dataProduct);
    }

    setShow(true);
  }, []);

  const handleSubmit = useCallback(
    async data => {
      let url = 'products';
      let submit = api.post;

      if (product?.id) {
        url += `/${product.id}/`;
        submit = api.put;
      }
      try {
        const response = await submit(url, data);

        setProducts(oldProducts => {
          let dataProducts = oldProducts;
          const indexProduct = oldProducts.findIndex(
            dataProduct => dataProduct === product,
          );
          const dataProduct = productFormatted(response.data);

          if (indexProduct >= 0) {
            dataProducts[indexProduct] = dataProduct;
          } else {
            dataProducts = [...dataProducts, dataProduct];
          }
          console.log(dataProducts);

          return dataProducts;
        });
        setShow(false);
      } catch (err) {
        console.log(err);
        addToast({
          type: 'error',
          title: 'Erro ao salvar produto',
          description: 'Ocorreu um erro ao tentar salvar produto.',
        });
      }
    },
    [addToast, productFormatted, product],
  );

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
              <TableCol>{item.formattedProfit}</TableCol>
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
