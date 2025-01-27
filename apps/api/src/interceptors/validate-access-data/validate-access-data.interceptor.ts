import { ConfigurationService } from '@ghostfolio/api/services/configuration/configuration.service';

import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { Observable } from 'rxjs';

@Injectable()
export class ValidateAccessDataInterceptor<T>
  implements NestInterceptor<T, any>
{
  public constructor(
    private readonly configurationService: ConfigurationService
  ) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>
  ): Observable<any> | Promise<Observable<any>> {
    const http = context.switchToHttp();
    const request = http.getRequest();
    const args = context.getArgs();
    if (
      this.configurationService.get('ENABLE_FEATURE_SUBSCRIPTION') &&
      request.user.subscription.type === 'Basic'
    ) {
      throw new HttpException(
        getReasonPhrase(StatusCodes.FORBIDDEN),
        StatusCodes.FORBIDDEN
      );
    }
    try {
      return context.getHandler().call(args);
    } catch (error) {
      throw new HttpException(
        getReasonPhrase(StatusCodes.BAD_REQUEST),
        StatusCodes.BAD_REQUEST
      );
    }
    return next.handle();
  }
}
