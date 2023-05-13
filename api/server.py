import os
import openai
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import guardrails as gd

app = FastAPI()
#load environment variables
from dotenv import load_dotenv
load_dotenv()
# Load OpenAI API key from an environment variable
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise ValueError("The 'OPENAI_API_KEY' environment variable is not set")

# Configure OpenAI API client
openai.api_key = api_key


class InputText(BaseModel):
    text: str

rail_str = '''
<rail version="0.1">
<instructions>
You are a helpful assistant only capable of communicating with valid JSON, and no other text.

ONLY return a valid JSON object (no other text is necessary), where the key of the field in JSON is the `name` attribute of the corresponding XML, and the value is of the type specified by the corresponding XML's tag. The JSON MUST conform to the XML format, including any types and format requests e.g. requests for lists, objects and specific types. Be correct and concise. If you are unsure anywhere, enter `None`.

Here are examples of simple (XML, JSON) pairs that show the expected behavior:
- `<string name='foo' format='two-words lower-case' />` => `{'foo': 'example one'}`
- `<list name='bar'><string format='upper-case' /></list>` => `{"bar": ['STRING ONE', 'STRING TWO', etc.]}`
- `<object name='baz'><string name="foo" format="capitalize two-words" /><integer name="index" format="1-indexed" /></object>` => `{'baz': {'foo': 'Some String', 'index': 1}}`
</instructions>

<output>
    <string description="An in-depth, technical, 3 paragraph description of the suggested AWS architecture. Discuss all services needed." name="architecture_description" required="true"/>
    <list name="service_list">
        <object>
            <string description="AWS service name" name="service" required="true"/>
            <string description="A description of the service's function in the app" name="service" required="true"/>
            <list required="true" name="output_services" description="list of services that the service depends on.">
                <object>
                    <string description="AWS service name" name="service" required="true"/>
                </object>
            </list>
        </object>
    </list>
</output>


<prompt>
Please suggest an AWS architecture for the project description. Define any subnets or VPNs that need to be setup in order to create the app. All services must have atleast one dependant or dependancy.: 
{{project_description}}
@complete_json_suffix
</prompt>

</rail>
'''

guard = gd.Guard.from_rail_string(rail_str)

class InputText(BaseModel):
    input_text: str

@app.post("/get_arch_suggestion")
async def get_arch_suggestion(input_data: InputText):
    print("Getting suggestion for: ", input_data.input_text)
    try:
        raw_llm_response, validated_response = guard(
            openai.ChatCompletion.create,
            prompt_params={"project_description": input_data.input_text},
            model="gpt-4",
            max_tokens=2048,
            temperature=0,
        )
        return validated_response

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000)
