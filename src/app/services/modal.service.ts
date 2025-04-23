import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetailModalComponent } from '../components/detail-modal/detail-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(private modalController: ModalController) {}

  /**
   * Abre um modal de detalhes com as informações fornecidas
   * @param props Propriedades a serem passadas para o modal
   * @returns Promise com o resultado do modal
   */
  async openDetailModal(props: any): Promise<any> {
    // Certifique-se de que temos todas as propriedades essenciais
    const defaultProps = {
      isFavorite: false,
      favorite: false,
      extraInfo: [],
      onToggleFavorite: () => {}
    };

    // Se a image for uma string que não começa com 'assets/', adicione o prefixo
    if (props.img && typeof props.img === 'string' && !props.img.startsWith('http') && !props.img.startsWith('asset')) {
      props.img = `assets/images/${props.img}`;
    }

    // Mescla as propriedades padrão com as fornecidas
    const modalProps = { ...defaultProps, ...props };

    const modal = await this.modalController.create({
      component: DetailModalComponent,
      componentProps: modalProps,
      cssClass: 'detail-modal' // Adiciona uma classe CSS personalizada
    });

    await modal.present();

    // Retorna o resultado quando o modal for fechado
    return modal.onDidDismiss();
  }
}