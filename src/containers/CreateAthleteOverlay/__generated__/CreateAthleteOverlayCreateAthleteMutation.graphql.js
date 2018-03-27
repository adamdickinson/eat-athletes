/**
 * @flow
 * @relayHash 83efaceb5b7689cf6b57f6ecf27564a8
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CreateAthleteOverlayCreateAthleteMutationVariables = {|
  athlete?: ?{
    dateOfBirth: string,
    firstName: string,
    graduatingYear: number,
    lastName: string,
    photoUrl?: ?string,
    position?: ?string,
  },
|};
export type CreateAthleteOverlayCreateAthleteMutationResponse = {|
  +createAthlete: {|
    +id: string,
  |},
|};
*/


/*
mutation CreateAthleteOverlayCreateAthleteMutation(
  $athlete: AthleteInput
) {
  createAthlete(athlete: $athlete) {
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "athlete",
    "type": "AthleteInput",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "createAthlete",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "athlete",
        "variableName": "athlete",
        "type": "AthleteInput"
      }
    ],
    "concreteType": "Athlete",
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
  "name": "CreateAthleteOverlayCreateAthleteMutation",
  "id": null,
  "text": "mutation CreateAthleteOverlayCreateAthleteMutation(\n  $athlete: AthleteInput\n) {\n  createAthlete(athlete: $athlete) {\n    id\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "CreateAthleteOverlayCreateAthleteMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "CreateAthleteOverlayCreateAthleteMutation",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
(node/*: any*/).hash = '282f96b9a08ca70f20a2a1057ec57730';
module.exports = node;
