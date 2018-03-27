/**
 * @flow
 * @relayHash 07323b25b24397bcfc921ca687f680f8
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CreateGroupOverlayCreateGroupMutationVariables = {|
  group: {
    name: string,
  },
|};
export type CreateGroupOverlayCreateGroupMutationResponse = {|
  +createGroup: {|
    +id: string,
  |},
|};
*/


/*
mutation CreateGroupOverlayCreateGroupMutation(
  $group: GroupInput!
) {
  createGroup(group: $group) {
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "group",
    "type": "GroupInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "createGroup",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "group",
        "variableName": "group",
        "type": "GroupInput!"
      }
    ],
    "concreteType": "Group",
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
  "name": "CreateGroupOverlayCreateGroupMutation",
  "id": null,
  "text": "mutation CreateGroupOverlayCreateGroupMutation(\n  $group: GroupInput!\n) {\n  createGroup(group: $group) {\n    id\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "CreateGroupOverlayCreateGroupMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "CreateGroupOverlayCreateGroupMutation",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
(node/*: any*/).hash = '4888e8a5c2f50e5719923fa95f38b4a3';
module.exports = node;
