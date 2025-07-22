from langchain_openai import OpenAI
from langchain.prompts import PromptTemplate
import json

llm = OpenAI(model_name="gpt-4.1-mini", temperature=0)

# 2. Define o template de prompt para avaliação em formato JSON
prompt = PromptTemplate.from_template(
    "Avalie a resposta do vendedor à seguinte objeção:\n\n"
    "Objeção: {objection}\n"
    "Resposta: {resposta}\n\n"
    "Dê nota de 0 a 10 para clareza, domínio técnico, empatia e assertividade.\n"  # noqa: E501
    "Retorne apenas um JSON no formato:\n"
    '{"nota": <int>, "feedback": "<texto>", '
    '"clareza": <int>, "tecnica": <int>, "empatia": <int>, "assertividade": <int>}'  # noqa: E501
)


def avaliar_resposta(objection: str, resposta: str) -> dict:
    # 3.1 Preenche o template com a objeção e a resposta
    texto = prompt.format_prompt(
        objection=objection,
        resposta=resposta
    ).to_string()
    # 3.2 Envia ao LLM e captura o JSON em texto
    retorno = llm(texto)
    # 3.3 Converte o JSON de string para dict Python
    return json.loads(retorno)
