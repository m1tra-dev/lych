import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthDto } from './dto/auth.dto';
import { hash, verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { RefreshTokenDto } from './dto/refresh.dto';
import { v4 as uuid } from 'uuid';
import { rootCertificates } from 'tls';
import { LogDto } from './dto/log.dto';
import { validate } from 'class-validator';
import { MailerService } from '@nestjs-modules/mailer';




@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService,private jwt:JwtService,private readonly mailService: MailerService) {}
 
    async activate(link: string) {

        const user = await this.prisma.user.findUnique({
            where: { activationLink: link }
        });
    
        if (!user) {
            throw new Error('Некорректная ссылка активации');
        }
    
        const activationLinkLifetime = 2 * 60 * 1000; 
        const now = new Date();
        const linkCreatedAt = new Date(user.createdAt);
        const timeElapsed = now.getTime() - linkCreatedAt.getTime();
        
        if (timeElapsed > activationLinkLifetime) {
            await this.prisma.user.delete({
                where: { id: user.id }
            });
            throw new Error('Ссылка активации истекла');
        }
        
        else{
            await this.prisma.user.update({
                where: { id: user.id },
                data: { isActivated: true }
            });
        }
    }
    
    

    async sendMail({to,link}) {
        this.mailService.sendMail({
          from: process.env.EMAIL_USERNAME,
          to,
          subject: `Активация на ` + process.env.CLIENT_URL,
          text: '',
          html:
            `<div>
                <h1>Для активации перейдите по ссылке</h1>
                <a href="${link}">${link}</a>
            </div>`
        });}


    async login(dto:LogDto,response){
    
        const user = await this.validateUser(dto)
        
        const adm=this.isAdmin(dto)
        const tokens = await this.Tokens(user,adm)
        response.cookie('refreshToken', tokens.refreshToken, {maxAge:7*24*60*60*1000, httpOnly:true})
        const data={
            user:this.UserParams(user),
            ...tokens
        }
        return response.json(data)
    }

    async logout(res) {
        res.clearCookie('refreshToken');
        res.status(200).send({ message: 'Logged out successfully' });
      }

    async getNewTokens(request){
        const refreshToken = request.cookies['refreshToken']
        const result = await this.jwt.verifyAsync(refreshToken)

        if (!result) throw new UnauthorizedException('invalid refresh token')
            
        const user = await this.prisma.user.findUnique({
            where:{
                id: result.id
            }
        })
        const tokens = await this.Tokens(user,result.adm)
        
        return {
            user:this.UserParams(user),
            ...tokens
        }
    }

    async register(dto:AuthDto,response){
        const oldUser=await this.prisma.user.findUnique({
            where:{
                email:dto.email
            }
        })
        if (oldUser) throw new BadRequestException('пользователь найден')
        const link: string = uuid();
        const mail = await this.sendMail({ to: dto.email, link:`${process.env.BACK_URL}/api/auth/activate/${link}` });
        const user=await this.prisma.user.create({
        data:{
            email:dto.email,
            name:dto.name,
            password:await hash(dto.password),
            activationLink:link,
        }
        })
        const adm=this.isAdmin(dto)
        const tokens = await this.Tokens(user, adm)
        response.cookie('refreshToken', tokens.refreshToken, {maxAge:7*24*60*60*1000, httpOnly:true})

        const data={
            user:this.UserParams(user),
            ...tokens
        }

        return response.json(data)
    }
    private async Tokens(user:User,isAdmin:boolean){
        const data={
            id:user.id,
            adm:isAdmin,
            email:user.email,
            name:user.name
        }
        const accessToken=this.jwt.sign(data,{
            expiresIn: '1h',
        })
        const refreshToken=this.jwt.sign(data,{
            expiresIn: '7d',
        })
        return {accessToken,refreshToken}
    }
    private UserParams(user:User){
        return{
            id: user.id,
            email: user.email,
            name: user.name,
            isActivated: user.isActivated,
        }
    } 
 
    private async validateUser(dto:LogDto){
        const user=await this.prisma.user.findUnique({
            where:{
                email:dto.email
            }
        })

        if (!user) throw new BadRequestException('пользователь не найден')
        const isValid = await verify(user.password, dto.password)

        if(!isValid) throw new UnauthorizedException('неверный пароль')
        


        return user
    }

    private isAdmin(dto){
        if (dto.email==='vkolosov1@mail.ru'){
            return true
        }
        return false 
    }    

    async mailHelper(dto){
        console.log(dto)
        const link: string = uuid();
        await this.prisma.user.update({
            where: { email: dto.email },
            data: { activationLink: link }
        });
        return await this.sendMail({ to: dto.email, link:`${process.env.BACK_URL}/api/auth/activate/${link}` });
    }
    async verifyRefreshToken(token: string) {
        try {
          const payload =  await this.jwt.verifyAsync(
            token,
            {secret: process.env.JWT_SECRET}
          );
          
          return payload; 
        } catch (error) {
          throw new UnauthorizedException('Неверный токен');
        }
      }
}
