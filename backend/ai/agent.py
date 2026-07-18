from langchain_core.messages import HumanMessage, SystemMessage

from backend.ai.prompts import SYSTEM_PROMPT
from backend.ai.providers.llm import get_llm
from backend.ai.tools.jobs import (job_details,recent_jobs)
from backend.ai.tools.analytic import (
    overview,
    top_skills,
    top_companies,
)

from backend.ai.tools.jobs import (
    search_jobs,
)

llm = get_llm()
TOOLS = [
    overview,
    top_skills,
    top_companies,
    search_jobs,
    job_details,
    recent_jobs
]

from langgraph.prebuilt import create_react_agent

agent = create_react_agent(
    model=get_llm(),
    tools=TOOLS,
)

def run_agent(message: str):

    response = agent.invoke(
        {
            "messages": [
                {
                    "role": "user",
                    "content": message,
                }
            ]
        }
    )

    last_message = response["messages"][-1]
    content = last_message.content

    if isinstance(content, str):
        return content

    if isinstance(content, list):
        texts = []
        for block in content:
            if isinstance(block, dict) and "text" in block:
                texts.append(block["text"])
        return "\n".join(texts)

    return str(content)