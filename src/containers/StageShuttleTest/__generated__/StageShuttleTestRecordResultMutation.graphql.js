/**
 * @flow
 * @relayHash 55c51de7a43313ffb325d92bb583bbf2
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type StageShuttleTestRecordResultMutationVariables = {|
  results: $ReadOnlyArray<{
    athlete: string,
    date: string,
    test: string,
    stage: number,
    shuttle: number,
  }>,
|};
export type StageShuttleTestRecordResultMutationResponse = {|
  +recordStageShuttleResults: $ReadOnlyArray<{|
    +id: string,
  |}>,
|};
*/


/*
mutation StageShuttleTestRecordResultMutation(
  $results: [StageShuttleResultInput!]!
) {
  recordStageShuttleResults(results: $results) {
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "results",
    "type": "[StageShuttleResultInput!]!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "recordStageShuttleResults",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "results",
        "variableName": "results",
        "type": "[StageShuttleResultInput!]!"
      }
    ],
    "concreteType": "StageShuttleResult",
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
  "name": "StageShuttleTestRecordResultMutation",
  "id": null,
  "text": "mutation StageShuttleTestRecordResultMutation(\n  $results: [StageShuttleResultInput!]!\n) {\n  recordStageShuttleResults(results: $results) {\n    id\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "StageShuttleTestRecordResultMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "StageShuttleTestRecordResultMutation",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
(node/*: any*/).hash = 'ba47762466c9e4c9990aac3032138b0e';
module.exports = node;
