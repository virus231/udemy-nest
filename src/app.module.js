"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var core_1 = require("@nestjs/core");
var typeorm_1 = require("@nestjs/typeorm");
var config_1 = require("@nestjs/config");
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
var users_module_1 = require("./users/users.module");
var reports_module_1 = require("./reports/reports.module");
var user_entity_1 = require("./users/user.entity");
var report_entity_1 = require("./reports/report.entity");
var cookieSession = require('cookie-session');
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule.prototype.configure = function (consumer) {
        consumer
            .apply(cookieSession({
            keys: ['asdfasfd']
        }))
            .forRoutes('*');
    };
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                config_1.ConfigModule.forRoot({
                    isGlobal: true,
                    envFilePath: ".env.".concat(process.env.NODE_ENV)
                }),
                typeorm_1.TypeOrmModule.forRootAsync({
                    inject: [config_1.ConfigService],
                    useFactory: function (config) {
                        return {
                            type: 'sqlite',
                            database: config.get('DB_NAME'),
                            synchronize: true,
                            entities: [user_entity_1.User, report_entity_1.Report]
                        };
                    }
                }),
                // TypeOrmModule.forRoot({
                //   type: 'sqlite',
                //   database: 'db.sqlite',
                //   entities: [User, Report],
                //   synchronize: true,
                // }),
                users_module_1.UsersModule,
                reports_module_1.ReportsModule,
            ],
            controllers: [app_controller_1.AppController],
            providers: [
                app_service_1.AppService,
                {
                    provide: core_1.APP_PIPE,
                    useValue: new common_1.ValidationPipe({
                        whitelist: true
                    })
                },
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
