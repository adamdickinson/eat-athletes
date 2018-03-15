/**
 * @flow
 * @relayHash 5da3416bbbafc41dcc48d9fe461a5c76
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type BeepTestRecordResultsMutationVariables = {|
  results: $ReadOnlyArray<{
    value: number,
    athlete: string,
    date: string,
    test: string,
    variation?: ?string,
  }>,
|};
export type BeepTestRecordResultsMutationResponse = {|
  +recordResults: ?$ReadOnlyArray<?{|
    +_id: string,
  |}>,
|};
*/


/*
mutation BeepTestRecordResultsMutation(
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
  "name": "BeepTestRecordResultsMutation",
  "id": null,
  "text": "mutation BeepTestRecordResultsMutation(\n  $results: [ResultInput!]!\n) {\n  recordResults(results: $results) {\n    _id\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "BeepTestRecordResultsMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "BeepTestRecordResultsMutation",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
(node/*: any*/).hash = '00e5ca72f23a942ef8634d72f70dde58';
module.exports = node;
