/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
import type { FragmentReference } from 'relay-runtime';
declare export opaque type Sidebar_profile$ref: FragmentReference;
export type Sidebar_profile = {|
  +__typename?: string,
  +firstName?: string,
  +lastName?: string,
  +photoUrl?: ?string,
  +position?: ?string,
  +$refType: Sidebar_profile$ref,
|};
*/


const node/*: ConcreteFragment*/ = (function(){
var v0 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "photoUrl",
    "args": null,
    "storageKey": null
  },
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "position",
    "args": null,
    "storageKey": null
  }
];
return {
  "kind": "Fragment",
  "name": "Sidebar_profile",
  "type": "CurrentUserResult",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "__typename",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "firstName",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "lastName",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "InlineFragment",
      "type": "Athlete",
      "selections": v0
    },
    {
      "kind": "InlineFragment",
      "type": "Coach",
      "selections": v0
    }
  ]
};
})();
(node/*: any*/).hash = '35ad4ffd4ed9e3e692e8885d67865f0c';
module.exports = node;
