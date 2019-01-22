import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import { CURRENT_USER_QUERY } from './User';



const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`;

const Signout = () => (
  <Mutation
    mutation={SIGN_OUT_MUTATION}
    refetchQueries={[{ query: CURRENT_USER_QUERY }]}
  >
    {
      signout => (
        <a
          onClick={() => {
            signout();
            Router.push({
              pathname: '/',
            });
          }}
        >
          Sign Out
        </a>
      )
    }
  </Mutation>
);
export default Signout;
