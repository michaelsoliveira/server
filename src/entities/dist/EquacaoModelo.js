"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EquacaoModelo = void 0;
var typeorm_1 = require("typeorm");
var EquacaoModelo = /** @class */ (function () {
    function EquacaoModelo() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({ type: "bigint", name: "equacao_modelo_id" })
    ], EquacaoModelo.prototype, "equacaoModeloId");
    __decorate([
        typeorm_1.Column("character varying", {
            name: "expressao",
            nullable: true,
            length: 1000
        })
    ], EquacaoModelo.prototype, "expressao");
    __decorate([
        typeorm_1.Column("character varying", { name: "nome", nullable: true, length: 50 })
    ], EquacaoModelo.prototype, "nome");
    __decorate([
        typeorm_1.Column("integer", { name: "tipo", nullable: true })
    ], EquacaoModelo.prototype, "tipo");
    EquacaoModelo = __decorate([
        typeorm_1.Index("equacao_modelo_pkey", ["equacaoModeloId"], { unique: true }),
        typeorm_1.Entity("equacao_modelo", { schema: "public" })
    ], EquacaoModelo);
    return EquacaoModelo;
}());
exports.EquacaoModelo = EquacaoModelo;
