import {NextFunction, Request, Response} from "express";

// TODO find a best way to do this
export interface HttpAction {
    route: string,
    action: (req: Request, res: Response, next?: NextFunction) => void
}

// TODO is there a coolest way to perform these action
export interface RouteDeclaration {
    path: string;
    delete?: HttpAction[];
    posts?: HttpAction[];
    puts?: HttpAction[];
    gets?: HttpAction[];
}

