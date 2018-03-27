/**
 * @flow
 * @relayHash 374cdf7f30792040d2645e53b61f1953
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type Sidebar_profile$ref = any;
type Sidebar_tests$ref = any;
export type ResultType = ('MEASUREMENTS' | 'SHOTS' | 'SPLIT' | 'STAGE_SHUTTLE' | 'TIME' | '%future added value');
export type TestLimitMetric = ('DISTANCE' | 'TIME' | '%future added value');
export type TestSpecMetric = ('CM_FT' | 'CM_IN' | 'KG_LB' | 'M_FT' | 'M_YD' | 'PERCENTAGE' | '%future added value');
export type AppQueryVariables = {| |};
export type AppQueryResponse = {|
  +currentUser: ?{|
    +__typename: string,
    +$fragmentRefs: Sidebar_profile$ref,
  |},
  +tests: $ReadOnlyArray<{|
    +id: string,
    +name: string,
    +variation: ?string,
    +specs: ?$ReadOnlyArray<{|
      +id: string,
      +name: string,
      +metric: TestSpecMetric,
    |}>,
    +limit: ?{|
      +metric: TestLimitMetric,
      +value: number,
    |},
    +resultType: ResultType,
    +groupTest: boolean,
    +$fragmentRefs: Sidebar_tests$ref,
  |}>,
|};
*/


/*
query AppQuery {
  currentUser {
    __typename
    ...Sidebar_profile
    ... on Athlete {
      id
    }
    ... on Coach {
      id
    }
    ... on Guest {
      id
    }
  }
  tests {
    id
    name
    variation
    specs {
      id
      name
      metric
    }
    limit {
      metric
      value
    }
    resultType
    groupTest
    ...Sidebar_tests
  }
}

fragment Sidebar_profile on CurrentUserResult {
  ... on User {
    __typename
    firstName
    lastName
  }
  ... on Coach {
    photoUrl
    position
  }
  ... on Athlete {
    photoUrl
    position
  }
}

fragment Sidebar_tests on Test {
  id
  name
  variation
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "variation",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "metric",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "specs",
  "storageKey": null,
  "args": null,
  "concreteType": "TestSpec",
  "plural": true,
  "selections": [
    v1,
    v2,
    v4
  ]
},
v6 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "limit",
  "storageKey": null,
  "args": null,
  "concreteType": "TestLimit",
  "plural": false,
  "selections": [
    v4,
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "value",
      "args": null,
      "storageKey": null
    }
  ]
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "resultType",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "groupTest",
  "args": null,
  "storageKey": null
},
v9 = [
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
  },
  v1
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "AppQuery",
  "id": null,
  "text": "query AppQuery {\n  currentUser {\n    __typename\n    ...Sidebar_profile\n    ... on Athlete {\n      id\n    }\n    ... on Coach {\n      id\n    }\n    ... on Guest {\n      id\n    }\n  }\n  tests {\n    id\n    name\n    variation\n    specs {\n      id\n      name\n      metric\n    }\n    limit {\n      metric\n      value\n    }\n    resultType\n    groupTest\n    ...Sidebar_tests\n  }\n}\n\nfragment Sidebar_profile on CurrentUserResult {\n  ... on User {\n    __typename\n    firstName\n    lastName\n  }\n  ... on Coach {\n    photoUrl\n    position\n  }\n  ... on Athlete {\n    photoUrl\n    position\n  }\n}\n\nfragment Sidebar_tests on Test {\n  id\n  name\n  variation\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "AppQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "currentUser",
        "storageKey": null,
        "args": null,
        "concreteType": null,
        "plural": false,
        "selections": [
          v0,
          {
            "kind": "FragmentSpread",
            "name": "Sidebar_profile",
            "args": null
          }
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "tests",
        "storageKey": null,
        "args": null,
        "concreteType": "Test",
        "plural": true,
        "selections": [
          v1,
          v2,
          v3,
          v5,
          v6,
          v7,
          v8,
          {
            "kind": "FragmentSpread",
            "name": "Sidebar_tests",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "AppQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "currentUser",
        "storageKey": null,
        "args": null,
        "concreteType": null,
        "plural": false,
        "selections": [
          v0,
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
            "type": "Guest",
            "selections": [
              v1
            ]
          },
          {
            "kind": "InlineFragment",
            "type": "Athlete",
            "selections": v9
          },
          {
            "kind": "InlineFragment",
            "type": "Coach",
            "selections": v9
          }
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "tests",
        "storageKey": null,
        "args": null,
        "concreteType": "Test",
        "plural": true,
        "selections": [
          v1,
          v2,
          v3,
          v5,
          v6,
          v7,
          v8
        ]
      }
    ]
  }
};
})();
(node/*: any*/).hash = '6a38f663f0d87ed0cf111e02ab554004';
module.exports = node;
