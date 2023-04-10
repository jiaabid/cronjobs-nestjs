import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Cron } from '@nestjs/schedule';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) { }

  //create new cron job
  @Post()
  create(@Body() createJobDto: CreateJobDto) {
    return this.jobsService.create(createJobDto);
  }

  //get the list of all cron jobs
  @Get()
  findAll() {
    return this.jobsService.findAll();
  }

  //get specific cron job
  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.jobsService.findOne(name);
  }

  //stop specific cron job
  @Get('/stop/:name')
  stopJob(@Param('name') name: string) {
    return this.jobsService.stopJob(name);
  }

  //statically defined cron job
  @Cron('02 * * * * *', {
    name: "test"
  })
  staticJob() {
    console.log("running on treadmill")
  }
}
