from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from app.agents.generator import gerar_objeção
from app.agents.evaluator import avaliar_resposta
from typing import Any, Dict


class ObjectionRequest(BaseModel):
    setor: str
    dificuldade: str
    produto: str


class EvalRequest(BaseModel):
    objection: str
    resposta: str


app = FastAPI(
    title="HealthScore IA de Objeções",
    version="0.1.0",
)


@app.get("/")
async def health_check() -> Dict[str, str]:
    return {"status": "ok"}


@app.post("/generate")
async def generate(req: ObjectionRequest) -> Dict[str, Any]:
    try:
        obj = gerar_objeção(req.setor, req.dificuldade, req.produto)
        return {"objection": obj}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/evaluate")
async def evaluate(req: EvalRequest) -> Dict[str, Any]:
    try:
        return avaliar_resposta(req.objection, req.resposta)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
