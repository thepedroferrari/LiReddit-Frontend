import { cacheExchange } from '@urql/exchange-graphcache';
import Router from 'next/router';
import { dedupExchange, fetchExchange, Exchange } from "urql";
import { pipe, tap } from 'wonka';

import { LoginMutation, MeDocument, MeQuery, RegisterMutation, LogoutMutation } from '../generated/graphql';
import { betterUpdateQuery } from "./betterUpdateQuery";

export const errorExchange: Exchange = ({ forward }) => ops$ => {
  return pipe(
    forward(ops$),
    tap(({ error }) => {
      if (error) {
        if (error.message.includes("Not Authenticated")) {
          Router.replace("/login")
        }
      }
    })
  );
};

export const createUrqlClient = (ssrExchange: any) => ({
  url: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: 'include' as const
  },
  exchanges: [dedupExchange, cacheExchange({
    updates: {
      Mutation: {
        logout: (_result, args, cache, info) => {
          betterUpdateQuery<LogoutMutation, MeQuery>(
            cache,
            { query: MeDocument },
            _result,
            () => ({me: null})
          )
        },
        login: (_result, args, cache, info) => {
          betterUpdateQuery<LoginMutation, MeQuery>(
            cache,
            { query: MeDocument },
            _result,
            (result, query) => {
              if (result.login.errors) {
                return query
              } else {
                return {
                  me: result.login.user
                }
              }
            }
          )
        },
        register: (_result, args, cache, info) => {
          betterUpdateQuery<RegisterMutation, MeQuery>(
            cache,
            { query: MeDocument },
            _result,
            (result, query) => {
              if (result.register.errors) {
                return query
              } else {
                return {
                  me: result.register.user
                }
              }
            }
          )
        },
      },
    },
  }),
    errorExchange,
    ssrExchange,
    fetchExchange
  ]
});
