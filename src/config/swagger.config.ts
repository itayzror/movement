import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const createSwaggerDocument = (app) => {
  const options = new DocumentBuilder()
    .setTitle('User API')
    .setDescription('The User API')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'jwt', // This name must match the name of the security scheme below
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document);
};
