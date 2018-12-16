import App, { Container } from 'next/app';
import { ApolloProvider } from 'react-apollo';

import withData from '../lib/withData';

import Page from '../components/Page';




class MyApp extends App {

  static async getInitialProps ({ Component, ctx }) {
    return {
      pageProps: {
        ... (Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
        query: ctx.query,
      }
    };
  }

  render() {

    const { Component, apollo, pageProps } = this.props;

    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </ApolloProvider>
      </Container>
    );
  }

}

export default withData(MyApp);
