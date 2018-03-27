import { Environment, Network, RecordSource, Store } from "relay-runtime"



const fetchQuery = (operation, variables) =>
  fetch(`${window.location.protocol}//${window.location.hostname}:3000/graphql`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify({ query: operation.text, variables })
  }).then(response => response.json())



export default new Environment({
  network: Network.create(fetchQuery),
  store:   new Store(new RecordSource())
})
