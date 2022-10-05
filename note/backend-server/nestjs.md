### NestJS Note

**Create your NestJS project#**

---

```
$ nest new <project_name>
```

**Create your NestJS files based**

---

```
$ nest generate <schematic> <name> [options]

example
nest generate module  users
nest generate controller  users
nest generate service  users
```

**Create SerializerInterceptor for serialize resposne data**

src/interceptors/serializer.ts

```
import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

// Class interface for type checking
interface ClassConstructor {
  new (...args: any[]): {};
}

// Custom decorator
export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

// Implement NestInterceptor
export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(
    context: ExecutionContext,
    handler: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return handler.handle().pipe(
      map((data: any) => {
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
```

dont forget to add validationPipe in app module.

src/app.moduel.ts

```
@Module({
  ...,
  ...,
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ whitelist: true }), <-- here
    },
  ],
  ...,
  ...
})
```
