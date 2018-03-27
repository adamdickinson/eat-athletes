/**
 * @flow
 * @relayHash b1ca1e4dfb906a67f8b5e5e611316b38
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type AthleteGroupingRemoveAthleteMutationVariables = {|
  athlete: string,
  group: string,
|};
export type AthleteGroupingRemoveAthleteMutationResponse = {|
  +removeAthleteFromGroup: {|
    +athletes: $ReadOnlyArray<{|
      +id: string,
    |}>,
  |},
|};
*/


/*
mutation AthleteGroupingRemoveAthleteMutation(
  $athlete: ID!
  $group: ID!
) {
  removeAthleteFromGroup(athlete: $athlete, group: $group) {
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
  "name": "AthleteGroupingRemoveAthleteMutation",
  "id": null,
  "text": "mutation AthleteGroupingRemoveAthleteMutation(\n  $athlete: ID!\n  $group: ID!\n) {\n  removeAthleteFromGroup(athlete: $athlete, group: $group) {\n    athletes {\n      id\n    }\n    id\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "AthleteGroupingRemoveAthleteMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "removeAthleteFromGroup",
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
    "name": "AthleteGroupingRemoveAthleteMutation",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "removeAthleteFromGroup",
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
(node/*: any*/).hash = 'fa7f5344036991dcd57f8ff46bcb24ec';
module.exports = node;
