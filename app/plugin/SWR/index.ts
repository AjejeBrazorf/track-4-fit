import type { TypedDocumentNode } from '@graphql-typed-document-node/core'
import type { RequestDocument } from 'graphql-request'
import { request } from 'graphql-request'

import { siteConfig } from '@/config/siteConfig'

type Query = RequestDocument | TypedDocumentNode<unknown, object>

export const graphQLFetcher = async (query: Query, variables: any) => {
  return request(siteConfig.graphQLUrl, query, variables)
  /*
    , {
    Authorization: `Bearer ${siteConfig.auth.secretKey}`,
  })
    */
}
