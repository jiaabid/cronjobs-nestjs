import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { SchedulerRegistry } from '@nestjs/schedule/dist';
import * as CircularJson from 'circular-json'
import { Cron } from '@nestjs/schedule';
import { CronJob } from 'cron';



@Injectable()
export class JobsService {
  constructor(
    private schedulerRegistery: SchedulerRegistry) { }

  //dummy registered services
  services = {
    EmailService: () => {
      console.log("Email send successfully!")
    },
    SMSService: () => {
      console.log("SMS send successfully!")
    },
  }

  //create a unique job 
  create(createJobDto: CreateJobDto) {
    try {
      //user will select the service and send service name
      //user will send the pattern (the period in which the job runs)
      //user will send the job name 

      //created a job with pattern and serive callback
      let newJob = new CronJob(createJobDto.pattern, this.services[createJobDto.serviceName])

      //added the new job with the specified name to the registery
      this.schedulerRegistery.addCronJob(
        createJobDto.name,
        newJob
      )
      newJob.start()
      return "job created & started!"
    } catch (err) {
      throw new BadRequestException(err.message)
       
    }

  }

  //get all registered jobs
  findAll() {
    //fetch the registered jobs
    let registeries = this.schedulerRegistery.getCronJobs()

    // due to map type object it cannot be converted to the JSON, so we have to convert it to array
    //converting it to array is not resolving the circular references, to remove circular reference we have used circular json.
    return CircularJson.stringify(Array.from(registeries));
  }

  //find any job
  findOne(name: string) {
    let registeries = this.schedulerRegistery.getCronJob(name)
    return CircularJson.stringify(registeries);

  }

  //stop any particular job
  stopJob(name: string) {
    let job = this.schedulerRegistery.getCronJob(name)
    job.stop()
    return "Job stopped successfully!"
  }

}

