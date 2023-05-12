import styled from 'styled-components';
import { Button, Container, Form, Row } from 'react-bootstrap';
import { OverlayWrapper } from './OverlayWrapper';

export const CenteredOverlayForm = ({ title, children, validated, handleSubmit }) => {
  return (
    <StyledCentralizedContainer>
      <StyledLogo>Dutch Pay</StyledLogo>
      <OverlayWrapper>
        <Container>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <StyledRow>
              <Row className='aligin-items-start'>
                <StyledTitle>{title}</StyledTitle>
              </Row>
              <Row className='aligin-items-center'>{children}</Row>
              <Row className='aligin-items-end'>
                <StyledSubmitBtn>저장</StyledSubmitBtn>
              </Row>
            </StyledRow>
          </Form>
        </Container>
      </OverlayWrapper>
    </StyledCentralizedContainer>
  );
};

const StyledCentralizedContainer = styled(Container)`
  width: 50vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
  gap: 50px;
`;

const StyledLogo = styled.h1`
  font-weight: 200;
  letter-spacing: 10px;
`;

const StyledRow = styled(Row)`
  height: 60vh;
  align-items: center;
  justify-content: center;
`;

const StyledTitle = styled.h2`
  font-weight: 700;
  line-height: 35px;
  text-align: right;
  word-break: keep-all;
`;

const StyledSubmitBtn = styled(Button).attrs({
  type: 'submit',
})`
  background-color: #6610f2;
  border: none;
  border-radius: 8px;

  padding: 0.75rem 1.25rem;

  &:hover {
    background-color: #6610f2;
    filter: brightness(80%);
  }
`;
