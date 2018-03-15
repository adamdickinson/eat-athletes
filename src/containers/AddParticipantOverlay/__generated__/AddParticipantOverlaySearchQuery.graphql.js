/**
 * @flow
 * @relayHash bbb7b71997959b8d40b49bebf5264b00
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type AddParticipantOverlaySearchQueryVariables = {|
  query: string,
|};
export type AddParticipantOverlaySearchQueryResponse = {|
  +findAthletes: $ReadOnlyArray<{|
    +_id: string,
    +firstName: string,
    +lastName: string,
    +photoUrl: ?string,
  |}>,
|};
*/


/*
query AddParticipantOverlaySearchQuery(
  $query: String!
) {
  findAthletes(query: $query) {
    _id
    firstName
    lastName
    photoUrl
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
    "name": "findAthletes",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "query",
        "variableName": "query",
        "type": "String!"
      }
    ],
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
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "AddParticipantOverlaySearchQuery",
  "id": null,
  "text": "query AddParticipantOverlaySearchQuery(\n  $query: String!\n) {\n  findAthletes(query: $query) {\n    _id\n    firstName\n    lastName\n    photoUrl\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "AddParticipantOverlaySearchQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "AddParticipantOverlaySearchQuery",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
(node/*: any*/).hash = 'caf6e8087c126474e933433d70451653';
module.exports = node;
