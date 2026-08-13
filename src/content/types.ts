/**
 * Tipos do conteúdo do site.
 *
 * O conteúdo vive fora dos componentes de propósito: os projetos precisam ser
 * editáveis sem tocar em JSX.
 */

/** Marca dado ainda não confirmado por Joane. Nada com `pendente` deve ir ao ar. */
export type Verificacao = "confirmado" | "pendente";

export interface Projeto {
  slug: string;
  nome: string;
  /** Uma linha: o que é. */
  resumo: string;
  /** Um ou dois parágrafos: o que faz e o que você construiu. */
  descricao: string;
  /** Detalhe técnico interessante — opcional, some quando não houver. */
  nota?: string;
  stack: string[];
  imagem?: string;
  link?: string;
  repo?: string;
  /** Produtos próprios ganham o card grande com glow. */
  destaque?: boolean;
  /** Ex.: "Produto próprio", "Projeto de UX", "Exploração". */
  tipo: string;
  ano: string;
  verificacao: Verificacao;
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
