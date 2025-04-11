import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async(configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET') ?? 'MySuperSecureJWTSecretKeyWhichIsAtLeast32Char',
                signOption: {
                    expiresIn: '1d'
                }
            })
        })
    ],
    providers: [AuthService, JwtAuthGuard, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule {}
