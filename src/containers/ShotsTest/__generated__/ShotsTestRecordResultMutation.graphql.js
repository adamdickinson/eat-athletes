/**
 * @flow
 * @relayHash 849cea31b5019176f725852a9b5ec76d
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ShotsTestRecordResultMutationVariables = {|
  result: {
    athlete: string,
    date: string,
    test: string,
    attempts: $ReadOnlyArray<{
      made: boolean,
      time?: ?number,
    }>,
  },
|};
export type ShotsTestRecordResultMutationResponse = {|
  +recordShootingResult: {|
    +id: string,
  |},
|};
*/


/*
mutation ShotsTestRecordResultMutation(
  $result: ShootingResultInput!
) {
  recordShootingResult(result: $result) {
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "result",
    "type": "ShootingResultInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "recordShootingResult",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "result",
        "variableName": "result",
        "type": "ShootingResultInput!"
      }
    ],
    "concreteType": "ShootingResult",
    "plural": false,
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
  "name": "ShotsTestRecordResultMutation",
  "id": null,
  "text": "mutation ShotsTestRecordResultMutation(\n  $result: ShootingResultInput!\n) {\n  recordShootingResult(result: $result) {\n    id\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "ShotsTestRecordResultMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "ShotsTestRecordResultMutation",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
(node/*: any*/).hash = '3930d6a040505453182eef52b307e4b3';
module.exports = node;
