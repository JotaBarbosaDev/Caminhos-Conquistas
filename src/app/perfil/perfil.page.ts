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
  description?: string;
  tags?: string[];
}
interface Language {
  name: string;
  level: string;
}
interface Education {
  degree: string;
  institution: string;
  period: string;
  description?: string;
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
      description: "Gestão de equipas e projetos internacionais.",
      tags: ["Gestão", "Logística", "Liderança"]
    },
    {
      role: "Responsável de Obra",
      company: "Navios Cruzeiro",
      period: "2022–2024",
      icon: "boat-outline",
      description: "Supervisão de obras e renovações em navios de cruzeiro.",
      tags: ["Construção", "Supervisão", "Marítimo"]
    },
  ];

  education: Education[] = [
    {
      degree: "Mestrado em Engenharia Informática",
      institution: "Universidade do Minho",
      period: "2018-2020",
      description: "Especialização em Interfaces Homem-Máquina e Design de Interação."
    },
    {
      degree: "Licenciatura em Engenharia Informática",
      institution: "Instituto Politécnico de Viana do Castelo",
      period: "2015-2018",
      description: "Foco em desenvolvimento de software e sistemas web."
    }
  ];

  doRefresh(event: RefresherCustomEvent) {
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  editProfile() {
    console.log('Editar perfil');
    // Lógica para editar perfil será implementada aqui
  }

  segmentChanged() {
    console.log('Segmento alterado para:', this.segmentValue);
  }

  getSkillValue(level: string): number {
    switch (level) {
      case 'Básico': return 0.3;
      case 'Intermédio': return 0.6;
      case 'Avançado': return 0.85;
      case 'Especialista': return 1;
      default: return 0.5;
    }
  }

  getLanguageFlag(language: string): string {
    switch (language) {
      case 'Português': return 'pt';
      case 'Inglês': return 'en';
      case 'Espanhol': return 'es';
      default: return 'unknown';
    }
  }
}
