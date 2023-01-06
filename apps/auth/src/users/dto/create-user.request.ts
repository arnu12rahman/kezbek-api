import { OmitType } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class CreateUserRequest extends OmitType(UserDto,['_id']){}