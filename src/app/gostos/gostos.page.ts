import {Component} from "@angular/core";
import {AlertController, RefresherCustomEvent} from "@ionic/angular";
import {ModalController} from "@ionic/angular";
import {DetailModalComponent} from "src/app/components/detail-modal/detail-modal.component";

interface Item {
  title: string;
  subtitle: string;
  img: string;
  description: string;
}

@Component({
  selector: "app-gostos",
  templateUrl: "./gostos.page.html",
  styleUrls: ["./gostos.page.scss"],
  standalone: false,
})
export class GostosPage {
  selectedCategory = "conv";
  convivio: Item[] = [
    {
      title: "Noites de Cinema",
      subtitle: "Sessões em casa",
      img: "amigos.jpg",
      description: "Adoro ver os últimos lançamentos com pipocas e amigos.",
    },
    {
      title: "Jogos de Tabuleiro",
      subtitle: "Amigos",
      img: "boardgames.jpg",
      description:
        "Diversão estratégica com clássicos como Catan e Carcassonne.",
    },
  ];
  gastronomia: Item[] = [
    {
      title: "Francesinha",
      subtitle: "Especialidade do Porto",
      img: "francesinha.jpg",
      description: "Sabor intenso de carne, queijo e molho especial.",
    },
    {
      title: "Caldo Verde",
      subtitle: "Sopa Tradicional",
      img: "caldo-verde.jpg",
      description: "Sopa reconfortante com couve e chouriço.",
    },
    {
      title: "Cavacas de Freixo",
      subtitle: "Doce Local",
      img: "cavacas.jpg",
      description: "Bolo doce típico de massa folhada e glacê.",
    },
  ];
  desporto: Item[] = [
    {
      title: "Futebol",
      subtitle: "Ponte de Lima FC",
      img: "futebol.jpg",
      description: "Partidas aos fins de semana no campo local.",
    },
    {
      title: "Natação",
      subtitle: "Piscina Municipal",
      img: "natacao.jpg",
      description: "Treinos regulares para manter forma física.",
    },
    {
      title: "Caminhadas",
      subtitle: "Trilhos Locais",
      img: "caminhada.png",
      description: "Explorar a natureza em trilhos marcados.",
    },
  ];

  constructor(private modalController: ModalController) {}
  getItems(category: string): Item[] {
    switch (category) {
      case "gastr":
        return this.gastronomia;
      case "desp":
        return this.desporto;
      default:
        return this.convivio;
    }
  }

  async openDetails(item: any) {
    const modal = await this.modalController.create({
      component: DetailModalComponent,
      componentProps: {
        title: item.title,
        img: `assets/images/${item.img}`,
        description: item.description,
      },
    });
    await modal.present();
  }

  doRefresh(event: RefresherCustomEvent) {
    setTimeout(() => event.target.complete(), 1000);
  }
}
