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


const node/*: ConcreteFragment*/ = {
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
  ]
};
(node/*: any*/).hash = '057954affec86e2e1ec5e8a681d300ef';
module.exports = node;
