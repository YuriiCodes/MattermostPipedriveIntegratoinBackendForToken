import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));
  app.enableCors();


  // Swagger docs
  const config = new DocumentBuilder()
      .setTitle('API documentation')
      .setDescription('The backend for Mattermost x Pipedrive integration')
      .setVersion('1.0')
      .addTag('Working with sales department workers data')
      .addTag('Interacting with Pipedrive')
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);


  await app.listen(process.env.PORT || 3000);
}
bootstrap();
