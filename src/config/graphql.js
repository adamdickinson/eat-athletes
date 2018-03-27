import Lokka from "lokka"
import Transport from "lokka-transport-http"

export default new Lokka({ transport: new Transport(`${window.location.protocol}//${window.location.hostname}:3000/graphql`) })
