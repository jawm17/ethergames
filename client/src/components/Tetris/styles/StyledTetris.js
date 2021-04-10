import styled from "styled-components";

export const StyledTetrisWrapper = styled.div`
    width: 100vw;
    height: calc(100vh - 200px);

    background: yellow;
    background-size: cover;
    border-bottom-right-radius: 20px;
    border-bottom-left-radius: 20px;
    position: relative;
    outline: none;

    #test {
        display: flex;
    }

    aside {
        position: absolute;
        right: 165px;
        bottom: -65px;
    }

`;
export const StyledTetris = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    margin: 0 auto;
    max-width: 900px;

    @media only screen and (max-width: 600px) {
        #test {
          background: lightblue;
        }
    }
`;