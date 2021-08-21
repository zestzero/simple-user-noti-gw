import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

/**
 * Original code from: https://gist.github.com/sochix/831990a5f513bb74e677cc0c4958c5b8
 */
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log(`${req.method} ${req.originalUrl} [STARTED]`);
        const start = process.hrtime();

        res.on('finish', () => {
            const durationInMilliseconds = getDurationInMilliseconds(start);
            console.log(
                `${req.method} ${
                    req.originalUrl
                } [FINISHED] ${durationInMilliseconds.toLocaleString()} ms`,
            );
        });

        res.on('close', () => {
            const durationInMilliseconds = getDurationInMilliseconds(start);
            console.log(
                `${req.method} ${
                    req.originalUrl
                } [CLOSED] ${durationInMilliseconds.toLocaleString()} ms`,
            );
        });

        next();
    }
}

const getDurationInMilliseconds = (start: [number, number]) => {
    const NS_PER_SEC = 1e9;
    const NS_TO_MS = 1e6;
    const diff = process.hrtime(start);

    return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};
