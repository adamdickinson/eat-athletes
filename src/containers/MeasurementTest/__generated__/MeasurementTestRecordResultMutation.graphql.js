/**
 * @flow
 * @relayHash a27cd307f1a776234a85aefcb40bf034
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type MeasurementTestRecordResultMutationVariables = {|
  results: $ReadOnlyArray<{
    athlete: string,
    date: string,
    test: string,
    specId: string,
    value: number,
  }>,
|};
export type MeasurementTestRecordResultMutationResponse = {|
  +recordMeasurementResults: $ReadOnlyArray<{|
    +id: string,
  |}>,
|};
*/


/*
mutation MeasurementTestRecordResultMutation(
  $results: [MeasurementResultInput!]!
) {
  recordMeasurementResults(results: $results) {
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "results",
    "type": "[MeasurementResultInput!]!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "recordMeasurementResults",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "results",
        "variableName": "results",
        "type": "[MeasurementResultInput!]!"
      }
    ],
    "concreteType": "MeasurementResult",
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
  "name": "MeasurementTestRecordResultMutation",
  "id": null,
  "text": "mutation MeasurementTestRecordResultMutation(\n  $results: [MeasurementResultInput!]!\n) {\n  recordMeasurementResults(results: $results) {\n    id\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "MeasurementTestRecordResultMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "MeasurementTestRecordResultMutation",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
(node/*: any*/).hash = '03f6d7d8b670e53af8c491c7d731f607';
module.exports = node;
