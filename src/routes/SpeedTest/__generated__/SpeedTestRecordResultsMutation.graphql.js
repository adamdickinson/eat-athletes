/**
 * @flow
 * @relayHash 5489d89d2db1389c3128883daa2e17c4
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type SpeedTestRecordResultsMutationVariables = {|
  results: $ReadOnlyArray<{
    value: number,
    athlete: string,
    date: string,
    test: string,
    variation?: ?string,
  }>,
|};
export type SpeedTestRecordResultsMutationResponse = {|
  +recordResults: ?$ReadOnlyArray<?{|
    +_id: string,
  |}>,
|};
*/


/*
mutation SpeedTestRecordResultsMutation(
  $results: [ResultInput!]!
) {
  recordResults(results: $results) {
    _id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "results",
    "type": "[ResultInput!]!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "recordResults",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "results",
        "variableName": "results",
        "type": "[ResultInput!]!"
      }
    ],
    "concreteType": "Result",
    "plural": true,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "_id",
        "args": null,
        "storageKey": null
      }
    ]
  }
];
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "SpeedTestRecordResultsMutation",
  "id": null,
  "text": "mutation SpeedTestRecordResultsMutation(\n  $results: [ResultInput!]!\n) {\n  recordResults(results: $results) {\n    _id\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "SpeedTestRecordResultsMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "SpeedTestRecordResultsMutation",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
(node/*: any*/).hash = 'b340d5f5b476ab2ed5874468ffbab431';
module.exports = node;
