import React, { useEffect, useRef, useCallback, useState } from 'react';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiLock, FiUser, FiMail, FiLogOut, FiUsers } from 'react-icons/fi';
import api from '../../services/api';

import Header from '../../components/Header';

import {
  Container,
  TableContainer,
  TableHeader,
  TableCol,
  TableRow,
  Button,
} from './styles';
import Input from '../../components/Input';
import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';

interface Profile {
  id: string;
  name: string;
  email: string;
  old_password: number;
  password: number;
  new_password: number;
  manager?: boolean;
}

const Profiles: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [users, setUsers] = useState<Profile[] | null>(null);

  const { user, signOut } = useAuth();
  const { addToast } = useToast();

  useEffect(() => {
    async function updateProfile(): Promise<void> {
      const { data } = await api.get('/profile');
      formRef.current?.setData(data);
    }

    updateProfile();
  }, []);

  const handleCheckManager = useCallback(
    async (event, item) => {
      try {
        const { data } = await api.put(`/users/${item.id}`, {
          manager: event.target.checked,
        });

        setUsers(filterUsers => {
          if (filterUsers) {
            return filterUsers.map(filterUser =>
              filterUser.id === data.id ? data : filterUser,
            );
          }
          return null;
        });

        addToast({
          type: 'success',
          title: 'Gerente alterado com sucesso',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao tornar usuário como gerente',
        });
      }
    },
    [addToast],
  );

  const handleListUsers = useCallback(async () => {
    const response = await api.get('/users');
    setUsers(response.data);
  }, []);

  const handleSubmit = useCallback(
    async data => {
      try {
        await api.put('/profile', data);
        addToast({
          type: 'success',
          title: 'Perfil salvo com sucesso',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao salvar perfil',
          description: 'Ocorreu um erro ao tentar salvar perfil.',
        });
      }
    },
    [addToast],
  );

  return (
    <>
      <Header size="small" />
      <Container>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="name" type="text" placeholder="Nome" icon={FiUser} />
          <Input name="email" type="email" placeholder="Email" icon={FiMail} />
          <Input
            name="old_password"
            type="password"
            placeholder="Senha antiga"
            icon={FiLock}
          />
          <Input
            name="password"
            type="password"
            placeholder="Nova senha"
            icon={FiLock}
          />
          <Input
            name="password_confirmation"
            type="password"
            placeholder="Confirmação de senha"
            icon={FiLock}
          />
          <Button type="submit">Salvar</Button>
        </Form>
        {user.manager && (
          <>
            <Button type="button" onClick={handleListUsers} className="warning">
              Lista de usuários
              <FiUsers />
            </Button>
            {users && (
              <TableContainer>
                <TableHeader>
                  <TableCol className="title">Nome</TableCol>
                  <TableCol className="hidden-sm">Email</TableCol>
                  <TableCol className="action">Gerente</TableCol>
                </TableHeader>
                {(!!users.length &&
                  users.map(item => (
                    <TableRow key={item.id}>
                      <TableCol className="title">{item.name}</TableCol>
                      <TableCol className="hidden-sm">{item.email}</TableCol>
                      <TableCol className="action">
                        <input
                          type="checkbox"
                          checked={item.manager}
                          onChange={event => handleCheckManager(event, item)}
                        />
                      </TableCol>
                    </TableRow>
                  ))) || (
                  <TableRow>
                    <TableCol>Nenhum usuário encontrado</TableCol>
                  </TableRow>
                )}
              </TableContainer>
            )}
          </>
        )}
        <Button type="button" onClick={signOut} className="danger">
          Sair
          <FiLogOut />
        </Button>
      </Container>
    </>
  );
};

export default Profiles;
