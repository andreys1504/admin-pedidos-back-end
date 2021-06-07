import azure from 'azure-storage';

import { ConfiguracoesGlobaisApp } from '../../../../0-core/configuracoes-aplicacoes/configuracoes-globais.app';
import { gerarGuid } from '../../../../0-core/helpers';

const blobService = azure.createBlobService(ConfiguracoesGlobaisApp.CONTA_ARMAZENAMENTO_ARQUIVOS_CONFIGURACOES_ACESSO);

const enviarImagem = async (imagem: string): Promise<string> => {
    const imagemMatches = imagem.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (imagemMatches) {
        const tipoImagem = imagemMatches[1];
        const bufferImagem = Buffer.from(imagemMatches[2], 'base64');
        const nomeImage = gerarGuid() + '.' + tipoImagem.split('/')[1];

        return new Promise((resolve, reject) => {
            blobService.createBlockBlobFromText(
                ConfiguracoesGlobaisApp.CONTA_ARMAZENAMENTO_ARQUIVOS_URL_IMAGENS_PRODUTO,
                nomeImage,
                bufferImagem,
                { contentSettings: { contentType: tipoImagem } } as any,
                (erro: any, resultado: any) => {
                    if (erro) {
                        reject(erro);
                        return;
                    }

                    resolve(resultado.name as string);
                    return;
                });
        });
    }

    return new Promise((resolve, reject) => reject);
}

export const envioImagensProdutosStorageServico = {
    enviarImagem
}