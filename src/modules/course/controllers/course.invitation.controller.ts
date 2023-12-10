// courses: get
// course : get, post, put, delete, batch
// invitations: get
// invitation: get, post, batch

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseArrayPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { IInvitationService } from '../services';
import {
  CreateInvitationDto,
  DeleteInvitationDto,
  GetInvitationFilterDto,
  UpdateInvitationDto,
} from '../resources/dto';
import { User } from 'utils/decorator/parameters';
import { AuthenticatedGuard, UseCoursePolicies, UserResponse } from 'guards';
import { UserCourseRole } from 'utils/prisma/client';

// admin //
// courses
// courses/userid
// courses/userid/courseid get, post, delete

@UseCoursePolicies({ roles: [UserCourseRole.HOST, UserCourseRole.TEACHER] })
@UseGuards(AuthenticatedGuard)
@Controller('/api/course/:courseId/invitation')
export class CourseInvitationController {
  constructor(
    @Inject(IInvitationService)
    private readonly _invitationService: IInvitationService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  getInvitations(
    @Param('courseId') courseId: string,
    @Query() invitationFilterDto: GetInvitationFilterDto,
  ) {
    return this._invitationService.getInvitations(
      courseId,
      invitationFilterDto,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getInvitation(@Param('courseId') courseId: string, @Param('id') id: string) {
    return this._invitationService.getInvitation(courseId, id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  createCourse(
    @Param('courseId') courseId: string,
    @Body(new ParseArrayPipe({ items: CreateInvitationDto }))
    createInvitationsDto: CreateInvitationDto[],
    @User() user: UserResponse,
  ) {
    return this._invitationService.createInvitations(
      user,
      courseId,
      createInvitationsDto,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Put()
  updateInvitation(
    @Param('courseId') courseId: string,
    @Body() updateInvitationsDto: UpdateInvitationDto[],
  ) {
    return this._invitationService.updateInvitation(
      courseId,
      updateInvitationsDto,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Delete()
  deleteInvitation(
    @Param('courseId') courseId: string,
    @Body() deleteInvitationsDto: DeleteInvitationDto[],
  ) {
    return this._invitationService.deleteInvitation(
      courseId,
      deleteInvitationsDto,
    );
  }
}
