import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`

    html, body, #root {
        height: 100%;
    }

    html {
        /* Box model */
        box-sizing: border-box;

        /* Typo */
        font-size: 16px;
    }
    body {
        /* Typo */
        font-family: 'Source Sans Pro', Helvetica, sans-serif;
        -webkit-font-smoothing: antialiased;
        line-height: 1.5;
    }

    *, *:before, *:after {
        box-sizing: inherit;
    }
`;
