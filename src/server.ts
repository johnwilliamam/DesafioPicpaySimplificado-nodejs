import express, { Application, NextFunction, Request, Response } from "express";
import "reflect-metadata";
import { transactionsRoutes } from "./routes/transaction.routes";
import { usersRoutes } from "./routes/users.routes";
const app: Application = express();
app.use(express.json());

app.use(usersRoutes)
app.use(transactionsRoutes)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return res.status(400).json({
            message: err.message,
        })
    } else {
        return res.status(500).json({ 
            message: 'Internal Server Error' 
        })
    }
})

app.get('/api/', (req: Request, res: Response, next: NextFunction) => {
    res.send('HELLO WORLD')
})

app.listen(8080, () => {
    console.log(`Server is running on port 8080`);
})