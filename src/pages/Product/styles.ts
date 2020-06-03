import styled from 'styled-components';

interface CardProps {
  total?: boolean;
}

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const CardContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 32px;
  margin-top: -150px;
`;

export const Card = styled.div<CardProps>`
  background: ${({ total }: CardProps): string => (total ? '#4182D8' : '#fff')};
  padding: 22px 32px;
  border-radius: 6px;
  color: ${({ total }: CardProps): string => (total ? '#fff' : '#363F5F')};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
      font-size: 16px;
    }
  }

  h1 {
    margin-top: 14px;
    font-size: 36px;
    font-weight: normal;
    line-height: 54px;
  }
`;

export const TableContainer = styled.section`
  margin-top: 0px;

  button {
    width: 100%;
    height: 65px;
    border: 0;
    border-radius: 6px;
    background: #fff;
  }
`;

export const TableHeader = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

export const TableRow = styled.div`
  display: flex;
  width: 100%;
  border-radius: 6px;
  background: #fff;
  align-items: center;
  justify-content: space-between;

  & + div {
    margin-top: 15px;
  }

  & + button {
    margin-top: 15px;
  }
`;

export const TableCol = styled.span`
  flex: 1;
  color: #969cb3;
  padding: 20px 32px;
  font-size: 16px;
  font-weight: normal;

  &.title {
    flex: 4;
  }

  &.action {
    flex: 0.1;
  }
`;

export const Button = styled.button`
  border: 0;
  margin-top: 10px;
  width: 100%;
  background: #12a454;
  color: #fff;
  font-size: 24px;
  border-radius: 6px;
  padding: 13px 50px;
`;
