import { OpenAI } from "langchain/llms/openai";
import { RetrievalQAChain } from "langchain/chains";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import * as fs from "fs";


export const  run = async (reQuery) => {
  // Initialize the LLM to use to answer the question.
  const model = new OpenAI({modelName:'gpt-3.5-turbo', openAIApiKey:process.env.OPENAI_API_KEY});
  let docs;
  if (process.env.PERSIST){
    const text = fs.readFileSync("data.txt", "utf8");
    const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
    docs = await textSplitter.createDocuments([text]);    
  }
  // Create a vector store from the documents.
  const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings());

  // Create a chain that uses the OpenAI LLM and HNSWLib vector store.
  const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());
  const res = await chain.call({
    query: reQuery,
  });
  return res;
  /*
  {
    res: {
      text: 'The president said that Justice Breyer was an Army veteran, Constitutional scholar,
      and retiring Justice of the United States Supreme Court and thanked him for his service.'
    }
  }
  */
};

export default run;

