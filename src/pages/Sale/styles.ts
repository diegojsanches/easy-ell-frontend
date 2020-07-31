import styled from 'styled-components';

interface CardProps {
  total?: boolean;
}

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 40px 20px;
  margin-top: -120px;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* padding-left: 32px; */

    div {
      margin-right: 12px;
    }

    input {
      font-size: 36px;
      width: calc(100%);
    }

    button {
      border: 0;
      background: #12a454;
      color: #fff;
      font-size: 24px;
      border-radius: 6px;
      padding: 12px 50px;
      @media (max-width: 700px) {
        padding: 12px 20px;
      }
    }
  }
`;

export const TableContainer = styled.section`
  margin-top: 24px;

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

  @media (max-width: 700px) {
    span {
      padding: 20px 24px 5px;

      &.hidden-sm {
        display: none;
      }
    }
  }
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

  @media (max-width: 700px) {
    span {
      padding: 20px 24px 5px;

      &.hidden-sm {
        display: none;
      }
    }
  }
`;

export const TableCol = styled.span`
  width: 100%;
  color: #969cb3;
  padding: 20px 32px;
  font-size: 16px;
  font-weight: normal;

  &.item {
    width: 50px;
  }

  &.amount {
    width: 150px;
  }

  &.price {
    width: 250px;
  }

  &.total {
    padding-right: 0;
    width: 250px;
  }

  &.option {
    padding-left: 0;
    width: 20px;

    button {
      height: 16px;
    }
  }
`;

export const CardContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 32px;
  padding: 8px;
  margin-top: 24px;
  overflow: auto;
`;

export const Card = styled.div<CardProps>`
  background: ${({ total }: CardProps): string => (total ? '#4182D8' : '#fff')};
  padding: 22px 32px;
  min-width: 240px;
  border-radius: 6px;
  color: ${({ total }: CardProps): string => (total ? '#fff' : '#363F5F')};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  header {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    padding: 0;

    p {
      font-size: 16px;
      margin-bottom: 14px;
    }
  }

  h1 {
    display: flex;
    font-size: 36px;
    font-weight: normal;
    line-height: 54px;

    input {
      font-size: 36px;
      width: calc(100%);
    }

    span {
      margin-right: 10px;
    }
  }
`;
