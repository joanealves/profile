/**
 * Tipos do conteúdo do site.
 *
 * O conteúdo vive fora dos componentes de propósito: os cases são o produto
 * deste site e precisam ser editáveis (e revisáveis) sem tocar em JSX.
 */

/** Marca um dado ainda não confirmado por Joane. Nada com `pendente: true` deve ir ao ar. */
export type Verificacao = "verificado-em-codigo" | "pendente";

export interface Metrica {
  valor: string;
  rotulo: string;
  /** De onde veio o número — usado para não publicar dado indefensável em entrevista. */
  fonte: string;
  verificacao: Verificacao;
}

/**
 * A espinha do case. A ordem dos campos é a ordem da leitura:
 * contexto → decisão → trade-off → resultado.
 */
export interface Case {
  slug: string;
  /** Ex.: "Realize · 2026" */
  periodo: string;
  organizacao: string;
  /** Papel exercido, não cargo formal. */
  papel: string;
  /** Título orientado a decisão, nunca a tecnologia. */
  titulo: string;
  /** Uma frase: o problema real de negócio. */
  resumo: string;
  contexto: string;
  decisao: string;
  tradeoff: string;
  resultado: string;
  metricas: Metrica[];
  /** Tecnologias como consequência da decisão — nunca como argumento principal. */
  stack: string[];
  /** Referência a arquivo/PR real que sustenta a decisão, quando existir. */
  evidencia?: {
    rotulo: string;
    detalhe: string;
  };
  destaque?: boolean;
}

export interface ItemTrajetoria {
  periodo: string;
  empresa: string;
  papel: string;
  descricao: string;
  atual?: boolean;
}

export interface GrupoStack {
  titulo: string;
  itens: string[];
}

export interface PraticaTrabalho {
  titulo: string;
  descricao: string;
  /** Nome do ícone lucide-react — SVG stroke, nunca emoji. */
  icone: string;
}
