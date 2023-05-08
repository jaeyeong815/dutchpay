import styled from 'styled-components';

export const OverlayWrapper = ({ children }) => <StyledContainer>{children}</StyledContainer>;

const StyledContainer = styled.div`
  min-height: ${(props) => props.minHeight || '0'};
  padding: ${(props) => props.padding || '5vw'};
  background-color: white;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 15px;
`;
