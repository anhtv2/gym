import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Trainer } from '../../entities/trainer.entity';
import { Repository } from 'typeorm';
import { AwsService } from '../aws/aws.service';
import { PageMetaDto } from '../pagination/dto/page-meta.dto';
import { PageResponseDto } from '../pagination/dto/page-response.dto';
import { PageService } from '../pagination/page.service';
import { GetListTrainersDto } from './dto';
import * as moment from 'moment';

@Injectable()
export class TrainersService extends PageService {
  constructor(
    @InjectRepository(Trainer)
    private trainersRepository: Repository<Trainer>,
    private s3Service: AwsService,
  ) {
    super();
  }

  async getById(trainerId: number) {
    return this.trainersRepository
      .findOneByOrFail({ id: trainerId })
      .then((response) => new PageResponseDto(response));
  }

  async getTrainers(
    getListTrainersDto: GetListTrainersDto,
  ): Promise<PageResponseDto<Trainer>> {
    // Lấy queryBuilder với alias mặc định là "table"
    const queryBuilder = await this.paginate(
      this.trainersRepository,
      getListTrainersDto,
    );

    queryBuilder
      .leftJoinAndSelect('table.staff', 'staff')
      .leftJoinAndSelect('staff.user', 'user')
      .leftJoinAndSelect('table.workouts', 'workouts');

    // Áp dụng filter
    this.applyFilters(queryBuilder, getListTrainersDto);

    // Đếm tất cả trainer phù hợp filter
    const itemCount = await queryBuilder.getCount();
    // Lấy tất cả trainer (chưa cắt trang)
    const rawEntities = await queryBuilder.getMany();

    // Chuyển entity sang structure mong muốn
    let entities = this.structureData(rawEntities);

    // Tạo meta cho paging
    const pageMeta = new PageMetaDto(getListTrainersDto, itemCount);

    // =========================
    // SỬA PHẦN SLICE DỮ LIỆU
    // =========================
    // page=0 => hiển thị index 0..(take-1)
    // page=1 => hiển thị index take..(2*take-1), ...
    const pageIndex = pageMeta.page >= 0 ? pageMeta.page : 0;
    

    return new PageResponseDto(entities, pageMeta);
  }

  private applyFilters(queryBuilder, getListTrainersDto: GetListTrainersDto) {
    if (getListTrainersDto.status) {
      queryBuilder.andWhere('trainer.status = :status', {
        status: getListTrainersDto.status,
      });
    }

    if (
      getListTrainersDto.field &&
      getListTrainersDto.type &&
      getListTrainersDto.value
    ) {
      if (getListTrainersDto.type === 'like') {
        getListTrainersDto.value = `%${getListTrainersDto.value}%`;
      }
      queryBuilder.andWhere(
        `trainer.${getListTrainersDto.field} ${getListTrainersDto.type} :value`,
        { value: getListTrainersDto.value },
      );
    }
  }

  private structureData(rawEntities: Trainer[]): any[] {
    return rawEntities.map((trainer) => ({
      TrainerId: trainer.id,
      UserId: trainer.staff.user.id,
      email: trainer.staff.user.email,
      name: trainer.staff.user.name,
      phone: trainer.staff.user.phone,
      avatar: trainer.staff.user.avatar,
      address: trainer.staff.user.address,
      birth_date: moment(trainer.staff.user.birth_date).format('YYYY-MM-DD'),
      gender: trainer.staff.user.gender,
      specialty: trainer.specialty,
      rating: trainer.rating,
      experience: trainer.experience,
      trainerWorkouts: trainer.workouts.map((workout) => ({
        id: workout.id,
        name: workout.name,
      })),
    }));
  }

  async getTrainer(trainerId: number): Promise<PageResponseDto<Trainer>> {
    const queryBuilder = this.trainersRepository
      .createQueryBuilder('trainer')
      .leftJoinAndSelect('trainer.staff', 'staff')
      .leftJoinAndSelect('staff.user', 'user')
      .leftJoinAndMapMany('trainer.workouts', 'trainer.workouts', 'workouts')
      .where('trainer.id = :trainerId', { trainerId });

    const rawEntities = await queryBuilder.getOne();
    return new PageResponseDto(rawEntities);
  }

  async destroyTrainer(trainer_id: number) {
    const trainer = await this.trainersRepository.findOneByOrFail({
      id: trainer_id,
    });
    const deleteTrainer = await this.trainersRepository.remove(trainer);
    return new PageResponseDto(deleteTrainer);
  }

  async getAvailableWorkouts(trainer_id: number) {
    return this.trainersRepository
      .createQueryBuilder('trainer')
      .select(['workout.id AS workoutId', 'workout.name AS workoutName'])
      .innerJoin('trainer.workouts', 'workout')
      .where('trainer.id = :trainer_id', { trainer_id })
      .getRawMany()
      .then((response) => new PageResponseDto(response));
  }

  async getWorkSchedules(trainer_id: number) {
    return this.trainersRepository
      .createQueryBuilder('trainer')
      .select(['trainer.id AS TrainerId', 'trainer.work_schedule AS WorkSchedules'])
      .where('trainer.id = :trainer_id', { trainer_id })
      .getRawMany()
      .then((response) => new PageResponseDto(response));
  }

  async updateWorkSchedules(
    trainer_id: number,
    work_schedule: { day: number; shift: number; isSelected: boolean }[],
  ) {
    const trainer = await this.trainersRepository.findOneByOrFail({
      id: trainer_id,
    });

    trainer.work_schedule = work_schedule;
    await this.trainersRepository.save(trainer);
    return new PageResponseDto(trainer);
  }
}
