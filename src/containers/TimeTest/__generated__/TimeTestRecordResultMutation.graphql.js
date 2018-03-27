/**
 * @flow
 * @relayHash dc7c5a628c03c89ee782f16dfa4cb0f5
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type TimeTestRecordResultMutationVariables = {|
  results: $ReadOnlyArray<{
    athlete: string,
    date: string,
    test: string,
    time: number,
  }>,
|};
export type TimeTestRecordResultMutationResponse = {|
  +recordTimeResults: $ReadOnlyArray<{|
    +id: string,
  |}>,
|};
*/


/*
mutation TimeTestRecordResultMutation(
  $results: [TimeResultInput!]!
) {
  recordTimeResults(results: $results) {
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "results",
    "type": "[TimeResultInput!]!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "recordTimeResults",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "results",
        "variableName": "results",
        "type": "[TimeResultInput!]!"
      }
    ],
    "concreteType": "TimeResult",
    "plural": true,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "id",
        "args": null,
        "storageKey": null
      }
    ]
  }
];
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "TimeTestRecordResultMutation",
  "id": null,
  "text": "mutation TimeTestRecordResultMutation(\n  $results: [TimeResultInput!]!\n) {\n  recordTimeResults(results: $results) {\n    id\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "TimeTestRecordResultMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "TimeTestRecordResultMutation",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
(node/*: any*/).hash = '451d73f2c66fa53a444a1ceb29b93841';
module.exports = node;
