import { RequestAppService } from '../../../../core/domain/application-services/request/request-app-service';
import { Flunt } from '../../../../core/validations/flunt';
import { UsuarioAdmin } from '../../../entities';

export class CadastroUsuarioAdminRequest extends RequestAppService {
  constructor(
    public requestModel: {
      nomeUsuario: string;
      senha: string;
      nome: string;
      permissoes?: string[] | undefined;
    }
  ) {
    super();
  }

  validate(): boolean {
    const flunt = new Flunt();

    if (this.requestModel.nome) {
      this.requestModel.nome = this.requestModel.nome.trim();
    }
    flunt.isNotNullOrEmpty(this.requestModel.nome, 'nome', 'NOME obrigatório');
    flunt.hasMinLen(this.requestModel.nome, 2, 'nome', 'NOME inválido');
    flunt.hasMaxLen(this.requestModel.nome, 45, 'nome', 'NOME inválido');

    if (this.requestModel.nomeUsuario) {
      this.requestModel.nomeUsuario = this.requestModel.nomeUsuario.trim();
    }
    flunt.isNotNullOrEmpty(
      this.requestModel.nomeUsuario,
      'nomeUsuario',
      'LOGIN obrigatório'
    );
    flunt.hasMinLen(
      this.requestModel.nomeUsuario,
      3,
      'nomeUsuario',
      'LOGIN deve conter no mínimo 3 caracteres'
    );
    flunt.hasMaxLen(
      this.requestModel.nomeUsuario,
      20,
      'nomeUsuario',
      'LOGIN deve conter no máximo 20 caracteres'
    );
    if (
      !UsuarioAdmin.nomeUsuarioCaracteresValidos(this.requestModel.nomeUsuario)
    ) {
      this.addNotification(
        'nomeUsuario',
        'informe um LOGIN sem espaços, acentos e caracteres especiais'
      );
    }

    if (this.requestModel.senha) {
      this.requestModel.senha = this.requestModel.senha.trim();
    }
    flunt.isNotNullOrEmpty(
      this.requestModel.senha,
      'senha',
      'SENHA obrigatória'
    );
    flunt.hasMinLen(
      this.requestModel.senha,
      3,
      'senha',
      'SENHA deve conter no mínimo 3 caracteres'
    );
    flunt.hasMaxLen(
      this.requestModel.senha,
      20,
      'senha',
      'SENHA deve conter no máximo 20 caracteres'
    );

    if (!this.requestModel.permissoes) {
      this.requestModel.permissoes = [];
    }

    this.addNotifications(flunt.notifications);

    return this.isValid;
  }
}
