import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka, ClientProxy, EventPattern, Payload, Transport } from '@nestjs/microservices';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  onModuleInit() {
    // this.client.subscribeToResponseOf('test-topic');
  }

  @EventPattern('test-topic', Transport.KAFKA)
  handleEvent(
    @Payload() payload: any,
  ): void {
    console.log('from nest js consumer====='+  payload);
  }

}
