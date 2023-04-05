const express = require("express");
const controllers = require("../app/controllers");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../openapi.json');

const appRouter = express.Router();
const apiRouter = express.Router();

appRouter.get("/", controllers.main.index);

apiRouter.use('/api-docs', swaggerUi.serve);
apiRouter.get('/api-docs', swaggerUi.setup(swaggerDocument));

apiRouter.get("/api/v1/motors", controllers.api.v1.motor.list);
apiRouter.post("/api/v1/motors", controllers.api.v1.auth.authorize, controllers.api.v1.motor.create);
apiRouter.put("/api/v1/motors/:id", controllers.api.v1.motor.setMotor, controllers.api.v1.motor.update);
apiRouter.get("/api/v1/motors/:id", controllers.api.v1.motor.setMotor, controllers.api.v1.motor.show);
apiRouter.delete("/api/v1/motors/:id",controllers.api.v1.motor.setMotor, controllers.api.v1.motor.destroy);

apiRouter.post("/api/v1/auth/register", controllers.api.v1.auth.register);
apiRouter.post("/api/v1/auth/login", controllers.api.v1.auth.login);
apiRouter.get("/api/v1/auth/whoami", controllers.api.v1.auth.authorize, controllers.api.v1.auth.whoami);

apiRouter.use(controllers.main.onLost);
apiRouter.use(controllers.api.main.onError);

appRouter.use(apiRouter)

module.exports = appRouter;
