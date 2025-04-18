import {Component} from "@angular/core";
import {AlertController, RefresherCustomEvent} from "@ionic/angular";
import {ModalController} from "@ionic/angular";
import {DetailModalComponent} from "src/app/components/detail-modal/detail-modal.component";

interface Place {
  title: string;
  subtitle: string;
  img: string;
  description: string;
}

@Component({
  selector: "app-terra",
  templateUrl: "./terra.page.html",
  styleUrls: ["./terra.page.scss"],
  standalone: false,
})
export class TerraPage {
  districtDescription =
    "Viana do Castelo é um distrito costeiro do Norte de Portugal, conhecido pela história, cultura e paisagens naturais.";
  municipalityDescription =
    "Ponte de Lima, o concelho mais antigo de Portugal, famoso pela ponte romana e festivais tradicionais.";
  parishDescription =
    "Freixo é uma freguesia pitoresca de Ponte de Lima, com raízes históricas e ambiente rural.";

  district: Place[] = [
    {
      title: "Castelo de Santiago da Barra",
      subtitle: "Fortaleza histórica",
      img: "barra-castle.jpg",
      description: "Construído no século XVI para defesa costeira.",
    },
    {
      title: "Praia do Cabedelo",
      subtitle: "Costa selvagem",
      img: "cabedelo.jpg",
      description: "Ideal para surf e longas caminhadas.",
    },
  ];
  municipality: Place[] = [
    {
      title: "Ponte Romana",
      subtitle: "Património UNESCO",
      img: "ponte-romana.jpg",
      description: "Estrutura centenária sobre o Rio Lima.",
    },
    {
      title: "Jardim do Arnado",
      subtitle: "Espaço verde",
      img: "arnado.jpg",
      description: "Parque botânico com vistas magníficas.",
    },
  ];
  parish: Place[] = [
    {
      title: "Igreja Matriz de Freixo",
      subtitle: "Arquitetura barroca",
      img: "igreja-freixo.jpg",
      description: "Igreja secular com belos detalhes.",
    },
    {
      title: "Campo de Lavradio",
      subtitle: "Paisagem rural",
      img: "campo-lavradio.jpg",
      description: "Área agrícola típica da região.",
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
