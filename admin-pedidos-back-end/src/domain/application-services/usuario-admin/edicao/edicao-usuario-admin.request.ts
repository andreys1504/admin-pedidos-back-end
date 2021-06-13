import { RequestAppService } from '../../../../core/domain/application-services/request/request-app-service';
import { Flunt } from '../../../../core/validations/flunt';

export class EdicaoUsuarioAdminRequest extends RequestAppService {
  constructor(
    public requestModel: {
      senhaEditada: boolean;
      usuario: {
        idUsuario: number;
        nome: string;
        nomeUsuario: string;
        senha: string;
        permissoes?: string[];
      };
    }
  ) {
    super();
  }

  validate(): boolean {
    const flunt = new Flunt();

    if (this.requestModel?.usuario?.nome) {
      this.requestModel.usuario.nome = this.requestModel.usuario.nome;
    }
    flunt.isNotNullOrEmpty(
      this.requestModel.usuario.nome,
      'nome',
      'NOME obrigatório'
    );
    flunt.hasMinLen(this.requestModel.usuario.nome, 2, 'nome', 'NOME inválido');
    flunt.hasMaxLen(
      this.requestModel.usuario.nome,
      45,
      'nome',
      'NOME inválido'
    );

    if (this.requestModel?.usuario?.nomeUsuario) {
      this.requestModel.usuario.nomeUsuario =
        this.requestModel.usuario.nomeUsuario;
    }
    flunt.isNotNullOrEmpty(
      this.requestModel.usuario.nomeUsuario,
      'nomeUsuario',
      'LOGIN obrigatório'
    );
    flunt.hasMinLen(
      this.requestModel.usuario.nomeUsuario,
      3,
      'nomeUsuario',
      'LOGIN deve conter no mínimo 3 caracteres'
    );
    flunt.hasMaxLen(
      this.requestModel.usuario.nomeUsuario,
      20,
      'nomeUsuario',
      'LOGIN deve conter no máximo 20 caracteres'
    );

    if (this.requestModel.senhaEditada) {
      if (this.requestModel?.usuario?.senha) {
        this.requestModel.usuario.senha = this.requestModel.usuario.senha;
      }
      flunt.isNotNullOrEmpty(
        this.requestModel.usuario.senha,
        'senha',
        'SENHA obrigatória'
      );
      flunt.hasMinLen(
        this.requestModel.usuario.senha,
        3,
        'senha',
        'SENHA deve conter no mínimo 3 caracteres'
      );
      flunt.hasMaxLen(
        this.requestModel.usuario.senha,
        20,
        'senha',
        'SENHA deve conter no máximo 20 caracteres'
      );
    }

    if (!this.requestModel.usuario.permissoes) {
      this.requestModel.usuario.permissoes = [];
    }

    this.addNotifications(flunt.notifications);

    return this.isValid;
  }
}
