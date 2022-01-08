import {UseInterceptors, NestInterceptor, ExecutionContext, CallHandler} from "@nestjs/common";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {plainToClass} from "class-transformer";


export function Serialize(dto: any) {
    return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor{
    constructor(private dto: any){}

    intercept(context: ExecutionContext, handler: CallHandler<any>): Observable<any> {
        // Run something before a request is handled
        // by the request handler
        console.log("I'm running before the handler",context);

        return handler.handle().pipe(
            map((data: any) => {
                return plainToClass(this.dto, data, {
                    excludeExtraneousValues: true,
                })
                // Run something before the response is sent out
                console.log("Run something before the response is sent out", data);
            })
        );

    }
}