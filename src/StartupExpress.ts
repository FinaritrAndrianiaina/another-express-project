import bodyParser, {OptionsJson, OptionsUrlencoded} from "body-parser";
import express, {Application, Router} from "express";
import errorHandler from "errorhandler";
import Routing from "./routes/Routing";
import {HttpAction} from "./routes/RouteDeclaration";

// TODO Default server option
interface StartupOption {
    bodyParserJsonOpt: OptionsJson
    bodyParserUrlEncoded: OptionsUrlencoded
}

abstract class StartupExpress {
    // TODO adding default option to the project
    static readonly DefaultOption: StartupOption = {
        bodyParserJsonOpt: {limit: '50mb'},
        bodyParserUrlEncoded: {extended: true}
    }

    // This is the default application
    protected app: Application;

    protected defaultRouter: Routing = new Routing();


    protected constructor() {
        this.app = express();
        this.defaultConfigure();
        this.configure();
        this.routes();
        this.declareRoute(this.defaultRouter);
        console.log(this.defaultRouter)
    }

    // Method for starting the project
    public run(port: number = 3000) {
        this.app.listen(port);
        console.log(`App is listening on PORT=${port}`)
    }

    // This create all the route adding in the default router
    // TODO adding other http method
    // TODO organize this weird code
    protected declareRoute(routing: Routing) {
        routing.declaration.forEach((value => {
            console.log(value.path);
            let router = Router({mergeParams: true});
            value.gets?.forEach((httpAction: HttpAction) => {
                router.get(httpAction.route, httpAction.action);
            });
            this.app.use(value.path, router)
        }))
    }

    // The default configuration of this project
    // TODO adding a logger (winston or something else)
    // TODO creating a filter
    protected defaultConfigure() {
        this.app.use(bodyParser.json({limit: '50mb'}));
        this.app.use(bodyParser.urlencoded({extended: true}))

        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            err.status = 404;
            next(err);
        });

        this.app.use(errorHandler())
    }

    // Additional configuration
    protected abstract configure(): void

    // Route declaration: add to the defaultRouter
    protected abstract routes(): void;

}


export default StartupExpress;
