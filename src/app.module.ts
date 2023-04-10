import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { JobsModule } from './jobs/jobs.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    JobsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
