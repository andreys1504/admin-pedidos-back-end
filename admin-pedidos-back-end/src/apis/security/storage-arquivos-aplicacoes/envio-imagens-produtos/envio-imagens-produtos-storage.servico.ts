import azure from 'azure-storage';
import { GlobalSettings } from '../../../../core/configurations/global-settings';
import { gerarGuid } from '../../../../core/helpers';


const blobService = azure.createBlobService('AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;DefaultEndpointsProtocol=http;');

const enviarImagem = async (imagem: string): Promise<string> => {
    const imagemMatches = imagem.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (imagemMatches) {
        const tipoImagem = imagemMatches[1];
        const bufferImagem = Buffer.from(imagemMatches[2], 'base64');
        const nomeImage = gerarGuid() + '.' + tipoImagem.split('/')[1];

        return new Promise((resolve, reject) => {
            blobService.createBlockBlobFromText(
                GlobalSettings.FILES_STORAGE_ACCOUNT__URL_PRODUCT_IMAGES,
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