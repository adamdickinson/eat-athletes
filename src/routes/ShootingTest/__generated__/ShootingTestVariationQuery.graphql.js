/**
 * @flow
 * @relayHash 456e6ac8a9d49072a5eeb59893acb260
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ShootingTestVariationQueryVariables = {| |};
export type ShootingTestVariationQueryResponse = {|
  +test: ?{|
    +variations: $ReadOnlyArray<{|
      +name: string,
      +duration: ?number,
    |}>,
    +duration: ?number,
  |},
|};
*/


/*
query ShootingTestVariationQuery {
  test(name: "Shooting Test") {
    variations {
      name
      duration
    }
    duration
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "duration",
  "args": null,
  "storageKey": null
},
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "test",
    "storageKey": "test(name:\"Shooting Test\")",
    "args": [
      {
        "kind": "Literal",
        "name": "name",
        "value": "Shooting Test",
        "type": "String!"
      }
    ],
    "concreteType": "Test",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "variations",
        "storageKey": null,
        "args": null,
        "concreteType": "TestVariation",
        "plural": true,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "name",
            "args": null,
            "storageKey": null
          },
          v0
        ]
      },
      v0
    ]
  }
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "ShootingTestVariationQuery",
  "id": null,
  "text": "query ShootingTestVariationQuery {\n  test(name: \"Shooting Test\") {\n    variations {\n      name\n      duration\n    }\n    duration\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "ShootingTestVariationQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "ShootingTestVariationQuery",
    "argumentDefinitions": [],
    "selections": v1
  }
};
})();
(node/*: any*/).hash = '51699e7db2bcdd365a0c939b1cc36a59';
module.exports = node;
