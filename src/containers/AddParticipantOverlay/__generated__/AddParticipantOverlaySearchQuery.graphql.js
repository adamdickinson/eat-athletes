/**
 * @flow
 * @relayHash 78f67af1b5fd36452e4e05cdf72f0c28
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type AddParticipantOverlaySearchQueryVariables = {|
  query: string,
|};
export type AddParticipantOverlaySearchQueryResponse = {|
  +searchAthletes: $ReadOnlyArray<{|
    +id: string,
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
  searchAthletes(query: $query) {
    id
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
    "name": "searchAthletes",
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
        "name": "id",
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
  "text": "query AddParticipantOverlaySearchQuery(\n  $query: String!\n) {\n  searchAthletes(query: $query) {\n    id\n    firstName\n    lastName\n    photoUrl\n  }\n}\n",
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
(node/*: any*/).hash = 'f77982dfe4948117e287d387c5bfb99a';
module.exports = node;
