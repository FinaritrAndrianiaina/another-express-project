import {RouteDeclaration} from "./RouteDeclaration";

class Routing {
    declaration: RouteDeclaration[] = [];

    public addRoute(route: RouteDeclaration): Routing {
        this.declaration.push(route);
        return this;
    }
}

export default Routing;