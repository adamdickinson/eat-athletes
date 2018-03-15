/**
 * @flow
 * @relayHash fa6eaf2b09baaa40bb11a9633aff84d9
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type Sidebar_profile$ref = any;
export type AppQueryVariables = {| |};
export type AppQueryResponse = {|
  +currentUser: ?{|
    +__typename?: string,
    +$fragmentRefs: Sidebar_profile$ref,
  |},
|};
*/


/*
query AppQuery {
  currentUser {
    __typename
    ... on User {
      __typename
    }
    ...Sidebar_profile
  }
}

fragment Sidebar_profile on CurrentUserResult {
  ... on User {
    __typename
    firstName
    lastName
    photoUrl
    position
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "AppQuery",
  "id": null,
  "text": "query AppQuery {\n  currentUser {\n    __typename\n    ... on User {\n      __typename\n    }\n    ...Sidebar_profile\n  }\n}\n\nfragment Sidebar_profile on CurrentUserResult {\n  ... on User {\n    __typename\n    firstName\n    lastName\n    photoUrl\n    position\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "AppQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "currentUser",
        "storageKey": null,
        "args": null,
        "concreteType": null,
        "plural": false,
        "selections": [
          v0,
          {
            "kind": "FragmentSpread",
            "name": "Sidebar_profile",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "AppQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "currentUser",
        "storageKey": null,
        "args": null,
        "concreteType": null,
        "plural": false,
        "selections": [
          v0,
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "firstName",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "lastName",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "photoUrl",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "position",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  }
};
})();
(node/*: any*/).hash = 'd018eb253b31570eef1477e6bb4cc02b';
module.exports = node;
