import {
    Controller,
    Get,
    Param,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from '../../interceptors/transform.interceptor';
import { RoleGuard } from '../auth/guard/role.guard';
import { RequireRole } from '../../commons/decorators/require-role.decorator';
import { RoleValue } from '../../commons/enums/role-enum';
import { BookingsService } from './bookings.service';
import { PageResponseDto } from '../pagination/dto/page-response.dto';
import { UserInRequest } from '../../commons/decorators/user-in-request.decorator';
import { User } from '../../entities/user.entity';

@ApiTags('trainer-bookings')
@UseInterceptors(TransformInterceptor)
@ApiBearerAuth('access-token')
@Controller('trainer/bookings')
@UseGuards(RoleGuard)
@RequireRole(RoleValue.TRAINER)
export class TrainerBookingsController {
    constructor(private readonly bookingsService: BookingsService) {}

    /**
     * Lấy danh sách booking của trainer
     */
    @Get()
    async getTrainerBookings(
        @UserInRequest() user: User,
    ): Promise<PageResponseDto<any>> {
        return this.bookingsService.getTrainerBookings(user);
    }

    /**
     * Lấy thông tin chi tiết 1 booking cụ thể mà trainer đang đảm nhận
     */
    @Get(':bookingId')
    async getOneBooking(
        @UserInRequest() user: User,
        @Param('bookingId') bookingId: number,
    ): Promise<PageResponseDto<any>> {
        return this.bookingsService.getOneTrainerBooking(user, bookingId);
    }
}

  