/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
import type { FragmentReference } from 'relay-runtime';
declare export opaque type Sidebar_tests$ref: FragmentReference;
export type Sidebar_tests = $ReadOnlyArray<{|
  +id: string,
  +name: string,
  +variation: ?string,
  +$refType: Sidebar_tests$ref,
|}>;
*/


const node/*: ConcreteFragment*/ = {
  "kind": "Fragment",
  "name": "Sidebar_tests",
  "type": "Test",
  "metadata": {
    "plural": true
  },
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "id",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "name",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "variation",
      "args": null,
      "storageKey": null
    }
  ]
};
(node/*: any*/).hash = 'fdceafa73e3e460679f723c337638741';
module.exports = node;
