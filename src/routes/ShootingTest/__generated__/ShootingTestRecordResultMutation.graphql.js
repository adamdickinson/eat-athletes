/**
 * @flow
 * @relayHash 64ad8dde22b65407ac0b202e9b09fc4b
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ShootingTestRecordResultMutationVariables = {|
  result: {
    athlete: string,
    attempts?: ?$ReadOnlyArray<?{
      made: boolean,
      time?: ?number,
    }>,
    date: string,
    test: string,
    variation?: ?string,
  },
|};
export type ShootingTestRecordResultMutationResponse = {|
  +recordShootingResult: ?{|
    +_id: string,
  |},
|};
*/


/*
mutation ShootingTestRecordResultMutation(
  $result: ShootingResultInput!
) {
  recordShootingResult(result: $result) {
    _id
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
        "type": "ShootingResultInput"
      }
    ],
    "concreteType": "ShootingResult",
    "plural": false,
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
  "name": "ShootingTestRecordResultMutation",
  "id": null,
  "text": "mutation ShootingTestRecordResultMutation(\n  $result: ShootingResultInput!\n) {\n  recordShootingResult(result: $result) {\n    _id\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "ShootingTestRecordResultMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "ShootingTestRecordResultMutation",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
(node/*: any*/).hash = 'c10110827af3e41bbb4e4e23e69c38df';
module.exports = node;
