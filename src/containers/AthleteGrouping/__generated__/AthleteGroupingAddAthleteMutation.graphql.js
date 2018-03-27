/**
 * @flow
 * @relayHash 04734440329f16c4d3a236776bbcf3fb
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type AthleteGroupingAddAthleteMutationVariables = {|
  athlete: string,
  group: string,
|};
export type AthleteGroupingAddAthleteMutationResponse = {|
  +addAthleteToGroup: {|
    +athletes: $ReadOnlyArray<{|
      +id: string,
    |}>,
  |},
|};
*/


/*
mutation AthleteGroupingAddAthleteMutation(
  $athlete: ID!
  $group: ID!
) {
  addAthleteToGroup(athlete: $athlete, group: $group) {
    athletes {
      id
    }
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "athlete",
    "type": "ID!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "group",
    "type": "ID!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "athlete",
    "variableName": "athlete",
    "type": "ID!"
  },
  {
    "kind": "Variable",
    "name": "group",
    "variableName": "group",
    "type": "ID!"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "athletes",
  "storageKey": null,
  "args": null,
  "concreteType": "Athlete",
  "plural": true,
  "selections": [
    v2
  ]
};
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "AthleteGroupingAddAthleteMutation",
  "id": null,
  "text": "mutation AthleteGroupingAddAthleteMutation(\n  $athlete: ID!\n  $group: ID!\n) {\n  addAthleteToGroup(athlete: $athlete, group: $group) {\n    athletes {\n      id\n    }\n    id\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "AthleteGroupingAddAthleteMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "addAthleteToGroup",
        "storageKey": null,
        "args": v1,
        "concreteType": "Group",
        "plural": false,
        "selections": [
          v3
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "AthleteGroupingAddAthleteMutation",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "addAthleteToGroup",
        "storageKey": null,
        "args": v1,
        "concreteType": "Group",
        "plural": false,
        "selections": [
          v3,
          v2
        ]
      }
    ]
  }
};
})();
(node/*: any*/).hash = '192eea49422670020a8ec636381d0cc9';
module.exports = node;
