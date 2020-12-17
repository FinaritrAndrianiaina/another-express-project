import {NextFunction, Request, Response} from "express";

export interface HttpAction {
    route: string,
    action: (req: Request, res: Response, next?: NextFunction) => void
}

export interface RouteDeclaration {
    path: string;
    delete?: HttpAction[];
    posts?: HttpAction[];
    puts?: HttpAction[];
    gets?: HttpAction[];
}

