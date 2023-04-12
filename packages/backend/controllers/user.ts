import express, { Request, Response } from "express";

export const getUser = (req: Request, res: Response) => {
    res.send("SENDING FROM USER ROUTE");
};
