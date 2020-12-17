import StartupExpress from "../src/StartupExpress";
import UserRoute from "./routes/UserRoute";

class App extends StartupExpress {
    constructor() {
        super();
    }

    protected routes(): void {
        this.defaultRouter
            .addRoute(UserRoute);
    }

    protected configure(): void {

    }

}

export default App;