/**
 * @flow
 * @relayHash 9e807bca52bcaee31cbc0c2e0d0d70c4
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type BodyTestRecordMeasurementsultsMutationVariables = {|
  measurement: {
    athlete: string,
    bodyFat: number,
    date: string,
    handLength: number,
    handWidth: number,
    height: number,
    heightWithShoes: number,
    standingReach: number,
    weight: number,
    wingspan: number,
  },
|};
export type BodyTestRecordMeasurementsultsMutationResponse = {|
  +recordMeasurement: ?{|
    +_id: string,
  |},
|};
*/


/*
mutation BodyTestRecordMeasurementsultsMutation(
  $measurement: MeasurementInput!
) {
  recordMeasurement(measurement: $measurement) {
    _id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "measurement",
    "type": "MeasurementInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "recordMeasurement",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "measurement",
        "variableName": "measurement",
        "type": "MeasurementInput!"
      }
    ],
    "concreteType": "Measurement",
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
  "name": "BodyTestRecordMeasurementsultsMutation",
  "id": null,
  "text": "mutation BodyTestRecordMeasurementsultsMutation(\n  $measurement: MeasurementInput!\n) {\n  recordMeasurement(measurement: $measurement) {\n    _id\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "BodyTestRecordMeasurementsultsMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "BodyTestRecordMeasurementsultsMutation",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
(node/*: any*/).hash = '9c4dcee5783f97c43a794871e34714d4';
module.exports = node;
