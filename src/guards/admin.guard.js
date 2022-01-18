"use strict";
exports.__esModule = true;
exports.AdminGuard = void 0;
var AdminGuard = /** @class */ (function () {
    function AdminGuard(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    AdminGuard.prototype.canActivate = function (context) {
        var request = context.switchToHttp().getRequest();
        if (!request.currentUser) {
            return false;
        }
        if (request.currentUser.role !== 'admin') {
            this.router.get('/admin', function (req, res) {
                res.status(403).send({
                    error: 'You are not authorized to access this resource'
                });
            });
            return false;
        }
    };
    return AdminGuard;
}());
exports.AdminGuard = AdminGuard;
