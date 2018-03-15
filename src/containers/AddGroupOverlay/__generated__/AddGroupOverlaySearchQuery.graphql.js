/**
 * @flow
 * @relayHash 2313cdde33fbf7758c32cf641a22f40b
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type AddGroupOverlaySearchQueryVariables = {|
  query: string,
|};
export type AddGroupOverlaySearchQueryResponse = {|
  +findGroups: $ReadOnlyArray<{|
    +name: string,
    +athletes: ?$ReadOnlyArray<?{|
      +_id: string,
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
  findGroups(query: $query) {
    name
    athletes {
      _id
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
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "findGroups",
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
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "_id",
            "args": null,
            "storageKey": null
          },
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
  "text": "query AddGroupOverlaySearchQuery(\n  $query: String!\n) {\n  findGroups(query: $query) {\n    name\n    athletes {\n      _id\n      firstName\n      lastName\n      photoUrl\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "AddGroupOverlaySearchQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "AddGroupOverlaySearchQuery",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
(node/*: any*/).hash = 'b181543836bacd6f3f363a2e9ec1b31a';
module.exports = node;
