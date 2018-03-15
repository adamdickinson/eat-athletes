/**
 * @flow
 * @relayHash d1ba33e318734482fd24659b75d273c9
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type AgilityTestRecordResultsMutationVariables = {|
  results: $ReadOnlyArray<{
    value: number,
    athlete: string,
    date: string,
    test: string,
    variation?: ?string,
  }>,
|};
export type AgilityTestRecordResultsMutationResponse = {|
  +recordResults: ?$ReadOnlyArray<?{|
    +_id: string,
  |}>,
|};
*/


/*
mutation AgilityTestRecordResultsMutation(
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
  "name": "AgilityTestRecordResultsMutation",
  "id": null,
  "text": "mutation AgilityTestRecordResultsMutation(\n  $results: [ResultInput!]!\n) {\n  recordResults(results: $results) {\n    _id\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "AgilityTestRecordResultsMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "AgilityTestRecordResultsMutation",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
(node/*: any*/).hash = '264969dde203fb42112284f90d76a786';
module.exports = node;
