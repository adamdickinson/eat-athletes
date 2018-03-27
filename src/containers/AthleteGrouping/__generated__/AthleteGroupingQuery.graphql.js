/**
 * @flow
 * @relayHash 97e8a8e122aebfe14d8269a71f6b98df
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type AthleteGroupingQueryVariables = {| |};
export type AthleteGroupingQueryResponse = {|
  +athletes: $ReadOnlyArray<{|
    +id: string,
    +age: number,
    +firstName: string,
    +lastName: string,
  |}>,
  +groups: $ReadOnlyArray<{|
    +id: string,
    +name: string,
    +athletes: $ReadOnlyArray<{|
      +id: string,
    |}>,
  |}>,
|};
*/


/*
query AthleteGroupingQuery {
  athletes {
    id
    age
    firstName
    lastName
  }
  groups {
    id
    name
    athletes {
      id
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "athletes",
    "storageKey": null,
    "args": null,
    "concreteType": "Athlete",
    "plural": true,
    "selections": [
      v0,
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "age",
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
      }
    ]
  },
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "groups",
    "storageKey": null,
    "args": null,
    "concreteType": "Group",
    "plural": true,
    "selections": [
      v0,
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
          v0
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "AthleteGroupingQuery",
  "id": null,
  "text": "query AthleteGroupingQuery {\n  athletes {\n    id\n    age\n    firstName\n    lastName\n  }\n  groups {\n    id\n    name\n    athletes {\n      id\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "AthleteGroupingQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "AthleteGroupingQuery",
    "argumentDefinitions": [],
    "selections": v1
  }
};
})();
(node/*: any*/).hash = 'e763c0a3968c49d9a8c11894d19a26cd';
module.exports = node;
