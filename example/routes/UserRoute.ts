import {HttpAction, RouteDeclaration} from "../../src/routes/RouteDeclaration";
import UserServices from "../services/UserServices";

class UserRoute implements RouteDeclaration {
    path: string = "/user";

    gets: HttpAction[] = [
        {
            route: "",
            action: (req, res) => {
                res.send("test")
            }
        },
        {
            route: "/:id",
            action: (req, res) => {
                res.status(200).json(UserServices.getOne(Number.parseInt(req.params.id)));
            }
        },
        {
            route: "/:id/test",
            action: (req, res) => {
                res.send("test " + req.params.id);
            }
        }
    ]

}

export default new UserRoute();