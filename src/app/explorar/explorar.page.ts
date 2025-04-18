import {Component} from "@angular/core";
import {ToastController, RefresherCustomEvent} from "@ionic/angular";
import {ModalController} from "@ionic/angular";
import {DetailModalComponent} from "src/app/components/detail-modal/detail-modal.component";

interface Event {
  title: string;
  location: string;
  date: string;
  img: string;
  details: string;
  description?: string; 
}
@Component({
  selector: "app-explorar",
  templateUrl: "./explorar.page.html",
  styleUrls: ["./explorar.page.scss"],
  standalone: false,
})
export class ExplorarPage {
  events: Event[] = [
    {
      title: "Romaria da Agonia",
      location: "Viana do Castelo",
      date: "Agosto",
      img: "agonia.jpg",
      details: "Festa tradicional com procissões e música.",
      description:
        "A Romaria da Agonia é uma festa religiosa que celebra a devoção à Nossa Senhora da Agonia, com procissões, danças e trajes típicos. É um evento vibrante que atrai visitantes de todo o país.",
    },
    {
      title: "Feiras Novas",
      location: "Ponte de Lima",
      date: "Setembro",
      img: "feirasnovas.jpg",
      details: "Festival com tasquinhas e concertos.",
      description:
        "As Feiras Novas são uma celebração popular que inclui música, danças e gastronomia local. É uma oportunidade para experimentar a cultura e tradições da região.",
    },
    {
      title: "Caminho de Santiago",
      location: "Freixo",
      date: "Todo o ano",
      img: "caminho.jpg",
      details: "Percurso para peregrinos com paisagens históricas.",
      description:
        "O Caminho de Santiago é uma rota histórica que leva os peregrinos a Santiago de Compostela. Atravessa paisagens deslumbrantes e locais históricos, oferecendo uma experiência espiritual e cultural.",
    },
    {
      title: "Museu do Traje",
      location: "Ponte de Lima",
      date: "Diariamente",
      img: "museu-traje.jpg",
      details: "Exposições de trajes regionais.",
      description:
        "O Museu do Traje apresenta a rica herança cultural da região através de trajes tradicionais. As exposições oferecem uma visão fascinante da história e costumes locais.",
    },
  ];

  constructor(private modalController: ModalController) {}
  async openDetails(item: any) {
    const modal = await this.modalController.create({
      component: DetailModalComponent,
      componentProps: {
        title: item.title,
        img: `assets/img/${item.img}`,
        description: item.description,
      },
    });
    await modal.present();
  }

  doRefresh(event: RefresherCustomEvent) {
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
}
