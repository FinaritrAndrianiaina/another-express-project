import bodyParser, {OptionsJson, OptionsUrlencoded} from "body-parser";
import express, {Application, Router} from "express";
import errorHandler from "errorhandler";
import Routing from "./routes/Routing";
import {HttpAction} from "./routes/RouteDeclaration";

interface StartupOption {
    bodyParserJsonOpt: OptionsJson
    bodyParserUrlEncoded: OptionsUrlencoded
}

abstract class StartupExpress {
    static readonly DefaultOption: StartupOption = {
        bodyParserJsonOpt: {limit: '50mb'},
        bodyParserUrlEncoded: {extended: true}
    }
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

    public run(port: number = 3000) {
        this.app.listen(port);
        console.log(`App is listening on PORT=${port}`)
    }

    protected declareRoute(routing: Routing) {
        routing.declaration.forEach((value => {
            console.log(value.path);
            let router = Router({mergeParams: true});
            value.gets?.forEach((httpAction: HttpAction) => {
                router.get(httpAction.route, httpAction.action);
            })
            this.app.use(value.path, router)
        }))
    }

    protected defaultConfigure() {
        this.app.use(bodyParser.json({limit: '50mb'}));
        this.app.use(bodyParser.urlencoded({extended: true}))

        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            err.status = 404;
            next(err);
        });

        this.app.use(errorHandler())
    }

    protected abstract configure(): void

    protected abstract routes(): void;

}


export default StartupExpress;