import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core'
import { Provider, createClient } from 'urql'
import { NavBar } from '../components/NavBar';
import theme from '../theme'

const client = createClient({
  url: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: 'include'
  }
});

function MyApp({ Component, pageProps }: any) {
  return (
    <Provider value={client}>
      <ThemeProvider theme={theme}>
        <ColorModeProvider>
          <CSSReset />
          <NavBar />
          <Component {...pageProps} />
        </ColorModeProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp
