import { Body, Controller, Get, InternalServerErrorException, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FreezePipe } from './pipes/freeze.pipe';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('error')
  throwError() {
    throw new InternalServerErrorException();
  }

  @Post()
  @UseGuards(FreezePipe)
  examplePost(@Body(new FreezePipe()) body: any) {
    body.test = 32;
  }
}
