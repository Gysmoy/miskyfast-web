import BasicRest from "./BasicRest";

class HomeRest extends BasicRest {

    graph = (type, filter) => this.simpleGet(`/api/graph/${type}/${filter}`)
}

export default HomeRest