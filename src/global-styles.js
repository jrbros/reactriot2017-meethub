import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
    html {
        font-size: 16px;
        box-sizing: border-box;
    }
    body {
        font-family: 'Source Sans Pro', Helvetica, sans-serif;
        -webkit-font-smoothing: antialiased;
        line-height: 1.5;
        background-color: #F5F5F5;
    }

    *, *:before, *:after {
        box-sizing: inherit;
    }
`;
