import {Component} from "@angular/core";
import {RefresherCustomEvent} from "@ionic/angular";

interface Skill {
  name: string;
  level: string;
}
interface Experience {
  role: string;
  company: string;
  period: string;
  icon: string;
}
interface Language {
  name: string;
  level: string;
}

@Component({
  selector: "app-perfil",
  templateUrl: "./perfil.page.html",
  styleUrls: ["./perfil.page.scss"],
  standalone: false,
})
export class PerfilPage {
  segmentValue = "about";
  name = "João Barbosa";
  birth = "1 de Agosto de 1996";
  location = "Freixo, Ponte de Lima";
  bio =
    "Engenheiro Informático com foco em UX/UI e desenvolvimento mobile. Apaixonado por viagens e tecnologia.";

  skills: Skill[] = [
    {name: "Angular", level: "Avançado"},
    {name: "Ionic", level: "Avançado"},
    {name: "TypeScript", level: "Avançado"},
    {name: "Figma", level: "Intermédio"},
  ];

  languages: Language[] = [
    {name: "Português", level: "Nativo"},
    {name: "Inglês", level: "Fluente"},
    {name: "Espanhol", level: "Intermédio"},
  ];

  experiences: Experience[] = [
    {
      role: "Sub-Gerente",
      company: "JHB Internacional",
      period: "2020–2022",
      icon: "briefcase-outline",
    },
    {
      role: "Responsável de Obra",
      company: "Navios Cruzeiro",
      period: "2022–2024",
      icon: "boat-outline",
    },
  ];

  doRefresh(event: RefresherCustomEvent) {
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
}
