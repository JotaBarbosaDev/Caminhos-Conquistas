import {Component} from "@angular/core";
import {ModalController, RefresherCustomEvent} from "@ionic/angular";
import {DetailModalComponent} from "src/app/components/detail-modal/detail-modal.component";

interface Achievement {
  title: string;
  subtitle: string;
  img: string;
  description: string;
}

@Component({
  selector: "app-conquistas",
  templateUrl: "./conquistas.page.html",
  styleUrls: ["./conquistas.page.scss"],
  standalone: false,
})
export class ConquistasPage {
  viagens: Achievement[] = [
    {
      title: "Turku, Finlândia",
      subtitle: "2019",
      img: "turku.jpg",
      description: "Cidade histórica com belos castelos à beira do rio.",
    },
    {
      title: "Pula, Croácia",
      subtitle: "2020",
      img: "pula.avif",
      description: "Famosa arena romana que ainda recebe eventos.",
    },
    {
      title: "Barcelona, Espanha",
      subtitle: "2021",
      img: "barcelona.webp",
      description: "Capital catalã vibrante, arte de Gaudí e praias.",
    },
    {
      title: "Estrasburgo, França",
      subtitle: "2022",
      img: "strasbourg.jpg",
      description: "Centro europeu com canais e catedral gótica.",
    },
  ];
  cursos: Achievement[] = [
    {
      title: "Mergulho Avançado",
      subtitle: "Bombeiros 2018",
      img: "mergulho.jpg",
      description: "Técnicas de salvamento subaquático.",
    },
    {
      title: "UX/UI Design",
      subtitle: "Academia Lisboa 2021",
      img: "uxui.jpg",
      description: "Metodologias de design centrado no utilizador.",
    },
    {
      title: "Drift Avançado",
      subtitle: "Escola Drift 2023",
      img: "drift.jpg",
      description: "Manobras de derrapagem controlada.",
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
