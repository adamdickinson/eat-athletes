/**
 * @flow
 * @relayHash 5de1507d25585ec7fc8268401ce6d2f2
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type AddGroupOverlaySearchQueryVariables = {|
  query: string,
|};
export type AddGroupOverlaySearchQueryResponse = {|
  +searchGroups: $ReadOnlyArray<{|
    +id: string,
    +name: string,
    +athletes: $ReadOnlyArray<{|
      +id: string,
      +firstName: string,
      +lastName: string,
      +photoUrl: ?string,
    |}>,
  |}>,
|};
*/


/*
query AddGroupOverlaySearchQuery(
  $query: String!
) {
  searchGroups(query: $query) {
    id
    name
    athletes {
      id
      firstName
      lastName
      photoUrl
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "query",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v2 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "searchGroups",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "query",
        "variableName": "query",
        "type": "String!"
      }
    ],
    "concreteType": "Group",
    "plural": true,
    "selections": [
      v1,
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "name",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "athletes",
        "storageKey": null,
        "args": null,
        "concreteType": "Athlete",
        "plural": true,
        "selections": [
          v1,
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
          }
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "AddGroupOverlaySearchQuery",
  "id": null,
  "text": "query AddGroupOverlaySearchQuery(\n  $query: String!\n) {\n  searchGroups(query: $query) {\n    id\n    name\n    athletes {\n      id\n      firstName\n      lastName\n      photoUrl\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "AddGroupOverlaySearchQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v2
  },
  "operation": {
    "kind": "Operation",
    "name": "AddGroupOverlaySearchQuery",
    "argumentDefinitions": v0,
    "selections": v2
  }
};
})();
(node/*: any*/).hash = '1b718fffa579674ac0aa5e688d6d404e';
module.exports = node;
