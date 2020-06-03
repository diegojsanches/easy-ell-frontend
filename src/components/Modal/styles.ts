import styled from 'styled-components';

interface ContainerProps {
  show: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: ${({ show }) => (show ? 'block' : 'none')};
  position: fixed;
  background: #000;
  /* color: #fff; */
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
`;

export const Content = styled.div`
  background: #fefefe;
  margin: 15% auto;
  padding: 20px;
  width: 60%;
  border-radius: 6px;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #666666;
  margin-bottom: 15px;
`;
