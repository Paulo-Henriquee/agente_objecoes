from langchain_openai import OpenAI
from langchain.prompts import PromptTemplate

llm = OpenAI(model_name="gpt-4.1-mini", temperature=0.7)
prompt = PromptTemplate.from_template(
    "Você é um cliente no setor {setor}.\n"
    "Apresente uma objeção de dificuldade {dificuldade} referente a {produto}."
)


def gerar_objeção(setor: str, dificuldade: str, produto: str) -> str:
    # formata o prompt e dispara direto no LLM
    texto = prompt.format_prompt(
        setor=setor,
        dificuldade=dificuldade,
        produto=produto
    ).to_string()
    return llm(texto)
